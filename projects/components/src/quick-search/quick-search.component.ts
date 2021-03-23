/*!
 * Copyright 2020-2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TranslationService } from '@vcd/i18n';
import { DomUtil } from '../utils/dom-util';
import { QuickSearchResultItem, QuickSearchResults, QuickSearchResultsType } from './quick-search-result';
import { QuickSearchProvider } from './quick-search.provider';
import { QuickSearchService } from './quick-search.service';

/**
 * A group of search sections.
 */
interface GroupedSearchSections {
    /**
     * The i18n key for the header.
     */
    headerTitle: string;
    /**
     * All of the sections within this section.
     */
    subSections: SearchSection[];
}

interface SearchSection {
    provider: QuickSearchProvider;
    result: QuickSearchResults;
    isLoading: boolean;
}

/**
 * A filter that can be applied to quick search to filter results.
 */
export interface QuickSearchFilter {
    id: string;
    options: QuickSearchFilterOption[];
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
     * Any optional data that is associated with this option.
     */
    data?: any;
}

/**
 * A filter that has a value typed in.
 */
export interface ActiveQuickSearchFilter extends QuickSearchFilter {
    value: string;
    data: any;
}

/**
 * This interface describes the event emitted when a result item is activated,
 * i.e. its event handler has been called.
 */
export interface ResultActivatedEvent {
    itemDisplayText: string;
    sectionTitle: string;
    eventSource: 'MouseEvent' | 'KeyboardEvent';
}

/**
 * This interface describes partial search result, i.e. result that do not contain all the items that match the
 * search criteria {@see QuickSearchComponent#hasPartialResult}
 */
interface PartialResult {
    /**
     * The number of the last item of the result
     */
    lastItem: number;

    /**
     * Total number of items in the result
     */
    totalItems: number;
}

/**
 * The Quick Search component is inspired by the Spotlight Search in Mac OSX (cmd+space)
 * and the Search Everywhere in IntelliJ (shift+shift)
 *
 * This VCD Quick Search does not provide any search by itself. It is not also a single component
 * but rather a group of objects that work together in order to allow the developer to build a might search experience
 * for the end user.
 *
 * Basically the VCD Quick Search consists of:
 * <ul>
 *     <li>QuickSearchComponent - the visual component that you should include in your template</li>
 *     <li>{@link QuickSearchService}<a href="/compodoc/injectables/QuickSearchService.html">QuickSearchService</a>
 *     - the service that you should register your own providers with</li>
 *     <li>{@link QuickSearchProvider}<a href="/compodoc/interfaces/QuickSearchProvider.html">QuickSearchProvider</a>
 *     - the interface your search provider should implement.
 *     It can return either an array of {@link QuickSearchResults} or a promise for lazy loading of results</li>
 * </ul>
 *
 * QuickSearchComponent:
 *
 *    <vcd-quick-search
 *        [(open)]="quickSearchOpen"
 *        [placeholder]="'Search ...'"
 *    ></vcd-quick-search>
 *
 *
 * {@link QuickSearchService}:
 *
 * This service works along with the component in order to provide search results displayed. Those results are grouped
 * in sections based on the registered provider {@link QuickSearchProvider}.
 *
 * You can provide order of the search providers, hence the order of the displayed sections
 *
 * If there is just one search provider no section title is displayed.
 *
 * In case of multiple search providers the Quick Search can be configured to hide the entire section if it contains no data.
 *
 *
 * For a complete end-to-end running example please take a look at the `Examples` tab of the live-docs
 */
@Component({
    selector: 'vcd-quick-search',
    templateUrl: './quick-search.component.html',
    styleUrls: ['./quick-search.component.scss'],
})
export class QuickSearchComponent {
    /**
     * Placeholder for the search input. Default is empty string;
     */
    @Input() public placeholder: string;

    /**
     * A helper text that will be placed below the search input.
     */
    @Input() public helper: string;

    /**
     * This property alongside with `openChange` provide two-way binding [(open)] for controlling the visibility state
     * of the quick search component
     */
    @Input()
    public set open(open: boolean) {
        this.handleOpen(open);
    }
    public get open(): boolean {
        return this._open;
    }

    /**
     * A list of filters that can be used to filter the list of providers and/or the results from a given provider.
     *
     * All filters have some ID that is displayed and a list of options for their value. These options can also have associated data.
     * A provider then must know a) if it can respond to a given filter and b) how to filter the search results given the filter.
     * This means that if Filter A is present, and Provider 1 cannot respond to it, Provider 1 will not be displayed. Provider 2 must
     * then filter it's results based on the filter.
     *
     * If two filters of different IDs are used in the search, the filters should act like and's. If two filters of the same ID
     * are present in the search, the filter should act like an or.
     */
    @Input() filters: QuickSearchFilter[] = [];

