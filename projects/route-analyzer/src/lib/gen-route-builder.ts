/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
import { normalize, join, strings, Path } from '@angular-devkit/core';
import { AppRoute } from './app-route';

export function generateRouteBuilder(routes: AppRoute[], baseFilename: string = 'RouteBuilder'): string {
    const out: string[] = [];

    // Map to avoid duplicate property names for similar paths
    const normalizedPaths: { [path: string]: true } = {};

    function traverse(
        children: AppRoute[],
        cb: (route: AppRoute, parentPath: Path) => void,
        parentPath = normalize('/')
    ) {
        for (const child of children) {
            cb(child, parentPath);
            if (child.children) {
                traverse(child.children, cb, join(parentPath, child.path));
            }
        }
    }

    traverse(routes, (route, parentPath) => {
        if (!route.path || route.path === '**') {
            return;
        }
        const fullPath = join(parentPath, route.path);
        const pathPropName = strings
            .camelize(fullPath)
            .replace(/\//g, '_')
            .replace(/:/g, '')
            .replace(/^_/, '')
            .replace(/_$/, '');
        if (normalizedPaths[pathPropName]) {
            return;
        }
        normalizedPaths[pathPropName] = true;
        if (!fullPath) {
            return;
        }

        const replacementSegmentRegex = /:([^/]+)/g;
        const argNames = Array.from(fullPath.matchAll(replacementSegmentRegex), (matches) => matches[1]);
        const argNamesCamelized = argNames.map(strings.camelize);
        const argsList = argNamesCamelized.map((_) => `${_}: string`).join(', ');

        out.push(`export const ${pathPropName} =  {
    route(${argsList}) {
        return \`${fullPath.replace(replacementSegmentRegex, (_, p: string) => `$\{${strings.camelize(p)}}`)}\`;
    },${
        route.component?.tagName
            ? `
    tagName: ${JSON.stringify(route.component.tagName)},`
            : ''
    }
}`);
    });

    return out.join('\n') + '\n';
}
