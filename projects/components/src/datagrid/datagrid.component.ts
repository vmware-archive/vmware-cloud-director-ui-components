/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
    ContentChild,
    ElementRef,
} from '@angular/core';
import { FunctionRenderer, GridColumn, GridColumnHideable } from './interfaces/datagrid-column.interface';
import { ClrDatagridFilter, ClrDatagridStateInterface, ClrDatagridSortOrder } from '@clr/angular';
import { ComponentRendererSpec } from './interfaces/component-renderer.interface';

/**
 * Different types of row selection on the grid
 */
export enum GridSelectionType {
    /**
     * For selecting multiple rows
     */
    Multi = 'MULTI',
    /**
     * For selecting only one row at a time
     */
    Single = 'SINGLE',
    /**
     * Disables the selection
     */
    None = 'NONE',
}

/**
 * TODO: This API is going to have more properties and is going to be defined as part of
 *  https://jira.eng.vmware.com/browse/VDUCC-21
 */
// tslint:disable-next-line:no-empty-interface
export interface Button {}

/**
 * Representation of data required for rendering contents of cells and pagination information
 */
export interface GridDataFetchResult<R> {
    /**
     * Items to be listed in the grid
     */
    items: R[];
    /**
     * Total number of items
     */
    totalItems?: number;
    /**
     * Number of the page being indexed
     */
    page?: number;
    /**
     * Size of a page
     */
    pageSize?: number;
}

/**
 * The information about the currently sorted column.
 */
export interface SortedColumn {
    /**
     * Whether the column is sorted normally or reversed.
     */
    reverse: boolean;
    /**
     * The name of the column that is sorted.
     */
    name: string;
}

/**
 * The current state of various features of the grid like filtering, sorting, pagination. This object is emitted as
 * part of the event {@link DatagridComponent.gridRefresh}. The handler then used this object to construct a query.
 * TODO: This interface is going to defined as part of working on the following tasks:
 *  https://jira.eng.vmware.com/browse/VDUCC-14
 *  https://jira.eng.vmware.com/browse/VDUCC-15
 *  https://jira.eng.vmware.com/browse/VDUCC-20
 */
// tslint:disable-next-line:no-empty-interface
export interface GridState<R> {
    /**
     * The currently sorted column in the datagrid.
     */
    sortColumn?: SortedColumn;
}

/**
 * For simplifying logic inside the HTML template to differentiate between different {@link GridColumn.renderer}
 * types.
 */
interface ColumnConfigInternal<R, T> extends GridColumn<R> {
    fieldName?: string;
    fieldRenderer?: FunctionRenderer<R>;
    fieldColumnRendererSpec?: ComponentRendererSpec<R, T>;
}

/**
 * Component used for saving the time required for developing a data grid. It takes different properties required for
 * rendering as Inputs and Outputs.
 *
 * Example usage in a component:
 * In the component view, different properties required for the grid are wired as Inputs and Outputs.
 * <vcd-datagrid
 *    (onGridRefresh)="fetchData()"
 *    [columns]="columns"
 *    [gridData]="gridData">
 *  </vcd-datagrid>
 *
 */
@Component({
    selector: 'vcd-datagrid',
    templateUrl: './datagrid.component.html',
})
export class DatagridComponent<R> implements OnInit {
    GridColumnHideable = GridColumnHideable;

    /**
     * Sets the configuration of columns on the grid and updates the {@link columnsConfig} array
     */
    @Input()
    set columns(cols: GridColumn<R>[]) {
        this._columns = cols;
        this.getColumnsConfig();
    }
    get columns(): GridColumn<R>[] {
        return this._columns;
    }
    private _columns: GridColumn<R>[];

    /**
     * Set from the caller component using this grid. The input is set upon fetching data by the caller
     */
    @Input() set gridData(result: GridDataFetchResult<R>) {
        this.isLoading = false;
        this.items = result.items;
    }

    @ContentChild(TemplateRef, { static: false }) detailTemplate!: TemplateRef<ElementRef>;

    /**
     * Type of row selection on the grid
     */
    selectionType: GridSelectionType.None;

    /**
     * The CSS class to use for the Clarity datagrid.
     */
    @Input() clrDatagridCssClass = '';

