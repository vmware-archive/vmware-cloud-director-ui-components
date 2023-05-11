/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
import { BaseWidgetObject } from '../widget-object';
import { CypressWidgetObjectFinder } from './cypress-widget-finder';
import { CypressWidgetObjectElement } from './cypress-widget-object-element';

class MockCy {
    as(id: string) {
        return this;
    }

    get(selector: string, options?: unknown) {
        return this;
    }

    find(selector: string, options?: unknown) {
        return this;
    }

    contains(tagName: string, text: string | RegExp, options?: unknown) {
        return this;
    }

    click(options?: unknown) {
        return this;
    }

    type(text: string, options?: unknown) {
        return this;
    }

    select(text: string, options?: unknown) {
        return this;
    }

    check(options?: unknown) {
        return this;
    }

    uncheck(options?: unknown) {
        return this;
    }

    parents(selector: string) {
        return this;
    }

    eq(index: number) {
        return this;
    }

    clear(options?: unknown) {
        return this;
    }
}

const cy = new MockCy();

const win = window as unknown as { cy?: MockCy };

class FakeWidget<T> extends BaseWidgetObject<T> {
    static tagName = 'hello';
}

describe('CypressWidgetObjectFinder', () => {
    beforeEach(() => {
        win.cy = cy;
    });

    afterEach(() => {
        delete win.cy;
    });

    describe('find', () => {
        it('finds a widget using text', () => {
            const getSpy = jest.spyOn(cy, 'get');
            const containsSpy = jest.spyOn(cy, 'contains');
            new CypressWidgetObjectFinder().find(FakeWidget, { text: 'text' });
            expect(getSpy).toHaveBeenCalledWith('body', { timeout: undefined });
            expect(containsSpy).toHaveBeenCalledWith(FakeWidget.tagName, 'text', { matchCase: false });
        });

        it('finds a widget using exactText', () => {
            const getSpy = jest.spyOn(cy, 'get');
            const containsSpy = jest.spyOn(cy, 'contains');
            new CypressWidgetObjectFinder().find(FakeWidget, { exactText: 'exactText[]{}' });
            expect(getSpy).toHaveBeenCalledWith('body', { timeout: undefined });
            // contains should be called with a regular expression that has RegEx characters escaped
            expect(containsSpy).toHaveBeenCalledWith(FakeWidget.tagName, /^\s*exactText\[\]\{\}\s*$/g, {
                matchCase: false,
            });
        });

        it('finds a widget using index', () => {
            const index = 0;
            const getSpy = jest.spyOn(cy, 'get');
            const findSpy = jest.spyOn(cy, 'find');
            const eqSpy = jest.spyOn(cy, 'eq');
            new CypressWidgetObjectFinder().find(FakeWidget, { index });
            expect(getSpy).toHaveBeenCalledWith('body', { timeout: undefined });
            expect(findSpy).toHaveBeenCalledWith(FakeWidget.tagName, undefined);
            expect(eqSpy).toHaveBeenCalledWith(index);
        });
    });
});

describe('CypressWidgetObjectElement', () => {
    beforeEach(() => {
        win.cy = cy;
    });

    afterEach(() => {
        delete win.cy;
    });

    describe('findWidget', () => {
        it('gets a sub-widget', () => {
            const getSpy = jest.spyOn(cy, 'get');
            const findSpy = jest.spyOn(cy, 'find');
            const widget = new CypressWidgetObjectElement(cy, true, '1');
            widget.findWidget(FakeWidget, {});
            expect(getSpy).toHaveBeenCalledWith('@1');
            expect(findSpy).toHaveBeenCalledWith(FakeWidget.tagName, undefined);
        });

        it('uses the current element to find the widget', () => {
            jest.spyOn(cy, 'get').mockImplementation(() => new MockCy());
            const findSpy = jest.spyOn(cy, 'find').mockImplementation(() => new MockCy());
            const widget = new CypressWidgetObjectElement(cy, true, '1');
            const find2 = widget.get('a').parents('a');
            const findSpy2 = jest.spyOn(find2.unwrap(), 'find').mockReturnValue(new MockCy());
            find2.findWidget(FakeWidget, {});
            expect(findSpy).toHaveBeenCalledTimes(0);
            expect(findSpy2).toHaveBeenCalledWith(FakeWidget.tagName, undefined);
        });
    });

    describe('parents', () => {
        it('finds a parent element', () => {
            const getSpy = jest.spyOn(cy, 'get');
            const parentSpy = jest.spyOn(cy, 'parents');
            const widget = new CypressWidgetObjectElement(cy, true, '1');
            const parent: any = widget.parents('some_parent');
            expect(getSpy).toHaveBeenCalledWith('@1');
            expect(parentSpy).toHaveBeenCalledWith('some_parent');
            expect(parent.isRoot).toBeFalsy();
        });
    });

    describe('clear', () => {
        it('clears the given input', () => {
            const clearSpy = jest.spyOn(cy, 'clear');
            const widget = new CypressWidgetObjectElement(cy, true, '1');
            widget.clear({ a: 'test' });
            expect(clearSpy).toHaveBeenCalledWith({ a: 'test' });
        });
    });
});
