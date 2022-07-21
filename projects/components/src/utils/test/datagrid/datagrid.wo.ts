/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { BaseWidgetObject, WidgetObjectElement } from '../widget-object/widget-object';

const Css = {
    ROW: 'clr-dg-row',
    COLUMN: 'clr-dg-column',
    CELL: 'clr-dg-cell',
    PLACEHOLDER: 'clr-dg-placeholder',
    COLUMN_TITLE: '.datagrid-column-title',
    HIDDEN_COLUMN: 'clr-dg-column.datagrid-hidden-column span:not(.clr-sr-only)',
    DETAIL_ROW: 'clr-dg-row-detail',
    DETAIL_PANE: '.datagrid-detail-pane-content',
    DETAIL_PANE_HEADER: '.datagrid-detail-header-title',
    DETAIL_ROW_BUTTON: '.datagrid-expandable-caret-button',
    DETAIL_PANE_BUTTON: '.datagrid-detail-caret-button',
    PAGINATION_DESCRIPTION: '.pagination-description',
    PAGE_SIZE: 'clr-dg-page-size',
    PAGINATION_NEXT: '.pagination-next',
    TOP_POSITIONED_BUTTON: 'clr-dg-action-bar button',
    ROW_ACTION_CONTAINER: '.datagrid-select label',
    ROW_ACTION_INPUT: '.datagrid-select input',
    CHECKBOX_WRAPPER: '.clr-checkbox-wrapper',
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
    getPlaceHolder = this.factory.css(Css.PLACEHOLDER);

    /**
     * The header of the detail pane
     */
    getDetailPaneHeader = this.factory.css(Css.DETAIL_PANE_HEADER);

    /**
     * Gives the pagination description text
     */
    getPaginationDescription = this.factory.css(Css.PAGINATION_DESCRIPTION);

    /**
     * Gives the text next to the pagination selector
     */
    getPaginationSizeSelector = this.factory.css(Css.PAGE_SIZE);

    /**
     * Returns the next page button
     */
    getNextButton = this.factory.css(Css.PAGINATION_NEXT);

    /**
     * Returns all the rows
     */
    getRows = this.factory.css(Css.ROW);

    /**
     * Returns all the columns
     */
    getColumns = this.factory.css(Css.COLUMN);

    /**
     * Returns an array of headers
     */
    getColumnHeaders = this.factory.css(Css.COLUMN_TITLE);

    /**
     * Returns an array of columns that are hidden
     */
    getHiddenColumnHeaders = this.factory.css(Css.HIDDEN_COLUMN);

    /**
     * Returns the elements within all the detail pane open
     */
    getDetailRows = this.factory.css(Css.DETAIL_ROW);

    /**
     * Returns the elements within all the detail pane open
     */
    getDetailPanes = this.factory.css(Css.DETAIL_PANE);

    /**
     * Returns all the detail buttons
     */
    getDetailRowButtons = this.factory.css(Css.DETAIL_ROW_BUTTON);

    /**
     * Returns all the detail pane buttons
     */
    getDetailPaneButtons = this.factory.css(Css.DETAIL_PANE_BUTTON);

    /**
     * Gives a list of displayed action buttons at the top of the grid
     */
    getTopPositionedButtons = this.factory.css(Css.TOP_POSITIONED_BUTTON);

    /**
     * Find a clr-checkbox-wrapper
     */
    getCheckboxWrapper = this.factory.css(Css.CHECKBOX_WRAPPER);

    /**
     * Find a clr-radio-wrapper
     */
    getRadioWrapper = this.factory.css(Css.RADIO_WRAPPER);

    /**
     * Find a clr-spinner element
     */
    getSpinner = this.factory.css(Css.SPINNER);

    /**
     * Return a row by index
     * @param row 0-based index of row
     */
    getRow(row: number): WidgetObjectElement<T> {
        return this.el.get(`${Css.ROW}:nth-of-type(${row + 1})`);
    }

    /**
     * Retrieves the cell
     * @param row 0-based index of row
     * @param col 0-based index of column
     */
    getCell(row: number, col: number) {
        return this.getRow(row).get(`${Css.CELL}:nth-of-type(${col + 1})`);
    }

    /**
     * Return a column by index
     * @param col 0-based index of column
     */
    getColumn(col: number) {
        return this.factory.css(`${Css.COLUMN}:nth-of-type(${col + 1})`)();
    }

    /**
     * Returns all the cell elements in the given row
     * @param row 0-based index of row
     */
    getRowCell(row: number) {
        return this.getRow(row).get(Css.CELL);
    }

    /**
     * Returns the button on the top of the grid with the given buttonClass
     */
    getTopButton(btnClass: string) {
        return this.factory.css(`button.${btnClass}`)();
    }

    /**
     * Returns the button at a row with the given buttonClass
     */
    getRowButton(btnClass: string, row: number) {
        return this.getRow(row).get(`button.${btnClass}`);
    }

    /**
     * Returns a header
     * @param col 0-based index of header
     */
    getColumnHeader(col: number) {
        return this.el.get(`${Css.COLUMN_TITLE}:nth-of-type(${col + 1})`);
    }

    /**
     * Returns label of `.datagrid-select` element in the given row. This function can be used to
     * perform both single and multiple selection
     * @param row 0-based index of row
     */
    getSelectionLabelForRow(row: number) {
        return this.getRow(row).get(Css.ROW_ACTION_CONTAINER);
    }

    /**
     * Returns the input of .datagrid-select element in the given row. This function can be used to
     * perform both single and multiple selection
     * @param row 0-based index of row
     */
    getSelectionInputForRow(row: number) {
        return this.getRow(row).get(Css.ROW_ACTION_INPUT);
    }

    /**
     * Returns filter toggle
     */
    get filterToggle() {
        return this.el.get(Css.COLUMN).get(Css.FILTER).get(Css.FILTER_TOGGLE);
    }
}
