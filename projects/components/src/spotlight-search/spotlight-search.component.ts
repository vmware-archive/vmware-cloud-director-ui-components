/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TranslationService } from '@vcd/i18n';
import { DomUtil } from '../utils/dom-util';
import { SpotlightSearchResult, SpotlightSearchResultType } from './spotlight-search-result';
import { RegisteredProviders, SpotlightSearchService } from './spotlight-search.service';

interface SearchSection extends RegisteredProviders {
    results: SpotlightSearchResult[];
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
 * The Spotlight Search component is inspired by the Spotlight Search functionality in Mac OSX (cmd+space)
 * and the Search Everywhere in IntelliJ (shift+shift)
 *
 * This VCD Spotlight Search does not provide any search by itself. It is not also a single component
 * but rather a group of objects that work together in order to allow the developer to build a might search experience
 * for the end user.
 *
 * Basically the VCD Spotlight Search consists of:
 * <ul>
 *     <li>SpotlightSearchComponent - the visual component that you should include in your template</li>
 *     <li>{@link SpotlightSearchService}<a href="/compodoc/injectables/SpotlightSearchService.html">SpotlightSearchService</a>
 *     - the service that you should register your own providers with</li>
 *     <li>{@link SpotlightSearchProvider}<a href="/compodoc/interfaces/SpotlightSearchProvider.html">SpotlightSearchProvider</a>
 *     - the interface your search provider should implement.
 *     It can return either an array of {@link SpotlightSearchResult} or a promise for lazy loading of results</li>
 * </ul>
 *
 * SpotlightSearchComponent:
 *
 *    <vcd-spotlight-search
 *        [(open)]="spotlightOpen"
 *        [placeholder]="'Search ...'"
 *    ></vcd-spotlight-search>
 *
 *
 * {@link SpotlightSearchService}:
 *
 * This service works along with the component in order to provide search results displayed. Those results are gropued
 * in sections based on the registered provider {@link SpotlightSearchProvider}.
 *
 * You can provide order of the search providers, hence the order of the displayed sections
 *
 * If there is just one search provider no section title is displayed.
 *
 * In case of multiple search providers the Spotlight Search can be configured to hide the entire section if it contains no data.
 *
 *
 * For a complete end-to-end running example please take a look at the `Examples` tab of the live-docs
 */
@Component({
    selector: 'vcd-spotlight-search',
    templateUrl: './spotlight-search.component.html',
    styleUrls: ['./spotlight-search.component.scss'],
})
export class SpotlightSearchComponent {
    /**
     * Placeholder for the search input. Default is empty string;
     */
    @Input() public placeholder: string;

    /**
     * This property alongside with `openChange` provide two-way binding [(open)] for controlling the visibility state
     * of the spotlight component
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
     * of the spotlight component
     */
    @Output() openChange: EventEmitter<boolean> = new EventEmitter<boolean>(false);

    /**
     * Event dispatched when item has been activated, i.e. its event handler is called.
     * This happens when item is clicked or 'Enter' is pressed when there is a selection.
     */
    @Output() resultActivated: EventEmitter<ResultActivatedEvent> = new EventEmitter<ResultActivatedEvent>();

    constructor(
        private searchService: SpotlightSearchService,
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
     * The search sections are provided by the {@link SpotlightSearchService} upon opening the Spotlight Search.
     * This insures that new sections based on the current context of the application may appear.
     */
    searchSections: SearchSection[] = [];

    selectedItem: SpotlightSearchResult;

    itemClicked(item: SpotlightSearchResult): void {
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

        // Mark each sections in loading state. This flag is needed when trying to select the first item
        // while the search is still in progress
        this.searchSections.forEach(searchSection => (searchSection.isLoading = true));

        // Go through the available search sections, i.e. the registered search providers and request for results
        this.searchSections.forEach(async searchSection => {
            let results: SpotlightSearchResultType = [];
            // Only request for data if the search is not empty
            if (!!this.searchCriteria) {
                results = searchSection.provider.search(this.searchCriteria);

                // Some of the results may be provided later, so mark the section as loading
                if (results instanceof Promise) {
                    results = await results;
                }
                // Use the closure to verify that the displayed data is going to be really from the latest search
                if (searchId !== this.searchId) {
                    return;
                }
            }
            searchSection.results = results;
            searchSection.isLoading = false;
            this.selectFirst(true);
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
            this.selectedItem = section.results[0];
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
        const allResults = this.searchSections.reduce((acc, v) => [...acc, ...(v.results || [])], []);

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
     * Handle showing / hiding of the Spotlight Search.
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
                .map(data => ({ ...data, results: [], isLoading: true }));
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

    private handleItem(item: SpotlightSearchResult, clicked: boolean): void {
        const searchSection: SearchSection = this.searchSections.find((section) =>
            !section.isLoading && section.results.some( (resultItem) => resultItem.displayText === item.displayText));
        const resultActivatedEvent: ResultActivatedEvent = {
            itemDisplayText: item.displayText,
            sectionTitle: searchSection?.section,
            eventSource: clicked ? 'MouseEvent' : 'KeyboardEvent',
        };
        item.handler();
        this.resultActivated.emit(resultActivatedEvent);
        this.open = false;
    }

    showSectionTitle(searchSection: SearchSection): boolean {
        // In order to show a section title there should be more than one sections
        // and the current section should either be loading data or have results
        return searchSection.section && (searchSection.isLoading || searchSection.results.length > 0);
    }
}
