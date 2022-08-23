/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ClrDatagridPagination } from '@clr/angular';
import { LazyString, TranslationService } from '@vcd/i18n';
import { Observable } from 'rxjs';
import { ActionItem, ActionStyling, ActionType, TextIcon } from '../../common/interfaces/action-item.interface';
import { SubscriptionTracker } from '../../common/subscription/subscription-tracker';
import {
    ColumnComponentRendererSpec,
    ComponentRendererConstructor,
    ComponentRendererSpec,
    DatagridContextualActionPosition,
    GridColumn,
    GridDataFetchResult,
    GridState,
    PaginationConfiguration,
} from '../../datagrid';
import { DatagridActionDisplayConfig } from '../../datagrid/interfaces/datagrid-action-display.interface';
import { CommonUtil } from '../../utils/common-util';
import { RightsDropdownRendererComponent } from '../renderers/rights-dropdown-renderer';
import { ComboOption } from '../select-all-checkbox/select-all-toggle.component';
import { NonEmptyArray } from '../../constants';

export class VcdSharingModalError {
    constructor(public message: string) {}
}

/**
 * The objects an entity must have. You are allowed to pass a more complicated object.
 *
 * @param T is the interface for the Object that is being selected.
 */
export type HasId<T> = T & {
    /**
     * The unique ID of this entity.
     */
    id: string;
};

/**
 * Adds the rights that this entity has been granted.
 *
 * @param T is the interface for the Object that is being selected.
 */
export type IsSelected<T> = HasId<T> & {
    accessRight: ComboOption;
};

/**
 * The result returned when the user searches in the combobox.
 *
 * @param T is the interface for the Object that is being searched.
 */
export interface SearchResult<T> {
    items: HasId<T>[];
    totalCount: number;
}

/**
 * The result that is output for a given tab from the sharing modal.
 *
 * @param T is the interface for the Object that is being shared with.
 */
export interface SharingTabResult<T> {
    selectedItems?: IsSelected<T>[];
    selectAllRights?: string;
}

/**
 * A tab with a predefined ID and title.
 *
 * @param T is the interface for the Object that is being shared with.
 */
export interface PredefinedSharingTab<T> {
    /**
     * The possible rights that can be selected to share with from this tab. Must have at least one element.
     */
    rightsOptions: NonEmptyArray<ComboOption>;

    /**
     * How a given Entity should be rendered in the grid and combobox. Will be given the type of object you return from {@param makeSearch}.
     * If non is given, defaults to display the name as text.
     */
    entityRenderer?: ComponentRendererConstructor<HasId<T>>;

    /**
     * The placeholder to put in the combobox when no search has been entered.
     */
    comboboxPlaceholder?: LazyString;

    /**
     * Called when the user types something into or opens the combobox. Returns the results from that search.
     */
    makeSearch?: (criteria?: string) => Promise<SearchResult<T>>;
}

/**
 * The configuration for a tab in the sharing modal.
 *
 * @param T is the interface for the Object that is being shared with.
 */
export interface SharingTab<T> extends PredefinedSharingTab<T> {
    /**
     * The unique ID of this tab.
     */
    id: string;

    /**
     * The title of this tab.
     */
    title: LazyString;

    /**
     * The text displayed in the datagrid when select all is enabled.
     */
    selectAllText: LazyString;
}

/**
 * A tab that allows users to add users to share with given rights.
 *
 * @param T is the interface for the Object that is being shared with.
 */
@Component({
    selector: 'vcd-sharing-modal-tab',
    templateUrl: 'sharing-modal-tab.component.html',
    styleUrls: ['./sharing-modal-tab.component.scss'],
    providers: [SubscriptionTracker],
})
export class SharingModalTabComponent<T> implements OnInit, AfterViewInit {
    constructor(public translationService: TranslationService, private subTracker: SubscriptionTracker) {}

    /**
     * Which of the user type this entity is already share dwith.
     */
    @Input()
    set currentlySharedWith(currentlySharedWith: IsSelected<T>[]) {
        this.allSharedWith = currentlySharedWith || [];
        this.updateGridItems();
    }

    get currentlySharedWith(): IsSelected<T>[] {
        return this.allSharedWith;
    }

    /**
     * If this tab is in select all mode.
     */
    @Input()
    isSelectAll: boolean = false;

