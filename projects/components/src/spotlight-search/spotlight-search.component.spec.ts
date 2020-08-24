/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockTranslationService, TranslationService } from '@vcd/i18n';
import { WidgetFinder, WidgetObject } from '../utils/test/widget-object';
import { SpotlightSearchResult, SpotlightSearchResultType } from './spotlight-search-result';
import { ResultActivatedEvent, SpotlightSearchComponent } from './spotlight-search.component';
import { SpotlightSearchModule } from './spotlight-search.module';
import { SpotlightSearchProvider } from './spotlight-search.provider';
import { SpotlightSearchService } from './spotlight-search.service';

interface Test {
    finder: WidgetFinder<HostSpotlightSearchComponent>;
    spotlightSearch: SpotlightSearchWidgetObject;
    spotlightSearchData: {
        itemHandler: jasmine.Spy;
        searchHandler: jasmine.Spy;
        simpleProvider: SpotlightSearchProvider;
        anotherSimpleProvider: SpotlightSearchProvider;
        asyncProvider: SpotlightSearchProvider;
        spotlightSearchService: SpotlightSearchService;
        resultActivated: jasmine.Spy;
    };
}

describe('SpotlightSearchComponent', () => {
    beforeEach(async function(this: Test): Promise<void> {
        await TestBed.configureTestingModule({
            imports: [SpotlightSearchModule, NoopAnimationsModule],
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
        this.spotlightSearch = this.finder.find(SpotlightSearchWidgetObject);

        this.spotlightSearchData = (() => {
            // Item handler spy
            const itemHandler = jasmine.createSpy('itemHandler', value => console.log(value)).and.callThrough();

            // Provider search spy
            const searchHandler = jasmine
                .createSpy(
                    'searchHandler',
                    (criteria: string): SpotlightSearchResultType => {
                        return ['copy', 'create']
                            .filter(item => item.includes(criteria))
                            .map(item => ({
                                displayText: item,
                                handler: () => itemHandler(item),
                            }));
                    }
                )
                .and.callThrough();

            // Provider that returns an array
            class SimpleSearchProvider implements SpotlightSearchProvider {
                search(criteria: string): SpotlightSearchResult[] {
                    return searchHandler(criteria);
                }
            }

            // Another provider that returns an array
            class AnotherSimpleSearchProvider implements SpotlightSearchProvider {
                search(criteria: string): SpotlightSearchResult[] {
                    return ['other', 'another']
                        .filter(item => item.includes(criteria))
                        .map(item => ({
                            displayText: item,
                            handler: () => itemHandler(item),
                        }));
                }
            }

            // Provider that returns a promise
            class AsyncSearchProvider implements SpotlightSearchProvider {
                search(criteria: string): Promise<SpotlightSearchResult[]> {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            resolve(searchHandler(criteria));
                        }, 1000);
                    });
                }
            }

            // Create the 2 types of providers
            const simpleProvider = new SimpleSearchProvider();
            const asyncProvider = new AsyncSearchProvider();

            // Get a reference to the spotlight search service and register the simple provider
            const spotlightSearchService = TestBed.inject(SpotlightSearchService) as SpotlightSearchService;
            spotlightSearchService.registerProvider(simpleProvider, 'section');

            // spotlightSearchData that the test will use
            return {
                itemHandler,
                searchHandler,
                simpleProvider,
                anotherSimpleProvider: new AnotherSimpleSearchProvider(),
                asyncProvider,
                spotlightSearchService,
                resultActivated: spyOn(this.finder.hostComponent, 'resultActivated'),
            };
        })();
    });

    describe('visibility', () => {
        beforeEach(function(this: Test): void {
            expect(this.spotlightSearch.isOpened()).toBeFalsy('Spotlight Search should be closed');
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            expect(this.spotlightSearch.isOpened()).toBeTruthy('Spotlight Search should be opened');
        });

        it('can be opened', function(this: Test): void {
            expect(this.spotlightSearch.isOpened()).toBeTruthy('Spotlight Search should be opened');
        });

        it('can be closed', function(this: Test): void {
            this.finder.hostComponent.spotlightOpen = false;
            this.finder.detectChanges();
            expect(this.spotlightSearch.isOpened()).toBeFalsy('Spotlight Search should be closed');
        });

        it('is closed when esc is pressed', function(this: Test): void {
            this.spotlightSearch.pressEscape();
            expect(this.spotlightSearch.isOpened()).toBeFalsy('Spotlight Search should be closed');
        });

        it('is closed when clicking outside', function(this: Test): void {
            this.spotlightSearch.clickOutside();
            expect(this.spotlightSearch.isOpened()).toBeFalsy('Spotlight Search should be closed');
        });

        it('is closed when item is handled', function(this: Test): void {
            this.spotlightSearch.searchInputValue = 'c';
            this.spotlightSearch.pressEnter();
            expect(this.spotlightSearch.isOpened()).toBeFalsy('Spotlight Search should be closed');
        });
    });

    describe('search', () => {
        it('does not call the search providers if there is no search criteria', function(this: Test): void {
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            expect(this.spotlightSearchData.searchHandler).not.toHaveBeenCalled();
        });

        it('displays the result immediately when it is an array', function(this: Test): void {
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            this.spotlightSearch.searchInputValue = 'c';
            expect(this.spotlightSearchData.searchHandler).toHaveBeenCalledWith('c');
            expect(this.spotlightSearch.searchResults).toEqual(['copy', 'create']);
        });

        it('displays a loading indicator when the result is a promise', function(this: Test): void {
            this.spotlightSearchData.spotlightSearchService.registerProvider(
                this.spotlightSearchData.asyncProvider,
                'async section'
            );
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            this.spotlightSearch.searchInputValue = 'c';
            expect(this.spotlightSearch.isLoading).toBeTruthy(
                'There should be a loading indicator in the second section'
            );
        });

        it('displays the result when the promise is resolved', fakeAsync(function(this: Test): void {
            this.spotlightSearchData.spotlightSearchService.registerProvider(
                this.spotlightSearchData.asyncProvider,
                'async section'
            );
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            this.spotlightSearch.searchInputValue = 'copy';
            tick(1000);
            this.finder.detectChanges();
            expect(this.spotlightSearch.isLoading).toBeFalsy();
            expect(this.spotlightSearch.searchResults).toEqual(['copy', 'copy']);
        }));

        it('displays result from the last search', fakeAsync(function(this: Test): void {
            this.spotlightSearchData.spotlightSearchService.registerProvider(
                this.spotlightSearchData.asyncProvider,
                'async section'
            );
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            // Start the first search
            this.spotlightSearch.searchInputValue = 'copy';
            tick(500);
            this.finder.detectChanges();
            // Start a second search
            this.spotlightSearch.searchInputValue = 'create';
            // Advance the clock so that the first search has finished
            tick(500);
            this.finder.detectChanges();
            // There should be just one result form the first provider
            expect(this.spotlightSearch.searchResults).toEqual(['create']);
            // There should still be loading indicator from the second search
            expect(this.spotlightSearch.isLoading).toBeTruthy();
            // Advance the clock so that the second search has finished also
            tick(500);
            this.finder.detectChanges();
            expect(this.spotlightSearch.searchResults).toEqual(['create', 'create']);
        }));

        it('preserves the search criteria upon reopening', function(this: Test): void {
            // Open
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            // Set search
            this.spotlightSearch.searchInputValue = 'copy';
            // Close
            this.finder.hostComponent.spotlightOpen = false;
            this.finder.detectChanges();
            // Open again
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            expect(this.spotlightSearch.searchInputValue).toEqual('copy');
            expect(this.spotlightSearch.searchResults).toEqual(['copy']);
        });

        it('uses a newly added search handler', function(this: Test): void {
            // Open
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            // Set search
            this.spotlightSearch.searchInputValue = 'copy';
            // Test that the search handler is called
            expect(this.spotlightSearchData.searchHandler).toHaveBeenCalledTimes(1);
            expect(this.spotlightSearchData.searchHandler).toHaveBeenCalledWith('copy');
            // Close
            this.finder.hostComponent.spotlightOpen = false;
            this.finder.detectChanges();
            // Register new provider
            this.spotlightSearchData.spotlightSearchService.registerProvider(
                this.spotlightSearchData.simpleProvider,
                'new section'
            );
            // Open again
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            // Test thst the search handler is called 2 more times, 1 more for the old handler and 1 more for the new handler
            expect(this.spotlightSearchData.searchHandler).toHaveBeenCalledTimes(3);
            expect(this.spotlightSearchData.searchHandler).toHaveBeenCalledWith('copy');
        });
    });

    describe('section', () => {
        it('displays section title even if there is just one provider', function(this: Test): void {
            // Open
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            // Set search
            this.spotlightSearch.searchInputValue = 'copy';
            //
            expect(this.spotlightSearch.searchResults.length).toBe(1);
            expect(this.spotlightSearch.sectionTitles).toEqual(['section']);
        });

        it('displays all section titles when there are results', function(this: Test): void {
            // Register one more provider
            this.spotlightSearchData.spotlightSearchService.registerProvider(
                this.spotlightSearchData.simpleProvider,
                'new section'
            );
            // Open
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            // Set search
            this.spotlightSearch.searchInputValue = 'copy';
            //
            expect(this.spotlightSearch.sectionTitles).toEqual(['section', 'new section']);
        });

        it('does not display section title if it is not provided', function(this: Test): void {
            // Register a provider with empty section title
            this.spotlightSearchData.spotlightSearchService.registerProvider(
                this.spotlightSearchData.simpleProvider,
                ''
            );
            // Register a provider with undefined section title
            this.spotlightSearchData.spotlightSearchService.registerProvider(
                this.spotlightSearchData.simpleProvider,
                undefined
            );
            // Open
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            // Set search
            this.spotlightSearch.searchInputValue = 'copy';
            //
            expect(this.spotlightSearch.sectionTitles).toEqual(['section']);
        });

        it('can hide the section title when there is no result', function(this: Test): void {
            // Register one more provider
            this.spotlightSearchData.spotlightSearchService.registerProvider(
                this.spotlightSearchData.simpleProvider,
                'new section'
            );
            // Open
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            // Set search
            this.spotlightSearch.searchInputValue = 'no match';
            //
            expect(this.spotlightSearch.searchResults.length).toBe(0);
            expect(this.spotlightSearch.sectionTitles.length).toEqual(0);
        });
    });

    describe('selection', () => {
        describe('auto selection', () => {
            it('selects the first item if the first section is loaded', function(this: Test): void {
                // Append async provider
                this.spotlightSearchData.spotlightSearchService.registerProvider(
                    this.spotlightSearchData.asyncProvider,
                    'async section'
                );
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.spotlightSearch.searchInputValue = 'c';
                expect(this.spotlightSearch.getSelectedItem(1)).toEqual('copy');
            });

            it('can update the selected item with a new one from the same section', function(this: Test): void {
                // Append async provider
                this.spotlightSearchData.spotlightSearchService.registerProvider(
                    this.spotlightSearchData.asyncProvider,
                    'async section'
                );
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.spotlightSearch.searchInputValue = 'c';
                expect(this.spotlightSearch.getSelectedItem(1)).toEqual('copy');
                this.spotlightSearch.searchInputValue = 'cr';
                expect(this.spotlightSearch.getSelectedItem(1)).toEqual('create');
            });

            it('can update the selected item with a new one from a different section', function(this: Test): void {
                this.spotlightSearchData.spotlightSearchService.registerProvider(
                    this.spotlightSearchData.anotherSimpleProvider,
                    'another section'
                );
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.spotlightSearch.searchInputValue = 'c';
                this.spotlightSearch.searchInputValue = 'another';
                expect(this.spotlightSearch.getSelectedItem(2)).toEqual('another');
            });

            it('does not select any item if the first section returns async result', function(this: Test): void {
                // Prepend async provider so that the first section will be loading
                this.spotlightSearchData.spotlightSearchService.registerProvider(
                    this.spotlightSearchData.asyncProvider,
                    'async section',
                    0
                );
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.spotlightSearch.searchInputValue = 'c';
                expect(this.spotlightSearch.getSelectedItem()).toEqual('');
            });

            it('selects the first item after the promise is resolved', fakeAsync(function(this: Test): void {
                this.spotlightSearchData.spotlightSearchService.registerProvider(
                    this.spotlightSearchData.asyncProvider,
                    'async section',
                    0
                );
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.spotlightSearch.searchInputValue = 'c';
                tick(1000);
                expect(this.spotlightSearch.getSelectedItem(1)).toEqual('copy');
            }));
        });

        describe('arrow keys', () => {
            it('selects first item when there is no selection and arrow up is pressed', function(this: Test): void {
                // Prepend async provider so that there is no auto selection
                this.spotlightSearchData.spotlightSearchService.registerProvider(
                    this.spotlightSearchData.asyncProvider,
                    'async section',
                    0
                );
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.spotlightSearch.searchInputValue = 'c';
                this.spotlightSearch.pressArrowUp();
                expect(this.spotlightSearch.getSelectedItem(2)).toEqual('copy');
            });

            it('selects first item when there is no selection and arrow down is pressed', function(this: Test): void {
                // Prepend async provider so that there is no auto selection
                this.spotlightSearchData.spotlightSearchService.registerProvider(
                    this.spotlightSearchData.asyncProvider,
                    'async section',
                    0
                );
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.spotlightSearch.searchInputValue = 'c';
                this.spotlightSearch.pressArrowDown();
                expect(this.spotlightSearch.getSelectedItem(2)).toEqual('copy');
            });

            it('selects next item when arrow down is pressed', function(this: Test): void {
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.spotlightSearch.searchInputValue = 'c';
                expect(this.spotlightSearch.getSelectedItem(1)).toEqual('copy');
                this.spotlightSearch.pressArrowDown();
                expect(this.spotlightSearch.getSelectedItem(1)).toEqual('create');
            });

            it('selects from the next section when being at the bottom of a section and arrow down is pressed', function(this: Test): void {
                this.spotlightSearchData.spotlightSearchService.registerProvider(
                    this.spotlightSearchData.simpleProvider,
                    'new section'
                );
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.spotlightSearch.searchInputValue = 'c';
                this.spotlightSearch.pressArrowDown();
                // Test the selection is from the first section
                expect(this.spotlightSearch.getSelectedItem(1)).toEqual('create');
                this.spotlightSearch.pressArrowDown();
                // Test the selection now is from the second section
                expect(this.spotlightSearch.getSelectedItem(2)).toEqual('copy');
            });

            it('selects the first item when being at the bottom of the list and arrow down is pressed', function(this: Test): void {
                this.spotlightSearchData.spotlightSearchService.registerProvider(
                    this.spotlightSearchData.simpleProvider,
                    'new section'
                );
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.spotlightSearch.searchInputValue = 'c';
                expect(this.spotlightSearch.searchResults.length).toBe(4);
                // Go to the bottom of the list
                this.spotlightSearch.pressArrowDown();
                this.spotlightSearch.pressArrowDown();
                this.spotlightSearch.pressArrowDown();
                // Test the selection is the bottom of the second section
                expect(this.spotlightSearch.getSelectedItem(2)).toEqual('create');
                // Go beyond the length of the list
                this.spotlightSearch.pressArrowDown();
                // Test the selection is the first item of the first selection
                expect(this.spotlightSearch.getSelectedItem(1)).toEqual('copy');
            });

            it('selects previous item when arrow up is pressed', function(this: Test): void {
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.spotlightSearch.searchInputValue = 'c';
                expect(this.spotlightSearch.getSelectedItem(1)).toEqual('copy');
                this.spotlightSearch.pressArrowDown();
                expect(this.spotlightSearch.getSelectedItem(1)).toEqual('create');
                this.spotlightSearch.pressArrowUp();
                expect(this.spotlightSearch.getSelectedItem(1)).toEqual('copy');
            });

            it('selects the last item when being at the top of the list and up is pressed', function(this: Test): void {
                this.spotlightSearchData.spotlightSearchService.registerProvider(
                    this.spotlightSearchData.simpleProvider,
                    'new section'
                );
                this.finder.hostComponent.spotlightOpen = true;
                this.finder.detectChanges();
                this.spotlightSearch.searchInputValue = 'c';
                // Test
                expect(this.spotlightSearch.getSelectedItem(1)).toEqual('copy');
                // Press arrow up key
                this.spotlightSearch.pressArrowUp();
                // Test
                expect(this.spotlightSearch.getSelectedItem(2)).toEqual('create');
            });
        });
    });

    describe('item handler', () => {
        it('is called when pressing enter and there is a selection', function(this: Test): void {
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            this.spotlightSearch.searchInputValue = 'c';
            this.spotlightSearch.pressEnter();
            expect(this.spotlightSearchData.itemHandler).toHaveBeenCalledWith('copy');
        });

        it('is not called when pressing enter and there is no selection', function(this: Test): void {
            // Prepend async provider so that there is no auto selection
            this.spotlightSearchData.spotlightSearchService.registerProvider(
                this.spotlightSearchData.asyncProvider,
                'async section',
                0
            );
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            this.spotlightSearch.searchInputValue = 'c';
            this.spotlightSearch.pressEnter();
            expect(this.spotlightSearchData.itemHandler).not.toHaveBeenCalled();
        });

        it('is called when item is clicked', function(this: Test): void {
            // Prepend async provider so that there is no auto selection
            this.spotlightSearchData.spotlightSearchService.registerProvider(
                this.spotlightSearchData.asyncProvider,
                'async section',
                0
            );
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            this.spotlightSearch.searchInputValue = 'c';
            this.spotlightSearch.clickItem(2, 2);
            expect(this.spotlightSearchData.itemHandler).toHaveBeenCalledWith('create');
        });
    });

    describe('ResultActivatedEvent', () => {
        it('is emitted when pressing enter and there is a selection', function(this: Test): void {
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            this.spotlightSearch.searchInputValue = 'c';
            this.spotlightSearch.pressEnter();
            const event: ResultActivatedEvent = {
                itemDisplayText: 'copy',
                sectionTitle: 'section',
                eventSource: 'KeyboardEvent',
            };
            expect(this.spotlightSearchData.resultActivated).toHaveBeenCalledWith(jasmine.objectContaining(event));
        });
        it('is not emitted when pressing enter and there is no selection', function(this: Test): void {
            // Prepend async provider so that there is no auto selection
            this.spotlightSearchData.spotlightSearchService.registerProvider(
                this.spotlightSearchData.asyncProvider,
                'async section',
                0
            );
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            this.spotlightSearch.searchInputValue = 'c';
            this.spotlightSearch.pressEnter();
            expect(this.spotlightSearchData.resultActivated).not.toHaveBeenCalled();
        });

        it('is emitted when item is clicked', function(this: Test): void {
            // Prepend async provider so that there is no auto selection
            this.spotlightSearchData.spotlightSearchService.registerProvider(
                this.spotlightSearchData.asyncProvider,
                'async section',
                0
            );
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            this.spotlightSearch.searchInputValue = 'c';
            this.spotlightSearch.clickItem(2, 2);
            const event: ResultActivatedEvent = {
                itemDisplayText: 'create',
                sectionTitle: 'section',
                eventSource: 'MouseEvent',
            };
            expect(this.spotlightSearchData.resultActivated).toHaveBeenCalledWith(jasmine.objectContaining(event));
        });
    });

    describe('search input placeholder', () => {
        it('default to empty', function(this: Test): void {
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            expect(this.spotlightSearch.seacrhPlaceholder).toBe('');
        });

        it('can be set', function(this: Test): void {
            this.finder.hostComponent.placeholder = 'Search...';
            this.finder.hostComponent.spotlightOpen = true;
            this.finder.detectChanges();
            expect(this.spotlightSearch.seacrhPlaceholder).toBe('Search...');
        });
    });
});

@Component({
    template: `
        <vcd-spotlight-search
            [(open)]="spotlightOpen"
            (resultActivated)="resultActivated($event)"
            [placeholder]="placeholder"
        >
        </vcd-spotlight-search>
    `,
})
export class HostSpotlightSearchComponent {
    public placeholder: string;
    public spotlightOpen = false;
    resultActivated(event: ResultActivatedEvent): void {}
}

export class SpotlightSearchWidgetObject extends WidgetObject<SpotlightSearchComponent> {
    static tagName = `vcd-spotlight-search`;

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
        this.sendKeyboardEvent('escape', '.search-input-container input');
    }

    public pressEnter(): void {
        this.sendKeyboardEvent('enter', '.search-input-container input');
    }

    public pressArrowUp(): void {
        this.sendKeyboardEvent('ArrowUp', '.search-input-container input');
    }

    public pressArrowDown(): void {
        this.sendKeyboardEvent('ArrowDown', '.search-input-container input');
    }

    public get searchResults(): string[] {
        return this.getTexts('.search-result-item');
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

    public get isLoading(): boolean {
        return !!this.findElement('.spinner');
    }
}
