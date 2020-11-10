/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import {
    BaseWidgetObject,
    CorrectReturnTypes,
    CypressWidgetObjectFinder,
    DataExporterWidgetObject,
    FindableWidget,
} from '@vcd/ui-components';

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
export function findCypressWidget<
    W extends BaseWidgetObject<Cypress.Chainable>,
    C extends FindableWidget<Cypress.Chainable, W>
>(
    widgetConstructor: C,
    ancestor?: string,
    cssSelector?: string
): CorrectReturnTypes<InstanceType<C>, Cypress.Chainable> {
    return new CypressWidgetObjectFinder<Cypress.Chainable>().find(widgetConstructor, ancestor, cssSelector);
}

context('Window', () => {
    beforeEach(() => {
        cy.visit('/dataExporter/example');
        cy.get('vcd-data-exporter-example button').click();
    });

    it('lets you select many column', async () => {
        // https://on.cypress.io/window
        const widget = findCypressWidget(DataExporterWidgetObject);
        widget.getToggleSelectAll().click({
            force: true,
        });
        widget.getColumnCheckboxes().should((checkboxes) => {
            expect(checkboxes.get(0)).to.contain('Name');
            expect(checkboxes.get(1)).to.contain('Description');
            expect(checkboxes.get(2)).to.contain('Injection');
        });
        widget.getColumnCheckbox(0).click({
            force: true,
        });
        widget.getColumnDropdown().click();
        widget.getColumnBubbles().should((checkboxes) => {
            expect(checkboxes.get(0)).to.contain('Description');
            expect(checkboxes.get(1)).to.contain('Injection');
        });
        widget.getExportButton().should('be.enabled').click().should('be.disabled');
    });
});
