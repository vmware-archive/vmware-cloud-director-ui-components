/*!
 * Copyright 2019-2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    TrackByFunction,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { ClrDatagrid, ClrDatagridPagination, ClrDatagridStateInterface } from '@clr/angular';
import { LazyString, TranslationService } from '@vcd/i18n';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ActionMenuComponent } from '../action-menu/action-menu.component';
import { ActivityReporter } from '../common/activity-reporter';
import { ActionHandlerType, ActionItem, ActionStyling, ActionType } from '../common/interfaces/action-item.interface';
import { SubscriptionTracker } from '../common/subscription/subscription-tracker';
import { TooltipSize } from '../lib/directives/show-clipped-text.directive';
import { DatagridFilter } from './filters/datagrid-filter';
import { ComponentRendererConstructor, ComponentRendererSpec } from './interfaces/component-renderer.interface';
import {
    DatagridActionDisplayConfig,
    getDefaultDatagridActionDisplayConfig,
} from './interfaces/datagrid-action-display.interface';
import {
    ColumnRendererSpec,
    FunctionRenderer,
    GridColumn,
    GridColumnHideable,
} from './interfaces/datagrid-column.interface';

/**
 * An enum that describes where the contextual buttons should display.
 */
export enum DatagridContextualActionPosition {
    TOP = 'TOP',
    ROW = 'ROW',
}

/**
 * The default number of items on a single page.
 */
const DEFAULT_SIZE = 15;

/**
 * The default items to show in the page size dropdown.
 */
const DEFAULT_SIZE_OPTIONS = [DEFAULT_SIZE, 20, 50, 100];

/**
 * The maximum allowed .datagrid-header element clientHeight in pixels.
 */
const MAX_HEADER_HEIGHT = 40;

/**
 * The default clr-dr-row element clientHeight in pixels.
 */
const ROW_HEIGHT = 37;

/**
 * Key used for translation of pagination when a translation key is not given as input from the caller
 */
export const DEFAULT_PAGINATION_TRANSLATION_KEY = 'vcd.cc.grid.default.pagination';

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
 * The types of activity indicators that can be displayed on top of the grid.
 */
export enum ActivityIndicatorType {
    /**
     * Display a {@link SpinnerActivityReporterComponent} indicator
     */
    SPINNER,
    /**
     * Display a {@link BannerActivityReporterComponent} indicator
     */
    BANNER,
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
 * The information the user gives to show page size and page size options in the pagination footer.
 */
export interface PaginationConfiguration {
    /**
     * Available page size options in the dropdown
     */
    pageSizeOptions?: number[];

    /**
     * Number of items to be displayed on one page. As a result, the server will return a set of pages with the defined
     * number of items per page(They can be smaller than the number here in case of last page, filtering etc.,)
     *
     * Magic: Auto calculates the size based on available height of the container
     */
    pageSize: number | 'Magic';

