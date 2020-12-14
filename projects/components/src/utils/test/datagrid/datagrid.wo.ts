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
    // Do not use this. This is specific to VCD datagrid.
    ROW_BUTTON_CONTAINER: '.action-button-cell',
    ROW_ACTION_CONTAINER: '.datagrid-select label',
    CHECKBOX_WRAPPER: 'clr-checkbox-wrapper',
    RADIO_WRAPPER: 'clr-radio-wrapper',
    FILTER: 'clr-dg-filter',
    FILTER_TOGGLE: '.datagrid-filter-toggle',
    SPINNER: 'clr-spinner',
};

/**
 * Widget Object for a Clarity DataGrid
 */
export class ClrDatagridWidgetObject<T> extends BaseWidgetObject<T> {
    static tagName = 'clr-datagrid';

    /**
     * Gives the placeholder present on the datagrid
     */
    getPlaceHolder = this.locatorForCssSelectors(Css.PLACEHOLDER);

    /**
     * The header of the detail pane
     */
    getDetailPaneHeader = this.locatorForCssSelectors(Css.DETAIL_PANE_HEADER);

    /**
     * Gives the pagination description text
     */
    getPaginationDescription = this.locatorForCssSelectors(Css.PAGINATION_DESCRIPTION);

    /**
     * Gives the text next to the pagination selector
     */
    getPaginationSizeSelector = this.locatorForCssSelectors(Css.PAGE_SIZE);

    /**
     * Returns the next page button
     */
    getNextButton = this.locatorForCssSelectors(Css.PAGINATION_NEXT);

    /**
     * Returns all the rows
     */
    getRows = this.locatorForCssSelectors(Css.ROW);

    /**
     * Returns all the columns
     */
    getColumns = this.locatorForCssSelectors(Css.COLUMN);

    /**
     * Returns an array of headers
     */
    getColumnHeaders = this.locatorForCssSelectors(Css.COLUMN_TITLE);

    /**
     * Returns an array of columns that are hidden
     */
    getHiddenColumnHeaders = this.locatorForCssSelectors(Css.HIDDEN_COLUMN);

    /**
     * Returns the elements within all the detail pane open
     */
    getDetailRows = this.locatorForCssSelectors(Css.DETAIL_ROW);

    /**
     * Returns the elements within all the detail pane open
     */
    getDetailPanes = this.locatorForCssSelectors(Css.DETAIL_PANE);

    /**
     * Returns all the detail buttons
     */
    getDetailRowButtons = this.locatorForCssSelectors(Css.DETAIL_ROW_BUTTON);

    /**
     * Returns all the detail pane buttons
     */
    getDetailPaneButtons = this.locatorForCssSelectors(Css.DETAIL_PANE_BUTTON);

    /**
     * Gives a list of displayed action buttons at the top of the grid
     */
    getTopPositionedButtons = this.locatorForCssSelectors(Css.TOP_POSITIONED_BUTTON);

    /**
     * Find a clr-checkbox-wrapper
     */
    getCheckboxWrapper = this.locatorForCssSelectors(Css.CHECKBOX_WRAPPER);

    /**
     * Find a clr-radio-wrapper
     */
    getRadioWrapper = this.locatorForCssSelectors(Css.RADIO_WRAPPER);

    /**
     * Find a clr-spinner element
     */
    getSpinner = this.locatorForCssSelectors(Css.SPINNER);

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
        return this._getCell(row, col).get('a').unwrap();
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
     * Return a row by index
     * @param row 0-based index of row
     */
    getRow(row: number): T {
        return this._getRow(row).unwrap();
    }

    /**
     * Return a column by index
     * @param col 0-based index of column
     */
    getColumn(col: number): T {
        // return this.locatorDriver.get(`${Css.COLUMN}:nth-of-type(${col + 1})`).unwrap();
        return this.locatorForCssSelectors(`${Css.COLUMN}:nth-of-type(${col + 1})`)();
    }

    /**
     * Returns input element in the given row
     * @param row 0-based index of row
     * @deprecated It doesn't make sense to grab a random input out of a row.
     */
    getRowInput(row: number): T {
        return this._getRow(row).get('input').unwrap();
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
        // return this.locatorDriver.get(`button.${btnClass}`).unwrap();
        return this.locatorForCssSelectors(`button.${btnClass}`)();
    }

    /**
     * Returns the button at a row with the given buttonClass
     */
    getRowButton(btnClass: string, row: number): T {
        return this._getRow(row).get(`button.${btnClass}`).unwrap();
    }

    /**
     * Returns a header
     * @param col 0-based index of header
     */
    getColumnHeader(col: number): T {
        // return this.locatorDriver.get(`${Css.COLUMN_TITLE}:nth-of-type(${col + 1})`).unwrap();
        return this.locatorForCssSelectors(`${Css.COLUMN_TITLE}:nth-of-type(${col + 1})`)();
    }

    /**
     * Returns a row button
     * @param row 0-based index
     */
    getRowButtonContainer(row: number): T {
        return this._getRow(row).get(Css.ROW_BUTTON_CONTAINER).unwrap();
    }

    getSingleSelectionRadioLabel(row: number): T {
        return this._getRow(row).get(Css.ROW_ACTION_CONTAINER).unwrap();
    }

    /**
     * Returns filter toggle
     */
    getFilterToggle(): T {
        return this.locatorDriver.get(Css.COLUMN).get(Css.FILTER).get(Css.FILTER_TOGGLE).unwrap();
    }

    get clrDatagrid(): T {
        return this.locatorDriver.unwrap();
    }
}
