/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { normalize, strings } from '@angular-devkit/core';
import {
    apply,
    applyTemplates,
    chain,
    mergeWith,
    move,
    Rule,
    SchematicContext,
    SchematicsException,
    Source,
    Tree,
    url,
} from '@angular-devkit/schematics';
import {
    Change,
    getSourceNodes,
    InsertChange,
    NoopChange,
    WorkspaceProject,
    WorkspaceSchema,
} from 'schematics-utilities';
import * as ts from 'typescript';
import { Schema as ExampleSchema } from './schema';

const componentTypeMap: { [key: string]: RegExp } = {
    component: /\w+component$/i,
    directive: /\w+directive$/i,
};

/**
 * Describe an import declaration:
 * ```typescript
 * import { symbolName } from 'fileName';
 * ```
 */
interface ImportDeclaration {
    symbolName: string;
    fileName: string;
}

/**
 * Insert white space between words in PascalCase string.
 *
 * **Before:** 'WhiteSpace'
 *
 * **After:** 'White Space'
 */
function insertWhiteSpace(str: string): string {
    return str.replace(/([a-z])(A-Z)/g, '$1 $2');
}

/**
 * Get default project config from angular.json
 */
function getProject(tree: Tree): WorkspaceProject {
    const workspaceConfig = tree.read('/angular.json');
    if (!workspaceConfig) {
        throw new SchematicsException('Angular workspace not found');
    }
    const workspace: WorkspaceSchema = JSON.parse(workspaceConfig.toString('utf-8'));
    return workspace.projects[workspace.defaultProject as string];
}

/**
 * Return component type from component name. Support component and directive at present.
 * If a component does not have component or directive as a suffix, it defaults to returning a 'component'
 */
function getComponentType(component: string): string {
    for (const key in componentTypeMap) {
        if (componentTypeMap[key].test(component)) {
            return key;
        }
    }
    return 'component';
}

/**
 * Generate example module and component with given example name under given folder.
 *
 * **Create files:**
 *
 * projectRoot/app/\{components|directives\}/component-name/example-name/component-name-example-name.example.component.html
 * projectRoot/app/\{components|directives\}/component-name/example-name/component-name-example-name.example.component.scss
 * projectRoot/app/\{components|directives\}/component-name/example-name/component-name-example-name.example.component.ts
 * projectRoot/app/\{components|directives\}/component-name/example-name/component-name-example-name.example.module.ts
 */
function applyExampleComponentTemplate(
    packageName: string,
    moduleName: string,
    exampleName: string,
    path: string
): Source {
    return apply(url('./files/example-component'), [
        applyTemplates({
            ...strings,
            name: exampleName,
            packageName,
            moduleName,
        }),
        move(normalize(path)),
    ]);
}

/**
 * Generate component examples module, which imports examples for this component.
 *
 * **Create file**:
 *
 * projectRoot/app/\{components|directives\}/component-name/component-name.examples.module.ts
 */
function applyExampleModuleTemplate(
    packageName: string,
    componentName: string,
    componentType: string,
    exampleName: string,
    displayName: string,
    path: string,
    componentHasSuffix: boolean
): Source {
    return apply(url('./files/example-module'), [
        applyTemplates({
            ...strings,
            insertWhiteSpace,
            packageName,
            componentName,
            exampleName,
            componentType,
            displayName,
            componentHasSuffix,
        }),
        move(normalize(path)),
    ]);
}

/**
 * Generate root examples module, which imports all the component examples module.
 *
 * **Create file:**
 *
 * projectRoot/app/examples.module.ts
 */
function applyRootModuleTemplate(componentName: string, componentType: string, path: string): Source {
    return apply(url('./files/root-module'), [
        applyTemplates({
            ...strings,
            name: componentName,
            componentType,
        }),
        move(normalize(path)),
    ]);
}

/**
 * Add a list of import declarations after the last existing import. If the fileName of import declaration
 * already exists, that import declaration wouldn't be imported to ts file. If there is no existing import,
 * new import declarations would be added at the beginning of ts file.
 *
 * **Before:**
 *
 * ```typescript
 * import { A } from 'a';
 * ...
 * import { B } from 'b';
 * ```
 *
 * **After:**
 *
 * ```typescript
 * import { A } from 'a';
 * ...
 * import { B } from 'b';
 * import { symbol1 } from 'file1';
 * import { symbol2 } from 'file2';
 * ...
 * ```
 */
function addImportStatement(fileName: string, nodes: ts.Node[], imports: ImportDeclaration[]): Change {
    let lastImportNode: ts.Node | undefined;
    const filesSet = new Set<string>();

    // find the last import declaration
    nodes.forEach((node: ts.Node) => {
        if (node.kind === ts.SyntaxKind.ImportDeclaration) {
            lastImportNode = node;
            // save all the existing fileName of import
            node.getChildren()
                .filter(ts.isStringLiteral)
                .map((n: ts.StringLiteral) => n.text)
                .forEach((item: string) => filesSet.add(item));
        }
    });

    const insertImportString = imports
        .filter((declaration: ImportDeclaration) => !filesSet.has(declaration.fileName))
        .map(
            (declaration: ImportDeclaration) => `\nimport { ${declaration.symbolName} } from '${declaration.fileName}';`
        )
        .join('');
    return new InsertChange(fileName, lastImportNode ? lastImportNode.getEnd() : 0, insertImportString);
}