    /**
     * The height of a row in the datagrid. If not set, will use the default of {@link ROW_HEIGHT}.
     */
    rowHeight?: number;
    /**
     * If the page size option dropdown should be shown.
     * Defaults to false.
     */
    shouldShowPageSizeSelector?: boolean;
    /**
     * If the page number input should be shown.
     * Defaults to false.
     */
    shouldShowPageNumberInput?: boolean;
}

/**
 * The configuration object that is passed to the detail row component.
 */
export interface DetailRowConfig<R> {
    /**
     * The record that this detail row should render.
     */
    record: R;
    /**
     * The index this detail row is in the datagrid.
     */
    index: number;
    /**
     * The total number of rows in the datagrid.
     */
    count: number;
}

/**
 * The configuration object that is passed to the detail pane component.
 */
export interface DetailPaneConfig<R> {
    /**
     * The record that this detail pane should render.
     */
    record: R;
}

/**
 * The configuration objet used to create the detail pane on the datagrid.
 */
export interface DetailPane<R> {
    /**
     * The header that goes on top of this detail pane.
     */
    header: (record: R) => string;
    /**
     * The contents that go within this detail pane.
     */
    component: ComponentRendererConstructor<DetailPaneConfig<R>>;
}

/**
 * The current state of various features of the grid like filtering, sorting, pagination. This object is emitted as
 * part of the event {@link DatagridComponent.gridRefresh}. The handler then used this object to construct a query.
 */
export interface GridState<R> {
    /**
     * FIQL formatted list of active filters
     */
    filters?: string[];
    /**
     * The currently sorted column in the datagrid.
     */
    sortColumn?: SortedColumn;
    /**
     * The pagination information that the datagrid should show.
     */
    pagination?: PagionationInformation;
}

/**
 * A function that can be used to render the pagination data in the grid.
 */
export interface PaginationCallback {
    (firstItem: number, lastItem: number, totalItems: number): string | Observable<string>;
}

/**
 * For simplifying logic inside the HTML template to differentiate between different {@link GridColumn.renderer}
 * types.
 */
interface ColumnConfigInternal<R, T> extends GridColumn<R> {
    fieldName?: string;
    fieldRenderer?: FunctionRenderer<R>;
    fieldColumnRendererSpec?: ColumnRendererSpec<R, T>;
}

/**
 * Component used for saving the time required for developing a data grid. It takes different properties required for
 * rendering as Inputs and Outputs.
 *
 * Example usage in a component:
 * In the component view, different properties required for the grid are wired as Inputs and Outputs.
 *
 * @example
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
    styleUrls: ['./datagrid.component.scss'],
    providers: [SubscriptionTracker],
})
export class DatagridComponent<R extends B, B = any> implements OnInit, AfterViewInit {
    /**
     * The parent component could provide a callback function to calculate if the row is selectable.
     * When null (default) all rows are selectable.
     */
    @Input()
    isRowSelectableCallback: (item: R) => boolean = null;

    /**
     * Sets the configuration of columns on the grid and updates the {@link columnsConfig} array. Also pushes
     * notifications for listeners to make changes to the _columns array
     */
    @Input()
    set columns(cols: GridColumn<R>[]) {
        this._columns = cols;
        this.updateColumnsConfig();
        this.columnsUpdated.emit();
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
        /**
         * This is due to a known bug in clarity (@link https://github.com/vmware/clarity/issues/2265)
         * where using trackBy breaks the select all functionality unless you
         * add a detectChanges before updating the selection manually.
         */
        if (this.viewInitted) {
            this.changeDetectorRef.detectChanges();
        }
        this.updateSelectedItems();
    }

    /**
     * Type of row selection on the grid
     */
    @Input() set selectionType(selectionType: GridSelectionType) {
        this._selectionType = selectionType;
        this.clearSelectionInformation();
    }

    /**
     * Filters contextual actions from the list of actions to be displayed in a grid row
     */
    contextualActions: ActionItem<R, unknown>[];

    private hasStaticActions: boolean;

    /**
     * List of actions given by the caller
     */
    @Input() set actions(actions: ActionItem<R, unknown>[]) {
        this._actions = actions.map((action) => {
            const actionCopy = { ...action };
            const actionHandler: ActionHandlerType<R, unknown> = actionCopy.handler;
            actionCopy.handler = (selectedEntities, handlerData) => {
                const actionHandlerResponse = actionHandler(selectedEntities, handlerData);
                if (actionHandlerResponse && this.actionReporter) {
                    this.actionReporter.monitorGet(actionHandlerResponse);
                }
            };
            return actionCopy;
        });
        this.hasStaticActions = this.actions.some(
            (action) => action.actionType === ActionType.STATIC_FEATURED || action.actionType === ActionType.STATIC
        );
        this.contextualActions = this.getContextualActions();
    }
    private _actions: ActionItem<R, unknown>[] = [];
    get actions(): ActionItem<R, unknown>[] {
        return this._actions;
    }

    /**
     * To display static and contextual actions in a action bar on top of a grid
     */
    get shouldShowActionBarOnTop(): boolean {
        return (
            this.actions.length &&
            (this.hasStaticActions || (!!this.contextualActions.length && this.shouldDisplayContextualActionsOnTop))
        );
    }

    constructor(
        private node: ElementRef,
        private translationService: TranslationService,
        private changeDetectorRef: ChangeDetectorRef,
        private subTracker: SubscriptionTracker
    ) {}

