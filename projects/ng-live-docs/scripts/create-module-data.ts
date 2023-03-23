/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
import * as ts from 'typescript';

interface ModuleEntry {
    className: string;
    path: string;
    sourceCode: string;
}

const NG_MODULE = 'NgModule';

interface ModuleEntries {
    [className: string]: ModuleEntry;
}

/**
 * Get the source code for files containing NgModules
 * @param fileNames Entry points to be scanned
 * @param options Options to be passed to `ts.createProgram`
 * @return A map keyed by the module class names
 */
function generateDocumentation(fileNames: string[], options: ts.CompilerOptions): ModuleEntries {
    const program = ts.createProgram(fileNames, options);
    const output: ModuleEntries = {};
    let sourceFile: ts.SourceFile;

    // Visit every sourceFile in the program
    for (sourceFile of program.getSourceFiles()) {
        if (sourceFile.fileName.includes('.module.ts')) {
            // Walk the tree to search for classes
            ts.forEachChild(sourceFile, visit);
        }
    }
    return output;

    /** visit nodes finding exported classes */
    function visit(node: ts.Node): void {
        if (isClassDeclarationNode(node)) {
            if (isNgModuleClass(node as ts.ClassDeclaration)) {
                const module = serializeModule(node);
                output[module.className] = module;
            }
        } else if (node.kind === ts.SyntaxKind.ModuleDeclaration) {
            // This is a namespace, visit its children
            ts.forEachChild(node, visit);
        }
    }

    function isNgModuleClass(cls: ts.ClassDeclaration): boolean {
        return !ts.canHaveDecorators(cls)
            ? false
            : ts.getDecorators(cls).some((decorator) => {
                  return (decorator.expression.getFirstToken(sourceFile) as ts.Identifier).text === NG_MODULE;
              });
    }

    function serializeModule(node: ts.ClassDeclaration): ModuleEntry {
        return {
            className: node.name.escapedText.toString(),
            path: sourceFile.fileName,
            sourceCode: sourceFile.getFullText(),
        };
    }

    function isClassDeclarationNode(node: ts.Node): node is ts.ClassDeclaration {
        return node.kind === ts.SyntaxKind.ClassDeclaration;
    }
}

const modules = generateDocumentation(process.argv.slice(2), {
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS,
});

console.log(JSON.stringify(modules, undefined, 4));
