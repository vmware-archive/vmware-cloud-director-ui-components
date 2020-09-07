/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Injectable, OnDestroy } from '@angular/core';
import { QuickSearchProvider } from './quick-search.provider';

@Injectable({
    providedIn: 'root',
})
export class QuickSearchService {
    registrations: QuickSearchProvider[] = [];

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

    /**
     * Get a list of all the registered search providers.
     */
    public getRegisteredProviders(): QuickSearchProvider[] {
        return [...this.registrations];
    }
}
