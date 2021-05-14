/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { ActiveQuickSearchFilter, QuickSearchFilter } from './quick-search.component';
import { QuickSearchProvider, QuickSearchNestedProvider } from './quick-search.provider';

@Injectable({
    providedIn: 'root',
})
export class QuickSearchService {
    registrations: QuickSearchProvider[] = [];
    nestedProviders: QuickSearchNestedProvider[] = [];
    filters: QuickSearchFilter[] = [];
    private _filterOverrides: ReplaySubject<[string, string[]]> = new ReplaySubject();
    filterOverrides: Observable<[string, string[]]> = this._filterOverrides;

    /**
     * Says if the quick search modal is pinned.
     */
    isPinned: boolean = false;

    /**
     * Register a search provider
     * @param provider The search provider {@link QuickSearchProvider}
     */
    public registerProvider(provider: QuickSearchProvider): void {
        const order = typeof provider.order === 'undefined' ? -1 : provider.order;

        let insertIndex = -1;
        // Determine the position of the new registration
        if (order > -1) {
            insertIndex = this.registrations.findIndex((prov) => {
                // If an item has a negative index, this means no order had been provided for that item
                // which means we have found the insert index
                if (prov.order < 0) {
                    return true;
                }

                // If an item has a bigger order than the new one means we have found the insert index
                if (order < prov.order) {
                    return true;
                }
            });
        }

        if (insertIndex > -1) {
            this.registrations.splice(insertIndex, 0, provider);
        } else {
            this.registrations.push(provider);
        }
    }

    /**
     * Unregister a search provider by providing the registration id.
     * Returns true if un-registration was done.
     * @param provider Provider to be unregistered
     */
    public unregisterProvider(provider: QuickSearchProvider): boolean {
        const index = this.registrations.findIndex((regProvider) => regProvider === provider);
        if (index > -1) {
            this.registrations.splice(index, 1);
        }
        return index > -1;
    }

    public registerNestedProvider(nestedProvider: QuickSearchNestedProvider) {
        const order = typeof nestedProvider.order === 'undefined' ? -1 : nestedProvider.order;

        let insertIndex = -1;
        // Determine the position of the new registration
        if (order > -1) {
            insertIndex = this.nestedProviders.findIndex((prov) => {
                // If an item has a negative index, this means no order had been provided for that item
                // which means we have found the insert index
                if (prov.order < 0) {
                    return true;
                }

                // If an item has a bigger order than the new one means we have found the insert index
                if (order < prov.order) {
                    return true;
                }
            });
        }

        if (insertIndex > -1) {
            this.nestedProviders.splice(insertIndex, 0, nestedProvider);
        } else {
            this.nestedProviders.push(nestedProvider);
        }
    }

    public unregisterNestedProvider(nestedProvider: QuickSearchNestedProvider) {
        const index = this.nestedProviders.findIndex((regProvider) => regProvider === nestedProvider);
        if (index > -1) {
            this.nestedProviders.splice(index, 1);
        }
        return index > -1;
    }

    /**
     * Get a list of all the registered search providers.
     */
    public getRegisteredProviders(filters?: ActiveQuickSearchFilter[]): QuickSearchProvider[] {
        if (!filters || !filters.length) {
            return [...this.registrations];
        }
        return this.registrations.filter((searchProvider) => this.providerShouldBeActive(searchProvider, filters));
    }

    public getRegisteredNestedProviders(filters?: ActiveQuickSearchFilter[]): QuickSearchNestedProvider[] {
        if (!filters || !filters.length) {
            return [...this.nestedProviders];
        }
        const newNestedProviders: QuickSearchNestedProvider[] = this.nestedProviders.map((nestedProvider) => {
            return {
                order: nestedProvider.order,
                sectionName: nestedProvider.sectionName,
                children: nestedProvider.children.filter((provider) => this.providerShouldBeActive(provider, filters)),
            };
        });
        return newNestedProviders.filter((provider) => provider.children.length);
    }

    /**
     * Selects the given filterValue on the filter represented by the given filterId.
     * Clears any current selection on the filter.
     *
     * @example selectFilter('type', 'org') selects the Organization option in the "Type" filter.
     */
    public selectFilter(filterId: string, filterValues: string[]): void {
        this._filterOverrides.next([filterId, filterValues]);
    }

    /**
     * Adds a filter to the list of registered filters. A filter can be used to filter the list of providers and/or the results from a given provider.
     *
     * All filters have some ID that is displayed and a list of options for their value. These options can also have associated data.
     *
     * A provider then must know
     * 1. If it can respond to a given filter</li>
     * 2. How to filter the search results given the filter</li>
     *
     * This means that if Filter A is present, and Provider 1 cannot respond to it, Provider 1 will not be displayed. Provider 2 must
     * then filter its results based on the filter.
     *
     * If two filters of different IDs are used in the search, the filters should act like and's. If two filters of the same ID
     * are present in the search, the filter should act like an or.
     */
    registerFilters(filter: QuickSearchFilter[]) {
        this.filters.push(...filter);
    }

    /**
     * Removes the given filterId from the list of registered filters.
     */
    unregisterFilter(filterId: string) {
        this.filters.filter((filter) => filter.id !== filterId);
    }

    private providerShouldBeActive(provider: QuickSearchProvider, filters: ActiveQuickSearchFilter[]): boolean {
        const filtersGrouped = new Map<string, ActiveQuickSearchFilter[]>();
        filters.forEach((filter) => {
            const current = filtersGrouped.get(filter.id);
            if (current) {
                current.push(filter);
            } else {
                filtersGrouped.set(filter.id, [filter]);
            }
        });

        return Array.from(filtersGrouped.keys()).every((key) =>
            filtersGrouped.get(key).some((filter) => provider.canHandleFilter && provider.canHandleFilter(filter))
        );
    }
}
