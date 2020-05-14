/*!
 * Copyright 2019-2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { WidgetObject } from '../utils/test/widget-object';
import { DataExporterComponent } from './data-exporter.component';

/**
 * Testing Object for {@link DataExporterComponent}
 */
export class DataExporterWidgetObject extends WidgetObject<DataExporterComponent> {
    static tagName = 'vcd-data-exporter';

    /**
     * Whether the progress bar is currently showing indefinite progress, that is a looping loading indicator
     */
    get isLoopingProgressBar(): boolean {
        return !!this.findElement('.progress.loop');
    }

    /**
     * The strings for the available column bubbles.
     */
    get columnBubbles(): string[] {
        return this.getTexts('.column-label');
    }

    /**
     * The strings for the available column checkboxes.
     */
    get columnCheckboxes(): string[] {
        return this.getTexts('.column-checkbox');
    }

    /**
     * Clicks the remove button for a column
     * @param index Index of column, 0 based
     */
    removeColumn(index: number): void {
        this.click(`.column-label:nth-of-type(${index + 1}) clr-icon`);
    }

    /**
     * Clicks the checkbox next to a given column
     * @param index Index of column, 0 based
     */
    clickColumnCheckbox(index: number): void {
        this.click(`.column-checkbox:nth-of-type(${index + 1}) input`);
    }

    /**
     * Clicks the cancel button.
     */
    clickCancel(): void {
        this.click('.cancel');
    }

    /**
     * Clicks the export button.
     */
    clickExport(): void {
        this.click('.export');
    }

    /**
     * Click the arrow to open/close the column dropdown.
     */
    clickColumnDropdown(): void {
        this.click('.dropdown-button');
    }
}
