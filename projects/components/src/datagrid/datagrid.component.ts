/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import {
    AfterViewInit,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnInit,
    Output,
    TemplateRef,
    TrackByFunction,
    ViewChild,
} from '@angular/core';
import { ClrDatagrid, ClrDatagridFilter, ClrDatagridPagination, ClrDatagridStateInterface } from '@clr/angular';
import { CanTranslate, LazyString, TranslationService } from '@vcd/i18n';
import { Observable } from 'rxjs';
import { ActivityReporter } from '../common/activity-reporter/activity-reporter';
import { TooltipSize } from '../lib/directives/show-clipped-text.directive';
import { DatagridFilter } from './filters/datagrid-filter';
import {
    Button,
    ButtonConfig,
    ButtonTitleDisplay,
    ColumnRendererSpec,
    ContextualButtonPosition,
    FunctionRenderer,
    GridColumn,
    GridColumnHideable,
    InactiveButtonDisplayMode,
} from './interfaces/datagrid-column.interface';
import { ContextualButton } from './interfaces/datagrid-column.interface';

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
 * The information the user gives to show page size and page size options in the pagination footer.
 */
export interface PaginationConfiguration {
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

    /**
     * The height of a row in the datagrid. If not set, will use the default of {@link ROW_HEIGHT}.
     */
    rowHeight?: number;
    /**
     * If the page size option dropdown should be shown.
     * Defaults to false.
     */
    shouldShowPageSizeSelector?: boolean;
    // TODO: add disable page number input when we upgrade Clarity minor version
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
})
export class DatagridComponent<R> extends CanTranslate(class {}) implements OnInit, AfterViewInit {
    /**
     * A optional string to be displayed above the grid.
     */
    @Input()
    header?: string;

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
     * The type of activity indicator that should sit ontop of the grid.
     */
    @Input()
    indicatorType: ActivityIndicatorType;

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

    ContextualButtonPosition = ContextualButtonPosition;
    GridColumnHideable = GridColumnHideable;
    TooltipSize = TooltipSize;
    ActivityIndicatorType = ActivityIndicatorType;
    ButtonTitleDisplay = ButtonTitleDisplay;
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
     * Sets the button configuration on the datagrid.
     *
     * {@link ButtonConfig.inactiveDisplayMode} defualts to Disabled.
     */
    @Input() set buttonConfig(config: ButtonConfig<R>) {
        this._buttonConfig = config;
        this._buttonConfig.contextualButtonConfig.titleDisplay =
            this._buttonConfig.contextualButtonConfig.titleDisplay || ButtonTitleDisplay.ICON;
        this._buttonConfig.inactiveDisplayMode =
            this._buttonConfig.inactiveDisplayMode || InactiveButtonDisplayMode.Disable;
        if (this._buttonConfig.contextualButtonConfig.featured) {
            this.featuredButtons = new Map(
                this._buttonConfig.contextualButtonConfig.featured.map(featuredButtonClass => [
                    featuredButtonClass,
                    this._buttonConfig.contextualButtonConfig.buttons.find(
                        button => button.class === featuredButtonClass
                    ),
                ])
            );
            this.featuredButtons.forEach(featured => {
                if (!featured) {
                    throw new Error('Featured button was not found');
                }
            });
        } else {
            this.featuredButtons = new Map(
                this._buttonConfig.contextualButtonConfig.buttons.map(featuredButton => [
                    featuredButton.class,
                    featuredButton,
                ])
            );
        }
    }

    /**
     * Gives the button config of the datagrid.
     */
    get buttonConfig(): ButtonConfig<R> {
        return this._buttonConfig;
    }

    constructor(private node: ElementRef, public translationService: TranslationService) {
        super();
    }

    /**
     * The stored button config where inactiveDisplayMode is always non-undefined.
     */
    _buttonConfig: ButtonConfig<R> = {
        globalButtons: [],
        contextualButtonConfig: {
            buttons: [],
            featured: [],
            position: ContextualButtonPosition.TOP,
            featuredCount: 0,
        },
        inactiveDisplayMode: InactiveButtonDisplayMode.Disable,
    };

    /**
     * The cache of button ID to button config that contains only the featured buttons.
     */
    featuredButtons: Map<string, ContextualButton<R>> = new Map();

    /**
     * When there is no data, show this message.
     *
     * TODO: Try to avoid showing this before initial load.
     */
    emptyGridPlaceholder: string;

    /**
     * The pagination information that the user should supply.
     */
    @Input() set pagination(pagination: PaginationConfiguration) {
        this._pagination = { ...pagination };
        if (this._pagination.shouldShowPageSizeSelector === undefined) {
            this._pagination.shouldShowPageSizeSelector = false;
        }
        this.updatePagination();
    }

    get pagination(): PaginationConfiguration {
        return this._pagination;
    }

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

    private _height: number;

    @HostBinding('class.fill-parent') get shouldFillParent(): boolean {
        return this.height === undefined;
    }

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
     * The activity reporter that all activites are displayed on
     */
    @ViewChild('actionReporter', { static: false }) actionReporter: ActivityReporter;

    /**
     * Returns an identifier for the given record at the given index.
     *
     * If the record has a href, defaults to that. Else, defaults to index.
     */
    @Input() trackBy: TrackByFunction<R & { href?: string }> = (index: number, record): string => {
        return record.href || String(index);
    };