    /**
     * The pagination information that the user should supply.
     */
    @Input() set pagination(pagination: PaginationConfiguration) {
        this._pagination = { ...pagination };
        if (this._pagination.pageSizeOptions === undefined) {
            this._pagination.pageSizeOptions = [];
        }
        if (this._pagination.shouldShowPageSizeSelector === undefined) {
            this._pagination.shouldShowPageSizeSelector = false;
        }
        if (this._pagination.shouldShowPageNumberInput === undefined) {
            this._pagination.shouldShowPageNumberInput = false;
        }
        this.updatePagination();
    }

    get pagination(): PaginationConfiguration {
        return this._pagination;
    }

    /**
     * Desired height of the grid in pixels. If unspecificed, the grid fills the parent container.
     */
    @Input() set height(height: number) {
        this._height = height;
        const heightCssValue = this.height ? `${this.height}px` : 'unset';
        this.node.nativeElement.style.setProperty('--datagrid-height', heightCssValue);
        this.updatePagination();
    }

    get height(): number {
        return this._height;
    }

    @HostBinding('class.fill-parent') get shouldFillParent(): boolean {
        return this.height === undefined;
    }

    /**
     * Returns the items selected in the VCD datagrid.
     */
    @Input()
    get datagridSelection(): B[] {
        // If a getter returns `[]` it is considered as a new reference in the angular detect changes process
        // while `[]` in the template is not considered a new reference.
        // In other words the following 2 have different behaviour:
        // ```
        // <component_tag
        //    [someInput]='some_getter_that_retyrns_empty_array'
        // ></component_tag>
        // ```
        // ```
        // <component_tag
        //    [someInput]='[]'
        // ></component_tag>
        // ```
        // where the first one will result in setting `someInput` during the change detection while the second one will not
        // TODO:  VDUCC-505 write unit tests
        // The code below is to ensure there is no reference change unless there is a change indeed
        return this._datagridSelection;
    }
    private _datagridSelection = [];
    /**
     * Sets the items selected in the VCD datagrid.
     */
    set datagridSelection(selection: B[]) {
        if (!this.viewInitted) {
            this.initialSelection = selection;
            return;
        }

        if (this._selectionType === GridSelectionType.Single) {
            if (selection) {
                this.datagrid.selection.currentSingle = selection[0];
            } else {
                this.datagrid.selection.currentSingle = null;
            }
        } else if (this._selectionType === GridSelectionType.Multi) {
            this.datagrid.selection.current = selection;
        }
    }

    /**
     * If the contextual buttons should display on the top of a grid.
     */
    get shouldDisplayContextualActionsOnTop(): boolean {
        return (
            this.actionDisplayConfig?.contextual?.position === DatagridContextualActionPosition.TOP &&
            this.datagridSelection.length !== 0
        );
    }

    /**
     * If the contextual buttons should display in a row.
     */
    get shouldDisplayContextualActionsInRow(): boolean {
        return this.actionDisplayConfig?.contextual?.position === DatagridContextualActionPosition.ROW;
    }

    /**
     * If the contextual buttons should display in a row.
     */
    get shouldDisplayContextualActionsInDropdpown(): boolean {
        return this.actionDisplayConfig?.contextual?.styling === ActionStyling.DROPDOWN;
    }

    /**
     * The {@link #maxFeaturedActionsOnRow} value depends in the contextual featured actions config which belongs to the
     * {@link ActionMenuComponent} being used in the rows. So, we wait for action menus in rows to be initialized and then calculate
     * the value
     */
    @ViewChildren('actionMenuInRow') set actionMenusInRow(actionMenus: QueryList<ActionMenuComponent<R, unknown>>) {
        if (!actionMenus || !actionMenus.length) {
            this.maxFeaturedActionsOnRow = 0;
            return;
        }
        let max = 0;
        actionMenus.forEach((actionMenu) => {
            const contextualFeaturedActions = actionMenu.contextualFeaturedActions;
            max = Math.max(contextualFeaturedActions.length, max);
        });
        this.maxFeaturedActionsOnRow = max;
        this.changeDetectorRef.detectChanges();
    }

    private initialSelection: (B | R)[] = [];

