/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { MockTranslationService, TranslationService } from '@vcd/i18n';
import { WidgetFinder, WidgetObject } from '../utils/test/widget-object';
import { QuickSearchResultItem, QuickSearchResultsType } from './quick-search-result';
import { QuickSearchComponent, ResultActivatedEvent } from './quick-search.component';
import { QuickSearchModule } from './quick-search.module';
import { QuickSearchProviderDefaults } from './quick-search.provider';
import { QuickSearchService } from './quick-search.service';

interface Test {
    finder: WidgetFinder<HostSpotlightSearchComponent>;
    quickSearch: QuickSearchWidgetObject;
    quickSearchData: {
        simpleProvider: SimpleSearchProvider;
        anotherSimpleProvider: AnotherSimpleSearchProvider;
        asyncProvider: AsyncSearchProvider;
        spotlightSearchService: QuickSearchService;
        resultActivated: jasmine.Spy;
    };
}

abstract class TestProviderBase extends QuickSearchProviderDefaults {
    searchHandler(criteria: string): QuickSearchResultItem[] {
        return ['copy', 'create']
            .filter((item) => item.includes(criteria))
            .map((item) => ({
                displayText: item,
                handler: () => this.itemHandler(item),
            }));
    }
    itemHandler(value: unknown): void {
        console.log(value);
    }
}
// Provider that returns an array
class SimpleSearchProvider extends TestProviderBase {
    search(criteria: string): QuickSearchResultsType {
        const items = this.searchHandler(criteria);
        return { items };
    }
}

// Another provider that returns an array
class AnotherSimpleSearchProvider extends TestProviderBase {
    search(criteria: string): QuickSearchResultsType {
        const items = ['other', 'another']
            .filter((item) => item.includes(criteria))
            .map((item) => ({
                displayText: item,
                handler: () => this.itemHandler(item),
            }));
        return { items };
    }
}

// Provider that returns a promise
class AsyncSearchProvider extends TestProviderBase {
    search(criteria: string): QuickSearchResultsType {
        return new Promise((resolve) => {
            setTimeout(() => {
                const items = this.searchHandler(criteria);
                resolve({ items });
            }, 1000);
        });
    }
}

// Provider that can simulate partial search result, by setting the total number if items
class PartialSearchProvider extends TestProviderBase {
    constructor(private total: number) {
        super();
        this.sectionName = 'Partial';
    }

    search(criteria: string): QuickSearchResultsType {
        const items = this.searchHandler(criteria);
        return { items, total: this.total };
    }
}

