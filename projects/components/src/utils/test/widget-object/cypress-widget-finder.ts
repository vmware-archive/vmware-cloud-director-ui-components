/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Type } from '@angular/core';
import { IdGenerator } from '../../id-generator/id-generator';
import { Chainable, CypressLocatorDriver } from './cypress-widget-object';
import { BaseWidgetObject, CorrectReturnTypes, TaggedClass } from './widget-object';

const idGenerator = new IdGenerator('cy-id');

/**
 * Knows how to find Cypress widget objects within the DOM.
 */
export class CypressWidgetObjectFinder {
    /**
     * Finds a single widget object
     *
     * @param widgetConstructor the constructor of the widget to use
     * @param ancestor the parent to begin the search from
     * @param cssSelector the cssSelector to post-pend to the tagName for the search
     *
     */
    public find<T extends TaggedClass & Type<BaseWidgetObject<Chainable>>>(
        widgetConstructor: T,
        ancestor?: string,
        cssSelector?: string
    ): CorrectReturnTypes<InstanceType<T>, Chainable> {
        let tagName = widgetConstructor.tagName;
        if (cssSelector) {
            tagName += `${cssSelector}`;
        }
        const id = idGenerator.generate();
        const search = ancestor ? cy.get(ancestor).find(tagName) : cy.get(tagName);
        const promise = search.as(id);
        const widget = new widgetConstructor(new CypressLocatorDriver(promise, true, id));
        return (widget as any) as CorrectReturnTypes<InstanceType<T>, Chainable>;
    }
}
