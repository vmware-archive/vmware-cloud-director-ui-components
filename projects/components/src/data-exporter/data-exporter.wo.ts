/*!
 * Copyright 2019-2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
import { BaseWidgetObject, WidgetObjectElement } from '../utils/test/widget-object/widget-object';

/**
 * Testing Object for {@link DataExporterComponent}
 */
export class DataExporterWidgetObject<T> extends BaseWidgetObject<T> {
    static tagName = 'vcd-data-exporter';

    /**
     * The strings for the available column bubbles.
     */
    getColumnBubbles = this.factory.css(`.column-container .column-checkbox`);

    /**
     * The strings for the available column checkboxes.
     */
    getColumnCheckboxes = this.factory.css('li .column-checkbox');

    /**
     * Gets the cancel button.
     */
    getCancelButton = this.factory.css('.cancel');

    /**
     * Gets the arrow to open/close the column dropdown.
     */
    getColumnDropdown = this.factory.css('.dropdown-button');

    /**
     * Gets the export all switch
     */
    getToggleSelectAll = this.factory.css('label.export-all');

    /**
     * Gets the sanitization switch
     */
    getToggleSanitize = this.factory.css('.sanitize-cells');

    /**
     * Gets the friendly field names switch
     */
    getToggleFriendlyNames = this.factory.css('.friendly-names');

    /**
     * Gets the progress bar.
     */
    getProgress = this.factory.css('progress');

    private _getExportButton = this.factory._css('button.export');

    /**
     * Gets the export button.
     */
    getExportButton = this.factory.unwrap(this._getExportButton);

    private _getExportAllCheckboxLabel = this.factory._dataUi('export-all');

    /**
     * Gets the checkbox next to a given column
     * @param index Index of column, 0 based
     */
    getColumnCheckbox(indexOrLabel: number | string): T {
        return this._getColumnCheckbox(indexOrLabel).unwrap();
    }

    private _getColumnCheckbox(indexOrLabel: number | string): WidgetObjectElement<T> {
        if (typeof indexOrLabel === 'number') {
            return this.el.get(`.dropdown-item:nth-of-type(${indexOrLabel + 1})  .column-checkbox label`);
        }
        return this.el.getByText(`.dropdown-item .column-checkbox label`, indexOrLabel);
    }

    /**
     * Exports data with the option to specify columns to be deselected
     * @param columnsToUncheck  - Columns to be unchecked before exporting
     */
    exportData(columnsToUncheck?: string[]): void {
        if (columnsToUncheck) {
            this._getExportAllCheckboxLabel().click();
            for (const column of columnsToUncheck) {
                this._getColumnCheckbox(column).click();
            }
        }
        this._getExportButton().click();
    }
}