describe('QuickSearchComponent', () => {
    /**
     * Every test starts with an instance of a SimpleSearchProvider that has already been registered
     */
    beforeEach(async function (this: Test): Promise<void> {
        await TestBed.configureTestingModule({
            imports: [CommonModule, ClarityModule, QuickSearchModule, NoopAnimationsModule],
            providers: [
                {
                    provide: TranslationService,
                    useValue: new MockTranslationService(),
                },
            ],
            declarations: [HostSpotlightSearchComponent],
        }).compileComponents();

        this.finder = new WidgetFinder(HostSpotlightSearchComponent);
        this.finder.detectChanges();
        this.quickSearch = this.finder.find(QuickSearchWidgetObject);

        this.quickSearchData = (() => {
            // Create the 2 types of providers
            const simpleProvider = new SimpleSearchProvider();
            simpleProvider.sectionName = 'section';
            const asyncProvider = new AsyncSearchProvider();

            // Get a reference to the spotlight search service and register the simple provider
            const spotlightSearchService = TestBed.inject(QuickSearchService);
            spotlightSearchService.registerProvider(simpleProvider);

            // spotlightSearchData that the test will use
            return {
                simpleProvider,
                anotherSimpleProvider: new AnotherSimpleSearchProvider(),
                asyncProvider,
                spotlightSearchService,
                resultActivated: spyOn(this.finder.hostComponent, 'resultActivated'),
            };
        })();
    });

    describe('visibility', () => {
        beforeEach(function (this: Test): void {
            expect(this.quickSearch.isOpened()).toBeFalsy('Quick Search should be closed');
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            expect(this.quickSearch.isOpened()).toBeTruthy('Quick Search should be opened');
        });

        it('can be opened', function (this: Test): void {
            expect(this.quickSearch.isOpened()).toBeTruthy('Quick Search should be opened');
        });

        it('can be closed', function (this: Test): void {
            this.finder.hostComponent.spotlightOpen = false;
            this.finder.detectChanges();
            expect(this.quickSearch.isOpened()).toBeFalsy('Quick Search should be closed');
        });

        it('is closed when esc is pressed', function (this: Test): void {
            this.quickSearch.pressEscape();
            expect(this.quickSearch.isOpened()).toBeFalsy('Quick Search should be closed');
        });

        it('is closed when clicking outside', function (this: Test): void {
            this.quickSearch.clickOutside();
            expect(this.quickSearch.isOpened()).toBeFalsy('Quick Search should be closed');
        });

        it('is closed when item is handled', function (this: Test): void {
            this.quickSearch.searchInputValue = 'c';
            this.quickSearch.pressEnter();
            expect(this.quickSearch.isOpened()).toBeFalsy('Quick Search should be closed');
        });
    });

    describe('search', () => {
        it('does not call the search providers if there is no search criteria', function (this: Test): void {
            const searchHandlerSpy = spyOn(this.quickSearchData.simpleProvider, 'searchHandler').and.callThrough();
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            expect(searchHandlerSpy).not.toHaveBeenCalled();
        });

        it('displays the result immediately when it is an array', function (this: Test): void {
            const searchHandlerSpy = spyOn(this.quickSearchData.simpleProvider, 'searchHandler').and.callThrough();
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            this.quickSearch.searchInputValue = 'c';
            expect(searchHandlerSpy).toHaveBeenCalledWith('c');
            expect(this.quickSearch.searchResults).toEqual(['copy', 'create']);
        });

        it('displays a loading indicator when the result is a promise', function (this: Test): void {
            this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.asyncProvider);
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            this.quickSearch.searchInputValue = 'c';
            expect(this.quickSearch.isLoading).toBeTruthy('There should be a loading indicator in the second section');
        });

        it('displays the result when the promise is resolved', fakeAsync(function (this: Test): void {
            this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.asyncProvider);
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            this.quickSearch.searchInputValue = 'copy';
            tick(1000);
            this.finder.detectChanges();
            expect(this.quickSearch.isLoading).toBeFalsy();
            expect(this.quickSearch.searchResults).toEqual(['copy', 'copy']);
        }));

        it('displays result from the last search', fakeAsync(function (this: Test): void {
            this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.asyncProvider);
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            // Start the first search
            this.quickSearch.searchInputValue = 'copy';
            tick(500);
            this.finder.detectChanges();
            // Start a second search
            this.quickSearch.searchInputValue = 'create';
            // Advance the clock so that the first search has finished
            tick(500);
            this.finder.detectChanges();
            // There should be just one result form the first provider
            expect(this.quickSearch.searchResults).toEqual(['create']);
            // There should still be loading indicator from the second search
            expect(this.quickSearch.isLoading).toBeTruthy();
            // Advance the clock so that the second search has finished also
            tick(500);
            this.finder.detectChanges();
            expect(this.quickSearch.searchResults).toEqual(['create', 'create']);
        }));

        it('preserves the search criteria upon reopening', function (this: Test): void {
            // Open
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            // Set search
            this.quickSearch.searchInputValue = 'copy';
            // Close
            this.finder.hostComponent.spotlightOpen = false;
            this.finder.detectChanges();
            // Open again
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            expect(this.quickSearch.searchInputValue).toEqual('copy');
            expect(this.quickSearch.searchResults).toEqual(['copy']);
        });

        it('uses a newly added search handler', function (this: Test): void {
            const searchHandlerSpy = spyOn(this.quickSearchData.simpleProvider, 'searchHandler').and.callThrough();
            // Open
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            // Set search
            this.quickSearch.searchInputValue = 'copy';
            // Test that the search handler is called
            expect(searchHandlerSpy).toHaveBeenCalledTimes(1);
            expect(searchHandlerSpy).toHaveBeenCalledWith('copy');
            // Close
            this.finder.hostComponent.spotlightOpen = false;
            this.finder.detectChanges();
            // Register new provider
            this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.simpleProvider);
            // Open again
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            // Test that the search handler is called 2 more times, 1 more for the old handler and 1 more for the new handler
            expect(searchHandlerSpy).toHaveBeenCalledTimes(3);
            expect(searchHandlerSpy).toHaveBeenCalledWith('copy');
        });

        it('display "No results found" when there are no results', function (this: Test): void {
            // Register one more provider
            this.quickSearchData.simpleProvider.sectionName = 'new section';
            this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.simpleProvider);
            // Open
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            // Set search
            this.quickSearch.searchInputValue = 'no match';
            //
            const noResults = TestBed.inject(TranslationService).translate('vcd.cc.quickSearch.noResults', []);
            expect(this.quickSearch.searchResults.length).toBe(0);
            expect(this.quickSearch.noSearchResults).toEqual([noResults, noResults]);
        });

        describe('partial search result', () => {
            it('does not display partial information if total is less than the number of items', function (this: Test): void {
                const partialSearchProvider = new PartialSearchProvider(1);
                this.quickSearchData.spotlightSearchService.registerProvider(partialSearchProvider);
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.quickSearch.searchInputValue = 'c';
                expect(this.quickSearch.sectionTitles).toEqual(['section', partialSearchProvider.sectionName]);
                expect(this.quickSearch.searchResultAlerts).toEqual([]);
            });

            it('does not display partial information if total is equal to the number of items', function (this: Test): void {
                const partialSearchProvider = new PartialSearchProvider(2);
                this.quickSearchData.spotlightSearchService.registerProvider(partialSearchProvider);
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.quickSearch.searchInputValue = 'c';
                expect(this.quickSearch.sectionTitles).toEqual(['section', partialSearchProvider.sectionName]);
                expect(this.quickSearch.searchResultAlerts).toEqual([]);
            });

            it('does not display partial information if total is undefined', function (this: Test): void {
                const partialSearchProvider = new PartialSearchProvider(undefined);
                this.quickSearchData.spotlightSearchService.registerProvider(partialSearchProvider);
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.quickSearch.searchInputValue = 'c';
                expect(this.quickSearch.sectionTitles).toEqual(['section', partialSearchProvider.sectionName]);
                expect(this.quickSearch.searchResultAlerts).toEqual([]);
            });

            describe('when total count is bigger than the number of items', () => {
                it('displays number of items and total count in the section header', function (this: Test): void {
                    const partialSearchProvider = new PartialSearchProvider(3);
                    this.quickSearchData.spotlightSearchService.registerProvider(partialSearchProvider);
                    this.finder.hostComponent.spotlightOpen = true;
                    this.finder.detectChanges();
                    this.quickSearch.searchInputValue = 'c';
                    const partial = TestBed.inject(
                        TranslationService
                    ).translate('vcd.cc.quickSearch.partialResultNotation', [{ lastItem: 2, totalItems: 3 }]);
                    expect(this.quickSearch.sectionTitles[1]).toContain(partialSearchProvider.sectionName);
                    expect(this.quickSearch.sectionTitles[1]).toContain(partial);
                });

                it('displays warning message to refine the search', function (this: Test): void {
                    const partialSearchProvider = new PartialSearchProvider(3);
                    this.quickSearchData.spotlightSearchService.registerProvider(partialSearchProvider);
                    this.finder.hostComponent.spotlightOpen = true;
                    this.finder.detectChanges();
                    this.quickSearch.searchInputValue = 'c';
                    const warning = TestBed.inject(TranslationService).translate('vcd.cc.quickSearch.refineQuery', [
                        { max: 2 },
                    ]);
                    expect(this.quickSearch.searchResultAlerts).toEqual([warning]);
                });
            });
        });
    });

    describe('section title', () => {
        it('displays section title even if there is just one provider', function (this: Test): void {
            // Open
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            // Set search
            this.quickSearch.searchInputValue = 'copy';
            //
            expect(this.quickSearch.searchResults.length).toBe(1);
            expect(this.quickSearch.sectionTitles).toEqual(['section']);
        });

        it('displays all section titles when there are results', function (this: Test): void {
            // Register one more provider

            const simpleSearchProvider = new SimpleSearchProvider();
            simpleSearchProvider.sectionName = 'new section';
            this.quickSearchData.spotlightSearchService.registerProvider(simpleSearchProvider);
            // Open
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            // Set search
            this.quickSearch.searchInputValue = 'copy';
            expect(this.quickSearch.sectionTitles).toEqual(['section', 'new section']);
        });

        it('does not display section title if it is not provided', function (this: Test): void {
            const providerEmptySectionTitle = new SimpleSearchProvider();
            providerEmptySectionTitle.sectionName = '';
            const providerUndefinedSectionTitle = new SimpleSearchProvider();
            providerUndefinedSectionTitle.sectionName = undefined;
            this.quickSearchData.spotlightSearchService.registerProvider(providerEmptySectionTitle);
            this.quickSearchData.spotlightSearchService.registerProvider(providerUndefinedSectionTitle);
            // Open
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            // Set search
            this.quickSearch.searchInputValue = 'copy';
            //
            expect(this.quickSearch.sectionTitles).toEqual(['section']);
        });

        it('display section title if there are no results', function (this: Test): void {
            // Register one more provider
            this.quickSearchData.simpleProvider.sectionName = 'new section';
            this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.simpleProvider);
            // Open
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            // Set search
            this.quickSearch.searchInputValue = 'no match';
            //
            expect(this.quickSearch.searchResults.length).toBe(0);
            expect(this.quickSearch.sectionTitles.length).toEqual(2);
        });
    });

    describe('selection', () => {
        describe('auto selection', () => {
            it('selects the first item if the first section is loaded', function (this: Test): void {
                // Append async provider
                this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.asyncProvider);
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.quickSearch.searchInputValue = 'c';
                expect(this.quickSearch.getSelectedItem(1)).toEqual('copy');
            });

            it('can update the selected item with a new one from the same section', function (this: Test): void {
                // Append async provider
                this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.asyncProvider);
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.quickSearch.searchInputValue = 'c';
                expect(this.quickSearch.getSelectedItem(1)).toEqual('copy');
                this.quickSearch.searchInputValue = 'cr';
                expect(this.quickSearch.getSelectedItem(1)).toEqual('create');
            });

            it('can update the selected item with a new one from a different section', function (this: Test): void {
                this.quickSearchData.anotherSimpleProvider.sectionName = 'another section';
                this.quickSearchData.spotlightSearchService.registerProvider(
                    this.quickSearchData.anotherSimpleProvider
                );
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.quickSearch.searchInputValue = 'c';
                this.quickSearch.searchInputValue = 'another';
                expect(this.quickSearch.getSelectedItem(2)).toEqual('another');
            });

            it('does not select any item if the first section returns async result', function (this: Test): void {
                // Prepend async provider so that the first section will be loading
                Object.assign(this.quickSearchData.asyncProvider, { order: 0, sectionName: 'async section' });
                this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.asyncProvider);
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.quickSearch.searchInputValue = 'c';
                expect(this.quickSearch.getSelectedItem()).toEqual('');
            });

            it('selects the first item after the promise is resolved', fakeAsync(function (this: Test): void {
                Object.assign(this.quickSearchData.asyncProvider, { order: 0, sectionName: 'async section' });
                this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.asyncProvider);
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.quickSearch.searchInputValue = 'c';
                tick(1000);
                expect(this.quickSearch.getSelectedItem(1)).toEqual('copy');
            }));

            it('does not change manual selection', fakeAsync(function (this: Test): void {
                Object.assign(this.quickSearchData.asyncProvider, { order: 0, sectionName: 'async section' });
                this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.asyncProvider);
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.quickSearch.searchInputValue = 'copy';
                // Pressing arrow up selects the first available result, in this case it is the from from the simple provider
                this.quickSearch.pressArrowUp();
                tick(1000);
                this.finder.detectChanges();
                expect(this.quickSearch.getSelectedItem(2)).toEqual('copy');
            }));
        });

        describe('arrow keys', () => {
            it('selects first item when there is no selection and arrow up is pressed', function (this: Test): void {
                Object.assign(this.quickSearchData.asyncProvider, { order: 0, sectionName: 'async section' });

                // Prepend async provider so that there is no auto selection
                this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.asyncProvider);
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.quickSearch.searchInputValue = 'c';
                this.quickSearch.pressArrowUp();
                expect(this.quickSearch.getSelectedItem(2)).toEqual('copy');
            });

            it('selects first item when there is no selection and arrow down is pressed', function (this: Test): void {
                // Prepend async provider so that there is no auto selection
                Object.assign(this.quickSearchData.asyncProvider, { order: 0, sectionName: 'async section' });

                this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.asyncProvider);
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.quickSearch.searchInputValue = 'c';
                this.quickSearch.pressArrowDown();
                expect(this.quickSearch.getSelectedItem(2)).toEqual('copy');
            });

            it('selects next item when arrow down is pressed', function (this: Test): void {
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.quickSearch.searchInputValue = 'c';
                expect(this.quickSearch.getSelectedItem(1)).toEqual('copy');
                this.quickSearch.pressArrowDown();
                expect(this.quickSearch.getSelectedItem(1)).toEqual('create');
            });

            it(
                'selects from the next section when being at the bottom of ' + 'a section and arrow down is pressed',
                function (this: Test): void {
                    this.quickSearchData.asyncProvider.sectionName = 'async section';
                    this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.simpleProvider);
                    this.finder.hostComponent.spotlightOpen = true;
                    this.finder.detectChanges();
                    this.quickSearch.searchInputValue = 'c';
                    this.quickSearch.pressArrowDown();
                    // Test the selection is from the first section
                    expect(this.quickSearch.getSelectedItem(1)).toEqual('create');
                    this.quickSearch.pressArrowDown();
                    // Test the selection now is from the second section
                    expect(this.quickSearch.getSelectedItem(2)).toEqual('copy');
                }
            );

            it('selects the first item when being at the bottom of the list and arrow down is pressed', function (this: Test): void {
                this.quickSearchData.asyncProvider.sectionName = 'async section';
                this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.simpleProvider);
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.quickSearch.searchInputValue = 'c';
                expect(this.quickSearch.searchResults.length).toBe(4);
                // Go to the bottom of the list
                this.quickSearch.pressArrowDown();
                this.quickSearch.pressArrowDown();
                this.quickSearch.pressArrowDown();
                // Test the selection is the bottom of the second section
                expect(this.quickSearch.getSelectedItem(2)).toEqual('create');
                // Go beyond the length of the list
                this.quickSearch.pressArrowDown();
                // Test the selection is the first item of the first selection
                expect(this.quickSearch.getSelectedItem(1)).toEqual('copy');
            });

            it('selects previous item when arrow up is pressed', function (this: Test): void {
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.quickSearch.searchInputValue = 'c';
                expect(this.quickSearch.getSelectedItem(1)).toEqual('copy');
                this.quickSearch.pressArrowDown();
                expect(this.quickSearch.getSelectedItem(1)).toEqual('create');
                this.quickSearch.pressArrowUp();
                expect(this.quickSearch.getSelectedItem(1)).toEqual('copy');
            });

            it('selects the last item when being at the top of the list and up is pressed', function (this: Test): void {
                this.quickSearchData.simpleProvider.sectionName = 'new section';
                this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.simpleProvider);
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.quickSearch.searchInputValue = 'c';
                // Test
                expect(this.quickSearch.getSelectedItem(1)).toEqual('copy');
                // Press arrow up key
                this.quickSearch.pressArrowUp();
                // Test
                expect(this.quickSearch.getSelectedItem(2)).toEqual('create');
            });
        });
    });

    describe('item handler', () => {
        it('is called when pressing enter and there is a selection', function (this: Test): void {
            const itemHandlerSpy = spyOn(this.quickSearchData.simpleProvider, 'itemHandler').and.callThrough();
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            this.quickSearch.searchInputValue = 'c';
            this.quickSearch.pressEnter();
            expect(itemHandlerSpy).toHaveBeenCalledWith('copy');
        });

        it('is not called when pressing enter and there is no selection', function (this: Test): void {
            const itemHandlerSpy = spyOn(this.quickSearchData.simpleProvider, 'itemHandler').and.callThrough();

            // Prepend async provider so that there is no auto selection
            Object.assign(this.quickSearchData.asyncProvider, { order: 0, sectionName: 'async section' });

            this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.asyncProvider);
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            this.quickSearch.searchInputValue = 'c';
            this.quickSearch.pressEnter();
            expect(itemHandlerSpy).not.toHaveBeenCalled();
        });

        it('is called when item is clicked', function (this: Test): void {
            const itemHandlerSpy = spyOn(this.quickSearchData.simpleProvider, 'itemHandler').and.callThrough();

            // Prepend async provider so that there is no auto selection
            Object.assign(this.quickSearchData.asyncProvider, { order: 0, sectionName: 'async section' });

            this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.asyncProvider);
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            this.quickSearch.searchInputValue = 'c';
            this.quickSearch.clickItem(2, 2);
            expect(itemHandlerSpy).toHaveBeenCalledWith('create');
        });
    });

    describe('ResultActivatedEvent', () => {
        it('is emitted when pressing enter and there is a selection', function (this: Test): void {
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            this.quickSearch.searchInputValue = 'c';
            this.quickSearch.pressEnter();
            const event: ResultActivatedEvent = {
                itemDisplayText: 'copy',
                sectionTitle: 'section',
                eventSource: 'KeyboardEvent',
            };
            expect(this.quickSearchData.resultActivated).toHaveBeenCalledWith(jasmine.objectContaining(event));
        });
        it('is not emitted when pressing enter and there is no selection', function (this: Test): void {
            // Prepend async provider so that there is no auto selection
            Object.assign(this.quickSearchData.asyncProvider, { order: 0, sectionName: 'async section' });

            this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.asyncProvider);
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            this.quickSearch.searchInputValue = 'c';
            this.quickSearch.pressEnter();
            expect(this.quickSearchData.resultActivated).not.toHaveBeenCalled();
        });

        it('is emitted when item is clicked', function (this: Test): void {
            Object.assign(this.quickSearchData.asyncProvider, { order: 0, sectionName: 'async section' });
            // Prepend async provider so that there is no auto selection
            this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.asyncProvider);
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            this.quickSearch.searchInputValue = 'c';
            this.quickSearch.clickItem(2, 2);
            const event: ResultActivatedEvent = {
                itemDisplayText: 'create',
                sectionTitle: 'section',
                eventSource: 'MouseEvent',
            };
            expect(this.quickSearchData.resultActivated).toHaveBeenCalledWith(jasmine.objectContaining(event));
        });
    });

    describe('search input placeholder', () => {
        it('default to empty', function (this: Test): void {
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            expect(this.quickSearch.seacrhPlaceholder).toBe('');
        });

        it('can be set', function (this: Test): void {
            this.finder.hostComponent.placeholder = 'Search...';
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            expect(this.quickSearch.seacrhPlaceholder).toBe('Search...');
        });
    });

    describe('projecting content', () => {
        beforeEach(function (this: Test): void {
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
        });

        it('can projected content at the top of the results', function (this: Test): void {
            expect(this.quickSearch.topOfResultsText).toEqual('');
            this.finder.hostComponent.isTopOfResultsShown = true;
            this.finder.detectChanges();
            expect(this.quickSearch.topOfResultsText).toEqual('Top of results');
        });

        it('can projected content at the bottom of the results', function (this: Test): void {
            expect(this.quickSearch.bottomOfResultsText).toEqual('');
            this.finder.hostComponent.isBottomOfResultsShown = true;
            this.finder.detectChanges();
            expect(this.quickSearch.bottomOfResultsText).toEqual('Bottom of results');
        });
    });
});

