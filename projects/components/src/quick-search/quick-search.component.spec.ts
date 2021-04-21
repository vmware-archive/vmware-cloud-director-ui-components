/*!
 * Copyright 2020-2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { MockTranslationService, TranslationService } from '@vcd/i18n';
import { FormsModule } from '@angular/forms';
import { AngularWidgetObjectFinder } from '../utils/test/widget-object/angular/angular-widget-finder';
import { TestElement } from '../utils/test/widget-object/angular/angular-widget-object-element';
import { WidgetObject } from '../utils/test/widget-object';
import { QuickSearchResultItem, QuickSearchResultsType } from './quick-search-result';
import { QuickSearchComponent, QuickSearchFilter, ResultActivatedEvent } from './quick-search.component';
import { QuickSearchModule } from './quick-search.module';
import { QuickSearchProviderDefaults } from './quick-search.provider';
import { QuickSearchService } from './quick-search.service';
import { QuickSearchWo } from './quick-search.wo';

interface Test {
    finder: AngularWidgetObjectFinder<HostSpotlightSearchComponent>;
    quickSearch: QuickSearchWo<TestElement>;
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
    id = 'simple';

    constructor(public shouldDebounceInput: boolean) {
        super(shouldDebounceInput);
    }
    search(criteria: string): QuickSearchResultsType {
        const items = this.searchHandler(criteria);
        return { items };
    }
}

// Another provider that returns an array
class AnotherSimpleSearchProvider extends TestProviderBase {
    constructor(public shouldDebounceInput: boolean) {
        super(shouldDebounceInput);
    }
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
    constructor(public shouldDebounceInput: boolean) {
        super(shouldDebounceInput);
    }
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
    constructor(private total: number, public shouldDebounceInput: boolean) {
        super(shouldDebounceInput);
        this.sectionName = 'Partial';
    }

    search(criteria: string): QuickSearchResultsType {
        const items = this.searchHandler(criteria);
        return { items, total: this.total };
    }
}

class DebounceSearchProvider extends TestProviderBase {
    constructor(public shouldDebounceInput: boolean = false) {
        super(shouldDebounceInput);
        this.sectionName = 'Debounce';
    }

    search(criteria: string): QuickSearchResultsType {
        const items = this.searchHandler(criteria);
        return { items };
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

        this.finder = new AngularWidgetObjectFinder(HostSpotlightSearchComponent);
        this.finder.detectChanges();
        this.quickSearch = this.finder.find<QuickSearchWo<TestElement>>(QuickSearchWo);

        this.quickSearchData = (() => {
            // Create the 2 types of providers
            const simpleProvider = new SimpleSearchProvider(false);
            simpleProvider.sectionName = 'section';
            const asyncProvider = new AsyncSearchProvider(false);
            asyncProvider.sectionName = 'async section';

            // Get a reference to the spotlight search service and register the simple provider
            const spotlightSearchService = TestBed.inject(QuickSearchService);
            spotlightSearchService.registerProvider(simpleProvider);

            // spotlightSearchData that the test will use
            return {
                simpleProvider,
                anotherSimpleProvider: new AnotherSimpleSearchProvider(false),
                asyncProvider,
                spotlightSearchService,
                resultActivated: spyOn(this.finder.hostComponent, 'resultActivated'),
            };
        })();
    });

    describe('visibility', () => {
        beforeEach(function (this: Test): void {
            expect(this.quickSearch.getModalBody().length()).toBe(0, 'Quick Search should be closed');
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            expect(this.quickSearch.getModalBody().length()).not.toBe(0, 'Quick Search should be opened');
        });

        it('can be opened', function (this: Test): void {
            expect(this.quickSearch.getModalBody().length()).not.toBe(0, 'Quick Search should be opened');
        });

        it('can be closed', function (this: Test): void {
            this.finder.hostComponent.spotlightOpen = false;
            this.finder.detectChanges();
            expect(this.quickSearch.getModalBody().length()).toBe(0, 'Quick Search should be closed');
        });

        it('is closed when esc is pressed', function (this: Test): void {
            this.quickSearch.self().sendKeyboardEvent('keyup', { key: 'escape' });
            expect(this.quickSearch.getModalBody().length()).toBe(0, 'Quick Search should be closed');
        });

        it('is closed when clicking outside', function (this: Test): void {
            this.quickSearch.getModalBackdrop().click();
            expect(this.quickSearch.getModalBody().length()).toBe(0, 'Quick Search should be closed');
        });

        it('is closed when item is handled', function (this: Test): void {
            this.quickSearch.getInput().type('c');
            this.quickSearch.getInput().sendKeyboardEvent('keydown', { key: 'enter' });
            this.finder.detectChanges();
            expect(this.quickSearch.getModalBody().length()).toBe(0, 'Quick Search should be closed');
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
            this.quickSearch.getInput().type('c');
            expect(searchHandlerSpy).toHaveBeenCalledWith('c');
            expect(this.quickSearch.getSearchResultItems().map((item) => item.text())).toEqual(['copy', 'create']);
        });

        it('displays a loading indicator when the result is a promise', function (this: Test): void {
            this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.asyncProvider);
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            this.quickSearch.getInput().type('c');
            expect(this.quickSearch.getSpinners().length()).toBe(
                1,
                'There should be a loading indicator in the second section'
            );
        });

        it('displays the result when the promise is resolved', fakeAsync(function (this: Test): void {
            this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.asyncProvider);
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            this.quickSearch.getInput().type('copy');
            tick(1000);
            this.finder.detectChanges();
            expect(this.quickSearch.getSpinners().length()).toBe(0);
            expect(this.quickSearch.getSearchResultItems().map((item) => item.text())).toEqual(['copy', 'copy']);
        }));

        it('displays result from the last search', fakeAsync(function (this: Test): void {
            this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.asyncProvider);
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            // Start the first search
            this.quickSearch.getInput().type('copy');
            tick(500);
            this.finder.detectChanges();
            // Start a second search
            this.quickSearch.getInput().type('create');
            // Advance the clock so that the first search has finished
            tick(500);
            this.finder.detectChanges();
            // There should be just one result form the first provider
            expect(this.quickSearch.getSearchResultItems().text()).toEqual('create');
            // There should still be loading indicator from the second search
            expect(this.quickSearch.getSpinners().length()).toBe(1);
            // Advance the clock so that the second search has finished also
            tick(500);
            this.finder.detectChanges();
            expect(this.quickSearch.getSearchResultItems().map((item) => item.text())).toEqual(['create', 'create']);
        }));

        it('preserves the search criteria upon reopening', function (this: Test): void {
            // Open
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            // Set search
            this.quickSearch.getInput().type('copy');
            // Close
            this.finder.hostComponent.spotlightOpen = false;
            this.finder.detectChanges();
            // Open again
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            expect(this.quickSearch.getInput().value()).toEqual('copy');
            expect(this.quickSearch.getSearchResultItems().text()).toEqual('copy');
        });

        it('uses a newly added search handler', function (this: Test): void {
            const searchHandlerSpy = spyOn(this.quickSearchData.simpleProvider, 'searchHandler').and.callThrough();
            // Open
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            // Set search
            this.quickSearch.getInput().type('copy');
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

        it('display a single "No results found" when there are no results', function (this: Test): void {
            // Register one more provider
            this.quickSearchData.simpleProvider.sectionName = 'new section';
            this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.simpleProvider);
            // Open
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            // Set search
            this.quickSearch.getInput().type('no match');
            //
            const noResults = TestBed.inject(TranslationService).translate('vcd.cc.quickSearch.noResults', []);
            expect(this.quickSearch.getSearchResultItems().toArray().length).toBe(0);
            expect(this.quickSearch.getNoResults().map((item) => item.text())).toEqual([noResults]);
        });

        describe('partial search result', () => {
            it('does not display partial information if total is less than the number of items', function (this: Test): void {
                const partialSearchProvider = new PartialSearchProvider(1, false);
                this.quickSearchData.spotlightSearchService.registerProvider(partialSearchProvider);
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.quickSearch.getInput().type('c');
                expect(this.quickSearch.getSearchResultSectionTitles().map((title) => title.text())).toEqual([
                    'section',
                    partialSearchProvider.sectionName,
                ]);
                expect(this.quickSearch.getSearchResultAlerts().toArray()).toEqual([]);
            });

            it('does not display partial information if total is equal to the number of items', function (this: Test): void {
                const partialSearchProvider = new PartialSearchProvider(2, false);
                this.quickSearchData.spotlightSearchService.registerProvider(partialSearchProvider);
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.quickSearch.getInput().type('c');
                expect(this.quickSearch.getSearchResultSectionTitles().map((title) => title.text())).toEqual([
                    'section',
                    partialSearchProvider.sectionName,
                ]);
                expect(this.quickSearch.getSearchResultAlerts().toArray()).toEqual([]);
            });

            it('does not display partial information if total is undefined', function (this: Test): void {
                const partialSearchProvider = new PartialSearchProvider(undefined, false);
                this.quickSearchData.spotlightSearchService.registerProvider(partialSearchProvider);
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.quickSearch.getInput().type('c');
                expect(this.quickSearch.getSearchResultSectionTitles().map((title) => title.text())).toEqual([
                    'section',
                    partialSearchProvider.sectionName,
                ]);
                expect(this.quickSearch.getSearchResultAlerts().toArray()).toEqual([]);
            });

            describe('when total count is bigger than the number of items', () => {
                it('displays number of items and total count in the section header', function (this: Test): void {
                    const partialSearchProvider = new PartialSearchProvider(3, false);
                    this.quickSearchData.spotlightSearchService.registerProvider(partialSearchProvider);
                    this.finder.hostComponent.spotlightOpen = true;
                    this.finder.detectChanges();
                    this.quickSearch.getInput().type('c');
                    const partial = TestBed.inject(
                        TranslationService
                    ).translate('vcd.cc.quickSearch.partialResultNotation', [{ lastItem: 2, totalItems: 3 }]);
                    expect(this.quickSearch.getSearchResultSectionTitles().toArray()[1].text()).toContain(
                        partialSearchProvider.sectionName
                    );
                    expect(this.quickSearch.getSearchResultSectionTitles().toArray()[1].text()).toContain(partial);
                });

                it('displays warning message to refine the search', function (this: Test): void {
                    const partialSearchProvider = new PartialSearchProvider(3, false);
                    this.quickSearchData.spotlightSearchService.registerProvider(partialSearchProvider);
                    this.finder.hostComponent.spotlightOpen = true;
                    this.finder.detectChanges();
                    this.quickSearch.getInput().type('c');
                    const warning = TestBed.inject(TranslationService).translate('vcd.cc.quickSearch.refineQuery', [
                        { max: 2 },
                    ]);
                    this.finder.detectChanges();
                    expect(this.quickSearch.getSearchResultAlerts().text()).toEqual(warning);
                });
            });
        });

        describe('debounce searching', () => {
            it('debounces calling the search function by 300ms', fakeAsync(function (this: Test): void {
                const debounceSearchProvider = new DebounceSearchProvider(true);
                this.quickSearchData.spotlightSearchService.registerProvider(debounceSearchProvider);
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.quickSearch.getInput().type('c');
                expect(this.quickSearch.getSearchResultSectionTitles().map((title) => title.text())).toEqual([
                    'section',
                    debounceSearchProvider.sectionName,
                ]);
                tick(100);
                this.finder.detectChanges();
                expect(this.quickSearch.getSpinners().length()).toBe(1);
                expect(this.quickSearch.getSearchResultItems().map((title) => title.text())).toEqual([
                    'copy',
                    'create',
                ]);
                tick(200);
                this.finder.detectChanges();
                expect(this.quickSearch.getSpinners().length()).toBe(0);
                expect(this.quickSearch.getSearchResultItems().map((title) => title.text())).toEqual([
                    'copy',
                    'create',
                    'copy',
                    'create',
                ]);
            }));
        });
    });

    describe('section title', () => {
        it('displays section title even if there is just one provider', function (this: Test): void {
            // Open
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            // Set search
            this.quickSearch.getInput().type('copy');
            //
            expect(this.quickSearch.getSearchResultItems().length()).toBe(1);
            expect(this.quickSearch.getSearchResultSectionTitles().text()).toEqual('section');
        });

        it('displays all section titles when there are results', function (this: Test): void {
            // Register one more provider
            const simpleSearchProvider = new SimpleSearchProvider(false);
            simpleSearchProvider.sectionName = 'new section';
            this.quickSearchData.spotlightSearchService.registerProvider(simpleSearchProvider);
            // Open
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            // Set search
            this.quickSearch.getInput().type('copy');
            expect(this.quickSearch.getSearchResultSectionTitles().map((title) => title.text())).toEqual([
                'section',
                'new section',
            ]);
        });

        it('does not display section title if it is not provided', function (this: Test): void {
            const providerEmptySectionTitle = new SimpleSearchProvider(false);
            providerEmptySectionTitle.sectionName = '';
            const providerUndefinedSectionTitle = new SimpleSearchProvider(false);
            providerUndefinedSectionTitle.sectionName = undefined;
            this.quickSearchData.spotlightSearchService.registerProvider(providerEmptySectionTitle);
            this.quickSearchData.spotlightSearchService.registerProvider(providerUndefinedSectionTitle);
            // Open
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            // Set search
            this.quickSearch.getInput().type('copy');
            //
            expect(this.quickSearch.getSearchResultSectionTitles().text()).toEqual('section');
        });

        it('does not display section title if there are no results', function (this: Test): void {
            // Set the flag to hide the section when there is no result
            // Open
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            // Set search
            this.quickSearch.getInput().type('no match');
            // Check expectations
            expect(this.quickSearch.getSearchResultItems().length()).toBe(0);
            expect(this.quickSearch.getSearchResultSectionTitles().length()).toEqual(0);
        });

        it('displays nested providers title correctly with nested, filtered providers', function (this: Test): void {
            // Open
            this.quickSearchData.anotherSimpleProvider.sectionName = 'another section';
            this.quickSearchData.spotlightSearchService.registerNestedProvider({
                sectionName: 'Some Nested Provider',
                order: -1,
                children: [this.quickSearchData.simpleProvider, this.quickSearchData.anotherSimpleProvider],
            });
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            // Set search
            this.quickSearch.getInput().type('o');
            expect(this.quickSearch.getSearchResultItems().length()).toBe(4);
            expect(this.quickSearch.getSearchResultSectionTitles().map((title) => title.text())).toEqual([
                'section',
                'Some Nested Provider',
                'section',
                'another section',
            ]);

            this.quickSearch.getInput().type('copy');
            expect(this.quickSearch.getSearchResultItems().length()).toBe(2);
            expect(this.quickSearch.getSearchResultSectionTitles().map((title) => title.text().toString())).toEqual([
                'section',
                'Some Nested Provider',
                'section',
            ]);
        });

        it('orders nested providers by their given order', function (this: Test): void {
            // Open
            this.quickSearchData.spotlightSearchService.registerNestedProvider({
                sectionName: 'Some Nested Provider',
                order: 2,
                children: [this.quickSearchData.simpleProvider],
            });

            this.quickSearchData.spotlightSearchService.registerNestedProvider({
                sectionName: 'Another Nested Provider',
                order: 1,
                children: [this.quickSearchData.simpleProvider],
            });

            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            // Set search
            this.quickSearch.getInput().type('o');
            //
            expect(this.quickSearch.getSearchResultSectionTitles().map((title) => title.text())).toEqual([
                'section',
                'Another Nested Provider',
                'section',
                'Some Nested Provider',
                'section',
            ]);
        });
    });

    describe('selection', () => {
        describe('auto selection', () => {
            it('selects the first item if the first section is loaded', function (this: Test): void {
                // Append async provider
                this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.asyncProvider);
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.quickSearch.getInput().type('c');
                expect(this.quickSearch.getSelectedSearchResultItem().text()).toEqual('copy');
            });

            it('can update the selected item with a new one from the same section', function (this: Test): void {
                // Append async provider
                this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.asyncProvider);
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.quickSearch.getInput().type('c');
                expect(this.quickSearch.getSelectedSearchResultItem().text()).toEqual('copy');
                this.quickSearch.getInput().type('cr');
                expect(this.quickSearch.getSelectedSearchResultItem().text()).toEqual('create');
            });

            it('can update the selected item with a new one from a different section', function (this: Test): void {
                this.quickSearchData.anotherSimpleProvider.sectionName = 'another section';
                this.quickSearchData.spotlightSearchService.registerProvider(
                    this.quickSearchData.anotherSimpleProvider
                );
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.quickSearch.getInput().type('c');
                this.quickSearch.getInput().type('another');
                expect(this.quickSearch.getSelectedSearchResultItem().toArray()[0].text().toString()).toEqual(
                    'another'
                );
            });

            it('does not select any item if the first section returns async result', function (this: Test): void {
                // Prepend async provider so that the first section will be loading
                Object.assign(this.quickSearchData.asyncProvider, { order: 0 });
                this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.asyncProvider);
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.quickSearch.getInput().type('c');
                expect(this.quickSearch.getSelectedSearchResultItem().toArray().toString()).toEqual('');
            });

            it('selects the first item after the promise is resolved', fakeAsync(function (this: Test): void {
                Object.assign(this.quickSearchData.asyncProvider, { order: 0 });
                this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.asyncProvider);
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.quickSearch.getInput().type('c');
                tick(1000);
                expect(this.quickSearch.getSelectedSearchResultItem().toArray()[0].text()).toEqual('copy');
            }));

            it('does not change manual selection', fakeAsync(function (this: Test): void {
                Object.assign(this.quickSearchData.asyncProvider, { order: 0 });
                this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.asyncProvider);
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.quickSearch.getInput().type('copy');
                // Pressing arrow up selects the first available result, in this case it is the from from the simple provider
                this.quickSearch.getInput().sendKeyboardEvent('keydown', { key: 'ArrowUp' });
                tick(1000);
                this.finder.detectChanges();
                expect(this.quickSearch.getSelectedSearchResultItem().text()).toEqual('copy');
            }));
        });

        describe('arrow keys', () => {
            it('selects first item when arrow up is pressed before search is completed', function (this: Test): void {
                Object.assign(this.quickSearchData.asyncProvider, { order: 0 });
                // Prepend async provider so that there is no auto selection
                this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.asyncProvider);
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.quickSearch.getInput().type('c');
                this.quickSearch.getInput().sendKeyboardEvent('keydown', { key: 'ArrowUp' });
                expect(this.quickSearch.getSelectedSearchResultItem().text()).toEqual('copy');
            });

            it('selects first item when arrow down is pressed before search is completed', function (this: Test): void {
                Object.assign(this.quickSearchData.asyncProvider, { order: 0 });
                // Prepend async provider so that there is no auto selection
                this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.asyncProvider);
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.quickSearch.getInput().type('c');
                this.quickSearch.getInput().sendKeyboardEvent('keydown', { key: 'ArrowDown' });
                expect(this.quickSearch.getSelectedSearchResultItem().text()).toEqual('copy');
            });

            it('selects next item when arrow down is pressed', function (this: Test): void {
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.quickSearch.getInput().type('c');
                expect(this.quickSearch.getSelectedSearchResultItem().text()).toEqual('copy');
                this.quickSearch.getInput().sendKeyboardEvent('keydown', { key: 'ArrowDown' });
                expect(this.quickSearch.getSelectedSearchResultItem().text()).toEqual('create');
            });

            it(
                'selects from the next section when being at the bottom of ' + 'a section and arrow down is pressed',
                function (this: Test): void {
                    this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.simpleProvider);
                    this.finder.hostComponent.spotlightOpen = true;
                    this.finder.detectChanges();
                    this.quickSearch.getInput().type('c');
                    this.quickSearch.getInput().sendKeyboardEvent('keydown', { key: 'ArrowDown' });
                    // Test the selection is from the first section
                    expect(this.quickSearch.getSelectedSearchResultItem().text()).toEqual('create');
                    this.quickSearch.getInput().sendKeyboardEvent('keydown', { key: 'ArrowDown' });
                    // Test the selection now is from the second section
                    expect(this.quickSearch.getSelectedSearchResultItem().text()).toEqual('copy');
                }
            );

            it('selects the first item when being at the bottom of the list and arrow down is pressed', function (this: Test): void {
                this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.simpleProvider);
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.quickSearch.getInput().type('c');
                expect(this.quickSearch.getSearchResultItems().length()).toBe(4);
                // Go to the bottom of the list
                this.quickSearch.getInput().sendKeyboardEvent('keydown', { key: 'ArrowDown' });
                this.quickSearch.getInput().sendKeyboardEvent('keydown', { key: 'ArrowDown' });
                this.quickSearch.getInput().sendKeyboardEvent('keydown', { key: 'ArrowDown' });
                // Test the selection is the bottom of the second section
                expect(this.quickSearch.getSelectedSearchResultItem().text()).toEqual('create');
                // Go beyond the length of the list
                this.quickSearch.getInput().sendKeyboardEvent('keydown', { key: 'ArrowDown' });
                // Test the selection is the first item of the first selection
                expect(this.quickSearch.getSelectedSearchResultItem().text()).toEqual('copy');
            });

            it('selects previous item when arrow up is pressed', function (this: Test): void {
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.quickSearch.getInput().type('c');
                expect(this.quickSearch.getSelectedSearchResultItem().text()).toEqual('copy');
                this.quickSearch.getInput().sendKeyboardEvent('keydown', { key: 'ArrowDown' });
                expect(this.quickSearch.getSelectedSearchResultItem().text()).toEqual('create');
                this.quickSearch.getInput().sendKeyboardEvent('keydown', { key: 'ArrowUp' });
                expect(this.quickSearch.getSelectedSearchResultItem().text()).toEqual('copy');
            });

            it('selects the last item when being at the top of the list and up is pressed', function (this: Test): void {
                this.quickSearchData.simpleProvider.sectionName = 'new section';
                this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.simpleProvider);
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.quickSearch.getInput().type('c');
                // Test
                expect(this.quickSearch.getSelectedSearchResultItem().text()).toEqual('copy');
                // Press arrow up key
                this.quickSearch.getInput().sendKeyboardEvent('keydown', { key: 'ArrowUp' });
                // Test
                expect(this.quickSearch.getSelectedSearchResultItem().text()).toEqual('create');
            });
        });
    });
    describe('item handler', () => {
        it('is called when pressing enter and there is a selection', function (this: Test): void {
            const itemHandlerSpy = spyOn(this.quickSearchData.simpleProvider, 'itemHandler').and.callThrough();
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            this.quickSearch.getInput().type('c');
            this.quickSearch.getInput().sendKeyboardEvent('keydown', { key: 'enter' });
            expect(itemHandlerSpy).toHaveBeenCalledWith('copy');
        });

        it('is not called when pressing enter and there is no selection', function (this: Test): void {
            const itemHandlerSpy = spyOn(this.quickSearchData.simpleProvider, 'itemHandler').and.callThrough();

            // Prepend async provider so that there is no auto selection
            Object.assign(this.quickSearchData.asyncProvider, { order: 0 });

            this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.asyncProvider);
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            this.quickSearch.getInput().type('c');
            this.quickSearch.getInput().sendKeyboardEvent('keydown', { key: 'enter' });
            expect(itemHandlerSpy).not.toHaveBeenCalled();
        });

        it('is called when item is clicked', function (this: Test): void {
            const itemHandlerSpy = spyOn(this.quickSearchData.simpleProvider, 'itemHandler').and.callThrough();

            // Prepend async provider so that there is no auto selection
            Object.assign(this.quickSearchData.asyncProvider, { order: 0 });

            this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.asyncProvider);
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            this.quickSearch.getInput().type('c');
            this.quickSearch.getSearchResultItems().toArray()[1].click();
            this.finder.detectChanges();
            expect(itemHandlerSpy).toHaveBeenCalledWith('create');
        });
    });

    describe('ResultActivatedEvent', () => {
        it('is emitted when pressing enter and there is a selection', function (this: Test): void {
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            this.quickSearch.getInput().type('c');
            this.quickSearch.getInput().sendKeyboardEvent('keydown', { key: 'enter' });
            const event: ResultActivatedEvent = {
                itemDisplayText: 'copy',
                sectionTitle: 'section',
                eventSource: 'KeyboardEvent',
            };
            expect(this.quickSearchData.resultActivated).toHaveBeenCalledWith(jasmine.objectContaining(event));
        });
        it('is not emitted when pressing enter and there is no selection', function (this: Test): void {
            // Prepend async provider so that there is no auto selection
            Object.assign(this.quickSearchData.asyncProvider, { order: 0 });

            this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.asyncProvider);
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            this.quickSearch.getInput().type('c');
            this.quickSearch.getInput().sendKeyboardEvent('keydown', { key: 'enter' });
            expect(this.quickSearchData.resultActivated).not.toHaveBeenCalled();
        });

        it('is emitted when item is clicked', function (this: Test): void {
            Object.assign(this.quickSearchData.asyncProvider, { order: 0, sectionName: 'async section' });
            // Prepend async provider so that there is no auto selection
            this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.asyncProvider);
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            this.quickSearch.getInput().type('c');
            this.quickSearch.getSearchResultItems().toArray()[1].click();
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
            expect(this.quickSearch.getInput().value()).toBe('');
        });

        it('can be set', function (this: Test): void {
            this.finder.hostComponent.placeholder = 'Search...';
            this.finder.detectChanges();
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            expect(this.quickSearch.getInput().placeholder()).toBe('Search...');
        });
    });

    describe('projecting content', () => {
        beforeEach(function (this: Test): void {
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
        });

        it('can project content at the top of the results', function (this: Test): void {
            expect(this.quickSearch.getSearchResultItems().elements.toString()).toEqual('');
            this.finder.hostComponent.isTopOfResultsShown = true;
            this.finder.detectChanges();
            expect(this.quickSearch.getTopOfResults().text()).toEqual('Top of results');
        });

        it('can project content at the bottom of the results', function (this: Test): void {
            expect(this.quickSearch.getBottomOfResults().elements.toString()).toEqual('');
            this.finder.hostComponent.isBottomOfResultsShown = true;
            this.finder.detectChanges();
            expect(this.quickSearch.getBottomOfResults().text()).toEqual('Bottom of results');
        });
    });

    describe('filters', () => {
        beforeEach(function (this: Test): void {
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
        });

        it('adds a filter icon that shows providers only of that type', function (this: Test): void {
            this.finder.hostComponent.filters = [
                {
                    id: 'type',
                    options: [{ display: 'simple' }],
                },
            ];
            this.quickSearchData.anotherSimpleProvider.sectionName = 'another section';
            this.quickSearchData.spotlightSearchService.registerProvider(this.quickSearchData.anotherSimpleProvider);
            this.quickSearch.getInput().type('copy');
            expect(this.quickSearch.getSearchResultSectionTitles().length()).toEqual(1);

            // When the type filter is present,, the list of providers is filtered based on it.
            // In this case, the type:simple filter is set and anotherSimpleProvider is removed.
            this.quickSearch.getInput().type('copy type:simple');
            expect(this.quickSearch.getSearchResultSectionTitles().length()).toEqual(1);
            expect(this.quickSearch.getSearchResultItems().text()).toEqual('copy');
        });
    });
});
@Component({
    template: `
        <vcd-quick-search
            [(open)]="spotlightOpen"
            (resultActivated)="resultActivated($event)"
            [placeholder]="placeholder"
            [filters]="filters"
        >
            <div data-ui="top-results" class="top-of-results" *ngIf="isTopOfResultsShown">Top of results</div>
            <div data-ui="bottom-results" class="bottom-of-results" *ngIf="isBottomOfResultsShown">
                Bottom of results
            </div>
        </vcd-quick-search>
    `,
})
export class HostSpotlightSearchComponent {
    public placeholder: string;
    public spotlightOpen = false;
    public isTopOfResultsShown = false;
    public isBottomOfResultsShown = false;
    public filters: QuickSearchFilter[] = [];

    resultActivated(event: ResultActivatedEvent): void {}
}
