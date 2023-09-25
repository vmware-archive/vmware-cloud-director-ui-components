/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
import { evaluate, EvaluateResult } from 'ts-evaluator';
import * as ts from 'typescript';

export function hasValue(item: unknown): boolean {
    return item !== null && item !== undefined;
}

export function createTypescriptProgram(entryFiles: string[], options: ts.CompilerOptions): ts.Program {
    const host = ts.createCompilerHost(options, true);
    const program = ts.createProgram(entryFiles, options, host);
    return program;
}

export function getVariableInitializer(node: ts.Node, typeChecker: ts.TypeChecker): ts.Expression {
    const declaration = getValueDeclaration(node, typeChecker);

    if (!ts.isVariableDeclaration(declaration)) {
        return;
    }
    return declaration.initializer;
}

export function getValueDeclaration(node: ts.Node, typeChecker: ts.TypeChecker): ts.Declaration {
    const symbol = typeChecker.getSymbolAtLocation(node);
    if (!symbol) {
        return;
    }
    let valueDeclaration: ts.Declaration = symbol.valueDeclaration;

    if (!valueDeclaration) {
        const aliasedSymbol = typeChecker.getAliasedSymbol(symbol);
        valueDeclaration = aliasedSymbol.valueDeclaration;
    }

    if (!valueDeclaration) {
        return;
    }
    return valueDeclaration;
}

export function getArrayItemsInitializer(
    expression: ts.Expression,
    typeChecker: ts.TypeChecker
): ts.ObjectLiteralExpression[] {
    let arrayLiteralExpression: ts.ArrayLiteralExpression;
    if (ts.isIdentifier(expression)) {
        const variableInitializer = getVariableInitializer(expression, typeChecker);
        if (ts.isObjectLiteralExpression(variableInitializer)) {
            arrayLiteralExpression = ts.factory.createArrayLiteralExpression([variableInitializer]);
        } else if (ts.isArrayLiteralExpression(variableInitializer)) {
            arrayLiteralExpression = variableInitializer;
        } else {
            throw new Error(
                `Unexpected type of variableInitializer: ${variableInitializer && variableInitializer.kind}`
            );
        }
    } else if (ts.isArrayLiteralExpression(expression)) {
        arrayLiteralExpression = expression;
    } else {
        throw new Error(`Expected ArrayLiteralExpression`);
    }

    let objectLiteralExpressions: ts.ObjectLiteralExpression[] = [];

    // Iterate through all the elements of the array in order to convert all to be ObjectLiteralExpressions
    for (const element of arrayLiteralExpression.elements) {
        if (ts.isObjectLiteralExpression(element)) {
            objectLiteralExpressions.push(element);
        } else if (ts.isSpreadElement(element)) {
            objectLiteralExpressions = [
                ...objectLiteralExpressions,
                ...getArrayItemsInitializer(element.expression, typeChecker),
            ];
        } else if (ts.isIdentifier(element)) {
            objectLiteralExpressions = [...objectLiteralExpressions, ...getArrayItemsInitializer(element, typeChecker)];
        } else {
            throw new Error(`Unexpected type of element: ${element && element.kind}`);
        }
    }

    return objectLiteralExpressions;
}

export function evaluateNode(
    node: ts.Statement | ts.Declaration | ts.Expression,
    typeChecker: ts.TypeChecker,
    throwOnFailure: boolean = true
): any {
    // The evaluation should use the same typescript version as the analyzer
    // otherwise the evaluation may not succeed.
    const val: EvaluateResult = evaluate({ node, typeChecker, typescript: ts });
    if (val.success) {
        return val.value as object;
    }
    if (throwOnFailure) {
        throw new Error(`Corner case hit when evaluating: `);
    }
}

/**
 * Given an expression representing an Angular component class, find its tag name, which is the selector property but
 * for components, it must be a tag name.
 * @param initializer expression which declares an angular component
 * @param typeChecker
 */
export function getTagName(initializer: ts.Expression, typeChecker: ts.TypeChecker): string | undefined {
    const classInitializer = getValueDeclaration(initializer, typeChecker);
    const errorMessage = `Invalid expression passed to getTagName. Expected class declaration with @Component annotation`;
    if (!ts.isClassDeclaration(classInitializer)) {
        throw new Error(errorMessage);
    }

    const componentDecorator = ts.getDecorators(classInitializer).find((dec: ts.Node) => {
        return (
            ts.isDecorator(dec) &&
            ts.isCallExpression(dec.expression) &&
            ts.isIdentifier(dec.expression.expression) &&
            dec.expression.expression.escapedText === 'Component'
        );
    });

    if (!componentDecorator) {
        throw new Error(errorMessage);
    }
    // We guaranteed it's a callExpression with the above
    const compDecoratorArg = (componentDecorator.expression as ts.CallExpression).arguments[0];
    if (!ts.isObjectLiteralExpression(compDecoratorArg)) {
        return;
    }
    const selectorProp = compDecoratorArg.properties.find(
        (p): p is ts.PropertyAssignment => ts.isPropertyAssignment(p) && p.name.getText() === 'selector'
    );
    if (selectorProp) {
        return (selectorProp.initializer as ts.StringLiteral).text;
    }
}
