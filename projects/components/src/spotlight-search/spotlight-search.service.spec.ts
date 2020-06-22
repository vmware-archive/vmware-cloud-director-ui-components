/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { SpotlightSearchResultType } from './spotlight-search-result';
import { SpotlightSearchProvider } from './spotlight-search.provider';
import { SpotlightSearchService } from './spotlight-search.service';

class SimpleSearchProvider implements SpotlightSearchProvider {
    search(criteria: string): SpotlightSearchResultType {
        return [];
    }
}

describe('SpotlightSearchService', () => {
    it('can register a provider', () => {
        const service = new SpotlightSearchService();
        const provider1 = new SimpleSearchProvider();
        service.registerProvider(provider1, 'section1');
        const registeredProvider = service.getRegisteredProviders()[0];
        expect(registeredProvider.provider).toBe(provider1);
        expect(registeredProvider.section).toBe('section1');
    });

    it('registers a provider at the back if no order is provided', () => {
        const service = new SpotlightSearchService();
        service.registerProvider(new SimpleSearchProvider(), 'section1');
        service.registerProvider(new SimpleSearchProvider(), 'section2');
        const providers = service.getRegisteredProviders();
        expect(providers[0].section).toBe('section1');
        expect(providers[1].section).toBe('section2');
    });

    it('registers the providers in the beginning of the list when order 0 i sprovided', () => {
        const service = new SpotlightSearchService();
        service.registerProvider(new SimpleSearchProvider(), 'section1');
        service.registerProvider(new SimpleSearchProvider(), 'section2');
        service.registerProvider(new SimpleSearchProvider(), 'section_first', 0);
        const providers = service.getRegisteredProviders();
        expect(providers[0].section).toBe('section_first');
        expect(providers[1].section).toBe('section1');
        expect(providers[2].section).toBe('section2');
    });

    it('registers providers in specific order', () => {
        const service = new SpotlightSearchService();
        service.registerProvider(new SimpleSearchProvider(), 'section_last');
        service.registerProvider(new SimpleSearchProvider(), 'section3', 3);
        service.registerProvider(new SimpleSearchProvider(), 'section1', 1);
        service.registerProvider(new SimpleSearchProvider(), 'section2', 2);
        const providers = service.getRegisteredProviders();
        expect(providers[0].section).toBe('section1');
        expect(providers[1].section).toBe('section2');
        expect(providers[2].section).toBe('section3');
        expect(providers[3].section).toBe('section_last');
    });

    it('can unregister a provider', () => {
        const service = new SpotlightSearchService();
        const id = service.registerProvider(new SimpleSearchProvider(), 'section1');
        service.unregisterProvider(id);
        const providers = service.getRegisteredProviders();
        expect(providers.length).toBe(0);
    });

    it('returns true when a provider is unregistered', () => {
        const service = new SpotlightSearchService();
        const id = service.registerProvider(new SimpleSearchProvider(), 'section1');
        service.registerProvider(new SimpleSearchProvider(), 'section2');
        expect(service.unregisterProvider(id)).toBeTruthy();
        const providers = service.getRegisteredProviders();
        expect(providers.length).toBe(1);
    });

    it('returns false when a provider is not unregistered', () => {
        const service = new SpotlightSearchService();
        const id = service.registerProvider(new SimpleSearchProvider(), 'section1');
        service.registerProvider(new SimpleSearchProvider(), 'section2');
        expect(service.unregisterProvider(id + '_no_match')).toBeFalsy();
        const providers = service.getRegisteredProviders();
        expect(providers.length).toBe(2);
    });
});
