/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { BaseWidgetObject, FindElementOptions } from '../utils/test/widget-object/widget-object';
import { DataUi } from './quick-search.dataui';

const QUICK_SEARCH_CURRENT_RESULT = '.selected';

/**
 * Widget Object for Quick-Search
 */
export class QuickSearchWo<T> extends BaseWidgetObject<T> {
    static tagName = 'vcd-quick-search';

    /**
     * Returns quick-search modal body
     */
    getModalBody = this.factory.dataUi(DataUi.modalBody);

    /**
     * Returns user search input
     */
    getInput = this.factory.dataUi(DataUi.searchInput);

    /**
     * Returns the titles of all sections appearing in the search results
     */
    getSearchResultSectionTitles = this.factory.dataUi(DataUi.searchResultSectionTitles);

    /**
     * Returns each search result item in each section
     */
    getSearchResultItems = this.factory.dataUi(DataUi.searchResultItems);

    /**
     * Returns the currently selected search result item
     */
    getSelectedSearchResultItem = this.factory.css(QUICK_SEARCH_CURRENT_RESULT);

    /**
     * Returns the elements that indicates if the search results are still loading
     */
    getSpinners = this.factory.dataUi(DataUi.spinner);

    /**
     * Returns the element that shows "No results found" if there are no results
     */
    getNoResults = this.factory.dataUi(DataUi.noResults);

    /**
     * Accesses the element behind the Quick Search modal
     */
    getModalBackdrop = this.factory.css('.modal-backdrop');

    /**
     * Returns the alerts to the user about their search input
     */
    getSearchResultAlerts = this.factory.dataUi(DataUi.searchResultAlerts);

    /**
     * Returns the element that represents the top of the search results
     */
    getTopOfResults = this.factory.css('.top-of-results');

    /**
     * Returns the element that represents the bottom of the search results
     */
    getBottomOfResults = this.factory.css('.bottom-of-results');

    getFilterButton(id: string) {
        return this.el.get({ dataUiSelector: DataUi.filterButton(id) });
    }

    getFilterDropdownOptions(index: number) {
        return this.el.get({ dataUiSelector: DataUi.filterDropdownItem, index });
    }

    /**
     * Gives the icon next to each section title.
     */
    getTitleIcons = (options?: FindElementOptions) => this.getSearchResultSectionTitles(options).get('clr-icon');
}
