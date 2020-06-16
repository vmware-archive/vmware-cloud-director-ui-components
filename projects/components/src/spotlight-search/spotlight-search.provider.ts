/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { SpotlightSearchResultType } from './spotlight-search-result';

/**
 * The interface a search providers should implement in order to register itself with the {@link SpotlightSearchService}
 */
export interface SpotlightSearchProvider {
    /**
     * Returns an array or a promise of array of items that comply with the search criteria.
     * @param criteria The search string provided by the user when typing in the Spotlight Search Component
     */
    search(criteria: string): SpotlightSearchResultType;
}
