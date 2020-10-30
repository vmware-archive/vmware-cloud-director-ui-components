/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { IdGenerator } from '../../id-generator/id-generator';
import { Chainable, CypressLocatorDriver } from './cypress-widget-object';
import { BaseWidgetObject, CorrectReturnTypes, FindableWidget } from './widget-object';

const idGenerator = new IdGenerator('cy-id');

/**
 * Knows how to find Cypress widget objects within the DOM.
 */
export class CypressWidgetObjectFinder {
    /**
     * Finds a single widget object
     *
     * @param widgetConstructor - The constructor of the widget to use
     * @param ancestor - The CSS query or alias of the parent to begin the search from.
     *                 this will be passed to `cy.get` and is a global search.
     * @param cssSelector - The cssSelector to post-pend to the tagName for the search
     *
     */
    public find<W extends BaseWidgetObject<Chainable>, C extends FindableWidget<Chainable, W>>(
        widgetConstructor: C,
        ancestor?: string,
        cssSelector?: string
    ): CorrectReturnTypes<InstanceType<C>, Chainable> {
        let tagName = widgetConstructor.tagName;
        if (cssSelector) {
            tagName += `${cssSelector}`;
        }
        const id = idGenerator.generate();
        const search = ancestor ? cy.get(ancestor).find(tagName) : cy.get(tagName);
        const root = search.as(id);
        const widget = new widgetConstructor(new CypressLocatorDriver(root, true, id));
        return (widget as any) as CorrectReturnTypes<InstanceType<C>, Chainable>;
    }
}
