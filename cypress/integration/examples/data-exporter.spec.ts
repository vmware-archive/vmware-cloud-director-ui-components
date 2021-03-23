/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { findDataExporter } from '../find-cypress-widget';

context('Window', () => {
    beforeEach(() => {
        cy.exec('rm cypress/downloads/*', { log: true, failOnNonZeroExit: false });
        cy.visit('/dataExporter/example');
        cy.get('vcd-data-exporter-example button').click();
    });

    it('exports data with default options but removing a column', async () => {
        const widget = findDataExporter();
        widget.exportData(['Name']);
        widget.getExportButton().should('be.disabled');
        // Wait up to ten seconds for the data exported to disappear
        findDataExporter({ options: { timeout: 10000 } })
            .self()
            .should('not.exist');

        // Exported data should:
        //  * Not have Name column
        //  * Have friendly field names
        //  * Have tabs in the cells starting with control characters
        //  * Have a BOM as its first character
        const exported = `\ufeffDescription,Injection
Tis what tis,\t=1+1
Still tis what tis,\t+1+1`;
        cy.task('fileIsDownloaded', 'data-export.csv', { timeout: 30000 }).should('equal', exported);
    });
});
