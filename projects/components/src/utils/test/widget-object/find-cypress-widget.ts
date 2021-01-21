/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { BaseWidgetObject, CypressWidgetObjectFinder, FindableWidget } from '@vcd/ui-components';
// import Cypress from 'cypress';

/**
 * Finds a single widget object. This is a convenience wrapper around the `CypressWidgetFinder`
 * that should be copied into any application E2E tests that want to use this Widget Finder system.
 *
 * @param widgetConstructor - The constructor of the widget to use
 * @param ancestor - The CSS query or alias of the parent to begin the search from.
 *                 this will be passed to `cy.get` and is a global search.
 * @param cssSelector - The cssSelector to append to the tagName for the search
 *
 */
export function findCypressWidget<W extends BaseWidgetObject<Cypress.Chainable>>(
    widgetConstructor: FindableWidget<Cypress.Chainable, W>,
    ancestor?: string,
    cssSelector?: string
): W {
    return new CypressWidgetObjectFinder<Cypress.Chainable>().find(widgetConstructor, ancestor, cssSelector);
}
