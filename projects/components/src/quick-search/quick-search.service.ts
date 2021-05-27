/*!
 * Copyright 2020-2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { QuickSearchProvider, QuickSearchNestedProvider } from './quick-search.provider';
import { QuickSearchResults } from '.';

/**
 * A group of search sections.
 */
export interface GroupedSearchSections {
    /**
     * The i18n key for the header.
     */
    headerTitle: string;
    /**
     * All of the sections within this section.
     */
    subSections: SearchSection[];
}

export interface SearchSection {
    provider: QuickSearchProvider;
    result: QuickSearchResults;
    isLoading: boolean;
    shouldShowText: boolean;
    hasPartialResult: PartialResult;
    icon?: string;
}

/**
 * A filter that can be applied to quick search to filter results.
 */
export interface QuickSearchFilter {
    /**
     * The unique ID of this filter.
     */
    id: string;
    /**
     * The options that are displayed in the dropdown.
     */
    options: QuickSearchFilterOption[];
    /**
     * The text displayed on the button to open the dropdown.
     */
    dropdownText: string;
    /**
     * The i18n key for the selection bubble of this filter. Is passed one parameter {display} which is the value selected.
     */
    bubbleI18nKey: string;
    /**
     * The order of the filter when displaying the filters. The lower the order, the closer to the beginning.
     * undefined and -1 means append
     */
    order?: number;
}

/**
 * Represents a possible selection option for a filter.
 */
export interface QuickSearchFilterOption {
    /**
     * The displayed title of this option.
     */
    display: string;

    /**
     * The key of this quick search filter option.
     */
    key: string;
    /**
     * Any optional data that is associated with this option.
     */
    data?: any;
}

/**
 * A filter that has a value typed in.
 */
export interface ActiveQuickSearchFilter extends QuickSearchFilter {
    /**
     * The key value of the selected option.
     */
    value: string;
    /**
     * Any date assocated with this filter option.
     */
    data: any;
}

/**
 * This interface describes partial search result, i.e. result that do not contain all the items that match the
 * search criteria {@see QuickSearchComponent#hasPartialResult}
 */
export interface PartialResult {
    /**
     * The number of the last item of the result
     */
    lastItem: number;

    /**
     * Total number of items in the result
     */
    totalItems: number;
}

@Injectable({
    providedIn: 'root',
})
export class QuickSearchService {
    private registrations: QuickSearchProvider[] = [];
    private nestedProviders: QuickSearchNestedProvider[] = [];

    private searchId = 0;

    private filterValues: Map<string, QuickSearchFilterOption[]> = new Map();

    /**
     * The filters the last search was run with.
     */
    private lastActiveFilters: ActiveQuickSearchFilter[] = [];
    /**
     * The term the last search was run with.
     */
    private lastSearchCriteria: string = '';

    /**
     * The search sections are provided by the {@link QuickSearchService} upon opening the Quick Search.
     * This insures that new sections based on the current context of the application may appear.
     *
     * The groupedSearchSections are sections that come from Nested providers and are a double deep list of results with
     * a parent section name, and sub section names.
     *
     * The ungroupedSearchSections are sections that come from Search providers and are a single list of results with a section name.
     *
     * These two events emit when anything about the search sections changes.
     */
    public groupedSearchSectionChanged: ReplaySubject<GroupedSearchSections[]> = new ReplaySubject<
        GroupedSearchSections[]
    >();
    public ungroupedSearchSectionChanged: ReplaySubject<SearchSection[]> = new ReplaySubject<SearchSection[]>();

    private _groupedSearchSections: GroupedSearchSections[] = [];
    private _ungroupedSearchSections: SearchSection[] = [];

    /**
     * Emits a value when any information about the filter selection changes.
     */
    public filterValueChanges: ReplaySubject<Map<string, QuickSearchFilterOption[]>> = new ReplaySubject<
        Map<string, QuickSearchFilterOption[]>
    >();

    /**
     * The current set of registered filters.
     */
    public filters: QuickSearchFilter[] = [];

    /**
     * If the quick search modal is pinned.
     */
    public isPinned: boolean = false;

