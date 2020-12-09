/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonUtil } from '../utils';
import { QuickSearchResultsType } from './quick-search-result';

export const PROVIDER_SEARCH_DEBOUNCE_TIME = 300;

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
     * Indicates if a provider has to wait for {@link PROVIDER_SEARCH_DEBOUNCE_TIME} milliseconds
     */
    shouldDebounceInput: boolean;

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
    abstract shouldDebounceInput: boolean;
    abstract search(criteria: string): QuickSearchResultsType;

    constructor(shouldDebounceInput: boolean) {
        if (shouldDebounceInput) {
            // The return type is being ignored because, createBufferedPromise function returns a function that returns a Promise which
            // in turn wraps the return value of search function and TS compiler is not accepting () => Promise<QuickSearchResultsType>
            // as () => QuickSearchResultsType. However, this is not a problem because, QuickSearchResultsType can be of type
            // Promise<QuickSearchResults> and Promise<Promise<QuickSearchResults>> can be assigned to Promise<QuickSearchResults>
            // @ts-ignore
            this.search = CommonUtil.createBufferedPromise(this.search, this, PROVIDER_SEARCH_DEBOUNCE_TIME);
        }
    }
}