    /**
     * Fired whenever the selection changes. The event data is array of rows selected. The array will contain only one
     * element in case of single selection
     */
    selectionChanged: EventEmitter<R[]>;

    /**
     * Buttons to display in the toolbar on top of data grid
     * showHide - Buttons that are not shown always (Eg: Delete button is hidden when there are no rows selected)
     * enableDisable - Buttons that are always shown but disabled in certain conditions (Eg: Add/New button is always
     * visible but disabled when no rights)
     *
     * TODO: There might be one more property required to define how many buttons should be visible before overflowing.
     *  This API is going to be refined as part of https://jira.eng.vmware.com/browse/VDUCC-21
     */
    buttons: {
        showHide: Button[];
        enableDisable: Button[];
    };

    /**
     * When there is no data, show this message.
     *
     * TODO: Try to avoid showing this before initial load.
     */
    emptyGridPlaceholder: string;

    /**
     * Inline HTML that is passed with the record/rest item as context
     *
     * TODO: https://jira.eng.vmware.com/browse/VDUCC-18
     */
    expandableRowTemplate: TemplateRef<R>;

    /**
     * TODO: Pagination requires some more research to be defined properly and is going to be defined as part of
     *  https://jira.eng.vmware.com/browse/VDUCC-20
     */
    pagination: {
        paginationKey: string;
        /**
         * Available page size options in the dropdown
         */
        pageSizeOptions: number[];

        /**
         * Number of items to be displayed on one page. As a result, the server will return a set of pages with the defined
         * number of items per page(They can be smaller than the number here in case of last page, filtering etc.,)
         *
         * Magic: Auto calculates the size based on available height of the container
         */
        pageSize: number | 'Magic';
    };

    /**
     * Desired height of the grid
     *
     * TODO: Should we provide this option for setting the grid height and also for auto grow of the height of the grid.
     *  Also investigate if we can set this through CSS instead of an input
     *  The above to-do is going to be worked as part of https://jira.eng.vmware.com/browse/VDUCC-25
     */
    height: number;

    /**
     * Loading indicator on the grid
     */
    isLoading = false;

    /**
     * Used for simplifying logic inside the HTML template to differentiate between different
     * {@link GridColumn.renderer} types.
     */
    columnsConfig: ColumnConfigInternal<R, unknown>[];

    /**
     * List of items used for displaying rows on the grid
     */
    items: R[];

    /**
     * Emitted during the initial rendering, and is emitted whenever filtering/sorting/paging params change
     * {@link #GridState} is the type of value emitted
     */
    @Output()
    gridRefresh: EventEmitter<GridState<R>> = new EventEmitter<GridState<R>>();

    @ViewChild(ClrDatagridFilter, { static: false }) numericFilter: ClrDatagridFilter;

    /**
     * Gives the CSS class to use for a given datarow based on its relative index and entity definition.
     */
    @Input() clrDatarowCssClassGetter(row: R, index: number): string {
        return '';
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.gridRefresh.emit({});
    }

    /**
     * Called when the {@param state} of the Clarity datagrid changes.
     */
    gridStateChanged(state: ClrDatagridStateInterface): void {
        const toEmit: GridState<R> = {};
        if (state.sort && typeof state.sort.by === 'string') {
            toEmit.sortColumn = {
                name: state.sort.by,
                reverse: state.sort.reverse,
            };
        }
        this.gridRefresh.emit(toEmit);
    }

    isColumnHideable(column: GridColumn<R>): boolean {
        return column && column.hideable && column.hideable !== GridColumnHideable.Never;
    }

    /**
     * Defines the {@property columnsConfig} by adding extra property required for differentiating different kinds
     * of renderers which is required in the HTML template.
     */
    private getColumnsConfig(): void {
        this.columnsConfig = this.columns.map(column => {
            const columnConfig: ColumnConfigInternal<R, unknown> = {
                ...column,
            };

            if (column.renderer instanceof Function) {
                columnConfig.fieldRenderer = column.renderer as FunctionRenderer<R>;
            } else if ((column.renderer as ComponentRendererSpec<R, unknown>).config) {
                columnConfig.fieldColumnRendererSpec = column.renderer as ComponentRendererSpec<R, unknown>;
            } else {
                columnConfig.fieldName = column.renderer as string;
            }

            return columnConfig;
        });
    }
}
