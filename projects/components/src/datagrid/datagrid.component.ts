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
    TrackByFunction,
} from '@angular/core';
import { FunctionRenderer, GridColumn, GridColumnHideable } from './interfaces/datagrid-column.interface';
import { ClrDatagridFilter, ClrDatagrid, ClrDatagridStateInterface, ClrDatagridPagination } from '@clr/angular';
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
 * Representation an entity that has a href property.
 */
interface HasHref {
    href?: string;
}

/**
 * The information about pagionation that will be exposed.
 */
export interface PagionationInformation {
    /**
     * What page is currently selected.
     */
    pageNumber: number;
    /**
     * How many items belong on a page.
     */
    itemsPerPage: number;
}
/**
 * The current state of various features of the grid like filtering, sorting, pagination. This object is emitted as
 * part of the event {@link DatagridComponent.gridRefresh}. The handler then used this object to construct a query.
 * TODO: This interface is going to defined as part of working on the following tasks:
 *  https://jira.eng.vmware.com/browse/VDUCC-14
 *  https://jira.eng.vmware.com/browse/VDUCC-15
 *  https://jira.eng.vmware.com/browse/VDUCC-20
 */
export interface GridState<R> {
    /**
     * The currently sorted column in the datagrid.
     */
    sortColumn?: SortedColumn;
    /**
     * The pagination information that the datagrid should show.
     */
    pagination: PagionationInformation;
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

    /**
     * Set from the caller component using this grid. The input is set upon fetching data by the caller
     */
    @Input() set gridData(result: GridDataFetchResult<R>) {
        this.isLoading = false;
        this.items = result.items;
        this.totalItems = result.totalItems;
        this.updateSelectedItems();
    }

    /**
     * Type of row selection on the grid
     */
    @Input() set selectionType(selectionType: GridSelectionType) {
        this._selectionType = selectionType;
        this.clearSelectionInformation();
    }
    GridColumnHideable = GridColumnHideable;
    private _columns: GridColumn<R>[];

    @ContentChild(TemplateRef, { static: false }) detailTemplate!: TemplateRef<ElementRef>;

    private _selectionType: GridSelectionType = GridSelectionType.None;

    /**
     * The CSS class to use for the Clarity datagrid.
     */
    @Input() clrDatagridCssClass = '';

