/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Type } from '@angular/core';
import { CypressWidgetObjectFinder } from './cypress-widget-finder';
import { BaseWidgetObject, CorrectReturnTypes, LocatorDriver, TaggedClass } from './widget-object';

export type Chainable = Cypress.Chainable<JQuery<HTMLElement>>;

/**
 * Knows how to find Cypress chainables in the DOM.
 */
export class CypressLocatorDriver implements LocatorDriver<Chainable> {
    constructor(private chainable: Chainable, private isRoot: boolean, private alias: string) {}

    /**
     * @inheritdoc
     */
    get(cssSelector: string): CypressLocatorDriver {
        const root = this.getBase();
        return new CypressLocatorDriver(root.find(cssSelector), false, this.alias);
    }

    /**
     * @inheritdoc
     */
    getByText(cssSelector: string, value: string): CypressLocatorDriver {
        const root = this.getBase();
        return new CypressLocatorDriver(root.contains(cssSelector, value, { matchCase: false }), false, this.alias);
    }

    /**
     * @inheritdoc
     */
    parents(cssSelector: string): CypressLocatorDriver {
        const root = this.getBase();
        return new CypressLocatorDriver(root.parent(cssSelector), false, this.alias);
    }

    /**
     * @inheritdoc
     */
    unwrap(): Chainable {
        return this.chainable;
    }

    /**
     * @inheritdoc
     */
    findWidget<W extends TaggedClass & Type<BaseWidgetObject<Chainable>>>(
        widget: W,
        cssSelector?: string
    ): CorrectReturnTypes<InstanceType<W>, Chainable> {
        return new CypressWidgetObjectFinder().find(widget, '@' + this.alias, cssSelector);
    }

    /**
     * Gives the correct base for this current query.
     * This is to override the behavior where calls to .find will permanently change the scope of the query.
     */
    private getBase(): Chainable {
        if (this.isRoot) {
            return cy.get('@' + this.alias);
        } else {
            return this.chainable;
        }
    }
}
