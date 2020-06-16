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

    it('can register providers in specified order', () => {
        const service = new SpotlightSearchService();
        service.registerProvider(new SimpleSearchProvider(), 'section1');
        service.registerProvider(new SimpleSearchProvider(), 'section2', 0);
        const providers = service.getRegisteredProviders();
        expect(providers[0].section).toBe('section2');
        expect(providers[1].section).toBe('section1');
    });

    it('can unregister a provider', () => {
        const service = new SpotlightSearchService();
        const id = service.registerProvider(new SimpleSearchProvider(), 'section1');
        service.unregisterProvider(id);
        const providers = service.getRegisteredProviders();
        expect(providers.length).toBe(0);
    });
});