    /**
     * How a given Entity should be rendered. Will be given the type of object you return from {@param makeSearch}
     */
    @Input()
    entityRenderer: ComponentRendererConstructor<HasId<T>>;

    /**
     * The unique ID of this tab.
     */
    @Input()
    id: string;

    /**
     * The possible rights that can be selected to share with from this tab. Must have at least one element.
     */
    @Input()
    rightsOptions: NonEmptyArray<ComboOption>;

    /**
     * The placeholder to put in the combobox when no search has been entered.
     */
    @Input()
    comboboxPlaceholder: LazyString;

    /**
     * The text displayed in the datagrid when select all is enabled.
     */
    @Input()
    selectAllText: LazyString;

    /**
     * Emitted when anything about the list of users currently shared with changes.
     */
    @Output()
    currentlySharedWithChange: EventEmitter<IsSelected<T>[]> = new EventEmitter();

    /**
     * The right that is currently selected in the rights dropdown for pending users.
     */
    currentlySelectedRightValue: string;

    /**
     * The results returned from a search in the combobox.
     */
    searchResults: HasId<T>[];
    totalSearchResults: number;

    /**
     * The entities currently selected in the combobox,
     */
    comboboxSelection: HasId<T>[] = [];

    /**
     * START GRID CONFIGURATION
     */
    columns: GridColumn<IsSelected<T>>[] = [];

    gridItems: GridDataFetchResult<IsSelected<T>> = {
        items: [],
        totalItems: 0,
    };

    actions: ActionItem<IsSelected<T>, unknown>[] = [
        {
            icon: 'trash',
            availability: (record: IsSelected<T>[]) => !this.isOwner(record[0]),
            actionType: ActionType.CONTEXTUAL_FEATURED,
            handler: (selected) => {
                this.removeEntity(selected[0]);
            },
        },
    ];

    actionDisplayConfig: DatagridActionDisplayConfig = {
        contextual: {
            styling: ActionStyling.INLINE,
            buttonContents: TextIcon.ICON,
            position: DatagridContextualActionPosition.ROW,
        },
    };

    paginationInfo: PaginationConfiguration = {
        pageSize: 10,
        pageSizeOptions: [10, 20, 50, 100],
        shouldShowPageNumberInput: true,
        shouldShowPageSizeSelector: true,
    };

    /**
     * END GRID CONFIGURATION
     */

    /**
     * The error returned from a call to makeSearch. Undefined if there is no error.
     */
    searchError: string = undefined;

    private bufferedSearch: (criteria?: string) => Promise<SearchResult<T>>;
    private allSharedWith: IsSelected<T>[] = [];
    private gridState: GridState<IsSelected<T>>;

    gridRefreshed(state: GridState<IsSelected<T>>): void {
        this.gridState = state;
        this.updateGridItems();
    }

    /**
     * Called when the user types something into or opens the combobox. Returns the results from that search.
     */
    @Input()
    makeSearch = (criteria?: string): Promise<SearchResult<T>> => {
        throw new Error('No implementation for makeSearch');
    };

    /**
     * Removes the given entity from the currently selected list.
     */
    removeEntity(entity: HasId<T>): void {
        this.currentlySharedWith = this.currentlySharedWith.filter((toTest) => toTest.id !== entity.id);
        this.currentlySharedWithChange.emit(this.currentlySharedWith);
    }

    /**
     * Adds the entities selected in the combobox to the datagrid.
     */
    addPendingEntities(): void {
        const selectedVersion: IsSelected<T>[] = this.comboboxSelection.map((selected) => {
            (selected as IsSelected<T>).accessRight = this.getRightByValue(this.currentlySelectedRightValue);
            return selected as IsSelected<T>;
        });
        this.currentlySharedWith = [...selectedVersion, ...this.allSharedWith];
        this.comboboxSelection = [];
        this.currentlySharedWithChange.emit(this.currentlySharedWith);
    }

    /**
     * Makes a call to {@param makeSearch} and properly enables loading for the combobox.
     */
    doSearchInternal(criteria?: string): void {
        this.searchResults = undefined;
        this.totalSearchResults = undefined;
        this.bufferedSearch(criteria)
            .then((result) => {
                this.searchError = '';
                this.searchResults = result.items;
                this.totalSearchResults = result.totalCount;
            })
            .catch((error: Error) => {
                if (error instanceof VcdSharingModalError) {
                    this.searchError = error.message;
                    this.searchResults = [];
                } else {
                    throw error;
                }
            });
    }