    /**
     * If any section is loading.
     */
    public isLoading: boolean = false;

    /**
     * If all sections return no results.
     */
    public hasNoResults: boolean = false;

    /**
     * Register a search provider
     * @param provider The search provider {@link QuickSearchProvider}
     */
    public registerProvider(provider: QuickSearchProvider): void {
        insertInOrder(provider, this.registrations);
        this.updateActiveSections(this.lastActiveFilters);
    }

    /**
     * Unregister a search provider by providing the registration id.
     * Returns true if un-registration was done.
     * @param provider Provider to be unregistered
     */
    public unregisterProvider(provider: QuickSearchProvider): boolean {
        const index = this.registrations.findIndex((regProvider) => regProvider === provider);
        if (index > -1) {
            this.registrations.splice(index, 1);
        }
        return index > -1;
    }

    /**
     * Registers a nested provider to search for results in quick search.
     */
    public registerNestedProvider(nestedProvider: QuickSearchNestedProvider) {
        insertInOrder(nestedProvider, this.nestedProviders);
        this.updateActiveSections(this.lastActiveFilters);
    }

    public unregisterNestedProvider(nestedProvider: QuickSearchNestedProvider) {
        const index = this.nestedProviders.findIndex((regProvider) => regProvider === nestedProvider);
        if (index > -1) {
            this.nestedProviders.splice(index, 1);
        }
        return index > -1;
    }

    /**
     * Get a list of all the registered search providers.
     */
    public getRegisteredProviders(filters?: ActiveQuickSearchFilter[]): QuickSearchProvider[] {
        if (!filters || !filters.length) {
            return [...this.registrations];
        }
        return this.registrations.filter((searchProvider) => this.providerShouldBeActive(searchProvider, filters));
    }

    /**
     * Gives the list of currently active providers given the set of filters.
     */
    public getRegisteredNestedProviders(filters?: ActiveQuickSearchFilter[]): QuickSearchNestedProvider[] {
        if (!filters || !filters.length) {
            return [...this.nestedProviders];
        }
        const newNestedProviders: QuickSearchNestedProvider[] = this.nestedProviders.map((nestedProvider) => {
            return {
                order: nestedProvider.order,
                sectionName: nestedProvider.sectionName,
                children: nestedProvider.children.filter((provider) => this.providerShouldBeActive(provider, filters)),
            };
        });
        return newNestedProviders.filter((provider) => provider.children.length);
    }

    /**
     * Adds a filter to the list of registered filters. A filter can be used to filter the list of providers and/or the results from a given provider.
     *
     * All filters have some ID that is displayed and a list of options for their value. These options can also have associated data.
     *
     * A provider then must know
     * 1. If it can respond to a given filter</li>
     * 2. How to filter the search results given the filter</li>
     *
     * This means that if Filter A is present, and Provider 1 cannot respond to it, Provider 1 will not be displayed. Provider 2 must
     * then filter its results based on the filter.
     *
     * If two filters of different IDs are used in the search, the filters should act like and's. If two filters of the same ID
     * are present in the search, the filter should act like an or.
     */
    public registerFilter(filter: QuickSearchFilter) {
        insertInOrder(filter, this.filters);
    }

    /**
     * Removes the given filterId from the list of registered filters.
     */
    public unregisterFilter(filterId: string) {
        this.filters = this.filters.filter((filter) => filter.id !== filterId);
    }

    /**
     * Selects the given filterValue on the filter represented by the given filterId.
     *
     * @param clear clears the selection before setting if set to true, and defaults to true.
     *
     * @example selectFilter('type', 'org') selects the Organization option in the "Type" filter.
     */
    public selectFilter(filterId: string, filterValues: string[], clear: boolean = true): void {
        const foundFilter = this.filters.find((filter) => filter.id === filterId);
        if (!foundFilter) {
            return;
        }

        if (clear) {
            this.filterValues.set(filterId, []);
        }

        for (const optionKey of filterValues.filter(Boolean)) {
            const foundOption = foundFilter.options.find((option) => option.key === optionKey);

            if (foundOption === undefined) {
                continue;
            }
            const isActive = this.getFilterOptionValue(filterId, optionKey);
            if (isActive) {
                this.filterValues.set(
                    filterId,
                    this.getFilterValue(filterId).filter((option) => option.key !== optionKey)
                );
            } else {
                this.getFilterValue(filterId).push(foundOption);
            }
        }

        this.filterValueChanges.next(this.filterValues);
        this.doSearch(this.lastSearchCriteria);
    }

