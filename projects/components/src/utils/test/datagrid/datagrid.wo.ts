/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { BaseWidgetObject, LocatorDriver } from '../widget-object/widget-object';

const Css = {
    ROW: 'clr-dg-row',
    COLUMN: 'clr-dg-column',
    CELL: 'clr-dg-cell',
    PLACEHOLDER: 'clr-dg-placeholder',
    COLUMN_TITLE: '.datagrid-column-title',
    HIDDEN_COLUMN: 'clr-dg-column.datagrid-hidden-column',
    DETAIL_ROW: 'clr-dg-row-detail',
    DETAIL_PANE: '.datagrid-detail-pane-content',
    DETAIL_PANE_HEADER: '.datagrid-detail-header-title',
    DETAIL_ROW_BUTTON: '.datagrid-expandable-caret-button',
    DETAIL_PANE_BUTTON: '.datagrid-detail-caret-button',
    PAGINATION_DESCRIPTION: '.pagination-description',
    PAGE_SIZE: 'clr-dg-page-size',
    PAGINATION_NEXT: '.pagination-next',
    TOP_POSITIONED_BUTTON: 'clr-dg-action-bar button',
    ROW_BUTTON_CONTAINER: '.action-button-cell',
    CHECKBOX_WRAPPER: 'clr-checkbox-wrapper',
    RADIO_WRAPPER: 'clr-radio-wrapper',
    FILTER: 'clr-dg-filter',
    FILTER_TOGGLE: '.datagrid-filter-toggle',
};

/**
 * Widget Object for a Clarity DataGrid
 */
export class ClrDatagridWidgetObject<T> extends BaseWidgetObject<T> {
    static tagName = `clr-datagrid`;

    /**
     * Gives the placeholder present on the datagrid
     */
    getPlaceHolder = this.locatorForChild(Css.PLACEHOLDER);

    /**
     * The header of the detail pane
     */
    getDetailPaneHeader = this.locatorForChild(Css.DETAIL_PANE_HEADER);

    /**
     * Gives the pagination description text
     */
    getPaginationDescription = this.locatorForChild(Css.PAGINATION_DESCRIPTION);

    /**
     * Gives the text next to the pagination selector
     */
    getPaginationSizeSelector = this.locatorForChild(Css.PAGE_SIZE);

    /**
     * Returns the next page button
     */
    getNextButton = this.locatorForChild(Css.PAGINATION_NEXT);

    /**
     * Helper function to retrieve a row
     * @param row 0-based index of row
     */
    private _getRow(row: number): LocatorDriver<T> {
        return this.locatorDriver.get(`${Css.ROW}:nth-of-type(${row + 1})`);
    }

    /**
     * Helper function to retrieve a cell
     * @param row 0-based index of row
     * @param col 0-based index of column
     */
    private _getCell(row: number, col: number): LocatorDriver<T> {
        return this._getRow(row).get(`${Css.CELL}:nth-of-type(${col + 1})`);
    }

    /**
     * Retrieves the cell
     * @param row 0-based index of row
     * @param col 0-based index of column
     */
    getCell(row: number, col: number): T {
        return this._getCell(row, col).unwrap();
    }

    /**
     * Gives the linked tag in the given cell
     * @param row 0-based index of row
     * @param col 0-based index of column
     */
    getCellLink(row: number, col: number): T {
        return this._getCell(row, col).get(`a`).unwrap();
    }

    /**
     * Gives the `strong` tag in the given cell
     * @param row 0-based index of row
     * @param col 0-based index of column
     */
    getCellStrong(row: number, col: number): T {
        return this._getCell(row, col).get('strong').unwrap();
    }

    /**
     * Returns all the rows
     */
    getRows(): T {
        return this.locatorDriver.get(Css.ROW).unwrap();
    }

    /**
     * Return a row by index
     * @param row 0-based index of row
     */
    getRow(row: number): T {
        return this._getRow(row).unwrap();
    }

    /**
     * Returns all the columns
     */
    getColumns(): T {
        return this.locatorDriver.get(Css.COLUMN).unwrap();
    }

    /**
     * Return a column by index
     * @param col 0-based index of column
     */
    getColumn(col: number): T {
        return this.locatorDriver.get(`${Css.COLUMN}:nth-of-type(${col + 1})`).unwrap();
    }

    /**
     * Returns input element in the given row
     * @param row 0-based index of row
     */
    getRowInput(row: number): T {
        return this._getRow(row).get(`input`).unwrap();
    }

    /**
     * Returns all the cell elements in the given row
     * @param row 0-based index of row
     */
    getRowCell(row: number): T {
        return this._getRow(row).get(Css.CELL).unwrap();
    }

    /**
     * Returns the button on the top of the grid with the given buttonClass
     */
    getTopButton(btnClass: string): T {
        return this.locatorDriver.get(`button.${btnClass}`).unwrap();
    }

    /**
     * Returns the button at a row with the given buttonClass
     */
    getRowButton(btnClass: string, row: number): T {
        return this._getRow(row).get(`button.${btnClass}`).unwrap();
    }

    /**
     * Returns an array of headers
     */
    getColumnHeaders(): T {
        return this.locatorDriver.get(Css.COLUMN_TITLE).unwrap();
    }

    /**
     * Returns a header
     * @param col 0-based index of header
     */
    getColumnHeader(col: number): T {
        return this.locatorDriver.get(`${Css.COLUMN_TITLE}:nth-of-type(${col + 1})`).unwrap();
    }

    /**
     * Returns an array of columns that are hidden
     */
    getHiddenColumnHeaders(): T {
        return this.locatorDriver.get(Css.HIDDEN_COLUMN).unwrap();
    }

    /**
     * Returns the elements within all the detail pane open
     */
    getDetailRows(): T {
        return this.locatorDriver.get(Css.DETAIL_ROW).unwrap();
    }

    /**
     * Returns the elements within all the detail pane open
     */
    getDetailPanes(): T {
        return this.locatorDriver.get(Css.DETAIL_PANE).unwrap();
    }

    /**
     * Returns all the detail buttons
     */
    getDetailRowButtons(): T {
        return this.locatorDriver.get(Css.DETAIL_ROW_BUTTON).unwrap();
    }

    /**
     * Returns all the detail pane buttons
     */
    getDetailPaneButtons(): T {
        return this.locatorDriver.get(Css.DETAIL_PANE_BUTTON).unwrap();
    }

    /**
     * Gives a list of displayed action buttons at the top of the grid
     */
    getTopPositionedButtons(): T {
        return this.locatorDriver.get(Css.TOP_POSITIONED_BUTTON).unwrap();
    }

    /**
     * Returns a row button
     * @param row 0-based index
     */
    getRowButtonContainer(row: number): T {
        return this._getRow(row).get(Css.ROW_BUTTON_CONTAINER).unwrap();
    }

    /**
     * Returns filter toggle
     */
    getFilterToggle(): T {
        return this.locatorDriver.get(Css.COLUMN).get(Css.FILTER).get(Css.FILTER_TOGGLE).unwrap();
    }

    /**
     * Find a clr-checkbox-wrapper
     */
    getCheckboxWrapper(): T {
        return this.locatorDriver.get(Css.CHECKBOX_WRAPPER).unwrap();
    }

    /**
     * Find a clr-radio-wrapper
     */
    getRadioWrapper(): T {
        return this.locatorDriver.get(Css.RADIO_WRAPPER).unwrap();
    }

    /**
     * Unwrap the clr-datagrid
     */
    unwrap(): T {
        return this.locatorDriver.unwrap();
    }
}
