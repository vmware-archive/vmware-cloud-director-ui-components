/*!
 * Copyright 2020-2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { TranslationService } from '@vcd/i18n';
import { combineLatest } from 'rxjs';
import { DomUtil } from '../utils/dom-util';
import { SubscriptionTracker } from '../common/subscription/subscription-tracker';
import { IdGenerator } from '../utils';
import { AriaActiveDescendantService } from '../lib/directives';
import { QuickSearchResultItem } from './quick-search-result';
import {
    GroupedSearchSections,
    QuickSearchFilter,
    QuickSearchFilterOption,
    QuickSearchService,
    SearchSection,
} from './quick-search.service';
import { DataUi } from './quick-search.dataui';

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
    providers: [
        SubscriptionTracker,
        AriaActiveDescendantService,
        {
            provide: IdGenerator,
            useValue: new IdGenerator('vcd-quick-search'),
        },
    ],
})
export class QuickSearchComponent implements OnInit {
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
     * This method along with `open` property provide two-way binding [(open)] for controlling the visibility state
     * of the quick search component
     */
    @Output() openChange: EventEmitter<boolean> = new EventEmitter<boolean>(false);

    /**
     * Event dispatched when item has been activated, i.e. its event handler is called.
     * This happens when item is clicked or 'Enter' is pressed when there is a selection.
     */
    @Output() resultActivated: EventEmitter<ResultActivatedEvent> = new EventEmitter<ResultActivatedEvent>();

    DataUi = DataUi;
    activeDescendantId: string;
    resultsGridId: string = this.idGenerator.generate();

    constructor(
        public searchService: QuickSearchService,
        public translationService: TranslationService,
        public ariaActivedescendantService: AriaActiveDescendantService,
        private changeDetectorRef: ChangeDetectorRef,
        private el: ElementRef,
        private subscriptionTracker: SubscriptionTracker,
        private idGenerator: IdGenerator
    ) {}

    private _searchCriteria: string = '';

    get searchCriteria(): string {
        return this._searchCriteria;
    }

    set searchCriteria(value: string) {
        this._searchCriteria = value;
        this.doSearch();
    }

    private _open = false;

    _groupedSearchSections: GroupedSearchSections[] = [];
    _ungroupedSearchSections: SearchSection[] = [];

    _filterValues: Map<string, QuickSearchFilterOption[]> = new Map();

    @ViewChild('searchInput', { static: false, read: ElementRef }) searchInput: ElementRef;

    /**
     * The selected result in the results section.
     */
    selectedItem: QuickSearchResultItem;

    ngOnInit(): void {
        this.ariaActivedescendantService.activeDescendantObservable.subscribe((id: string) => {
            this.activeDescendantId = id;
            this.changeDetectorRef.detectChanges();
        });

        this.subscriptionTracker.subscribe(
            combineLatest([
                this.searchService.groupedSearchSectionChanged,
                this.searchService.ungroupedSearchSectionChanged,
            ]),
            ([grouped, ungrouped]) => {
                this._groupedSearchSections = grouped;
                this._ungroupedSearchSections = ungrouped;
            }
        );

        this.subscriptionTracker.subscribe(this.searchService.filterValueChanges, (filterValues) => {
            this._filterValues = filterValues;
        });
    }

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
        if (!this.selectedItem) {
            return;
        }
        event.preventDefault();
        this.handleItem(this.selectedItem, false);
    }

    togglePinned(): void {
        this.searchService.isPinned = !this.searchService.isPinned;
        // When the pinning of the component changes, the searchInput is re-rendered. Because of this, we need to wait for
        // Angular to re-render the searchInput before focusing it.
        setTimeout(() => {
            this.searchInput.nativeElement.focus();
        });
    }

    /**
     * Searches all the providers given the search term and the active filters.
     *
     * @param force runs the search even if the active filters and search term has not changed.
     */
    private doSearch(force?: boolean) {
        if (!this.open && !force) {
            return;
        }

        this.selectedItem = null;
        this.searchService.doSearch(this.searchCriteria, force, () => {
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
            setTimeout(() => {
                this.searchInput.nativeElement.focus();
                this.searchInput.nativeElement.select();
            }, 0);
            this.doSearch(true);
        }

        this._open = open;
        this.openChange.emit(this._open);
        this.changeDetectorRef.detectChanges();
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
        if (!this.searchService.isPinned) {
            this.open = false;
        }
    }

    private getFlattenedSearchSections(): SearchSection[] {
        const allSections: SearchSection[] = [];
        // Takes the nested providers, and turns them to a single deep list of sections.
        this._groupedSearchSections.forEach((section) => allSections.push(...section.subSections));
        return [...this._ungroupedSearchSections, ...allSections];
    }

    getFilterOptionValue(filterId: string, optionKey: string): boolean {
        return !!this._filterValues.get(filterId)?.find((option) => option.key === optionKey);
    }

    showParentSectionTitle(parentSection: GroupedSearchSections): boolean {
        return parentSection.subSections.some((section) => section.shouldShowText && !section.isLoading);
    }

    groupSectionTrackBy(_index: number, groupedSection: GroupedSearchSections): string {
        return groupedSection.headerTitle;
    }

    sectionTrackBy(_index: number, searchSection: SearchSection): string {
        return searchSection.provider.sectionName;
    }

    filterOptionTrackBy(_index: number, filterOption: QuickSearchFilterOption): string {
        return filterOption.key;
    }

    filterTrackBy(_index: number, filterOption: QuickSearchFilter): string {
        return filterOption.id;
    }
}