@Component({
    template: `
        <vcd-quick-search
            [(open)]="spotlightOpen"
            (resultActivated)="resultActivated($event)"
            [placeholder]="placeholder"
        >
            <div class="top-of-results" *ngIf="isTopOfResultsShown">Top of results</div>
            <div class="bottom-of-results" *ngIf="isBottomOfResultsShown">Bottom of results</div>
        </vcd-quick-search>
    `,
})
export class HostSpotlightSearchComponent {
    public placeholder: string;
    public spotlightOpen = false;
    public isTopOfResultsShown = false;
    public isBottomOfResultsShown = false;
    resultActivated(event: ResultActivatedEvent): void {}
}

export class QuickSearchWidgetObject extends WidgetObject<QuickSearchComponent> {
    static tagName = `vcd-quick-search`;

    public isOpened(): boolean {
        return !!this.findElement('.search-input-container input');
    }

    private get searchInputElement(): HTMLInputElement {
        return this.findElement('.search-input-container input').nativeElement;
    }

    public get searchInputValue(): string {
        return this.searchInputElement.value;
    }

    public set searchInputValue(val: string) {
        this.setInputValue(val, '.search-input-container input');
    }

    public get seacrhPlaceholder(): string {
        return this.searchInputElement.placeholder;
    }

    public clickOutside(): void {
        this.click('.modal-backdrop');
    }

