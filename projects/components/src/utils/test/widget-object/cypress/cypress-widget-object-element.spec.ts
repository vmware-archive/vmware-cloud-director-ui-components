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

    get(selector: string, options: any) {
        return this;
    }

    find(selector: string, options: any) {
        return this;
    }

    contains(text: string, options: any) {
        return this;
    }

    click(options: any) {
        return this;
    }

    type(text: string, options: any) {
        return this;
    }

    select(text: string, options: any) {
        return this;
    }

    check(options: any) {
        return this;
    }

    uncheck(options: any) {
        return this;
    }

    parents(selector: string) {
        return this;
    }

    eq() {
        return this;
    }

    clear(options: any) {
        return this;
    }
}

// eslint-disable-next-line no-var
var cy = new MockCy();

// Define a global constant in NodeJS
Object.defineProperty(global, 'cy', {
    value: cy,
});

class FakeWidget<T> extends BaseWidgetObject<T> {
    static tagName = 'hello';
}

describe('CypressWidgetObjectFinder', () => {
    describe('find', () => {
        it('finds a widget using text', () => {
            const getSpy = spyOn(cy, 'get').and.callThrough();
            const containsSpy = spyOn(cy, 'contains').and.callThrough();
            new CypressWidgetObjectFinder().find(FakeWidget, { text: 'text' });
            expect(getSpy).toHaveBeenCalledWith('body');
            expect(containsSpy).toHaveBeenCalledWith(FakeWidget.tagName, 'text', { matchCase: false });
        });

        it('finds a widget using index', () => {
            const getSpy = spyOn(cy, 'get').and.callThrough();
            const findSpy = spyOn(cy, 'find').and.callThrough();
            const eqSpy = spyOn(cy, 'eq').and.callThrough();
            new CypressWidgetObjectFinder().find(FakeWidget, { index: 1 });
            expect(getSpy).toHaveBeenCalledWith('body');
            expect(findSpy).toHaveBeenCalledWith(FakeWidget.tagName, undefined);
            expect(eqSpy).toHaveBeenCalledWith(1);
        });
    });
});

describe('CypressWidgetObjectElement', () => {
    describe('findWidget', () => {
        it('gets a sub-widget', () => {
            const getSpy = spyOn(cy, 'get').and.callThrough();
            const findSpy = spyOn(cy, 'find').and.callThrough();
            const widget = new CypressWidgetObjectElement(cy, true, '1');
            widget.findWidget(FakeWidget, {});
            expect(getSpy).toHaveBeenCalledWith('@1');
            expect(findSpy).toHaveBeenCalledWith(FakeWidget.tagName, undefined);
        });
    });

    describe('parents', () => {
        it('finds a parent element', () => {
            const getSpy = spyOn(cy, 'get').and.callThrough();
            const parentSpy = spyOn(cy, 'parents').and.callThrough();
            const widget = new CypressWidgetObjectElement(cy, true, '1');
            const parent: any = widget.parents('some_parent');
            expect(getSpy).toHaveBeenCalledWith('@1');
            expect(parentSpy).toHaveBeenCalledWith('some_parent');
            expect(parent.isRoot).toBeFalsy();
        });
    });

    describe('clear', () => {
        it('clears the given input', () => {
            const clearSpy = spyOn(cy, 'clear').and.callThrough();
            const widget = new CypressWidgetObjectElement(cy, true, '1');
            widget.clear({ a: 'test' });
            expect(clearSpy).toHaveBeenCalledWith({ a: 'test' });
        });
    });
});
