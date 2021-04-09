/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import {
    BaseWidgetObject,
    CypressWidgetObjectFinder,
    DataExporterWidgetObject,
    FindableWidget,
} from '@vcd/ui-components';
import { FindElementOptions } from '@vcd/ui-components';
import Cypress from 'cypress';

type Chainable = Cypress.Chainable;

/**
 * Finds a single widget object. This is a convenience wrapper around the `CypressWidgetFinder`
 * that should be copied into any application E2E tests that want to use this Widget Finder system.
 *
 * @param widgetConstructor - The constructor of the widget to use
 * @param ancestor - The CSS query or alias of the parent to begin the search from.
 *                 this will be passed to `cy.get` and is a global search.
 * @param cssSelector - The cssSelector to append to the tagName for the search
 * @param dataUiSelector - The dataUiSelector to append to the tagName for the search
 *
 */
export function findCypressWidget<W extends BaseWidgetObject<Chainable>>(
    widgetConstructor: FindableWidget<Chainable, W>,
    findOptions?: FindElementOptions<Chainable>
): W {
    return new CypressWidgetObjectFinder<Chainable>().find(widgetConstructor, findOptions) as W;
}

export function findDataExporter(options?: FindElementOptions<Chainable>): DataExporterWidgetObject<Chainable> {
    return findCypressWidget<DataExporterWidgetObject<Chainable>>(DataExporterWidgetObject, options);
}