    /**
     * Gives the render spec to render an given entity.
     */
    getEntityRenderSpec(entity: HasId<T>): ComponentRendererSpec<HasId<T>> {
        return {
            type: this.entityRenderer,
            config: entity,
        };
    }

    /**
     * Says if this user is the owner of the entity to share.
     */
    isOwner(entity: IsSelected<T>): boolean {
        return !this.rightsOptions.find((right) => right.value === entity.accessRight.value);
    }

    /**
     * Gets the translated string to display pagination information.
     */
    getPaginationTranslation(paginationData: ClrDatagridPagination): Observable<string> {
        return this.translationService.translateAsync('vcd.cc.grid.default.pagination', [
            {
                firstItem: paginationData.firstItem + 1,
                lastItem: paginationData.lastItem + 1,
                totalItems: paginationData.totalItems,
            },
        ]);
    }

    /**
     * A trackBy function to track entities.
     */
    entityTrackBy(_index: number, entity: HasId<T>): string {
        return entity.id;
    }

    /**
     * Says if this combobox is both enabled and has entities to submit.
     */
    isComboboxSubmittable(): boolean {
        return !this.comboboxSelection || this.comboboxSelection.length === 0 || this.isSelectAll;
    }

    /**
     * Updates this entity in the currently shared with list to have the given access right.
     */
    updateEntityRights(entity: IsSelected<T>, newAccessRight: string): void {
        this.currentlySharedWith.find((toTest) => entity.id === toTest.id).accessRight = this.getRightByValue(
            newAccessRight
        );
        this.currentlySharedWithChange.emit(this.currentlySharedWith);
    }

    ngOnInit(): void {
        this.currentlySelectedRightValue = this.rightsOptions[0].value;
        this.columns = [
            {
                displayName: this.translationService.translate('vcd.cc.shared.with'),
                renderer: this.entityRenderer
                    ? ColumnComponentRendererSpec({
                          type: this.entityRenderer,
                          config: (record) => record,
                      })
                    : (entity) => this.defaultRenderer(entity),
            },
            {
                displayName: this.translationService.translate('vcd.cc.rights'),
                renderer: ColumnComponentRendererSpec({
                    type: RightsDropdownRendererComponent,
                    config: (record) => {
                        return {
                            entity: record,
                            shouldShowDropdown: !this.isOwner(record),
                            rightsChangedCallback: (entity: IsSelected<T>, newRightValue: string) =>
                                this.updateEntityRights(entity, newRightValue),
                            rightsOptions: this.rightsOptions,
                        };
                    },
                }),
            },
        ];

        this.subTracker.subscribe(this.translationService.translateAsync('vcd.cc.shared.with'), (translation) => {
            this.columns[0].displayName = translation;
            this.columns = [...this.columns];
        });

        this.subTracker.subscribe(this.translationService.translateAsync('vcd.cc.rights'), (translation) => {
            this.columns[1].displayName = translation;
            this.columns = [...this.columns];
        });

        const searchFn = CommonUtil.createBufferedPromise(this.makeSearch, this);

        this.bufferedSearch = (criteria?: string) =>
            searchFn(criteria)
                .then((result) => result)
                .then((result) => result);
    }

    ngAfterViewInit(): void {
        this.updateGridItems();
    }

    defaultRenderer(entity: HasId<T>): string {
        return (entity as any).name;
    }

    updateGridItems(): void {
        if (this.gridState) {
            const startIndex = (this.gridState.pagination.pageNumber - 1) * this.gridState.pagination.itemsPerPage;
            const endIndex = startIndex + this.gridState.pagination.itemsPerPage;
            this.gridItems = {
                items: this.allSharedWith.slice(startIndex, endIndex),
                totalItems: this.allSharedWith.length,
            };
        }
    }

    shouldShowWarning(total: number, visible: number): boolean {
        return total === 0 || total !== visible;
    }

    private getRightByValue(value: string): ComboOption {
        return this.rightsOptions.find((right) => right.value === value);
    }
}