    /**
     * An output that emits when the selection changes on the grid.
     */
    @Output() datagridSelectionChange = new EventEmitter<(B | R)[]>();
    /**
     * An output that emits when the selection changes on the grid.
     *
     * @deprecated
     */
    @Output() selectionChanged = this.datagridSelectionChange;

    /**
     * How to display the static and contextual actions.
     * If not set, this will default to the output of {@link getDefaultDatagridActionDisplayConfig}
     */
    @Input() set actionDisplayConfig(value: DatagridActionDisplayConfig) {
        this._actionDisplayConfig = getDefaultDatagridActionDisplayConfig(value);
    }
    private _actionDisplayConfig: DatagridActionDisplayConfig = getDefaultDatagridActionDisplayConfig();
    get actionDisplayConfig(): DatagridActionDisplayConfig {
        return this._actionDisplayConfig;
    }

    /**
     * Emitted whenever {@link #columns} input is updated
     */
    @Output() columnsUpdated = new EventEmitter<void>();

    /**
     * A reference to {@link ActionMenuComponent} that is positioned above the grid, in the grid action tool bar
     * This action menu may be dynamically added to / removed from the DOM based on the actions availability so the
     * very reference should be taken from subscription to the list changes.
     */
    @ViewChildren('mainActionMenu')
    public readonly mainActionMenu: QueryList<ActionMenuComponent<unknown, unknown>>;

    /**
     * Columns are updated using set columns, addColumn and removeColumn methods. This cache helps in preserving changes
     * made by each of the methods to columns array and helps in not overwriting the changes made by one of the methods
     * with changes made by another method
     */
    private _columns: GridColumn<R>[];
    /**
     * A optional string to be displayed above the grid.
     */
    @Input()
    header?: string;

    /**
     * The type of activity indicator that should sit ontop of the grid.
     */
    @Input()
    indicatorType: ActivityIndicatorType;

    GridColumnHideable = GridColumnHideable;
    TooltipSize = TooltipSize;
    ActivityIndicatorType = ActivityIndicatorType;

    /**
     * The component that sound be rendered for this detail row.
     *
     * @param R The type of record that this detail component will display.
     */
    @Input() detailComponent: ComponentRendererConstructor<DetailRowConfig<R>>;

    /**
     * Specifies if the row is expanded. The default is false.
     */
    @Input() isRowExpanded = false;

    /**
     * A detail pane that will be displayed when a user selects to expand a row.
     *
     * @param R The type of record that this detail pane will display.
     */
    @Input() detailPane: DetailPane<R>;
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
     * When there is no data, show this message.
     */
    @Input()
    emptyGridPlaceholder: string;

    private _pagination: PaginationConfiguration = {
        pageSize: 'Magic',
        pageSizeOptions: DEFAULT_SIZE_OPTIONS,
    };

    /**
     * The page size to display.
     */
    pageSize = DEFAULT_SIZE;

    /**
     * The complete set of options to show the user.
     */
    pageSizeOptions = DEFAULT_SIZE_OPTIONS;

    private _height: number;

    /**
     * If the grid is currently loading.
     */
    @Input()
    isLoading = false;

    /**
     * Used for simplifying logic inside the HTML template to differentiate between different
     * {@link GridColumn.renderer} types.
     */
    columnsConfig: ColumnConfigInternal<R, unknown>[];

    /**
     * List of items used for displaying rows on the grid
     */
    items: R[] = [];

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

    @ViewChild(ClrDatagrid, { static: true }) datagrid: ClrDatagrid;
    /**
     * The pagination display within the datagrid.
     */
    @ViewChild(ClrDatagridPagination) paginationComponent: ClrDatagridPagination;
    /**
     * The activity reporter that all activites are displayed on
     */
    @ViewChild('actionReporter') actionReporter: ActivityReporter;

    private viewInitted = false;

    /**
     * Used for translating pagination information displayed in the grid
     */
    @Input() paginationTranslationKey: string = DEFAULT_PAGINATION_TRANSLATION_KEY;

    /**
     * Used for calculating the width of actions column
     */
    maxFeaturedActionsOnRow = 0;

