/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
import { SelectorUtil } from '../selector-util';
import {
    BaseWidgetObject,
    CypressWidgetActionOptions,
    ElementActions,
    FindableWidget,
    FindElementOptions,
    WidgetActionOptions,
    WidgetObjectElement,
} from '../widget-object';
import { CypressWidgetObjectFinder } from './cypress-widget-finder';

declare const cy;

/**
 * Implementation of WidgetObjectElement for Cypress chainables
 *
 * T is the type of data that this will output when you call `unwrap`.
 * In almost all cases, this should be a `Cypress.Chainable`.
 *
 * We chose to provide this as a generic because for reasons seen in
 * [this PR](https://github.com/vmware/vmware-cloud-director-ui-components/pull/248)
 * we could not load the Cypress types in our library.
 */
export class CypressWidgetObjectElement<T extends ElementActions<T>> implements WidgetObjectElement<T> {
    constructor(private chainable: T, private isRoot: boolean, private alias: string) {}

    /**
     * @inheritdoc
     */
    get(selector: string | FindElementOptions<T>): CypressWidgetObjectElement<T> {
        const root = this.getBase();
        const cssSelector = SelectorUtil.extractSelector<T>(selector);
        let chainable: any;
        if (typeof selector === 'string') {
            chainable = root.find(selector);
        } else if (selector.index) {
            chainable = root.find(cssSelector, selector.options).eq(selector.index);
        } else if (selector.text) {
            const queryOptions = { matchCase: false, ...(selector.options || {}) };
            chainable = root.contains(cssSelector, selector.text, queryOptions);
        } else {
            chainable = root.find(cssSelector, selector.options);
        }
        return new CypressWidgetObjectElement(chainable, false, this.alias);
    }

    /**
     * @inheritdoc
     */
    parents(selector: string | FindElementOptions<T>): CypressWidgetObjectElement<T> {
        const root = this.getBase();
        if (typeof selector === 'string') {
            return new CypressWidgetObjectElement(root.parents(selector), false, this.alias);
        }
        return new CypressWidgetObjectElement(
            root.parents(SelectorUtil.extractSelector<T>(selector), selector.options),
            false,
            this.alias
        );
    }

    /**
     * @inheritdoc
     */
    unwrap(): T {
        return this.chainable;
    }

    /**
     * @inheritdoc
     */
    click(options?: WidgetActionOptions<T>): void {
        this.chainable.click(options);
    }

    /**
     * @inheritdoc
     */
    type(value: string, options: WidgetActionOptions<T>): void {
        this.chainable.type(value, options);
    }

    /**
     * @inheritdoc
     */
    select(text: string, options: WidgetActionOptions<T>): void {
        this.chainable.select(text, options);
    }

    /**
     * @inheritdoc
     */
    check(options?: WidgetActionOptions<T>): void {
        this.chainable.check(options);
    }

    /**
     * @inheritdoc
     */
    uncheck(options?: WidgetActionOptions<T>): void {
        this.chainable.uncheck(options);
    }

    /**
     * @inheritdoc
     */
    clear(options?: WidgetActionOptions<T>): void {
        this.chainable.clear(options);
    }

    /**
     * @inheritdoc
     */
    findWidget<W extends BaseWidgetObject<T>>(widget: FindableWidget<T, W>, findOptions: FindElementOptions<T>): W {
        return new CypressWidgetObjectFinder<T>().find(widget, {
            ancestor: '@' + this.alias,
            ...findOptions,
        } as FindElementOptions<T>);
    }

    /**
     * Gives the correct base for this current query.
     * This is to override the behavior where calls to .find will permanently change the scope of the query.
     */
    private getBase(): any {
        if (this.isRoot) {
            return cy.get('@' + this.alias);
        } else {
            return this.chainable;
        }
    }
}
