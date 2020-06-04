/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
import * as ts from 'typescript';
import { AppRoute } from './app-route';
import { ANGULAR_CORE, ROUTE_PROP } from './constants';
import { createTypescriptProgram, evaluateNode, getArrayItemsInitializer, hasValue } from './utils';

interface AppRouteWithLazyLoading extends AppRoute {
    loadChildren?: string;
}

interface ModuleRouteCall {
    module: string;
    routeCall: ts.CallExpression;
}
interface ModuleRoutes {
    module: string;
    routes: AppRouteWithLazyLoading[];
}

interface ModuleAppRoutes {
    module: string;
    routes: AppRoute[];
}

/**
 * Returns and array of {@link AppRoute} which are found in the files are tracked from the entry points
 * @param entryFiles array of entry points for the angular program
 * @param options typescript compiler options
 */
export function getRoutesByEntryPoint(entryFiles: string[], options: ts.CompilerOptions): AppRoute[] {
    const program = createTypescriptProgram(entryFiles, options);
    return getRoutes(program);
}

/**
 * Returns and array of {@link AppRoute} which are found in the files are tracked from the entry points
 * @param program typescript program
 */
export function getRoutes(program: ts.Program): AppRoute[] {
    // Get all the source files
    const allSourceFiles = program.getSourceFiles();

    // Get only the files that contain module in their name - simply for performance considerations
    const moduleFiles = allSourceFiles.filter(isModuleFile);

    const moduleRoutes: ModuleRoutes[] = moduleFiles
        .filter(containsRouting) // Get only the files that contain real router usage
        .map(moduleToModuleRouteCalls) // Map the router usage to real router configuration calls
        .filter(hasValue) // Not all the files that contain router usage, contain router configuration call
        .map(moduleRouteCall => routeCallToRoutes(moduleRouteCall, program.getTypeChecker()));

    const moduleAppRoutes: ModuleAppRoutes[] = fixupLoadChildren(moduleRoutes, moduleFiles);

    // Get only the routes into a single array
    const appRoutes: AppRoute[] = moduleAppRoutes
        .map(moduleRoute => moduleRoute.routes)
        .reduce((acc, val) => acc.concat(val), []);

    return appRoutes;
}

/**
 * Predicate based on the condition that the file name contains 'module'
 * @param file typescript file
 */
function isModuleFile(file: ts.SourceFile): boolean {
    return file.fileName.includes('module.ts');
}

/**
 * Predicate based on the condition that the files contains a real router usage like:
 * import RouterModule from '@angular/router'
 * @param file typescript file
 */
function containsRouting(file: ts.SourceFile): boolean {
    const containsImportRouterModule = (node: ts.Node): boolean => {
        return (
            ts.isImportDeclaration(node) &&
            ts.isImportClause(node.importClause) &&
            node.importClause.getText().includes(ANGULAR_CORE.ROUTER_MODULE) &&
            ts.isStringLiteral(node.moduleSpecifier) &&
            node.moduleSpecifier.text === ANGULAR_CORE.ANGULAR_ROUTER
        );
    };

    return file.forEachChild(containsImportRouterModule);
}

/**
 * Extract the very angular call of the Route configuration (forRoot or forChild).
 * Returns the name of the file and the call expresion as found by the typescript compiler
 * @param file typescript file
 */
