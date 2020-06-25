/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
import { evaluate, EvaluateResult } from '@wessberg/ts-evaluator';
import * as ts from 'typescript';

export function hasValue(item: any): boolean {
    return item !== null && item !== undefined;
}

export function createTypescriptProgram(entryFiles: string[], options: ts.CompilerOptions): ts.Program {
    const host = ts.createCompilerHost(options, true);
    const program = ts.createProgram(entryFiles, options, host);
    return program;
}

export function getVariableInitializer(node: ts.Node, typeChecker: ts.TypeChecker): ts.Expression {
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

    if (!ts.isVariableDeclaration(valueDeclaration)) {
        return;
    }
    return valueDeclaration.initializer;
}

export function getArrayItemsInitializer(
    expression: ts.Expression,
    typeChecker: ts.TypeChecker
): ts.ObjectLiteralExpression[] {
    let arrayLiteralExpression: ts.ArrayLiteralExpression;
    if (ts.isIdentifier(expression)) {
        const variableInitializer = getVariableInitializer(expression, typeChecker);
        if (ts.isObjectLiteralExpression(variableInitializer)) {
            arrayLiteralExpression = ts.createArrayLiteral([variableInitializer]);
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
