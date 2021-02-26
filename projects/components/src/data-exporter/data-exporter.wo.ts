/*!
 * Copyright 2019-2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { BaseWidgetObject, LocatorDriver } from '../utils/test/widget-object/widget-object';

/**
 * Testing Object for {@link DataExporterComponent}
 */
export class DataExporterWidgetObject<T> extends BaseWidgetObject<T> {
    static tagName = 'vcd-data-exporter';

    /**
     * The strings for the available column bubbles.
     */
    getColumnBubbles = this.locatorForCssSelectors('.column-container .column-label');

    /**
     * The strings for the available column checkboxes.
     */
    getColumnCheckboxes = this.locatorForCssSelectors('li .column-checkbox');

    /**
     * Gets the cancel button.
     */
    getCancelButton = this.locatorForCssSelectors('.cancel');

    /**
     * Gets the arrow to open/close the column dropdown.
     */
    getColumnDropdown = this.locatorForCssSelectors('.dropdown-button');

    /**
     * Gets the export all switch
     */
    getToggleSelectAll = this.locatorForCssSelectors('label.export-all');

    /**
     * Gets the sanitization switch
     */
    getToggleSanitize = this.locatorForCssSelectors('.sanitize-cells');

    /**
     * Gets the friendly field names switch
     */
    getToggleFriendlyNames = this.locatorForCssSelectors('.friendly-names');

    /**
     * Gets the progress bar.
     */
    getProgress = this.locatorForCssSelectors('progress');

    /**
     * Gets the checkbox next to a given column
     * @param index Index of column, 0 based
     */
    getColumnCheckbox(indexOrLabel: number | string): T {
        return this._getColumnCheckbox(indexOrLabel).unwrap();
    }

    private _getColumnCheckbox(indexOrLabel: number | string): LocatorDriver<T> {
        if (typeof indexOrLabel === 'number') {
            return this.locatorDriver.get(`.dropdown-item:nth-of-type(${indexOrLabel + 1})  .column-checkbox label`);
        }
        return this.locatorDriver.getByText(`.dropdown-item .column-checkbox label`, indexOrLabel);
    }

    /**
     * Gets the export button.
     */
    getExportButton(): T {
        return this._getExportButton().unwrap();
    }

    private _getExportButton(): LocatorDriver<T> {
        return this.locatorDriver.get('button.export');
    }

    /**
     *
     * @param columnsToUncheck[] Assumes the columns were checked
     */
    exportData(columnsToUncheck?: string[]): void {
        if (columnsToUncheck) {
            this.locatorDriver.get('label[data-ui=export-all]').click();
            for (const column of columnsToUncheck) {
                this._getColumnCheckbox(column).click();
            }
        }
        this._getExportButton().click();
    }
}