    /**
     * Outputs an event when the user changes the pinning status of this component.
     */
    @Output() isPinnedChange = new EventEmitter<boolean>();

    /**
     * This method along with `open` property provide two-way binding [(open)] for controlling the visibility state
     * of the quick search component
     */
    @Output() openChange: EventEmitter<boolean> = new EventEmitter<boolean>(false);

    /**
     * Event dispatched when item has been activated, i.e. its event handler is called.
     * This happens when item is clicked or 'Enter' is pressed when there is a selection.
     */
    @Output() resultActivated: EventEmitter<ResultActivatedEvent> = new EventEmitter<ResultActivatedEvent>();

    isPinned = false;

    constructor(
        private searchService: QuickSearchService,
        private changeDetectorRef: ChangeDetectorRef,
        private el: ElementRef,
        public translationService: TranslationService
    ) {}

    get searchCriteria(): string {
        return this._searchCriteria;
    }

    set searchCriteria(value: string) {
        this._searchCriteria = value;
        this.doSearch();
        this.filterBeingEdited = this.getLastFilter();
        this.filterBeingEditedOptions = this.getFilterOptionsMatchSearch(this.filterBeingEdited?.options);
        if (!this.filterBeingEdited) {
            this.currentFilterOptionSelection = null;
        } else {
            this.currentFilterOptionSelection = this.filterBeingEditedOptions[0];
        }

        // The filterOptionsDropdown is not rendered immediately after the search criteria is set. It takes a moment
        // for this change to propagate through Angular. As such, we need to setTimeout to be able to shift the element.
        setTimeout(() => {
            if (this.filterOptionsDropdown) {
                this.filterOptionsDropdown.nativeElement.style.left =
                    this.measurementDiv.nativeElement.offsetWidth + 50 + 'px';
            }
        });
    }

    /**
     * Represents the current filter that the user is typing into.
     */
    filterBeingEdited: QuickSearchFilter = null;

    /**
     * The options for the current filter being edited
     */
    filterBeingEditedOptions: QuickSearchFilterOption[];

    private _searchCriteria: string;

    private _open = false;

    @ViewChild('searchInput', { static: false, read: ElementRef }) searchInput: ElementRef;

    @ViewChild('filtersOptions', { static: false }) filterOptionsDropdown: ElementRef;

    @ViewChild('measurementDiv', { static: false }) measurementDiv: ElementRef;

    private searchId = 0;

    private currentActiveFilters: ActiveQuickSearchFilter[] = [];

    /**
     * The search sections are provided by the {@link QuickSearchService} upon opening the Quick Search.
     * This insures that new sections based on the current context of the application may appear.
     *
     * The groupedSearchSections are sections that come from Nested providers and are a double deep list of results with
     * a parent section name, and sub section names.
     *
     * The ungroupedSearchSections are sections that come from Search providers and are a single list of results with a section name.
     */
    groupedSearchSections: GroupedSearchSections[] = [];
    ungroupedSearchSections: SearchSection[] = [];

    /**
     * The selected result in the results section.
     */
    selectedItem: QuickSearchResultItem;
    /**
     * The current selected dropdown in the filter options dropdown.
     */
    currentFilterOptionSelection: QuickSearchFilterOption = null;

    itemClicked(item: QuickSearchResultItem): void {
        this.handleItem(item, true);
    }

    onArrowDown(event: KeyboardEvent): void {
        event.preventDefault();
        this.selectNext(true);
    }

    onArrowUp(event: KeyboardEvent): void {
        event.preventDefault();
        this.selectNext(false);
    }

    onEnterKey(event): void {
        if (this.currentFilterOptionSelection) {
            this.autofillSelectedFilterOption(this.currentFilterOptionSelection.display);
            this.searchInput.nativeElement.focus();
            return;
        }
        if (!this.selectedItem) {
            return;
        }
        event.preventDefault();
        this.handleItem(this.selectedItem, false);
    }

    getFlattenedSearchSections(): SearchSection[] {
        const allSections: SearchSection[] = [];
        // Takes the nested providers, and turns them to a single deep list of sections.
        this.groupedSearchSections.forEach((section) => allSections.push(...section.subSections));
        return [...this.ungroupedSearchSections, ...allSections];
    }

    private getLastFilter(): QuickSearchFilter {
        if (!this.searchCriteria) {
            return null;
        }
        const parts = this.searchCriteria.split(' ');
        const finalFilter = parts[parts.length - 1];
        return this.filters.find((filter) => finalFilter.match(filter.id + ':'));
    }

