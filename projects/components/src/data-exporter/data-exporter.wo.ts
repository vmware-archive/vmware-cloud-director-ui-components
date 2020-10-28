/*!
 * Copyright 2019-2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { BaseWidgetObject } from '../utils/test/locator/widget-locator';

/**
 * Testing Object for {@link DataExporterComponent}
 */
export class DataExporterWidgetObject<T> extends BaseWidgetObject<T> {
    static tagName = 'vcd-data-exporter';

    /**
     * The strings for the available column bubbles.
     */
    getColumnBubbles(): T {
        return this.locatorDriver.get('.column-container .column-label').unwrap();
    }

    /**
     * The strings for the available column checkboxes.
     */
    getColumnCheckboxes(): T {
        return this.locatorDriver.get('li .column-checkbox').unwrap();
    }

    /**
     * Gets the checkbox next to a given column
     * @param index Index of column, 0 based
     */
    getColumnCheckbox(index: number): T {
        return this.locatorDriver.get(`.dropdown-item:nth-of-type(${index + 1})  .column-checkbox input`).unwrap();
    }

    /**
     * Gets the cancel button.
     */
    getCancelButton(): T {
        return this.locatorDriver.get('.cancel').unwrap();
    }

    /**
     * Gets the export button.
     */
    getExportButton(): T {
        return this.locatorDriver.getByText('button', 'export').unwrap();
    }

    /**
     * Gets the arrow to open/close the column dropdown.
     */
    getColumnDropdown(): T {
        return this.locatorDriver.get('.dropdown-button').unwrap();
    }

    /**
     * Gets the export all switch
     */
    getToggleSelectAll(): T {
        return this.locatorDriver.get('.export-all').unwrap();
    }

    /**
     * Gets the sanitization switch
     */
    getToggleSanitize(): T {
        return this.locatorDriver.get('.sanitize-cells').unwrap();
    }

    /**
     * Gets the friendly field names switch
     */
    getToggleFriendlyNames(): T {
        return this.locatorDriver.get('.friendly-names').unwrap();
    }

    /**
     * Gets the progress bar.
     */
    getProgress(): T {
        // this.driver.getByText('colA', value).parent('clr-dg-row').get('checkbox');
        return this.locatorDriver.get('progress').unwrap();
    }
}