    /**
     * The text placed next to the pagination number dropdown.
     */
    @Input() paginationDropdownText = '';

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
     * The pagination information that the user should supply.
     */
    @Input() pagination: {
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
        // TODO: implement 'Magic'
        pageSize: number; // | 'Magic';
    } = {
        pageSize: 10,
        pageSizeOptions: [10, 20, 50, 100],
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
     * The value of the single selection.
     */
    singleSelected: R = undefined;

    /**
     * The value of the multi selection.
     */
    multiSelection: R[] = [];

    /**
     * The total number of items that could be displayed in the grid.
     */
    totalItems?: number;

    /**
     * Emitted during the initial rendering, and is emitted whenever filtering/sorting/paging params change
     * {@link #GridState} is the type of value emitted
     */
    @Output()
    gridRefresh: EventEmitter<GridState<R>> = new EventEmitter<GridState<R>>();

    @ViewChild(ClrDatagridFilter, { static: false }) numericFilter: ClrDatagridFilter;

    @ViewChild(ClrDatagrid, { static: true }) datagrid: ClrDatagrid;

    /**
     * The pagination display within the datagrid.
     */
    @ViewChild(ClrDatagridPagination, { static: false }) paginationComponent: ClrDatagridPagination;

    /**
     * Returns an identifier for the given record at the given index.
     *
     * If the record has a href, defaults to that. Else, defaults to index.
     */
    @Input() trackBy: TrackByFunction<R> = (index: number, record: (R & HasHref) | undefined): string | number => {
        return record && (record.href || index);
        // tslint:disable-next-line: semicolon
    };

    /**
     * Gives the correct string to display for the pagination.
     *
     * @param firstItem the index of the first item displayed.
     * @param lastItem the index of the last item displayed.
     * @param totalItems the total number of items that could be displayed.
     */
    @Input() paginationCallback(firstItem: number, lastItem: number, totalItems: number): string {
        return `${firstItem} - ${lastItem} of ${totalItems} rows`;
    }

    /**
     * Gives the CSS class to use for a given datarow based on its relative index and entity definition.
     */
    @Input() clrDatarowCssClassGetter(row: R, index: number): string {
        return '';
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.clearSelectionInformation();
    }

    private updateSelectedItems(): void {
        if (this._selectionType === GridSelectionType.Single) {
            // Tries to find the currently selected item. If it isn't found, clears the selection.
            const found = this.items.find(
                (item, itemIndex) =>
                    this.trackBy(itemIndex, item) ===
                    this.trackBy(
                        this.items.indexOf(this.datagrid.selection.currentSingle),
                        this.datagrid.selection.currentSingle
                    )
            );
            if (!found) {
                this.datagrid.selection.currentSingle = undefined;
            }
        } else if (this._selectionType === GridSelectionType.Multi) {
            // Tries to find the currently selected items. If an item isn't found, clears the selection for that item.
            if (this.datagrid.selection.current) {
                this.datagrid.selection.current = this.datagrid.selection.current.filter((selected, selectedIndex) => {
                    const found = this.items.find(
                        (item, itemIndex) => this.trackBy(itemIndex, item) === this.trackBy(selectedIndex, selected)
                    );
                    return found;
                });
            }
        }
    }

    private clearSelectionInformation(): void {
        if (!this.datagrid) {
            return;
        }
        if (this._selectionType === GridSelectionType.Single) {
            this.datagrid.selected = undefined;
            this.datagrid.singleSelected = this.singleSelected;
        } else if (this._selectionType === GridSelectionType.Multi) {
            this.datagrid.singleSelected = undefined;
            this.datagrid.selected = this.multiSelection;
        } else if (this._selectionType === GridSelectionType.None) {
            this.datagrid.selected = [];
            this.datagrid.singleSelected = undefined;
            this.datagrid.selected = undefined;
        }
    }

    /**
     * Returns the items selected in the VCD datagrid.
     */
    getDatagridSelection(): R[] {
        if (this.datagrid.selection.currentSingle) {
            return [this.datagrid.selection.currentSingle];
        }
        if (this.datagrid.selection.current) {
            return this.datagrid.selection.current;
        }
        return [];
    }

    /**
     * Called when the {@param state} of the Clarity datagrid changes.
     */
    gridStateChanged(state: ClrDatagridStateInterface): void {
        // Update pagination information.
        const pagination = {
            pageNumber: state.page ? state.page.current : 1,
            itemsPerPage: state.page ? state.page.size : 10,
        };

        // Update the sorting information.
        const toEmit: GridState<R> = {
            pagination,
        };
        if (state.sort && typeof state.sort.by === 'string') {
            toEmit.sortColumn = {
                name: state.sort.by,
                reverse: state.sort.reverse,
            };
        }

        this.gridRefresh.emit(toEmit);
    }

    /**
     * Resets the pagination to page 1.
     */
    resetToPageOne(): void {
        this.paginationComponent.currentPage = 1;
    }

    isColumnHideable(column: GridColumn<R>): boolean {
        return column && column.hideable && column.hideable !== GridColumnHideable.Never;
    }

    /**
     * Says if the number of items matches the page size.
     */
    sameItemsAsPageSize(): boolean {
        return this.pagination.pageSize === this.items.length;
    }

    /**
     * Updates the pagination data and makes the callback.
     */
    paginationCallbackWrapper(paginationData: ClrDatagridPagination): string {
        return this.paginationCallback(paginationData.firstItem + 1, paginationData.lastItem + 1, this.totalItems);
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
