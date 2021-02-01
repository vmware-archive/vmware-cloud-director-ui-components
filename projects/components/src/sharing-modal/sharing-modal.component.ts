/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LazyString } from '@vcd/i18n';
import { ComboOption } from './select-all-checkbox/select-all-toggle.component';
import { SharingTab, SharingTabResult } from './tabs/sharing-modal-tab.component';

export type SharingModalResult = Map<string, SharingTabResult<unknown>>;

export type NonEmptyArray<T> = T[] & { 0: T };

/**
 * Allows the creation of toggles to select all for some set of entities.
 * Allows selection for any rights that are included in each tab.
 */
export interface SharingSelectAllToggle {
    /**
     * The tabs that this will select all for.
     */
    tabIds: NonEmptyArray<string>;
    /**
     * The text that will be displayed next to the toggle.
     */
    description: LazyString;
    /**
     * The right that they are set to if currently selected.
     * If unset, will be set to false.
     */
    currentSelectAllRight?: string;
}

/**
 * A modal for sharing some entities with other types of entities.
 */
@Component({
    selector: 'vcd-sharing-modal',
    templateUrl: 'sharing-modal.component.html',
    styleUrls: ['./sharing-modal.component.scss'],
})
export class SharingModalComponent implements OnInit {
    /**
     * The title of this modal.
     */
    @Input()
    title: LazyString;

    /**
     * All of the options of entities that the use can share to.
     */
    @Input()
    tabs: SharingTab<unknown>[];

    /**
     * The select all toggles that should appear at the top of the modal.
     * These allow the user to share with all options in a certain tab(s).
     */
    @Input()
    selectAllToggles: SharingSelectAllToggle[];

    /**
     * If the modal should be opened or closed.
     */
    @Input()
    isOpened = false;

    @Output()
    isOpenedChange: EventEmitter<boolean> = new EventEmitter();

    /**
     * The event that is emitted when the user clicks the submit button.
     */
    @Output()
    formSubmitted: EventEmitter<SharingModalResult> = new EventEmitter();

    /**
     * A map of tabId to the right this tab is selected all for.
     */
    tabsSelectAll: Map<string, string> = new Map();

    /**
     * Closes this sharing modal. Resets the values within.
     */
    closeForm(): void {
        this.isOpened = false;
        this.isOpenedChange.emit(false);
        this.tabsSelectAll = new Map();
    }

    /**
     * Submits the sharing form.
     */
    submitForm(): void {
        this.isOpened = false;
        const output = new Map();

        for (const tab of this.tabs) {
            if (!output.get(tab.id)) {
                output.set(tab.id, {
                    selectedItems: tab.currentlySharedWith,
                });
            }
        }
        for (const tab of this.tabsSelectAll.keys()) {
            if (this.tabsSelectAll.get(tab)) {
                output.set(tab, {
                    selectAllRights: this.tabsSelectAll.get(tab),
                });
            }
        }

        this.formSubmitted.emit(output);
        this.closeForm();
    }

    /**
     * Updates the map of select all rights for the given tabs.
     */
    selectAllChange(tabIds: string[], right?: string): void {
        for (const id of tabIds) {
            this.tabsSelectAll.set(id, right);
        }
    }

    /**
     * Calculates the subset of rights contained within all the given tabs.
     *
     * @throws Error if there are no common rights.
     */
    calculateRightsOptions(tabIds: string[]): ComboOption[] {
        const tabs = tabIds.map((id) => this.getTabById(id));
        let rights = tabs[0].rightsOptions;
        tabs.shift();
        for (const tab of tabs) {
            rights = rights.filter((right) =>
                tab.rightsOptions.find((tabRight) => tabRight.value === right.value)
            ) as NonEmptyArray<ComboOption>;
            if (rights.length === 0) {
                throw new Error('There is no shared set of rights between these tabs');
            }
        }
        return rights;
    }

    /**
     * Gives the tab with the given ID.
     */
    getTabById(id: string): SharingTab<unknown> {
        return this.tabs.find((tab) => tab.id === id);
    }

    ngOnInit(): void {
        if (this.selectAllToggles) {
            for (const toggle of this.selectAllToggles) {
                if (toggle.currentSelectAllRight) {
                    toggle.tabIds.map((tabId) => {
                        this.tabsSelectAll.set(tabId, toggle.currentSelectAllRight);
                    });
                }
            }
        }
    }
}
