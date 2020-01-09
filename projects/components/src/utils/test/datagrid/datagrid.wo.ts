/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { WidgetObject } from '../widget-object';
import { DebugElement } from '@angular/core';
import { ClrDatagrid } from '@clr/angular';

const ROW_TAG = 'clr-dg-row';
const CELL_TAG = 'clr-dg-cell';
const COLUMN_SELECTOR = 'clr-dg-column';
const COLUMN_CSS_SELECTOR = '.datagrid-column-title';

/**
 * Widget Object for a Clarity DataGrid
 */
export class ClrDatagridWidgetObject extends WidgetObject<ClrDatagrid> {
    static tagName = `clr-datagrid`;

    /**
     * Retrieves the text content of a cell
     * @param row 0-based index of row
     * @param column 0-based index of column
     */
    getCellText(row: number, column: number): string {
        return this.getNodeText(this.getCell(row, column));
    }

    /**
     * Returns the number of visible columns
     */
    get columnCount(): number {
        return this.component.columns ? this.component.columns.length : this.columns.length;
    }

    /**
     * Returns the text for a header
     * @param columnIndex 0-based index of header to retrieve
     */
    getColumnHeader(columnIndex: number): string {
        return this.getText(`${COLUMN_CSS_SELECTOR}:nth-of-type(${columnIndex + 1})`);
    }

    /**
     * Returns an array of the texts for columns, in DOM order
     */
    get columnHeaders(): string[] {
        return this.getTexts(COLUMN_CSS_SELECTOR);
    }

    /**
     * Returns the number of rows currently displayed
     */
    get rowCount(): number {
        return this.rows.length;
    }

    /**
     * Returns whether or not the column with the given index is displayed by the CSS.
     */
    isColumnDisplayed(index: number): boolean {
        return this.findElements(COLUMN_SELECTOR)[index].classes['datagrid-hidden-column'] !== true;
    }

    /*
     * Returns the CSS class of the Clarity datagrid.
     */
    get gridCssClass(): string[] {
        console.log(this.root.classes);
        return Object.keys(this.root.classes);
    }

    /**
     * Returns the CSS class names of the given Clarity datarow.
     */
    getRowsCssClass(index: number): string[] {
        return Object.keys(this.rows[index].classes);
    }

    /**
     * Can be used by subclasses to create methods that assert about HTML in custom rendered columns. Note that
     * subclasses should not return the DebugElement, they should return a string from a section of the HTML.
     *
     * @param row 0-based index of row
     * @param column 0-based index of column
     */
    protected getCell(row: number, column: number): DebugElement {
        return this.findElement(`${ROW_TAG}:nth-of-type(${row + 1}) ${CELL_TAG}:nth-of-type(${column + 1})`);
    }

    private get rows(): DebugElement[] {
        return this.findElements(ROW_TAG);
    }

    private get columns(): DebugElement[] {
        return this.findElements(COLUMN_CSS_SELECTOR);
    }
}
