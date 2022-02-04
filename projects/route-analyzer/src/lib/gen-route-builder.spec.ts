/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
import * as ts from 'typescript';
import { generateRouteBuilder } from './gen-route-builder';
import { AppRoute } from './app-route';

interface RouteHelper {
    route(...args: string[]): string;
    regex: RegExp;
    tagName?: string;
}

function tsCompile(source: string, options: ts.TranspileOptions = null): string {
    // Default options -- you could also perform a merge, or use the project tsconfig.json
    if (null === options) {
        options = { compilerOptions: { module: ts.ModuleKind.ES2020 } };
    }
    return ts.transpileModule(source, options).outputText;
}

function getRoutesObj(routes: AppRoute[]): { [name: string]: RouteHelper } {
    const tsSource = generateRouteBuilder(routes);
    // Compile to JS so we can run eval on it
    const jsSource = tsCompile(tsSource);
    const sourceFile = ts.createSourceFile('test.ts', jsSource, ts.ScriptTarget.ESNext);
    const out: { [name: string]: RouteHelper } = {};
    sourceFile.forEachChild((child) => {
        if (ts.isVariableStatement(child)) {
            const variableDeclaration = child.declarationList.declarations[0];
            const objectName = variableDeclaration.name.getText(sourceFile);
            const objValue = child.declarationList.declarations[0].initializer.getText(sourceFile);
            // eslint-disable-next-line no-eval
            out[objectName] = eval(`(${objValue})`);
        }
    });
    return out;
}

describe('generateRouteBuilder', () => {
    it('Adds a newline at the end', function () {
        expect(generateRouteBuilder([])).toMatch(/\n$/, 'Did not end with a new line');
    });

    it('ignores empty and wild card paths', function () {
        const routes = getRoutesObj([{ path: '' }, { path: '**' }]);
        expect(Object.keys(routes).length).toBe(0, 'No routes should have been created');
    });

    it(`creates functions that don't require params for URLs that don't require an ID`, function () {
        const { hi } = getRoutesObj([{ path: 'hi' }]);
        expect(hi.route()).toBe('/hi', 'Incorrect path');
    });

    it(`creates methods for URLs that do require an ID`, function () {
        const { groups_groupId } = getRoutesObj([{ path: 'groups/:groupId' }]);
        expect(groups_groupId.route('ggg')).toBe('/groups/ggg');
    });

    it('lets you determine if a route takes parameters by inspecting Function.length', function () {
        const { groups_groupId } = getRoutesObj([{ path: 'groups/:groupId' }]);
        expect(groups_groupId.route.length).toBe(
            1,
            'Invalid length property on generated function route_groups_groupId'
        );
    });

    it(`handles multiple replacements`, function () {
        const { groups_groupId_users_userId } = getRoutesObj([{ path: 'groups/:groupId/users/:userId' }]);
        expect(groups_groupId_users_userId.route('ggg', 'uuu')).toBe('/groups/ggg/users/uuu');
    });

    it(`handles replacements in snake-case`, function () {
        const { groups_groupId } = getRoutesObj([{ path: 'groups/:group-id' }]);
        expect(groups_groupId.route('ggg')).toBe('/groups/ggg');
    });

    it(`creates property names by replacing slashes with underscores, and camel casing segments`, function () {
        const { myGroups_groupId_users_userId } = getRoutesObj([{ path: 'my-groups/:group-id/users/:userId' }]);
        expect(myGroups_groupId_users_userId.route()).not.toBeUndefined();
    });

    it('traverses child routes', function () {
        const { groups_a, groups_b } = getRoutesObj([{ path: 'groups', children: [{ path: 'a' }, { path: 'b' }] }]);
        expect(groups_a.route()).toBe('/groups/a');
        expect(groups_b.route()).toBe('/groups/b');
    });

    describe('tagName', () => {
        // The tag name was actually added to the JSON, it's just passed through
        it('is not added to route objects that do not have a component declared for it', function () {
            const { hi } = getRoutesObj([{ path: 'hi' }]);
            expect(hi.tagName).toBeUndefined();
        });

        it('is not added to route objects that do have component declared for it', function () {
            const { hi } = getRoutesObj([{ path: 'hi', component: { name: 'TagComponent', tagName: 'my-tag' } }]);
            expect(hi.tagName).toBe('my-tag');
        });
    });

    describe('regex', () => {
        it('matches URLs without trailing slashes', function () {
            const { test_id } = getRoutesObj([{ path: 'test/:id' }]);
            expect(test_id.regex.test('/test/123')).toBe(true);
        });

        it('matches URLs with trailing slashes', function () {
            const { test_id } = getRoutesObj([{ path: 'test/:id' }]);
            expect(test_id.regex.test('/test/123/')).toBe(true);
        });

        it('does not match URLs not starting with slash', function () {
            const { test_id } = getRoutesObj([{ path: 'test/:id' }]);
            expect(test_id.regex.test('test/123')).toBe(false);
        });

        it('ignores content before the beginning of the route (to allow for full URLs)', function () {
            const { test_id } = getRoutesObj([{ path: 'test/:id' }]);
            expect(test_id.regex.test('https://google.com/test/123/')).toBe(true);
        });

        it('does not match route missing an id', () => {
            const { test_id } = getRoutesObj([{ path: 'test/:id' }]);
            expect(test_id.regex.test('/test/')).toBe(false);
            expect(test_id.regex.test('/test')).toBe(false);
        });

        it('matches routes with multiple replacements', () => {
            const { a_id_b_idd } = getRoutesObj([{ path: 'a/:id/b/:idd' }]);
            expect(a_id_b_idd.regex.test('/a/123/b/123')).toBe(true);
        });
    });
});
