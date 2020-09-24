/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { QuickSearchResultsType } from './quick-search-result';

/**
 * The interface a search providers should implement in order to register itself with the {@link QuickSearchService}
 */
export interface QuickSearchProvider {
    /**
     * Every search provider gets displayed in a separate section. This will be used as the section header.
     */
    sectionName: string;

    /**
     * The order of the section in the quick search results. The lower the order, the closer to the beginning of the list.
     * -1 means append
     */
    order: number;

    /**
     * A custom property available throughout all the providers. Not designed for any specific scenario.
     * Use it according to the specific needs you may have.
     */
    data: unknown;

    /**
     * Returns an array or a promise of array of items that comply with the search criteria.
     * @param criteria The search string provided by the user when typing in the Quick Search Component
     */
    search(criteria: string): QuickSearchResultsType;
}

export abstract class QuickSearchProviderDefaults implements QuickSearchProvider {
    sectionName = '';
    order = -1;
    data: unknown;
    abstract search(criteria: string): QuickSearchResultsType;
}
