/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

/**
 * The interface a spotlight search result item should implement
 */
export interface SpotlightSearchResult {
    /**
     * The text that will be displayed in the spotlight search component
     */
    displayText: string;

    /**
     * Function that is going to be called when this item is to be handled, i.e. when the
     * user clicks on this item or  selects it and presses the Enter key.
     */
    handler: () => void;
}

/**
 * The type of the spotlight search result which can be a promise
 */
export type SpotlightSearchResultType = SpotlightSearchResult[] | Promise<SpotlightSearchResult[]>;
