/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { DebugElement } from '@angular/core';
import { WidgetObject } from '../utils/test/widget-object';
import { DataExporterComponent } from './data-exporter.component';

const Css = {
    SelectAll: '.select-all',
    SelectColumn: '.column-selection label',
};
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
        return this.getTexts('.column-selection label');
    }

    /**
     * Whether the select all button is displayed
     */
    get isSelectAllVisible(): boolean {
        return !!this.selectAllLink;
    }

    private get selectAllLink(): DebugElement {
        return this.findElement(Css.SelectAll);
    }

    /**
     * Click the select all link. Throws an error if the link is not available
     */
    clickSelectAll(): void {
        this.click(Css.SelectAll);
    }

    /**
     * Whether the select all link is enabled. Throws an error if link is not available
     */
    get isSelectAllEnabled(): boolean {
        return !this.selectAllLink.nativeElement.disabled;
    }

    /**
     * Clicks the checkbox for a colum
     * @param index Index of column, 0 based
     */
    clickColumn(index: number): void {
        this.click(`.column-selection li:nth-of-type(${index + 1}) label`);
    }

    clickCancel(): void {
        this.click('.cancel');
    }

    clickExport(): void {
        this.click('.export');
    }

    clickYes(): void {
        this.click('.yes');
    }

    clickNo(): void {
        this.click('.no');
    }
}
