/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { QuickSearchResultType } from './quick-search-result';

/**
 * The interface a search providers should implement in order to register itself with the {@link QuickSearchService}
 */
export interface QuickSearchProvider {
    /**
     * Every search provider gets displayed in a separate section. This will be used as the section header.
     */
    sectionName: string;

    /**
     * The order of the section in the spotlight search results. The lower the order, the closer to the beginning of the list.
     * -1 means append
     */
    order: number;

    /**
     * Returns an array or a promise of array of items that comply with the search criteria.
     * @param criteria The search string provided by the user when typing in the Quick Search Component
     */
    search(criteria: string): QuickSearchResultType;
}

export abstract class QuickSearchProviderDefaults {
    sectionName = '';
    order = -1;
}
