/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClrDatagridPagination } from '@clr/angular';
import { LazyString, TranslationService } from '@vcd/i18n';
import { Observable } from 'rxjs';
import { ComponentRendererConstructor, ComponentRendererSpec } from '../../datagrid';
import { NonEmptyArray } from '../sharing-modal.component';

/**
 * The objects an entity must have. You are allowed to pass a more complicated object.
 */
export interface Entity {
    /**
     * The name of this entity.
     */
    name: string;
    /**
     * The unique href of this entity.
     */
    href: string;
}

/**
 * Adds the rights that this entity has been granted.
 */
export interface SelectedEntity extends Entity {
    accessRight: string;
}

/**
 * The result returned when the user searches in the combobox.
 */
export interface SearchResult {
    items: Entity[];
    totalCount: number;
}

/**
 * The result that is output for a given tab from the sharing modal.
 */
export interface SharingTabResult {
    selectedItems?: SelectedEntity[];
    selectAllRights?: string;
}

/**
 * A tab with a predefined ID and title.
 */
export interface PredefinedSharingTab {
    /**
     * The possible rights that can be selected to share with from this tab. Must have at least one element.
     */
    rightsOptions: NonEmptyArray<string>;

    /**
     * Which of the user type this entity is already share dwith.
     */
    currentlySharedWith: SelectedEntity[];

    /**
     * How a given Entity should be rendered in the grid and combobox. Will be given the type of object you return from {@param makeSearch}.
     * If non is given, defaults to display the name as text.
     */
    entityRenderer?: ComponentRendererConstructor<Entity>;

    /**
     * The placeholder to put in the combobox when no search has been entered.
     */
    comboboxPlaceholder?: LazyString;

    /**
     * Called when the user types something into or opens the combobox. Returns the results from that search.
     */
    makeSearch(criteria?: string): Promise<SearchResult>;
}

/**
 * The configuration for a tab in the sharing modal.
 */
export interface SharingTab extends PredefinedSharingTab {
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
 */
@Component({
    selector: 'vcd-sharing-modal-tab',
    templateUrl: 'sharing-modal-tab.component.html',
    styleUrls: ['./sharing-modal-tab.component.scss'],
})
export class SharingModalTabComponent implements OnInit {
    constructor(private translationService: TranslationService) {}

    /**
     * If this tab is in select all mode.
     */
    @Input()
    isSelectAll: boolean = false;

    /**
     * How a given Entity should be rendered. Will be given the type of object you return from {@param makeSearch}
     */
    @Input()
    entityRenderer: ComponentRendererConstructor<any & Entity>;

    /**
     * The unique ID of this tab.
     */
    @Input()
    id: string;

    /**
     * The possible rights that can be selected to share with from this tab. Must have at least one element.
     */
    @Input()
    rightsOptions: NonEmptyArray<string>;

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
     * Which of the user type this entity is already share dwith.
     */
    @Input()
    currentlySharedWith: SelectedEntity[];

    /**
     * Emitted when anything about the list of users currently shared with changes.
     */
    @Output()
    currentlySharedWithChange: EventEmitter<SelectedEntity[]> = new EventEmitter();

    /**
     * The right that is currently selected in the rights dropdown for pending users.
     */
    currentlySelectedRight: string;

    /**
     * The results returned from a search in the combobox.
     */
    searchResults: Entity[];

    /**
     * The entities currently selected in the combobox,
     */
    comboboxSelection: Entity[] = [];

    /**
     * Called when the user types something into or opens the combobox. Returns the results from that search.
     */
    @Input()
    makeSearch = (criteria?: string): Promise<SearchResult> => {
        return Promise.resolve({
            items: [],
            totalCount: 0,
        });
    };

    /**
     * Removes the given entity from the currently selected list.
     */
    removeEntity(entity: Entity): void {
        this.currentlySharedWith = this.currentlySharedWith.filter((toTest) => toTest.href !== entity.href);
        this.currentlySharedWithChange.emit(this.currentlySharedWith);
    }

    /**
     * Adds the entities selected in the combobox to the datagrid.
     */
    addPendingEntities(): void {
        const selectedVersion: SelectedEntity[] = this.comboboxSelection.map((selected) => {
            (selected as SelectedEntity).accessRight = this.currentlySelectedRight;
            return selected as SelectedEntity;
        });
        this.currentlySharedWith = [...selectedVersion, ...this.currentlySharedWith];
        this.comboboxSelection = [];
        this.currentlySharedWithChange.emit(this.currentlySharedWith);
    }

    /**
     * Makes a call to {@param makeSearch} and properly enables loading for the combobox.
     */
    doSearchInternal(criteria?: string): void {
        this.searchResults = undefined;
        this.makeSearch(criteria).then((result) => {
            this.searchResults = result.items;
        });
    }

    /**
     * Gives the render spec to render an given entity.
     */
    getEntityRenderSpec(entity: Entity): ComponentRendererSpec<Entity> {
        return {
            type: this.entityRenderer,
            config: entity,
        };
    }

    /**
     * Says if this user is the owner of the entity to share.
     */
    isOwner(entity: SelectedEntity): boolean {
        return !this.rightsOptions.includes(entity.accessRight);
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
    entityTrackBy(_index: number, entity: Entity): string {
        return entity.href;
    }

    /**
     * Says if this combobox is both enabled and has entities to submit.
     */
    isComboboxSubmittable(): boolean {
        return this.comboboxSelection === null || this.comboboxSelection.length === 0 || this.isSelectAll;
    }

    /**
     * Updates this entity in the currently shared with list to have the given access right.
     */
    updateEntityRights(entity: SelectedEntity, newAcceessRight: string): void {
        this.currentlySharedWith.find((toTest) => entity.href === toTest.href).accessRight = newAcceessRight;
        this.currentlySharedWithChange.emit(this.currentlySharedWith);
    }

    ngOnInit(): void {
        this.currentlySelectedRight = this.rightsOptions[0];
    }
}
