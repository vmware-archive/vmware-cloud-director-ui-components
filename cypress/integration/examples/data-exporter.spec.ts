/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { DataExporterWidgetObject, findCypressWidget } from '@vcd/ui-components';

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