function moduleToModuleRouteCalls(file: ts.SourceFile): ModuleRouteCall {
    // Traverse the file to search for a router call
    const routeCall = ts.forEachChild(file, searchForRouteCall);

    // Not every file contains a forRoot or forChild router configuration
    if (routeCall) {
        return {
            module: file.fileName,
            routeCall,
        };
    }
    return null;

    function searchForRouteCall(node: ts.Node): ts.CallExpression {
        // Verify that the current node is a forRoot or forChild call expression
        const isRouterCallExpression =
            ts.isCallExpression(node) &&
            ts.isPropertyAccessExpression(node.expression) &&
            ts.isIdentifier(node.expression.expression) &&
            node.expression.expression.escapedText === ANGULAR_CORE.ROUTER_MODULE &&
            ts.isIdentifier(node.expression.name) &&
            (node.expression.name.escapedText === ANGULAR_CORE.FOR_CHILD ||
                node.expression.name.escapedText === ANGULAR_CORE.FOR_ROOT);
        if (isRouterCallExpression) {
            // Since we return the first value found, typescript will stop traversing the children any further
            // this means we support just one routing per file
            return node as ts.CallExpression;
        } else {
            return ts.forEachChild(node, searchForRouteCall);
        }
    }
}

/**
 * Convert the angular router call (angular typescript expression ) to an actual AppRouter plain javascript object
 */
function routeCallToRoutes(moduleRouteCall: ModuleRouteCall, typeChecker: ts.TypeChecker): ModuleRoutes {
    const routes = convert(moduleRouteCall.routeCall.arguments[0]);
    return {
        module: moduleRouteCall.module,
        routes,
    };

    function convert(routeCallExpression: ts.Expression): AppRoute[] {
        // Convert the angular route configuration parameter to an array of object literal expression
        // For example when we have RouterModule.forRoot(routes) we are actually interested in the 'routes' object.
        // routes object can be variable, array, an array containing other variables or spread operator etc.
        const routeObjectLiteralExpressions: ts.ObjectLiteralExpression[] = getArrayItemsInitializer(
            routeCallExpression,
            typeChecker
        );

        // Having the actual typescript object initializer we just need to serialize it to js object
        const appRoutes: AppRouteWithLazyLoading[] = routeObjectLiteralExpressions.map(serializeRoute);

        // The end.
        return appRoutes;
    }

    function serializeRoute(expr: ts.ObjectLiteralExpression): AppRouteWithLazyLoading {
        const route: AppRouteWithLazyLoading = {};
        expr.properties.forEach(prop => {
            if (!ts.isPropertyAssignment(prop)) {
                return;
            }
            const propName = prop.name.getText();
            if (propName === ROUTE_PROP.PATH) {
                // The path can contain a literal string, or expression, including an embedded expression:
                //    path: `${GROUPS}/:vdcGroupId`,
                //    path: `${GROUPS}-legacy`,
                //    path: AdministrationRoutePaths.ROLES + "/:id",
                // In order not to traverse the typescript syntax tree it is easier to call external library to
                // evaluate it
                route.path = evaluateNode(prop.initializer, typeChecker);
            } else if (propName === ROUTE_PROP.REDIRECT_TO) {
                route.redirectTo = evaluateNode(prop.initializer, typeChecker);
            } else if (propName === ROUTE_PROP.CHILDREN) {
                // The children property is in fact a brand new route definition, so recursively go deeper to unfold it
                route.children = convert(prop.initializer);
            } else if (propName === ROUTE_PROP.LOAD_CHILDREN) {
                // LoadChildren contains a special call to load a module asynchronously
                // We are interested only in the module name
                route.loadChildren = getModulefromLoadChildrenCall(prop.initializer);
            } else if (propName === ROUTE_PROP.COMPONENT) {
                // Maybe not really needed, but just in case we add the component name
                route.component = prop.initializer.getText();
            } else if (propName === ROUTE_PROP.DATA) {
                route.data = evaluateNode(prop.initializer, typeChecker);
            }
        });
        return route;
    }
}

/**
 * Extract and return the module name that is going to be lazily loaded
 * Having:
 *     loadChildren: () => import("../../../src/main/extensions/vdcs/vdcs.module")
 *         .then((m) => m.VdcsModule)
 * It will return: "../../../src/main/extensions/vdcs/vdcs.module"
 */
