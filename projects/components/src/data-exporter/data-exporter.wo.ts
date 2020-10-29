/*!
 * Copyright 2019-2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { BaseWidgetObject } from '../utils/test/widget-object/widget-object';

/**
 * Testing Object for {@link DataExporterComponent}
 */
export class DataExporterWidgetObject<T> extends BaseWidgetObject<T> {
    static tagName = 'vcd-data-exporter';

    /**
     * The strings for the available column bubbles.
     */
    getColumnBubbles = this.locatorForChild('.column-container .column-label');

    /**
     * The strings for the available column checkboxes.
     */
    getColumnCheckboxes = this.locatorForChild('li .column-checkbox');

    /**
     * Gets the cancel button.
     */
    getCancelButton = this.locatorForChild('.cancel');

    /**
     * Gets the export button.
     */
    getExportButton = this.locatorForText('button', 'export');

    /**
     * Gets the arrow to open/close the column dropdown.
     */
    getColumnDropdown = this.locatorForChild('.dropdown-button');

    /**
     * Gets the export all switch
     */
    getToggleSelectAll = this.locatorForChild('.export-all');

    /**
     * Gets the sanitization switch
     */
    getToggleSanitize = this.locatorForChild('.sanitize-cells');

    /**
     * Gets the friendly field names switch
     */
    getToggleFriendlyNames = this.locatorForChild('.friendly-names');

    /**
     * Gets the progress bar.
     */
    getProgress = this.locatorForChild('progress');

    /**
     * Gets the checkbox next to a given column
     * @param index Index of column, 0 based
     */
    getColumnCheckbox(index: number): T {
        return this.locatorDriver.get(`.dropdown-item:nth-of-type(${index + 1})  .column-checkbox input`).unwrap();
    }
}
