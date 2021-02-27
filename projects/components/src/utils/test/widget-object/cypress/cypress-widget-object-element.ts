/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { BaseWidgetObject, ElementActions, FindableWidget, WidgetObjectElement } from '../widget-object';
import { CypressWidgetObjectFinder, FindCypressWidgetOptions } from './cypress-widget-finder';

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
export class CypressWidgetObjectElement<T extends ElementActions> implements WidgetObjectElement<T> {
    constructor(private chainable: T, private isRoot: boolean, private alias: string) {}

    /**
     * @inheritdoc
     */
    get(cssSelector: string, options?: unknown): CypressWidgetObjectElement<T> {
        const root = this.getBase();
        return new CypressWidgetObjectElement(root.find(cssSelector, options), false, this.alias);
    }

    /**
     * @inheritdoc
     */
    getByText(cssSelector: string, value: string, options?: unknown): CypressWidgetObjectElement<T> {
        const root = this.getBase();
        const queryOptions = { matchCase: false, ...(options ? (options as object) : {}) };
        return new CypressWidgetObjectElement(root.contains(cssSelector, value, queryOptions), false, this.alias);
    }

    /**
     * @inheritdoc
     */
    parents(cssSelector: string, options?: unknown): CypressWidgetObjectElement<T> {
        const root = this.getBase();
        return new CypressWidgetObjectElement(root.parents(cssSelector, options), false, this.alias);
    }

    /**
     * @inheritdoc
     */
    unwrap(): T {
        return this.chainable;
    }

    click(options?: unknown): void {
        this.chainable.click(options);
    }

    type(value: string, options: unknown): void {
        this.chainable.type(value, options);
    }

    select(text: string, options: unknown): void {
        this.chainable.select(text, options);
    }

    check(options?: unknown): void {
        this.chainable.check(options);
    }

    uncheck(options?: unknown): void {
        this.chainable.uncheck();
    }

    /**
     * @inheritdoc
     */
    findWidget<W extends BaseWidgetObject<T>>(widget: FindableWidget<T, W>, findOptions: FindCypressWidgetOptions): W {
        return new CypressWidgetObjectFinder<T>().find(widget, { ancestor: '@' + this.alias, ...findOptions });
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