    /**
     * Searches all the providers given the search term and the active filters.
     *
     * @param force runs the search even if the active filters and search term has not changed.
     */
    public doSearch(searchCriteria: string, force?: boolean, afterSectionLoad?: () => void): Promise<SearchSection[]> {
        const activeFilters = this.buildActiveFilters();

        // If the active filters are the same as last time and the search term has not changed
        // We should not run a search unless force is true.
        if (
            this.lastActiveFilters.length === activeFilters.length &&
            searchCriteria === this.lastSearchCriteria &&
            !force
        ) {
            return;
        }
        this.lastActiveFilters = activeFilters;
        this.lastSearchCriteria = searchCriteria;
        this.updateActiveSections(activeFilters);

        // Remember which is the current search. This will help us not to show results from an old search
        const searchId = ++this.searchId;

        // Mark each sections in loading state. This flag is needed when trying to select the first item
        // while the search is still in progress
        const flatSections = this.getFlattenedSearchSections();

        if (flatSections.length === 0) {
            return;
        }

        this.isLoading = true;
        flatSections.forEach((searchSection) => (searchSection.isLoading = true));

        // Go through the available search sections, i.e. the registered search providers and request for results
        return Promise.all(
            flatSections.map(async (searchSection) => {
                let searchResult: QuickSearchResults;
                // Only request for data if the search is not empty
                if (searchCriteria && searchCriteria.length > 0) {
                    const result = searchSection.provider.search(searchCriteria, activeFilters);

                    // Some of the results may be provided later, so mark the section as loading
                    if (result instanceof Promise) {
                        searchResult = await result;
                    } else {
                        searchResult = result;
                    }
                    // Use the closure to verify that the displayed data is going to be really from the latest search
                    if (searchId !== this.searchId) {
                        return;
                    }
                }

                // This code will get called for each of the key strokes that gets typed during the buffer time. This means if there were 10
                // characters typed during the de-bouncing time, this code will be called 10 times after the promise is resolved from a provider
                // search function. However, we don't currently see any problem with that because the following code just re assigns variables
                // with same values
                searchSection.result = searchResult;
                searchSection.hasPartialResult = this.hasPartialResult(searchSection);
                searchSection.isLoading = false;
                this.hasNoResults = this.checkHasNoResults();
                searchSection.shouldShowText = this.showSectionTitle(searchSection);

                if (afterSectionLoad) {
                    afterSectionLoad();
                }
                this.groupedSearchSectionChanged.next([...this._groupedSearchSections]);
                this.ungroupedSearchSectionChanged.next([...this._ungroupedSearchSections]);

                return searchSection;
            })
        ).finally(() => {
            if (searchId === this.searchId) {
                this.isLoading = false;
            }
        });
    }

    /**
     * Builds an array of the currently active quick search filters.
     */
    private buildActiveFilters(): ActiveQuickSearchFilter[] {
        const activeFilters: ActiveQuickSearchFilter[] = [];
        this.filterValues.forEach((valueList, id) => {
            valueList.forEach((value) => {
                activeFilters.push({
                    id,
                    value: value.key,
                    data: value.data,
                } as ActiveQuickSearchFilter);
            });
        });

        return activeFilters;
    }

    /**
     * Updates the active search providers based on the active filters.
     */
    private updateActiveSections(activeFilters: ActiveQuickSearchFilter[]) {
        this._ungroupedSearchSections = this.getRegisteredProviders(activeFilters).map((provider) => ({
            provider,
            result: null,
            isLoading: true,
            shouldShowText: false,
            hasPartialResult: undefined,
            icon: provider.icon,
        }));
        this._groupedSearchSections = this.getRegisteredNestedProviders(activeFilters).map((section) => {
            return {
                headerTitle: section.sectionName,
                subSections: section.children.map((provider) => ({
                    provider,
                    result: null,
                    isLoading: true,
                    shouldShowText: false,
                    hasPartialResult: undefined,
                    icon: provider.icon,
                })),
            };
        });

        this.groupedSearchSectionChanged.next(this._groupedSearchSections);
        this.ungroupedSearchSectionChanged.next(this._ungroupedSearchSections);
    }

