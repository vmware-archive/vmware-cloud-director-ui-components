/*!
 * Copyright 2019 VMware, Inc.
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
     * The strings for the available check boxes
     */
    get columnCheckBoxes(): string[] {
        return this.getTexts('.column-label');
    }

    /**
     * Clicks the remove button for a colum
     * @param index Index of column, 0 based
     */
    removeColumn(index: number): void {
        this.click(`.column-label:nth-of-type(${index + 1})`);
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
     * Clicks the checkbox to show friendly names or not.
     */
    clickFriendlyNames(): void {
        this.click('.friendly-names');
    }

    /**
     * Clicks the checkbox the sanitize the data.
     */
    clickSanitize(): void {
        this.click('.sanitize-cells');
    }

    /**
     * Clicks the checkbox to export all columns.
     */
    clickExportAll(): void {
        this.click('.export-all');
    }
}