    private getFilterOptionsMatchSearch(options: QuickSearchFilterOption[]): QuickSearchFilterOption[] {
        if (!options) {
            return [];
        }
        const parts = this.searchCriteria.split(':');
        const searchTerm = parts[parts.length - 1];
        return options.filter((option) => option.display.startsWith(searchTerm));
    }

    autofillSelectedFilterOption(option: string) {
        const parts = this.searchCriteria.split(':');
        parts.pop();
        this.searchCriteria = parts.join(':') + ':' + option + ' ';
    }

    togglePinned(): void {
        this.isPinned = !this.isPinned;
        this.isPinnedChange.emit(this.isPinned);
        // When the pinning of the component changes, the searchInput is re-rendered. Because of this, we need to wait for
        // Angular to re-render the searchInput before focusing it.
        setTimeout(() => {
            this.searchInput.nativeElement.focus();
        });
    }

    private doSearch(): void {
        // Remember which is the current search. This will help us not to show results from an old search
        const searchId = ++this.searchId;

        this.selectedItem = null;

        const { searchTerm, filters } = this.parseSearchCriteria(this.searchCriteria);

        if (filters !== this.currentActiveFilters) {
            this.updateActiveSections(filters);
            this.currentActiveFilters = filters;
        }

        // Mark each sections in loading state. This flag is needed when trying to select the first item
        // while the search is still in progress
        this.getFlattenedSearchSections().forEach((searchSection) => (searchSection.isLoading = true));

        // Go through the available search sections, i.e. the registered search providers and request for results
        this.getFlattenedSearchSections().forEach(async (searchSection) => {
            let searchResult: QuickSearchResults;
            // Only request for data if the search is not empty
            if ((searchTerm && searchTerm.length > 0) || filters.length > 0) {
                const result = searchSection.provider.search(searchTerm, filters);

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
            searchSection.isLoading = false;
            if (!this.selectedItem) {
                this.selectFirst(true);
            }
        });
    }

    /**
     * Try to select the first item in the compound search result.
     * @param ensureFirstSectionIsLoaded if true and if the topmost section is still loading then do not select an item
     */
    private selectFirst(ensureFirstSectionIsLoaded: boolean): void {
        for (const section of this.getFlattenedSearchSections()) {
            // The section is still loading. If it was requested to ensure the loading has completed than stop
            // the attempt to select an item or just skip it and examine the next section.
            if (section.isLoading) {
                if (ensureFirstSectionIsLoaded) {
                    return;
                }
                continue;
            }
            this.selectedItem = section.result?.items[0];
            if (this.selectedItem) {
                break;
            }
        }
        this.changeDetectorRef.detectChanges();
    }

    private selectNext(down: boolean): void {
        // If there is no selection then just select the first available item
        if (this.currentFilterOptionSelection) {
            this.currentFilterOptionSelection = this.genericSelectNext(
                down,
                this.currentFilterOptionSelection,
                this.filterBeingEditedOptions
            );
        } else {
            if (!this.selectedItem) {
                this.selectFirst(false);
                return;
            }
            this.selectedItem = this.genericSelectNext(
                down,
                this.selectedItem,
                this.getFlattenedSearchSections().reduce((acc, v) => [...acc, ...(v.result?.items || [])], [])
            );

            if (this.selectedItem === null) {
                this.selectFirst(false);
            }
        }
        // Call the change detector otherwise the selection on the screen may not refreshed quickly enough if the
        // user just presses and holds down the arrow key
        this.changeDetectorRef.detectChanges();
    }

    private genericSelectNext<T, R>(down: boolean, selected: T, allResults: T[]) {
        let selectedItemIndex = allResults.indexOf(selected);

        // There is a selected item but it is not one of the available ones, so just select the first from the list
        if (selectedItemIndex < 0) {
            selected = null;
            this.selectFirst(false);
            return;
        }

        // Determine the index of the next selection
        if (down) {
            if (selectedItemIndex === allResults.length - 1) {
                selectedItemIndex = 0;
            } else {
                selectedItemIndex++;
            }
        } else {
            if (selectedItemIndex === 0) {
                selectedItemIndex = allResults.length - 1;
            } else {
                selectedItemIndex--;
            }
        }

        selected = allResults[selectedItemIndex];

        // Ensure the selected element is visible
        DomUtil.scrollToElement(this.el, '.selected');
        if (selectedItemIndex === 0) {
            DomUtil.scrollToElement(this.el, '.section-index-0-0 .search-result-section-title');
        }

        return selected;
    }

    /**
     * Handle showing / hiding of the Quick Search.
     * @param open true when opening, false when closing
     */
    private handleOpen(open: boolean): void {
        // Don't do anything if the state has not been changed or if the developer has not explicitly specified the state.
        // This may happen if the template is used with uninitialized variable.
        if (open === this._open || typeof open !== 'boolean') {
            return;
        }

        if (open) {
            this.updateActiveSections([]);
            setTimeout(() => {
                this.searchInput.nativeElement.focus();
                this.searchInput.nativeElement.select();
            }, 0);
            this.doSearch();
        }

        this._open = open;
        this.openChange.emit(this._open);
        this.changeDetectorRef.detectChanges();
    }

    private updateActiveSections(activeFilters: ActiveQuickSearchFilter[]) {
        this.ungroupedSearchSections = this.searchService.getRegisteredProviders(activeFilters).map((provider) => ({
            provider,
            result: null,
            isLoading: true,
        }));
        this.groupedSearchSections = this.searchService.getRegisteredNestedProviders(activeFilters).map((section) => {
            return {
                headerTitle: section.sectionName,
                subSections: section.children.map((provider) => ({
                    provider,
                    result: null,
                    isLoading: true,
                })),
            };
        });
    }

    private handleItem(item: QuickSearchResultItem, clicked: boolean): void {
        const searchSection: SearchSection = this.getFlattenedSearchSections().find(
            (section) =>
                !section.isLoading &&
                section.result?.items.some((resultItem) => resultItem.displayText === item.displayText)
        );
        const resultActivatedEvent: ResultActivatedEvent = {
            itemDisplayText: item.displayText,
            sectionTitle: searchSection.provider.sectionName,
            eventSource: clicked ? 'MouseEvent' : 'KeyboardEvent',
        };
        item.handler();
        this.resultActivated.emit(resultActivatedEvent);
        if (!this.isPinned) {
            this.open = false;
        }
    }

    showSectionTitle(searchSection: SearchSection): boolean {
        // Do not show when there is no search criteria
        if (!this.searchCriteria) {
            return false;
        }

        // Do not show when there is no section name
        if (!searchSection.provider.sectionName) {
            return false;
        }

        // Show when it is loading
        if (searchSection.isLoading) {
            return true;
        }

        // Do not show when the provider has no results and it is marked with {@link QuickSearchProvider#hideWhenEmpty}
        if (searchSection.provider.hideWhenEmpty && !searchSection.result?.items?.length) {
            return false;
        }

        return true;
    }

    showParentSectionTitle(parentSection: GroupedSearchSections): boolean {
        return parentSection.subSections.some((section) => this.showSectionTitle(section));
    }

    showNoResults(searchSection: SearchSection): boolean {
        // Show 'No Results' if the section is empty and the section title is shown
        if (searchSection.result?.items?.length === 0 && this.showSectionTitle(searchSection)) {
            return true;
        }
        return false;
    }

    /**
     * Determines if the result in this section is partial (i.e. there are more items matching the criteria which are
     * in the current list) or it is full (the current list contains all the items matching the criteria)
     * If the result is partial then {@link PartialResult} object is returned. If the result contains all the items
     * then null is returned
     * @param searchSection the section which result items is to be checked
     */
    hasPartialResult(searchSection: SearchSection): PartialResult {
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
     * Parses the given search criteria to remove all filters and separate them.
     *
     * @example this.parseSearchCriteria('searchTerm filter:value other:value') =>
     * {
     *    searchTerm: 'searchTerm',
     *    filters: [{ id: 'filter', value: 'value', ...}, { id: 'other', value: 'value'}]
     * }
     */
    private parseSearchCriteria(
        searchCriteria: string
    ): {
        searchTerm: string;
        filters: ActiveQuickSearchFilter[];
    } {
        const activeFilters: ActiveQuickSearchFilter[] = [];
        let removedFiltersSearch = searchCriteria;
        if (removedFiltersSearch) {
            for (const filter of this.filters) {
                while (removedFiltersSearch.includes(filter.id + ':')) {
                    const parts = removedFiltersSearch.split(filter.id + ':');
                    const beginning = parts.shift();
                    const end = parts.join(filter.id + ':');
                    const parts2 = end.split(' ');
                    const filterValue = parts2.shift();
                    const rest = parts2.join(' ');
                    activeFilters.push({
                        id: filter.id,
                        options: filter.options,
                        value: filterValue,
                        data: filter.options.find((option) => option.display === filterValue)?.data,
                    });
                    removedFiltersSearch = (beginning + rest).trim();
                }
            }
        }

        if (removedFiltersSearch) {
            removedFiltersSearch = removedFiltersSearch.trim();
        }

        return {
            filters: activeFilters,
            searchTerm: removedFiltersSearch,
        };
    }
}
