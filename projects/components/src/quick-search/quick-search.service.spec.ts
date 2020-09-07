/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { QuickSearchResultsType } from './quick-search-result';
import { QuickSearchProvider } from './quick-search.provider';
import { QuickSearchService } from './quick-search.service';

class SimpleSearchProvider implements QuickSearchProvider {
    constructor(public sectionName: string = '', public order: number = -1) {}
    search(criteria: string): QuickSearchResultsType {
        return { items: [] };
    }
}

describe('QuickSearchService', () => {
    it('can register a provider', () => {
        const service = new QuickSearchService();
        const provider1 = new SimpleSearchProvider('section1');
        service.registerProvider(provider1);
        const registeredProvider = service.getRegisteredProviders()[0];
        expect(registeredProvider).toBe(provider1);
        expect(registeredProvider.sectionName).toBe('section1');
    });

    it('registers a provider at the back if no order is provided', () => {
        const service = new QuickSearchService();
        service.registerProvider(new SimpleSearchProvider('section1'));
        service.registerProvider(new SimpleSearchProvider('section2'));
        const providers = service.getRegisteredProviders();
        expect(providers[0].sectionName).toBe('section1');
        expect(providers[1].sectionName).toBe('section2');
    });

    it('registers the providers in the beginning of the list when order 0 i sprovided', () => {
        const service = new QuickSearchService();
        service.registerProvider(new SimpleSearchProvider('section1'));
        service.registerProvider(new SimpleSearchProvider('section2'));
        service.registerProvider(new SimpleSearchProvider('section_first', 0));
        const providers = service.getRegisteredProviders();
        expect(providers[0].sectionName).toBe('section_first');
        expect(providers[1].sectionName).toBe('section1');
        expect(providers[2].sectionName).toBe('section2');
    });

    it('registers providers in specific order', () => {
        const service = new QuickSearchService();
        service.registerProvider(new SimpleSearchProvider('section_last'));
        service.registerProvider(new SimpleSearchProvider('section3', 3));
        service.registerProvider(new SimpleSearchProvider('section1', 1));
        service.registerProvider(new SimpleSearchProvider('section2', 2));
        const providers = service.getRegisteredProviders();
        expect(providers[0].sectionName).toBe('section1');
        expect(providers[1].sectionName).toBe('section2');
        expect(providers[2].sectionName).toBe('section3');
        expect(providers[3].sectionName).toBe('section_last');
    });

    it('can unregister a provider', () => {
        const service = new QuickSearchService();
        const simpleSearchProvider = new SimpleSearchProvider();
        service.registerProvider(simpleSearchProvider);
        service.unregisterProvider(simpleSearchProvider);
        const providers = service.getRegisteredProviders();
        expect(providers.length).toBe(0);
    });

    it('returns true when a provider is unregistered', () => {
        const service = new QuickSearchService();
        const firstProvider = new SimpleSearchProvider();
        service.registerProvider(firstProvider);
        expect(service.unregisterProvider(firstProvider)).toBe(true);
    });

    it('returns false when a provider is not unregistered', () => {
        const service = new QuickSearchService();
        const firstProvider = new SimpleSearchProvider();
        expect(service.unregisterProvider(firstProvider)).toBe(false);
    });
});