    /**
     * If selection should be preserved when the item is not loaded to the grid.
     *
     * Defaults to false;
     */
    @Input() preserveSelection = false;

    private currentPaneSpecRecord: R;
    private currentPaneSpec: { rendererSpec: ComponentRendererSpec<DetailPaneConfig<R>> };

    private currentDetailRowConfig: {
        record: R;
        count: number;
        index: number;
    };
    private currentDetailRowRenderSpec: { rendererSpec: ComponentRendererSpec<DetailRowConfig<R>> };

    private getContextualActions(): ActionItem<R, unknown>[] {
        return this.actions.filter(
            (action) => action.actionType !== ActionType.STATIC_FEATURED && action.actionType !== ActionType.STATIC
        );
    }

    /**
     * To add or replace a column of this datagrid columns. Exposed for columns modifiers(eg: directives) that listen to
     * {@link columnsUpdated} event and want to modify the columns set by components using this datagrid.
     */
    public addColumn(col: GridColumn<R>): void {
        if (!col) {
            return;
        }
        const colIndex = this.findColumnIndex(col);
        if (colIndex !== -1) {
            this._columns[colIndex] = col;
        } else {
            this._columns.push(col);
        }
        this.updateColumnsConfig();
    }

    /**
     * To remove a column from this datagrid columns. Exposed for columns modifiers(eg: directives) that listen to
     * {@link columnsUpdated} event and want to modify the columns set by components using this datagrid.
     */
    public removeColumn(col: GridColumn<R>): void {
        if (!col) {
            return;
        }
        const colIndex = this.findColumnIndex(col);
        if (colIndex !== -1) {
            this._columns.splice(colIndex, 1);
            this.updateColumnsConfig();
        }
    }

    private findColumnIndex(col: GridColumn<R>): number {
        return this.columns.findIndex((column) => col.displayName === column.displayName);
    }

    private updateColumnsConfig(): void {
        this.columnsConfig = this.getColumnsConfig(this.columns);
    }

    /**
     * Returns an identifier for the given record at the given index.
     *
     * If the record has a href, defaults to that. Else, defaults to index.
     */
    @Input() trackBy: TrackByFunction<B> = (index: number, record): string => {
        return (record as any).href;
    };

    /**
     * Returns an identifier for the given column at the given index.
     */
    columnTrackBy(index: number, column: ColumnConfigInternal<R, unknown>): string {
        return column.displayName;
    }

    /**
     * Gives the render spec to create the detail row for the row with the given record, at the given index, and
     * in a datagrid with the given count of total items.
     */
    getDetailRowRenderSpec(
        record: R,
        index: number,
        count: number
    ): { rendererSpec: ComponentRendererSpec<DetailRowConfig<R>> } {
        if (
            !this.currentDetailRowConfig ||
            this.currentDetailRowConfig.record !== record ||
            this.currentDetailRowConfig.index !== index ||
            this.currentDetailRowConfig.count !== count
        ) {
            this.currentDetailRowConfig = { record, index, count };
            this.currentDetailRowRenderSpec = {
                rendererSpec: {
                    type: this.detailComponent,
                    config: this.currentDetailRowConfig,
                },
            };
        }
        return this.currentDetailRowRenderSpec;
    }

    /**
     * Gives the render spec to create the detail pane for the row with the given record.
     */
    getDetailPaneRenderSpec(record: R): { rendererSpec: ComponentRendererSpec<DetailPaneConfig<R>> } {
        if (this.currentPaneSpecRecord !== record) {
            this.currentPaneSpecRecord = record;
            this.currentPaneSpec = {
                rendererSpec: {
                    type: this.detailPane.component,
                    config: { record },
                },
            };
        }
        return this.currentPaneSpec;
    }

    /**
     * Gives the CSS class to use for a given datarow based on its relative index and entity definition.
     */
    @Input() clrDatarowCssClassGetter(row: R, index: number): string {
        return '';
    }

