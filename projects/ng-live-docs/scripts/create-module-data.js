'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const ts = require('typescript');
const NG_MODULE = 'NgModule';
function generateDocumentation(fileNames, options) {
    const program = ts.createProgram(fileNames, options);
    const output = {};
    let sourceFile;
    for (sourceFile of program.getSourceFiles()) {
        if (sourceFile.fileName.includes('.module.ts')) {
            ts.forEachChild(sourceFile, visit);
        }
    }
    return output;
    function visit(node) {
        if (isClassDeclarationNode(node)) {
            if (isNgModuleClass(node)) {
                const module = serializeModule(node);
                output[module.className] = module;
            }
        } else if (node.kind === ts.SyntaxKind.ModuleDeclaration) {
            ts.forEachChild(node, visit);
        }
    }
    function isNgModuleClass(cls) {
        return !!cls.decorators.find((decorator) => {
            return decorator.expression.getFirstToken(sourceFile).text === NG_MODULE;
        });
    }
    function serializeModule(node) {
        return {
            className: node.name.escapedText.toString(),
            path: sourceFile.fileName,
            sourceCode: sourceFile.getFullText(),
        };
    }
    function isClassDeclarationNode(node) {
        return node.kind === ts.SyntaxKind.ClassDeclaration;
    }
}
const modules = generateDocumentation(process.argv.slice(2), {
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS,
});
console.log(JSON.stringify(modules, undefined, 4));
//# sourceMappingURL=create-module-data.js.map
