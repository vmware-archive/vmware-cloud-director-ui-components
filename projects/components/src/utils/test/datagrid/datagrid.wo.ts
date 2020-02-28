/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { GridSelectionType } from './../../../datagrid/datagrid.component';
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
        return Object.keys(this.root.classes);
    }

    /**
     * Returns the CSS class names of the given Clarity datarow.
     */
    getRowsCssClass(index: number): string[] {
        return Object.keys(this.rows[index].classes);
    }

    /**
     * Returns the native element contents within all the detail pane open.
     */
    getAllDetailContents(): string[] {
        return this.findElements('clr-dg-row-detail').map(detail => detail.nativeElement);
    }

    /**
     * Clicks the given details button.
     */
    clickDetailsButton(row: number): void {
        this.detailsButtons[row].nativeElement.click();
    }

    /**
     * Sorts the column at the given index.
     */
    sortColumn(index: number): void {
        this.columns[index].nativeElement.click();
    }

    /**
     * Returns the selection type of the grid.
     */
    getSelectionType(): GridSelectionType {
        if (this.findElements('clr-checkbox-wrapper').length !== 0) {
            return GridSelectionType.Multi;
        } else if (this.findElements('clr-radio-wrapper').length !== 0) {
            return GridSelectionType.Single;
        } else {
            return GridSelectionType.None;
        }
    }

    /**
     * Clicks the selection icon on the given row.
     */
    selectRow(row: number): void {
        this.click(`input`, this.rows[row]);
    }

    /**
     * Gives the pagination description text.
     */
    getPaginationDescription(): string {
        return this.findElement('.pagination-description').nativeElement.textContent;
    }

    /**
     * Gives the text next to the pagination selector.
     */
    getPaginationSizeSelectorText(): string {
        return this.findElement('clr-dg-page-size').nativeElement.textContent;
    }

    /**
     * Clicks the next page button.
     */
    nextPage(): void {
        this.click('.pagination-next');
    }

    /**
     * Gives a list of the labels of the displayed action buttons at the top of the grid.
     */
    getTopPositionedButtons(): string[] {
        return this.findElements('clr-dg-action-bar button').map(button => button.nativeElement.textContent);
    }

    /**
     * Gives the class of the cell that holds the row buttons.
     */
    getRowButtonContainerClass(rowIndex: number): string[] {
        return Object.keys(this.findElement(`.action-button-cell`, this.rows[rowIndex]).classes);
    }

    /**
     * Presses the button at the given {@param index} on the top of the grid.
     */
    pressTopButton(index: number): void {
        this.click(`clr-dg-action-bar button:nth-of-type(${index + 1})`);
    }

    /**
     * Presses the button at the given {@param buttonIndex} at the row at the given {@param rowIndex}.
     */
    pressButtonAtRow(buttonIndex: number, rowIndex: number): void {
        this.click(`.action-button-group button:nth-of-type(${buttonIndex + 1})`, this.rows[rowIndex]);
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

    private get detailsButtons(): DebugElement[] {
        return this.findElements('.datagrid-expandable-caret-button');
    }
}
