/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Injectable, OnDestroy } from '@angular/core';
import { ActiveQuickSearchFilter, QuickSearchFilter } from './quick-search.component';
import { QuickSearchProvider, QuickSearchNestedProvider } from './quick-search.provider';

@Injectable({
    providedIn: 'root',
})
export class QuickSearchService {
    registrations: QuickSearchProvider[] = [];
    nestedProviders: QuickSearchNestedProvider[] = [];

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