function findArrayNodeByIdentifier(nodes: ts.Node[], identifier: string): ts.Node {
    const identifierNode = nodes.find(
        (node: ts.Node) => node.kind === ts.SyntaxKind.Identifier && node.getText() === identifier
    );
    if (!identifierNode || !identifierNode.parent) {
        throw new SchematicsException('Array identifier not found');
    }

    let siblings = identifierNode.parent.getChildren();
    const index = siblings.indexOf(identifierNode);
    siblings = siblings.slice(index);

    const arrayLiteralExpression = siblings.find((node: ts.Node) => node.kind === ts.SyntaxKind.ArrayLiteralExpression);
    if (!arrayLiteralExpression) {
        throw new SchematicsException('Array not found');
    }

    const listNode = arrayLiteralExpression
        .getChildren()
        .find((node: ts.Node) => node.kind === ts.SyntaxKind.SyntaxList);
    if (!listNode) {
        throw new SchematicsException('Examples array content not found');
    }
    return listNode;
}

/**
 * Add an exampleEntry item to the end of examples list.
 *
 * **Before:**
 *
 * ```typescript
 * Documentation.registerDocumentationEntry({
 *      ...,
 *      examples: [
 *          ...
 *      ]
 * ```
 *
 * **After:**
 *
 * ```typescript
 * Documentation.registerDocumentationEntry({
 *      ...,
 *      examples: [
 *          ...,
 *          {
 *              component: ComponentNameExampleComponent,
 *              title: 'displayName',
 *              urlSegment: 'component-name'
 *          }
 *      ]
 * ```
 */
function addDocumentationEntry(fileName: string, nodes: ts.Node[], componentName: string, displayName: string): Change {
    const examplesListNode = findArrayNodeByIdentifier(nodes, 'examples');
    const currentExamples = examplesListNode.getText().trim();
    const insertExample = `${currentExamples.endsWith(',') ? '' : ','}
        {
            component: ${componentName}ExampleComponent,
            title: '${displayName}',
            urlSegment: '${strings.dasherize(componentName)}',
        },`;
    return new InsertChange(fileName, examplesListNode.getEnd(), insertExample);
}

/**
 * Add module to module's import array. Do nothing if module is already added to imports array.
 *
 * **Before:**
 *
 * ```typescript
 * @NgModule({
 *      imports: [
 *          ...
 *      ]
 * ```
 *
 * **After:**
 *
 * ```typescript
 * @NgModule({
 *      imports: [
 *          ...,
 *          moduleName
 *      ]
 * ```
 */
function addModuleImports(fileName: string, nodes: ts.Node[], moduleName: string): Change {
    const importsListNode = findArrayNodeByIdentifier(nodes, 'imports');
    const currentImports = importsListNode.getText().trim();

    // get existence of module
    const currentList = currentImports.split(/,/);
    if (currentList.find((item: string) => item.trim() === moduleName)) {
        // do nothing if module is added to array
        return new NoopChange();
    }

    const insertImport = `${currentImports.endsWith(',') ? '' : ','}
        ${moduleName}`;
    return new InsertChange(fileName, importsListNode.getEnd(), insertImport);
}

/**
 * Update existing module file, including adding import declaration(s), exampleEntry, and module to
 * imports array. ExampleEntry is optional and would be added only when updateDocumentEntry is true.
 * Return Change array including created changes
 *
 * **Before:**
 *
 * ```typescript
 * import { A } from 'a';
 * ...
 * import { B } from 'b';
 *
 * ...
 *
 * Documentation.registerDocumentationEntry({
 *      ...,
 *      examples: [
 *          ...
 *      ]
 *
 * ...
 *
 * @NgModule({
 *      imports: [
 *          ...
 *      ]
 * ```
 *
 * **After**:
 *
 * ```typescript
 * import { A } from 'a';
 * ...
 * import { B } from 'b';
 * import { symbol1 } from 'file1';
 * import { symbol2 } from 'file2';
 * ...
 *
 * Documentation.registerDocumentationEntry({
 *      ...,
 *      examples: [
 *          ...,
 *          {
 *              component: ComponentNameExampleComponent,
 *              title: 'displayName',
 *              urlSegment: 'component-name'
 *          }
 *      ]
 *
 * ...
 *
 * @NgModule({
 *      imports: [
 *          ...,
 *          moduleName
 *      ]
 * ```
 */