function getModulefromLoadChildrenCall(expr: ts.Expression): string {
    const moduleName = ts.forEachChild(expr, searchForImportModule);
    if (!moduleName) {
        throw new Error(`Could not find module name for importChildren configuration: '${expr.getText()}'`);
    }
    return moduleName;

    function searchForImportModule(node: ts.Node): string {
        if (
            ts.isCallExpression(node) &&
            node.expression.kind === ts.SyntaxKind.ImportKeyword &&
            ts.isStringLiteral(node.arguments[0])
        ) {
            return (node.arguments[0] as ts.StringLiteral).text;
        } else {
            return ts.forEachChild(node, searchForImportModule);
        }
    }
}

/**
 * Returns a new array of modules and their route configuration by analyzing the lazily loaded modules.
 * For those cases substitute the module name with the actual route information
 * and do not include that module in the final array since it is now present as part of the children definition
 * of another module
 */
function fixupLoadChildren(
    moduleRoutesWithLoadChildren: ModuleRoutes[],
    allModuleFiles: ts.SourceFile[]
): ModuleAppRoutes[] {
    // Used for optimization: instead of an array, build a map
    const routesByModule = new Map(
        moduleRoutesWithLoadChildren.map(moduleRoute => [moduleRoute.module, moduleRoute.routes])
    );

    // These are the lazy loaded modules. Their name is referenced by another route configuration for lazy loading
    const referencedLazyLoadedModules: { [name: string]: boolean } = {};

    // Lazy loaded module references are in fact substituted with the actual route configuration
    const moduleRoutes: ModuleRoutes[] = moduleRoutesWithLoadChildren.map(moduleRoute => {
        const routes = moduleRoute.routes.map(route => {
            if (!route.loadChildren) {
                return route;
            }
            const { loadChildren, ...routeWithNoLoadChildren } = route;
            const referencedModule = getReferencedModule(loadChildren);
            const children: AppRoute[] = [...routesByModule.get(referencedModule)];
            referencedLazyLoadedModules[referencedModule] = true;
            const newRoute: AppRoute = {
                ...routeWithNoLoadChildren,
                children,
            };
            return newRoute;
        });
        return { module: moduleRoute.module, routes };
    });

    // At the end delete all the modules that were used as reference
    return moduleRoutes.filter(moduleRoute => !referencedLazyLoadedModules[moduleRoute.module]);

    function getReferencedModule(loadChildrenModule: string): string {
        const moduleFileName = loadChildrenModule.substring(loadChildrenModule.lastIndexOf('/') + 1);
        let referencedModule = moduleRoutesWithLoadChildren.find(moduleRoute =>
            moduleRoute.module.includes(moduleFileName)
        );

        // referencedModule may not be found when routing modules are used. In this case the feature module
        // imports the feature routing module and the feature routing module is the one that
        // contains the RouteModule.forRoot / forChild call
        if (!referencedModule) {
            const moduleFile = allModuleFiles.find(sourceFile => sourceFile.fileName.includes(moduleFileName));
            // In general moduleFile should be found if the naming convention is kept
            if (moduleFile) {
                // Go through the import statements and get those that contain 'module'
                const possibleModules = moduleFile.statements
                    .filter(
                        st =>
                            ts.isImportDeclaration(st) &&
                            ts.isStringLiteral(st.moduleSpecifier) &&
                            st.moduleSpecifier.text.includes('module')
                    )
                    .map(st => {
                        const txt = ((st as ts.ImportDeclaration).moduleSpecifier as ts.StringLiteral).text;
                        return txt.substring(txt.lastIndexOf('/') + 1);
                    });

                // Try to find the referenced module within the possible modules found in the step above
                referencedModule = moduleRoutesWithLoadChildren.find(moduleRoute =>
                    possibleModules.find(fileName => moduleRoute.module.includes(fileName))
                );
            }
        }

        if (!referencedModule) {
            throw new Error(`Reference module for '${loadChildrenModule}' not found`);
        }
        if (!routesByModule.has(referencedModule.module)) {
            throw new Error(`No data for the referenced module '${referencedModule}' found`);
        }
        return referencedModule.module;
    }
}