    /**
     * Gives the correct string to display for the pagination.
     *
     * @param firstItem the index of the first item displayed.
     * @param lastItem the index of the last item displayed.
     * @param totalItems the total number of items that could be displayed.
     */
    @Input() paginationCallback(firstItem: number, lastItem: number, totalItems: number): string | Observable<string> {
        return this.translateAsync('vcd.cc.grid.default.pagination', [
            {
                firstItem,
                lastItem,
                totalItems,
            },
        ]);
    }

    /**
     * Says if the action bar has contents to show.
     */
    shouldShowActionBar(): boolean {
        return (
            this.buttonConfig.globalButtons.length !== 0 ||
            this.buttonConfig.contextualButtonConfig.buttons.length !== 0
        );
    }

    /**
     * Returns the buttons that should be featured given the {@link datagridSelection} or the given {@param record}.
     *
     * @throws Error if a featured button cannot be found.
     */
    getFeaturedButtons(records?: R[]): ContextualButton<R>[] {
        return this._buttonConfig.contextualButtonConfig.buttons
            .filter(button => this.isButtonShown(button, records) && this.featuredButtons.get(button.class))
            .slice(0, this._buttonConfig.contextualButtonConfig.featuredCount || this.featuredButtons.size);
    }

    /**
     * Returns the maximum number of featured buttons next to a single row.
     */
    getMaxFeaturedButtonsOnRow(): number {
        let max = 0;
        this.items.forEach(item => {
            max = Math.max(this.getFeaturedButtons([item]).length, max);
        });
        return max;
    }

    /**
     * Says if the given button should appear on the datagrid.
     */
    isButtonShown(button: Button<R>, records?: R[]): boolean {
        const selection = records ? records : this.datagridSelection;
        return button.isActive(selection) || this.getDisplayMode(button) === InactiveButtonDisplayMode.Disable;
    }

    /**
     * Says if the given button should be marked as disabled.
     */
    isButtonDisabled(button: Button<R>, active: boolean): boolean {
        return !active && this.getDisplayMode(button) === InactiveButtonDisplayMode.Disable;
    }

    /**
     * Gives the display mode of a button.
     */
    getDisplayMode(button: Button<R>): InactiveButtonDisplayMode {
        return button.inactiveDisplayMode || this._buttonConfig.inactiveDisplayMode;
    }

    /**
     * Says if the contextual buttons should display on the top.
     */
    shouldDisplayButtonsOnTop(): boolean {
        return (
            this._buttonConfig.contextualButtonConfig.position === ContextualButtonPosition.TOP &&
            this.datagridSelection.length !== 0
        );
    }

    /**
     * Says if the contextual buttons should display on the row.
     */
    shouldDisplayButtonsOnRow(): boolean {
        return this._buttonConfig.contextualButtonConfig.position === ContextualButtonPosition.ROW;
    }

    /**
     * Says if there are contextual buttons to display.
     */
    hasContextualButtons(): boolean {
        return this._buttonConfig.contextualButtonConfig.buttons.length !== 0;
    }

    /**
     * Runs the handler function for the given button with the given selection.
     */
    runButtonHandler(button: Button<R>, selection?: R[]): void {
        const response = button.handler(selection);
        if (response && this.actionReporter) {
            this.actionReporter.monitorActivity(response);
        }
    }

    /**
     * Gives the CSS class to use for a given datarow based on its relative index and entity definition.
     */
    @Input() clrDatarowCssClassGetter(row: R, index: number): string {
        return '';
    }

    private updateSelectedItems(): void {
        if (this._selectionType === GridSelectionType.Single && this.datagrid.selection.currentSingle) {
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
    get datagridSelection(): R[] {
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
        const vcdDgState: GridState<R> = {
            pagination: {
                pageNumber: state.page ? state.page.current : 1,
                itemsPerPage: state.page ? state.page.size : DEFAULT_SIZE,
            },
        };
        if (state.filters) {
            vcdDgState.filters = state.filters.map((filter: DatagridFilter<unknown, unknown>) => filter.getValue());
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
     * Updates the pagination data and makes the callback.
     */
    paginationCallbackWrapper(paginationData: ClrDatagridPagination): LazyString {
        return this.paginationCallback(paginationData.firstItem + 1, paginationData.lastItem + 1, this.totalItems);
    }

    /**
     * The number of rows in a single page.
     */
    private getPageSize(): number {
        if (typeof this.pagination.pageSize === 'number') {
            return this.pagination.pageSize;
        }
        if (this.pagination.pageSize === 'Magic') {
            return this.calculatePageSize();
        }
        return DEFAULT_SIZE;
    }

    /**
     * Available page size options in the dropdown
     */
    private getPageSizeOptions(): number[] {
        let options = this.pagination.pageSizeOptions.map(size => size);
        if (options.indexOf(this.getPageSize()) === -1) {
            options.push(this.getPageSize());
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

        const headerHeight = grid.querySelector('.datagrid-header').clientHeight;
        const footerHeight = grid.querySelector('clr-dg-footer').clientHeight;
        const rowHeight = this.pagination.rowHeight || ROW_HEIGHT;

        // Substracting the height of the header, actionbar and footer
        let availableHeight = (this.height || gridHeight) - headerHeight - footerHeight;
        if (!this.height) {
            const header = grid.querySelector('.vcd-header');
            availableHeight -= header ? header.clientHeight : 0;
        }
        if (this.shouldShowActionBar()) {
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
    private getColumnsConfig(): void {
        this.columnsConfig = this.columns.map(column => {
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

    ngOnInit(): void {
        this.isLoading = true;
        this.clearSelectionInformation();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.updatePagination();
        });
    }
}
