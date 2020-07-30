/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Injectable } from '@angular/core';
import { SpotlightSearchProvider } from './spotlight-search.provider';

/**
 * Interface describing what providers are registered within the system
 */
export interface RegisteredProviders {
    /**
     * The very search provider
     */
    provider: SpotlightSearchProvider;

    /**
     * The section name (the title or the group name) that this provider will provides results for.
     */
    section: string;
}

/**
 * This interface is used internally by the service
 */
interface InternalRegistrationData extends RegisteredProviders {
    order?: number;
    id: string;
}

/**
 * Create unique id
 */
const createId = ((): (() => string) => {
    let id = 1;
    return () => `${new Date().getTime()}-${id++}`;
})();

@Injectable({
    providedIn: 'root',
})
export class SpotlightSearchService {
    registrations: InternalRegistrationData[] = [];

    /**
     * Register a search provider
     * @param provider The search provider {@link SpotlightSearchProvider}
     * @param section The section name (the title or the group name) that this provider will provides results for.
     * @param order The order of the section in the spotlight search results. Less the order, closer to the beginning
     *        of the list. So 0 means put provider in the beginning of the list, -1 appends the provider at the back.
     */
    public registerProvider(provider: SpotlightSearchProvider, section: string, order: number = -1): string {
        const registrationData = { provider, section, order, id: createId() };

        let insertIndex = -1;
        // Determine the position of the new registration
        if (order > -1) {
            insertIndex = this.registrations.findIndex(data => {
                // If an item has a negative index, this means no order had been provided for that item
                // which means we have found the insert index
                if (data.order < 0) {
                    return true;
                }

                // If an item has a bigger order than the new one means we have found the insert index
                if (order < data.order) {
                    return true;
                }
            });
        }

        if (insertIndex > -1) {
            this.registrations.splice(insertIndex, 0, registrationData);
        } else {
            this.registrations.push(registrationData);
        }

        return registrationData.id;
    }

    /**
     * Unregister a search provider by providing the registration id.
     * Returns true if unregistration was done.
     * @param registrationId the id returned when registering the provider
     */
    public unregisterProvider(registrationId: string): boolean {
        const index = this.registrations.findIndex(data => data.id === registrationId);
        if (index > -1) {
            this.registrations.splice(index, 1);
        }
        return index > -1;
    }

    /**
     * Get a list of all the registered search providers.
     */
    public getRegisteredProviders(): RegisteredProviders[] {
        return this.registrations.map(data => ({ provider: data.provider, section: data.section }));
    }
}