    private updateSelectedItems(): void {
        if (!this.preserveSelection) {
            if (this._selectionType === GridSelectionType.Single && this.datagrid.selection.currentSingle) {
                // Tries to find the currently selected item. If it isn't found, clears the selection.
                const current = this.datagrid.selection.currentSingle as R;
                const found = this.mapSelectedRecords([current], this.items)[0];
                if (!found) {
                    this.datagrid.selection.clearSelection();
                } else {
                    this.datagrid.selection.setSelected(found, true);
                }
            } else if (this._selectionType === GridSelectionType.Multi) {
                // Tries to find the currently selected items. If an item isn't found, clears the selection for that item.
                if (this.datagrid.selection.current && this.datagrid.selection.current.length) {
                    const current = [...this.datagrid.selection.current] as R[];
                    this.datagrid.selection.clearSelection();
                    const nextSelection = this.mapSelectedRecords(current, this.items).filter((item) => item);
                    this.datagrid.selection.updateCurrent(nextSelection, false);
                }
            }
        }
        if (this.datagrid.rows) {
            this.datagrid.rows.notifyOnChanges();
        }
    }

    onClarityDatafridSelectionChange(): void {
        if (this.datagrid.selection.currentSingle) {
            if (
                this._datagridSelection?.length !== 1 ||
                this._datagridSelection[0] !== this.datagrid.selection.currentSingle
            ) {
                this._datagridSelection = [this.datagrid.selection.currentSingle];
            }
        } else if (this.datagrid.selection.current && this.datagrid.selection.current.length) {
            // If there is no selection from Clarity, we should clear the datagrid without creating a new reference.
            this._datagridSelection = this.datagrid.selection.current;
        } else {
            if (this._datagridSelection.length) {
                this._datagridSelection = [];
            }
        }
        this.datagridSelectionChange.emit(this.datagridSelection);
    }

    /**
     * Given an existing selection that is made up of records that are about to become stale,
     * and new records to be loaded into the grid, returns the selection mapped to records
     * from the newly added records, excluding any records that may not be present in the
     * new selection because they are not present in the new data.
     */
    private mapSelectedRecords(currentSelection: R[], newRecords: R[]): R[] {
        return currentSelection.map((selected, selectedIndex) => {
            const found = newRecords.find(
                (item, itemIndex) => this.trackBy(itemIndex, item) === this.trackBy(selectedIndex, selected)
            );
            return found;
        });
    }

    private clearSelectionInformation(): void {
        if (!this.datagrid) {
            return;
        }
        if (this._selectionType === GridSelectionType.Single) {
            this.datagrid.selected = undefined;
            this.datagrid.singleSelected = null;
        } else if (this._selectionType === GridSelectionType.Multi) {
            this.datagrid.singleSelected = undefined;
            this.datagrid.selected = [];
        } else if (this._selectionType === GridSelectionType.None) {
            this.datagrid.selected = [];
            this.datagrid.singleSelected = undefined;
            this.datagrid.selected = undefined;
        }
    }

    /**
     * Called when the {@param state} of the Clarity datagrid changes.
     */
    gridStateChanged(state: ClrDatagridStateInterface): void {
        const vcdDgState: GridState<R> = {
            pagination: {
                pageNumber: state.page ? state.page.current : 1,
                itemsPerPage: state.page ? state.page.size : DEFAULT_SIZE,
            },
        };
        if (state.filters) {
            vcdDgState.filters = state.filters.map((filter: DatagridFilter<unknown, unknown, FormGroup>) =>
                filter.getValue()
            );
        }
        if (state.sort && typeof state.sort.by === 'string') {
            vcdDgState.sortColumn = {
                name: state.sort.by,
                reverse: state.sort.reverse,
            };
        }
        this.gridRefresh.emit(vcdDgState);
    }

    /**
     * Is the given column able to be hidden by the user through the show/hide menu.
     */
    isColumnHideable(column: GridColumn<R>): boolean {
        return column && column.hideable !== GridColumnHideable.Never;
    }

    /**
     * Resets the pagination to page 1.
     */
    resetToPageOne(): void {
        this.paginationComponent.currentPage = 1;
    }

    /**
     * Gives the correct string to display for the pagination.
     */
    getPaginationTranslation(paginationData: ClrDatagridPagination): LazyString {
        return this.translationService.translateAsync(this.paginationTranslationKey, [
            {
                firstItem: paginationData.firstItem + 1,
                lastItem: paginationData.lastItem + 1,
                totalItems: paginationData.totalItems,
            },
        ]);
    }

