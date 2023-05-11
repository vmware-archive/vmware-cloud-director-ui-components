/*!
 * Copyright 2019-2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
import { BaseWidgetObject } from '@vcd/widget-object';
import { DataUi } from './data-exporter.component';

/**
 * Testing Object for {@link DataExporterComponent}
 */
export class DataExporterWidgetObject<T> extends BaseWidgetObject<T> {
    static tagName = 'vcd-data-exporter';

    /**
     * The available column bubbles that display the selected columns when the dropdown
     * is closed, if check all is not selected.
     */
    getColumnBubbles = this.factory.dataUi(DataUi.columnSelectionBubbles);

    /** Gets the cancel button. */
    getCancelButton = this.factory.dataUi(DataUi.cancelButton);

    /** The button that initiates the export process */
    getExportButton = this.factory.dataUi(DataUi.exportButton);

    /** Gets the export all switch */
    getToggleSelectAll = this.factory.dataUi(DataUi.selectAllToggleLabel);

    /** Gets the friendly field names switch  */
    getToggleFriendlyNames = this.factory.dataUi(DataUi.friendlyNamesToggleLabel);

    /** Gets the progress bar. */
    getProgress = this.factory.dataUi(DataUi.progressInput);

    /** The list of labels for the checkboxes with the configured columns */
    getColumnCheckboxes = this.factory.dataUi(DataUi.columnSelectionMenuOptions);

    getColumnCheckboxByLabel = this.factory.dataUi(DataUi.columnSelectionMenuOptions);

    getColumnCheckboxArrow = this.factory.dataUi(DataUi.columnCheckboxArrow);

    getColumnBubblesX = this.factory.dataUi(DataUi.columnBubblesX);

    /**
     * Exports data with the option to specify columns to be deselected
     * @param columnsToUncheck  - Columns to be unchecked before exporting
     */
    exportData(columnsToUncheck?: string[]): void {
        if (columnsToUncheck) {
            this.getToggleSelectAll().click();
            for (const column of columnsToUncheck) {
                this.getColumnCheckboxByLabel({ text: column }).click();
            }
        }
        this.getExportButton().click();
    }
}