function updateExistingModule(
    tree: Tree,
    fileName: string,
    imports: ImportDeclaration[],
    componentName: string,
    moduleName: string,
    updateDocumentEntry: boolean,
    displayName: string
): Change[] {
    const buffer = tree.read(fileName);
    if (!buffer) {
        throw new SchematicsException(`No such file: ${fileName}`);
    }
    const sourceText = buffer.toString('utf-8');
    const sourceFile = ts.createSourceFile(fileName, sourceText, ts.ScriptTarget.Latest, true);
    // @ts-ignore
    const nodes: ts.Node[] = getSourceNodes(sourceFile);
    if (nodes.length === 0) {
        throw new SchematicsException(`Source file ${fileName} is empty`);
    }

    const changes: Change[] = [addImportStatement(fileName, nodes, imports)];
    if (updateDocumentEntry) {
        changes.push(addDocumentationEntry(fileName, nodes, componentName, displayName));
    }
    changes.push(addModuleImports(fileName, nodes, moduleName));
    return changes;
}

/**
 * Update existing module file. Use {@link updateExistingModule} to get and perform needed changes
 */
function updateExistingModuleRule(
    fileName: string,
    imports: ImportDeclaration[],
    componentName: string,
    moduleName: string,
    updateDocumentEntry: boolean,
    displayName: string = ''
): Rule {
    return (tree: Tree) => {
        const changes = updateExistingModule(
            tree,
            fileName,
            imports,
            componentName,
            moduleName,
            updateDocumentEntry,
            displayName
        );
        const recorder = tree.beginUpdate(fileName);
        changes.forEach((change: Change) => {
            if (change instanceof InsertChange) {
                recorder.insertLeft(change.pos, change.toAdd);
            }
        });
        tree.commitUpdate(recorder);
        return tree;
    };
}

/**
 * Create an example, including a example module with component, a component examples module importing
 * all the examples for that component, and a root examples module importing all the component examples.
 * Use {@link updateExistingModuleRule} to get result rules which has all the required changes
 */
export function addExample(options: ExampleSchema): Rule {
    return (tree: Tree, _options: SchematicContext) => {
        const project = getProject(tree);
        const componentType = getComponentType(options.componentName);

        const hasSuffixRegex = /(Component|Directive)$/;

        const componentName = strings.classify(options.componentName).replace(hasSuffixRegex, '');
        const exampleName = componentName + strings.classify(options.exampleName);
        const finalRules: Rule[] = [];

        // generate folder names
        const appRootDir = `${project.sourceRoot}/app`;
        const exampleComponentDir = `${appRootDir}/${componentType}s`;
        const exampleRootDir = `${exampleComponentDir}/${strings.dasherize(componentName)}`;
        const exampleSubDir = `${exampleRootDir}/${strings.dasherize(options.exampleName)}`;

        // generate example module, examples module, and root examples module name
        const exampleModuleName = `${strings.dasherize(componentName)}.examples.module.ts`;
        const exampleModuleFileName = `${exampleRootDir}/${exampleModuleName}`;
        const exampleRootModuleFileName = `${appRootDir}/examples.module.ts`;

        finalRules.push(
            mergeWith(
                applyExampleComponentTemplate(options.packageName, options.moduleName, exampleName, exampleSubDir)
            )
        );

        // update examples module or create a new one if it doesn't exist
        if (tree.exists(exampleModuleFileName)) {
            const exampleImportList: ImportDeclaration[] = [
                {
                    symbolName: `${exampleName}ExampleComponent`,
                    fileName: `./${strings.dasherize(options.exampleName)}/${strings.dasherize(
                        exampleName
                    )}.example.component`,
                },
                {
                    symbolName: `${exampleName}ExampleModule`,
                    fileName: `./${strings.dasherize(options.exampleName)}/${strings.dasherize(
                        exampleName
                    )}.example.module`,
                },
            ];
            finalRules.push(
                updateExistingModuleRule(
                    exampleModuleFileName,
                    exampleImportList,
                    exampleName,
                    `${exampleName}ExampleModule`,
                    true,
                    options.displayName
                )
            );
        } else {
            finalRules.push(
                mergeWith(
                    applyExampleModuleTemplate(
                        options.packageName,
                        componentName,
                        componentType,
                        strings.classify(options.exampleName),
                        options.displayName,
                        exampleRootDir,
                        hasSuffixRegex.test(options.componentName)
                    )
                )
            );
        }

        // update root examples module or create a new one if it doesn't exist
        if (tree.exists(exampleRootModuleFileName)) {
            const insertModule: ImportDeclaration[] = [
                {
                    symbolName: `${componentName}ExamplesModule`,
                    fileName: `./${componentType}s/${strings.dasherize(componentName)}/${strings.dasherize(
                        componentName
                    )}.examples.module`,
                },
            ];
            finalRules.push(
                updateExistingModuleRule(
                    exampleRootModuleFileName,
                    insertModule,
                    componentName,
                    `${componentName}ExamplesModule`,
                    false
                )
            );
        } else {
            finalRules.push(mergeWith(applyRootModuleTemplate(componentName, componentType, appRootDir)));
        }
        return chain(finalRules);
    };
}
