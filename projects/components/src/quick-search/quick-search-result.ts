/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

/**
 * The interface of a quick search result
 */
export interface QuickSearchResults {
    /**
     * Item list returned by the search
     */
    items: QuickSearchResultItem[];

    /**
     * The current page returned by the search
     */
    page?: number;

    /**
     * The current page size returned by the search
     */
    pageSize?: number;

    /**
     * Total number of items
     */
    total?: number;
}

/**
 * The interface a quick search result item should implement
 */
export interface QuickSearchResultItem {
    /**
     * The text that will be displayed in the quick search component
     */
    displayText: string;

    /**
     * Function that is going to be called when this item is to be handled, i.e. when the
     * user clicks on this item or  selects it and presses the Enter key.
     */
    handler: () => void;
}

/**
 * The type of the quick search result which can be a promise
 */
export type QuickSearchResultsType = QuickSearchResults | Promise<QuickSearchResults>;
