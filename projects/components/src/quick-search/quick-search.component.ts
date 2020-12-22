/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TranslationService } from '@vcd/i18n';
import { DomUtil } from '../utils/dom-util';
import { QuickSearchResultItem, QuickSearchResults, QuickSearchResultsType } from './quick-search-result';
import { QuickSearchProvider } from './quick-search.provider';
import { QuickSearchService } from './quick-search.service';

interface SearchSection {
    provider: QuickSearchProvider;
    result: QuickSearchResults;
    isLoading: boolean;
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
     * This method along with `open` property provide two-way binding [(open)] for controlling the visibility state
     * of the quick search component
     */
    @Output() openChange: EventEmitter<boolean> = new EventEmitter<boolean>(false);

    /**
     * Event dispatched when item has been activated, i.e. its event handler is called.
     * This happens when item is clicked or 'Enter' is pressed when there is a selection.
     */
    @Output() resultActivated: EventEmitter<ResultActivatedEvent> = new EventEmitter<ResultActivatedEvent>();

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
    }
    private _searchCriteria: string;

    private _open = false;

    @ViewChild('searchInput', { static: false, read: ElementRef }) searchInput: ElementRef;

    private searchId = 0;

    /**
     * The search sections are provided by the {@link QuickSearchService} upon opening the Quick Search.
     * This insures that new sections based on the current context of the application may appear.
     */
    searchSections: SearchSection[] = [];

    selectedItem: QuickSearchResultItem;

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
        event.preventDefault();
        if (!this.selectedItem) {
            return;
        }
        this.handleItem(this.selectedItem, false);
    }

    private doSearch(): void {
        // Remember which is the current search. This will help us not to show results from an old search
        const searchId = ++this.searchId;

        this.selectedItem = null;

        // Mark each sections in loading state. This flag is needed when trying to select the first item
        // while the search is still in progress
        this.searchSections.forEach((searchSection) => (searchSection.isLoading = true));

        // Go through the available search sections, i.e. the registered search providers and request for results
        this.searchSections.forEach(async (searchSection) => {
            let searchResult: QuickSearchResults;
            // Only request for data if the search is not empty
            if (!!this.searchCriteria) {
                const result = searchSection.provider.search(this.searchCriteria);

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
        for (const section of this.searchSections) {
            // The section is still loading. If it was requested to ensure the loading has completed than abort
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
        if (!this.selectedItem) {
            this.selectFirst(false);
            return;
        }

        // Get all the items form all the sections in a single flat array
        const allResults = this.searchSections.reduce((acc, v) => [...acc, ...(v.result?.items || [])], []);

        let selectedItemIndex = allResults.indexOf(this.selectedItem);

        // There is a selected item but it is not one of the available ones, so just select the first from the list
        if (selectedItemIndex < 0) {
            this.selectedItem = null;
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

        this.selectedItem = allResults[selectedItemIndex];

        // Call the change detector otherwise the selection on the screen may not refreshed quickly enough if the
        // user just presses and holds down the arrow key
        this.changeDetectorRef.detectChanges();

        // Ensure the selected element is visible
        DomUtil.scrollToElement(this.el, '.selected');
        if (selectedItemIndex === 0) {
            DomUtil.scrollToElement(this.el, '.section-index-0 .search-result-section-title');
        }
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
            this.searchSections = this.searchService
                .getRegisteredProviders()
                .map((provider) => ({ provider, result: null, isLoading: true }));
            this.doSearch();

            setTimeout(() => {
                this.searchInput.nativeElement.focus();
                this.searchInput.nativeElement.select();
            }, 0);
        }

        this._open = open;
        this.openChange.emit(this._open);
        this.changeDetectorRef.detectChanges();
    }

    private handleItem(item: QuickSearchResultItem, clicked: boolean): void {
        const searchSection: SearchSection = this.searchSections.find(
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
        this.open = false;
    }

    showSectionTitle(searchSection: SearchSection): boolean {
        return !!(searchSection.provider.sectionName && this.searchCriteria);
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
}