    public pressEscape(): void {
        this.sendKeyboardEvent('keyup', { key: 'escape' }, '.search-input-container input');
    }

    public pressEnter(): void {
        this.sendKeyboardEvent('keydown', { key: 'enter' }, '.search-input-container input');
    }

    public pressArrowUp(): void {
        this.sendKeyboardEvent('keydown', { key: 'ArrowUp' }, '.search-input-container input');
    }

    public pressArrowDown(): void {
        this.sendKeyboardEvent('keydown', { key: 'ArrowDown' }, '.search-input-container input');
    }

    public get searchResults(): string[] {
        return this.getTexts('.search-result-item');
    }

    public get searchResultAlerts(): string[] {
        return this.getTexts('clr-alert-item');
    }

    public get noSearchResults(): string[] {
        return this.getTexts('.no-results');
    }

    public get sectionTitles(): string[] {
        return this.getTexts('.search-result-section-title');
    }

    public getSelectedItem(section?: number): string {
        let cssSelector = '.search-result-item.selected';
        if (section) {
            cssSelector = `.search-result-section:nth-child(${section}) ${cssSelector}`;
        }
        return this.getText(cssSelector);
    }

    public clickItem(itemIndex, sectionIndex): void {
        this.click(`.search-result-section:nth-child(${sectionIndex}) .search-result-item:nth-child(${itemIndex})`);
    }

    public get topOfResultsText(): string {
        return this.getText('.top-of-results');
    }

    public get bottomOfResultsText(): string {
        return this.getText('.bottom-of-results');
    }

    public get isLoading(): boolean {
        return !!this.findElement('.spinner');
    }
}
