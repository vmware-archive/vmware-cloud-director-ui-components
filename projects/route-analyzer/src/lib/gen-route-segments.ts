/*!
 * Copyright 2023 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
import { join, normalize, Path } from '@angular-devkit/core';
import { AppRoute } from './app-route';
import { split } from '@angular-devkit/core/src/virtual-fs/path';

export function generateRouteSegments(routes: AppRoute[]): string {
    const segments = new Set<string>();

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
        for (const segment of split(normalize(route.path))) {
            segments.add(segment);
        }
    });

    return Array.from(segments)
        .map((segment) => {
            const identifier = segment.replace(/-/g, '_');
            const stripColon = (val: string) => (segment[0] == ':' ? val.slice(1) : val);
            return `export const segment_${stripColon(identifier)} = ${JSON.stringify(stripColon(segment))};`;
        })
        .join('\n');
}