    /**
     * Gives whether the given option on the given filter is selected.
     */
    private getFilterOptionValue(filterId: string, optionKey: string): boolean {
        return !!this.getFilterValue(filterId).find((option) => option.key === optionKey);
    }

    /**
     * Gives all the options selected for the given filter.
     */
    private getFilterValue(filterId: string): QuickSearchFilterOption[] {
        if (!this.filterValues.get(filterId)) {
            this.filterValues.set(filterId, []);
        }
        return this.filterValues.get(filterId);
    }

    /**
     * Gives the search sections as a single flat list.
     */
    private getFlattenedSearchSections(): SearchSection[] {
        const allSections: SearchSection[] = [];
        // Takes the nested providers, and turns them to a single deep list of sections.
        this._groupedSearchSections.forEach((section) => allSections.push(...section.subSections));
        return [...this._ungroupedSearchSections, ...allSections];
    }

    /**
     * Says if the given provider should be active given the filters selected.
     */
    private providerShouldBeActive(provider: QuickSearchProvider, filters: ActiveQuickSearchFilter[]): boolean {
        const filtersGrouped = new Map<string, ActiveQuickSearchFilter[]>();
        filters.forEach((filter) => {
            const current = filtersGrouped.get(filter.id);
            if (current) {
                current.push(filter);
            } else {
                filtersGrouped.set(filter.id, [filter]);
            }
        });

        return Array.from(filtersGrouped.keys()).every((key) =>
            filtersGrouped.get(key).some((filter) => provider.canHandleFilter && provider.canHandleFilter(filter))
        );
    }

    /**
     * Determines if the result in this section is partial (i.e. there are more items matching the criteria which are
     * in the current list) or it is full (the current list contains all the items matching the criteria)
     * If the result is partial then {@link PartialResult} object is returned. If the result contains all the items
     * then null is returned
     * @param searchSection the section which result items is to be checked
     */
    private hasPartialResult(searchSection: SearchSection): PartialResult {
        if (
            searchSection.result?.total &&
            searchSection.result?.items?.length &&
            searchSection.result.items.length < searchSection.result.total
        ) {
            return {
                lastItem: searchSection.result.items.length,
                totalItems: searchSection.result.total,
            };
        }
        return null;
    }

    /**
     * Says if the title of the given search section should be shown.
     */
    private showSectionTitle(searchSection: SearchSection): boolean {
        // Do not show when there is no section name
        if (!searchSection.provider.sectionName) {
            return false;
        }

        // Don't show when it is loading
        if (searchSection.isLoading) {
            return false;
        }

        // Do not show when the provider has no results
        if (!searchSection.result?.items?.length) {
            return false;
        }

        return true;
    }

    /**
     * Says if all providers have returned no results.
     */
    private checkHasNoResults(): boolean {
        return this.getFlattenedSearchSections().every((section) => section.result?.items?.length === 0);
    }
}

const insertInOrder = (item: { order?: number }, orderedArray: { order?: number }[]): void => {
    const order = typeof item.order === 'undefined' ? -1 : item.order;

    let insertIndex = -1;
    // Determine the position of the new registration
    if (order > -1) {
        insertIndex = orderedArray.findIndex((fltr) => {
            // If an item has a negative index, this means no order had been provided for that item,
            // this means we have found the insert index
            if (fltr.order < 0 || typeof fltr.order === 'undefined') {
                return true;
            }

            // If an item has a bigger order than the new one,
            // this means we have found the insert index
            if (order < fltr.order) {
                return true;
            }
        });
    }

    if (insertIndex > -1) {
        orderedArray.splice(insertIndex, 0, item);
    } else {
        orderedArray.push(item);
    }
};
