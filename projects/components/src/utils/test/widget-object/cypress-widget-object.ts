/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CypressWidgetObjectFinder } from './cypress-widget-finder';
import { BaseWidgetObject, CorrectReturnTypes, FindableWidget, LocatorDriver } from './widget-object';

declare const cy;

/**
 * Knows how to find Cypress chainables in the DOM.
 */
export class CypressLocatorDriver<T> implements LocatorDriver<T> {
    constructor(private chainable: T, private isRoot: boolean, private alias: string) {}

    /**
     * @inheritdoc
     */
    get(cssSelector: string, options?: unknown): CypressLocatorDriver<T> {
        const root = this.getBase();
        return new CypressLocatorDriver(root.find(cssSelector, options), false, this.alias);
    }

    /**
     * @inheritdoc
     */
    getByText(cssSelector: string, value: string, options?: unknown): CypressLocatorDriver<T> {
        const root = this.getBase();
        const queryOptions = { matchCase: false, ...(options ? (options as object) : {}) };
        return new CypressLocatorDriver(root.contains(cssSelector, value, queryOptions), false, this.alias);
    }

    /**
     * @inheritdoc
     */
    parents(cssSelector: string, options?: unknown): CypressLocatorDriver<T> {
        const root = this.getBase();
        return new CypressLocatorDriver(root.parent(cssSelector, options), false, this.alias);
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
    findWidget<W extends BaseWidgetObject<T>, C extends FindableWidget<T, W>>(
        widget: C,
        cssSelector?: string
    ): CorrectReturnTypes<InstanceType<C>, T> {
        return new CypressWidgetObjectFinder<T>().find(widget, '@' + this.alias, cssSelector) as CorrectReturnTypes<
            InstanceType<C>,
            T
        >;
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