    /**
     * The number of rows in a single page.
     */
    private getPageSize(): number {
        if (typeof this.pagination.pageSize === 'number') {
            return this.pagination.pageSize;
        }
        if (this.pagination.pageSize === 'Magic' && this.viewInitted) {
            return this.calculatePageSize();
        }
        return DEFAULT_SIZE;
    }

    /**
     * Available page size options in the dropdown
     */
    private getPageSizeOptions(): number[] {
        let options = this.pagination.pageSizeOptions.map((size) => size);
        if (options.indexOf(this.pageSize) === -1) {
            options.push(this.pageSize);
            options = options.sort((a, b) => a - b);
        }
        return options;
    }

    /**
     *  Calculates the pageSize from the available space in the datagrid body
     */
    private calculatePageSize(): number {
        const grid = this.node.nativeElement;
        const gridHeight = grid.parentNode.clientHeight;

        const headerHeight = grid.querySelector('.datagrid-header').offsetHeight;
        const footerHeight = grid.querySelector('clr-dg-footer').offsetHeight;
        const rowHeight = this.pagination.rowHeight || ROW_HEIGHT;

        // Substracting the height of the header, actionbar and footer
        let availableHeight = (this.height || gridHeight) - headerHeight - footerHeight;
        if (!this.height) {
            const header = grid.querySelector('.vcd-header');
            availableHeight -= header ? header.offsetHeight : 0;
        }
        if (this.shouldShowActionBarOnTop) {
            availableHeight -= ROW_HEIGHT;
        }

        // Calculate the pageSize by dividing the available height by the row height.
        const pageSize = Math.floor(availableHeight / rowHeight);

        // If the calculated pageSize is less than the default, set the pageSize to the default one.
        return Math.max(DEFAULT_SIZE, pageSize);
    }

    /**
     * Updates the pagination information by recalculating pageSize if needed.
     */
    private updatePagination(): void {
        this.pageSize = this.getPageSize();
        this.pageSizeOptions = this.getPageSizeOptions();
    }

    /**
     * Defines the {@property columnsConfig} by adding extra property required for differentiating different kinds
     * of renderers which is required in the HTML template.
     */
    public getColumnsConfig(columns): ColumnConfigInternal<R, unknown>[] {
        return columns.map((column) => {
            const columnConfig: ColumnConfigInternal<R, unknown> = {
                ...column,
            };

            if (column.renderer instanceof Function) {
                columnConfig.fieldRenderer = column.renderer as FunctionRenderer<R>;
            } else if ((column.renderer as ColumnRendererSpec<R, unknown>).config) {
                columnConfig.fieldColumnRendererSpec = column.renderer as ColumnRendererSpec<R, unknown>;
            } else {
                columnConfig.fieldName = column.renderer as string;
            }

            // Add query filed required for the column filtering. This is then used in DatagridFilter.queryField
            if (column.queryFieldName && column.filter) {
                column.filter.config.queryField = column.queryFieldName;
            }

            return columnConfig;
        });
    }

    /**
     * Apply the parent's component callback when available.
     * The default is to make all rows selectable.
     * @param row to make selectable or not.
     */
    public isRowSelectable(row: R): boolean {
        if (!this.isRowSelectableCallback) {
            return true;
        }

        return this.isRowSelectableCallback(row);
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.clearSelectionInformation();
    }

    ngAfterViewInit(): void {
        this.viewInitted = true;
        this.datagridSelection = this.initialSelection;
        if (this.pagination.pageSize === 'Magic') {
            this.updatePagination();
            // We need to update the page size in ngAfterViewInit because when it is set
            // to magically calculate, we need to know that the rest of the page has been rendered.
            // Yet, this causes a ExpressionChangedAfterItHasBeenCheckedError because we are changing
            // pageSize in this method. So we need to detectChanges to avoid an error or
            // calling a setTimeout.
            this.changeDetectorRef.detectChanges();
        }

        this.subTracker.subscribe(this.columnsUpdated, () => {
            this.datagrid.columns.reset(this.datagrid.columns.toArray());
        });
    }
}
