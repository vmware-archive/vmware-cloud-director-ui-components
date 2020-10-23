/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { IdGenerator } from '../../id-generator/id-generator';
import { FindableWidget, FindParams, isFindParamsObject } from '../widget-object';
import { BaseWidgetLocator, CorrectReturnTypes, FindableLocator, LocatorDriver } from './widget-locator';

type Chainable = Cypress.Chainable<JQuery<HTMLElement>>;

// TODO: use alias to find widgets within other widgets
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
    findWidget<W extends FindableLocator<BaseWidgetLocator<Chainable>>>(
        widget: W
    ): CorrectReturnTypes<InstanceType<W>, Chainable> {
        return new CypressLocatorFinder().find(widget, '@' + this.alias);
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

/**
 * Knows how to find Cypress locator finders within the DOM.
 */
export class CypressLocatorFinder {
    private idGenerator = new IdGenerator('cy-id');
    /**
     * Finds a single widget object
     * @throws An error if the widget is not found or if there are multiple instances
     */
    public find<T extends FindableLocator<BaseWidgetLocator<Chainable>>>(
        locatorConstructor: T,
        ancestor?: string,
        className?: string
    ): CorrectReturnTypes<InstanceType<T>, Chainable> {
        let tagName = locatorConstructor.tagName;
        if (className) {
            tagName += `.${className}`;
        }
        const id = this.idGenerator.generate();
        const search = ancestor ? cy.get(ancestor).find(tagName) : cy.get(tagName);
        const promise = search.as(id);
        const widget = new locatorConstructor(new CypressLocatorDriver(promise, true, id));
        return (widget as any) as CorrectReturnTypes<InstanceType<T>, Chainable>;
    }
}
