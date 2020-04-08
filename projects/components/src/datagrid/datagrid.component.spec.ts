/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockTranslationService, TranslationService } from '@vcd/i18n';
import { TooltipSize } from '../lib/directives/show-clipped-text.directive';
import { ClrDatagridWidgetObject } from '../utils/test/datagrid/datagrid.wo';
import { VcdDatagridWidgetObject } from '../utils/test/datagrid/vcd-datagrid.wo';
import { WidgetFinder } from '../utils/test/widget-object';
import { ActivityIndicatorType, GridSelectionType, PaginationConfiguration } from './datagrid.component';
import { DatagridComponent, GridDataFetchResult, GridState } from './datagrid.component';
import { DatagridModule } from './datagrid.module';
import { DatagridStringFilter, WildCardPosition } from './filters/datagrid-string-filter.component';
import {
    ButtonConfig,
    ColumnComponentRendererSpec,
    ContextualButtonPosition,
    GridColumn,
    GridColumnHideable,
    InactiveButtonDisplayMode,
} from './interfaces/datagrid-column.interface';
import { mockData, MockRecord } from './mock-data';
import { BoldTextRendererComponent } from './renderers/bold-text-renderer.component';
import { WithGridBoldRenderer } from './renderers/bold-text-renderer.wo';

type MockRecordDatagridComponent = DatagridComponent<MockRecord>;

class GridWithBoldRenderer extends WithGridBoldRenderer(VcdDatagridWidgetObject)<MockRecord> {}

interface HasFinderAndGrid {
    finder: WidgetFinder<HostWithDatagridComponent>;
    // The Widget Object for the underlying Clarity grid
    clrGridWidget: ClrDatagridWidgetObject;
    // The Widget Object for the VCD Datagrid
    vcdDatagrid: GridWithBoldRenderer;
    // The instance of DatagridComponent
    component: MockRecordDatagridComponent;
}

describe('DatagridComponent', () => {
    beforeEach(async function(this: HasFinderAndGrid): Promise<void> {
        await TestBed.configureTestingModule({
            imports: [DatagridModule, BrowserAnimationsModule],
            providers: [
                {
                    provide: TranslationService,
                    useValue: new MockTranslationService(),
                },
            ],
            declarations: [HostWithDatagridComponent],
        }).compileComponents();

        this.finder = new WidgetFinder(HostWithDatagridComponent);
        this.vcdDatagrid = this.finder.find(GridWithBoldRenderer);
        this.clrGridWidget = this.vcdDatagrid.clrDatagrid;
    });

    describe('Grid', () => {
        describe('', () => {
            beforeEach(function(this: HasFinderAndGrid): void {
                this.finder.hostComponent.columns = [
                    { displayName: 'Name', renderer: 'name' },
                    { displayName: 'City', renderer: 'city' },
                ];
                this.finder.detectChanges();
            });
            it('displays number of columns', function(this: HasFinderAndGrid): void {
                expect(this.clrGridWidget.columnCount).toBe(this.finder.hostComponent.columns.length);
            });

            it('displays columns with headers', function(this: HasFinderAndGrid): void {
                expect(this.clrGridWidget.columnHeaders).toEqual(
                    this.finder.hostComponent.columns.map(col => col.displayName)
                );
                expect(this.clrGridWidget.getColumnHeader(0)).toEqual(this.finder.hostComponent.columns[0].displayName);
            });

            // TODO: uncomment when we upgrade to Clarity 3. Due to a bug in Clarity, there
            // is some debug pollution in the datagrid columns.
            /*it('displays the correct headers even when columns are reloaded', function(this: HasFinderAndGrid): void {
                this.finder.hostComponent.columns = [
                    { displayName: 'One More', renderer: 'name' },
                ];
                this.finder.detectChanges();
                expect(this.clrGridWidget.columnHeaders).toEqual(
                    this.finder.hostComponent.columns.map(col => col.displayName)
                );
                expect(this.clrGridWidget.getColumnHeader(0)).toEqual(this.finder.hostComponent.columns[0].displayName);
            });*/

            it('displays rows based on the grid data received', function(this: HasFinderAndGrid): void {
                expect(this.clrGridWidget.rowCount).toBe(mockData.length);
            });

            it('gives proper css class for the grid', function(this: HasFinderAndGrid): void {
                this.finder.hostComponent.clrDatagridCssClass = 'some_class';
                this.finder.detectChanges();
                expect(this.clrGridWidget.gridCssClass).toContain('some_class');
            });

            it('sets no default CSS classnames for the rows', function(this: HasFinderAndGrid): void {
                expect(this.clrGridWidget.getRowsCssClass(0)).toEqual(['datagrid-row', 'datagrid-selected']);
            });

            it('sets CSS classnames on rows', function(this: HasFinderAndGrid): void {
                const firstCall = ['firstRowA', 'secondRowA'];
                const secondCall = ['firstRowB', 'secondRowB'];

                this.finder.hostComponent.clrDatarowCssClassGetter = (rec: MockRecord, index: number) => {
                    return firstCall[index];
                };
                this.finder.detectChanges();
                expect(this.clrGridWidget.getRowsCssClass(0)).toContain(
                    'firstRowA',
                    'Expected the initial class to display for the first row.'
                );
                expect(this.clrGridWidget.getRowsCssClass(1)).toContain(
                    'secondRowA',
                    'Expected some different initial class to display for the second row.'
                );

                this.finder.hostComponent.clrDatarowCssClassGetter = (rec: MockRecord, index: number) => {
                    return secondCall[index];
                };
                this.finder.detectChanges();
                expect(this.clrGridWidget.getRowsCssClass(0)).toContain(
                    'firstRowB',
                    'Expected a new class to display for the first row.'
                );
                expect(this.clrGridWidget.getRowsCssClass(1)).toContain(
                    'secondRowB',
                    'Expected a different new class to display for the second row.'
                );
            });

            describe('@Input() columns.disableCliptext', () => {
                beforeEach(function(this: HasFinderAndGrid): void {
                    this.finder.hostComponent.gridData = {
                        items: mockData,
                        totalItems: 2,
                    };
                    this.finder.detectChanges();
                });

                it('clips text when disableCliptext is unset', function(this: HasFinderAndGrid): void {
                    this.finder.hostComponent.columns = [{ displayName: 'Name', renderer: 'name' }];
                    this.finder.detectChanges();
                    expect(this.clrGridWidget.columnClippedTextDirective(0).disabled).toBeFalsy();
                });

                it('clips text when disableCliptext is false', function(this: HasFinderAndGrid): void {
                    this.finder.hostComponent.columns = [
                        { displayName: 'Name', renderer: 'name', cliptextConfig: { size: TooltipSize.md } },
                    ];
                    this.finder.detectChanges();
                    expect(this.clrGridWidget.columnClippedTextDirective(0).disabled).toBeFalsy();
                });

                it('does not clip text when disableCliptext is true', function(this: HasFinderAndGrid): void {
                    this.finder.hostComponent.columns = [
                        { displayName: 'Name', renderer: 'name', cliptextConfig: { disabled: true } },
                    ];
                    this.finder.detectChanges();
                    expect(this.clrGridWidget.columnClippedTextDirective(0).disabled).toBeTruthy();
                });
            });

            describe('@Input() selectionType', () => {
                it('has multi selection capabilities when set to multi selection', function(this: HasFinderAndGrid): void {
                    this.finder.hostComponent.selectionType = GridSelectionType.Multi;
                    this.finder.detectChanges();
                    expect(this.clrGridWidget.getSelectionType()).toBe(GridSelectionType.Multi);
                });

                it('has single selection capabilities when set to single selection', function(this: HasFinderAndGrid): void {
                    this.finder.hostComponent.selectionType = GridSelectionType.Single;
                    this.finder.detectChanges();
                    expect(this.clrGridWidget.getSelectionType()).toBe(GridSelectionType.Single);
                });

                it('has none selection capabilities when set to none', function(this: HasFinderAndGrid): void {
                    this.finder.hostComponent.selectionType = GridSelectionType.None;
                    this.finder.detectChanges();
                    expect(this.clrGridWidget.getSelectionType()).toBe(GridSelectionType.None);
                });
            });

            describe('getSelection()', () => {
                it('emits multiple rows when set to multi selection', function(this: HasFinderAndGrid): void {
                    this.finder.hostComponent.selectionType = GridSelectionType.Multi;
                    this.finder.detectChanges();
                    this.clrGridWidget.selectRow(0);
                    expect(this.finder.hostComponent.getSelection()).toEqual([mockData[0]]);
                    this.clrGridWidget.selectRow(1);
                    expect(this.finder.hostComponent.getSelection()).toEqual(mockData);
                });

                it('emits only one row when set to single selection', function(this: HasFinderAndGrid): void {
                    this.finder.hostComponent.selectionType = GridSelectionType.Single;
                    this.finder.detectChanges();
                    this.clrGridWidget.selectRow(0);
                    expect(this.finder.hostComponent.getSelection()).toEqual([mockData[0]]);
                    this.clrGridWidget.selectRow(1);
                    expect(this.finder.hostComponent.getSelection()).toEqual([mockData[1]]);
                });
            });

            describe('@Input() gridData', () => {
                it('shows a placeholder when no data is present', function(this: HasFinderAndGrid): void {
                    this.finder.hostComponent.gridData = {
                        items: [],
                        totalItems: 0,
                    };
                    this.finder.detectChanges();
                    expect(this.clrGridWidget.hasPlaceholder).toBeTruthy();
                });

                describe('when data is refreshed unselects a row if the row is removed', () => {
                    it('in single selection', function(this: HasFinderAndGrid): void {
                        this.finder.hostComponent.selectionType = GridSelectionType.Single;
                        this.finder.detectChanges();
                        this.clrGridWidget.selectRow(1);
                        expect(this.finder.hostComponent.getSelection()).toEqual([mockData[1]]);
                        this.finder.hostComponent.gridData = {
                            items: [mockData[0]],
                            totalItems: 2,
                        };
                        this.finder.detectChanges();
                        expect(this.finder.hostComponent.getSelection()).toEqual([]);
                    });

                    it('in multi selection', function(this: HasFinderAndGrid): void {
                        this.finder.hostComponent.selectionType = GridSelectionType.Multi;
                        this.finder.detectChanges();
                        this.clrGridWidget.selectRow(0);
                        this.clrGridWidget.selectRow(1);
                        expect(this.finder.hostComponent.getSelection()).toEqual(mockData);
                        this.finder.hostComponent.gridData = {
                            items: [mockData[0]],
                            totalItems: 2,
                        };
                        this.finder.detectChanges();
                        expect(this.finder.hostComponent.getSelection()).toEqual([mockData[0]]);
                    });
                });

                it('keeps selected an item if the item is not removed on refresh', function(this: HasFinderAndGrid): void {
                    this.finder.hostComponent.selectionType = GridSelectionType.Single;
                    this.finder.detectChanges();
                    this.clrGridWidget.selectRow(1);
                    expect(this.finder.hostComponent.getSelection()).toEqual([mockData[1]]);
                    this.finder.hostComponent.gridData = {
                        items: [mockData[1]],
                        totalItems: 2,
                    };
                    this.finder.detectChanges();
                    expect(this.finder.hostComponent.getSelection()).toEqual([mockData[1]]);
                });
            });

            describe('@Input() pagination', () => {
                describe('pageSize', () => {
                    it('finds the most rows that can fit in the set height with magic pagination ', function(this: HasFinderAndGrid): void {
                        this.finder.hostComponent.parentHeight = '2000px';
                        this.finder.detectChanges();
                        this.finder.hostComponent.pagination = {
                            pageSize: 'Magic',
                            pageSizeOptions: [10],
                        };
                        this.finder.detectChanges();
                        expect(this.clrGridWidget.getPaginationDescription()).toEqual('1 - 51 of 150 items');
                    });

                    it('allows the user to set a custom row height with magic pagination ', function(this: HasFinderAndGrid): void {
                        this.finder.hostComponent.parentHeight = '2000px';
                        this.finder.detectChanges();
                        this.finder.hostComponent.pagination = {
                            pageSize: 'Magic',
                            pageSizeOptions: [10],
                            rowHeight: 100,
                        };
                        this.finder.detectChanges();
                        expect(this.clrGridWidget.getPaginationDescription()).toEqual('1 - 19 of 150 items');
                    });

                    it('uses grid height when height is set to calculate page size ', function(this: HasFinderAndGrid): void {
                        this.finder.hostComponent.parentHeight = '2000px';
                        this.finder.hostComponent.height = 1000;
                        this.finder.hostComponent.pagination = {
                            pageSize: 'Magic',
                            pageSizeOptions: [10],
                        };
                        this.finder.detectChanges();
                        expect(this.clrGridWidget.getPaginationDescription()).toEqual('1 - 24 of 150 items');
                    });

                    it('lets the user set rows per page', function(this: HasFinderAndGrid): void {
                        this.finder.hostComponent.pagination = {
                            pageSize: 100,
                            pageSizeOptions: [10],
                        };
                        this.finder.detectChanges();
                        expect(this.clrGridWidget.getPaginationDescription()).toEqual('1 - 100 of 150 items');
                    });

                    it('creates a smaller page when buttons are present', function(this: HasFinderAndGrid): void {
                        this.finder.hostComponent.parentHeight = '2000px';
                        this.finder.detectChanges();
                        this.finder.hostComponent.pagination = {
                            pageSize: 'Magic',
                            pageSizeOptions: [10],
                        };
                        this.finder.hostComponent.buttonConfig = {
                            globalButtons: [
                                {
                                    label: 'Add',
                                    isActive: () => true,
                                    handler: () => {},
                                    class: 'button',
                                },
                            ],
                            contextualButtonConfig: {
                                buttons: [],
                                featured: [],
                                featuredCount: 0,
                                position: ContextualButtonPosition.ROW,
                            },
                        };
                        this.finder.detectChanges();
                        expect(this.clrGridWidget.getPaginationDescription()).toEqual('1 - 50 of 150 items');
                    });
                });

                describe('shouldShowPageSizeSelector', () => {
                    it('hides the dropdown when set to false', function(this: HasFinderAndGrid): void {
                        this.finder.hostComponent.pagination = {
                            ...this.finder.hostComponent.pagination,
                            shouldShowPageSizeSelector: false,
                        };
                        this.finder.detectChanges();
                        expect(this.clrGridWidget.getPaginationSizeSelectorText()).toEqual('');
                    });

                    it('shows the dropdown when set to true', function(this: HasFinderAndGrid): void {
                        this.finder.hostComponent.pagination = {
                            ...this.finder.hostComponent.pagination,
                            shouldShowPageSizeSelector: true,
                        };
                        this.finder.detectChanges();
                        expect(this.clrGridWidget.getPaginationSizeSelectorText()).toEqual('Total Items52050100');
                    });
                });
            });

            describe('@Input() paginationCallback', () => {
                it('displays pagination callback information on page one', function(this: HasFinderAndGrid): void {
                    expect(this.clrGridWidget.getPaginationDescription()).toEqual('1 - 5 of 150 items');
                });
            });

            describe('@Input() paginationDropdownText', () => {
                it('displays the pagination dropdown information on page one', function(this: HasFinderAndGrid): void {
                    this.finder.hostComponent.pagination = {
                        ...this.finder.hostComponent.pagination,
                        shouldShowPageSizeSelector: true,
                    };
                    this.finder.detectChanges();
                    expect(this.clrGridWidget.getPaginationSizeSelectorText()).toEqual('Total Items52050100');
                });
            });

            describe('@Input() height', () => {
                it('defaults to parent height when height is not set', function(this: HasFinderAndGrid): void {
                    this.finder.hostComponent.height = undefined;
                    this.finder.detectChanges();
                    expect(this.clrGridWidget.gridContainerClasses).toContain('fill-parent');
                    expect(this.clrGridWidget.gridHeight).toEqual('unset');
                });

                it('uses the given height when height is set', function(this: HasFinderAndGrid): void {
                    this.finder.hostComponent.height = 200;
                    this.finder.detectChanges();
                    expect(this.clrGridWidget.gridHeight).toEqual('200px');
                });

                it('allows the height to be dynamically changed', function(this: HasFinderAndGrid): void {
                    this.finder.hostComponent.height = 200;
                    this.finder.detectChanges();
                    expect(this.clrGridWidget.gridHeight).toEqual('200px');
                    this.finder.hostComponent.height = undefined;
                    this.finder.detectChanges();
                    expect(this.clrGridWidget.gridContainerClasses).toContain('fill-parent');
                    expect(this.clrGridWidget.gridHeight).toEqual('unset');
                });
            });
        });

        it('displays loading indicators while data is loading', function(this: HasFinderAndGrid): void {
            this.finder.detectChanges();
            expect(this.clrGridWidget.loading).toBe(true, 'Initially loading indicator should be true');
            this.finder.hostComponent.gridData = {
                items: mockData,
                totalItems: 2,
            };
            this.finder.detectChanges();
            expect(this.clrGridWidget.loading).toBe(
                false,
                'After setting gridData, loading indicator should not be visible'
            );
        });

        describe('Show/Hide Functionality', () => {
            beforeEach(function(this: HasFinderAndGrid): void {
                this.finder.hostComponent.columns = [
                    {
                        displayName: 'Component Renderer',
                        renderer: ColumnComponentRendererSpec({
                            type: BoldTextRendererComponent,
                            config: record => ({
                                text: record.name,
                            }),
                        }),
                        hideable: GridColumnHideable.Never,
                    },

                    {
                        displayName: 'String Renderer',
                        renderer: (record: MockRecord) => `${record.city}, ${record.state}`,
                        hideable: GridColumnHideable.Shown,
                    },

                    {
                        displayName: 'Default Renderer',
                        renderer: 'details.gender',
                        hideable: GridColumnHideable.Hidden,
                    },

                    {
                        displayName: 'Filler Renderer',
                        renderer: 'filler',
                    },
                ];
                this.finder.detectChanges();
            });
            it('shows the columns with hidable value of  "Never"', function(this: HasFinderAndGrid): void {
                expect(this.clrGridWidget.isColumnDisplayed(0)).toBe(true);
            });

            it('shows the columns with hidable value of  "Shown"', function(this: HasFinderAndGrid): void {
                expect(this.clrGridWidget.isColumnDisplayed(1)).toBe(true);
            });

            it('hides the columns with hidable value of  "Hidden"', function(this: HasFinderAndGrid): void {
                expect(this.clrGridWidget.isColumnDisplayed(2)).toBe(false);
                expect(this.clrGridWidget.hiddenColumnHeaders).toEqual(['Default Renderer']);
            });

            it('shows the columns with hidable value of undefined', function(this: HasFinderAndGrid): void {
                expect(this.clrGridWidget.isColumnDisplayed(3)).toBe(true);
            });
        });

        describe('Row expansion functionality', () => {
            beforeEach(function(this: HasFinderAndGrid): void {
                this.finder.hostComponent.columns = [
                    {
                        displayName: 'Column',
                        renderer: 'name',
                    },
                ];
                this.finder.detectChanges();
            });

            it('opens one detail pane when you click the button', function(this: HasFinderAndGrid): void {
                this.clrGridWidget.clickDetailsButton(0);
                expect(this.clrGridWidget.getAllDetailContents().length).toEqual(1);
            });
        });

        describe('@Output() refresh', () => {
            beforeEach(function(this: HasFinderAndGrid): void {
                this.finder.hostComponent.columns = [
                    {
                        displayName: 'Column',
                        renderer: 'name',
                        queryFieldName: 'a',
                    },
                    {
                        displayName: 'other',
                        renderer: 'name',
                    },
                ];
                this.finder.detectChanges();
            });

            it('emits the column information when the column sorted', function(this: HasFinderAndGrid): void {
                const refreshMethod = spyOn(this.finder.hostComponent, 'refresh');
                this.clrGridWidget.sortColumn(0);
                expect(refreshMethod).toHaveBeenCalledWith({
                    sortColumn: {
                        name: 'a',
                        reverse: false,
                    },
                    pagination: { pageNumber: 1, itemsPerPage: 5 },
                });
                this.clrGridWidget.sortColumn(0);
                expect(refreshMethod).toHaveBeenCalledWith({
                    sortColumn: {
                        name: 'a',
                        reverse: true,
                    },
                    pagination: { pageNumber: 1, itemsPerPage: 5 },
                });
            });

            it('does not sort a column without a queryFieldName', function(this: HasFinderAndGrid): void {
                const refreshMethod = spyOn(this.finder.hostComponent, 'refresh');
                this.clrGridWidget.sortColumn(1);
                expect(refreshMethod).toHaveBeenCalledTimes(0);
            });

            it('allows the user to change pages', function(this: HasFinderAndGrid): void {
                const refreshMethod = spyOn(this.finder.hostComponent, 'refresh');
                this.clrGridWidget.nextPage();
                expect(refreshMethod).toHaveBeenCalledWith({
                    pagination: {
                        pageNumber: 2,
                        itemsPerPage: 5,
                    },
                });
            });

            it('goes to page 1 when sorting is clicked', function(this: HasFinderAndGrid): void {
                const refreshMethod = spyOn(this.finder.hostComponent, 'refresh');
                this.clrGridWidget.nextPage();
                this.clrGridWidget.sortColumn(0);
                expect(refreshMethod).toHaveBeenCalledWith({
                    pagination: { pageNumber: 1, itemsPerPage: 5 },
                    sortColumn: { name: 'a', reverse: false },
                });
            });
        });

        describe('@Input() buttonConfig', () => {
            describe('active buttons', () => {
                beforeEach(function(this: HasFinderAndGrid): void {
                    this.finder.hostComponent.columns = [
                        {
                            displayName: 'Column',
                            renderer: 'name',
                        },
                    ];
                    this.finder.hostComponent.buttonConfig.globalButtons = [
                        {
                            label: 'Add',
                            isActive: () => true,
                            handler: () => {},
                            class: 'button',
                        },
                        {
                            label: 'Remove',
                            isActive: () => false,
                            handler: () => {},
                            class: 'button',
                        },
                        {
                            label: 'Change',
                            isActive: () => false,
                            handler: () => {},
                            class: 'button',
                        },
                    ];
                    this.finder.detectChanges();
                });

                it('defaults to disabling buttons', function(this: HasFinderAndGrid): void {
                    expect(this.clrGridWidget.getTopPositionedButtons()).toEqual(['Add', 'Remove', 'Change']);
                });

                it('can be configured to hide or disable on a per button basis', function(this: HasFinderAndGrid): void {
                    this.finder.hostComponent.buttonConfig.globalButtons[1].inactiveDisplayMode =
                        InactiveButtonDisplayMode.Hide;
                    this.finder.detectChanges();
                    expect(this.clrGridWidget.getTopPositionedButtons()).toEqual(['Add', 'Change']);
                });

                it('can be configured to hide or disable for all buttons', function(this: HasFinderAndGrid): void {
                    this.finder.hostComponent.buttonConfig.inactiveDisplayMode = InactiveButtonDisplayMode.Hide;
                    this.finder.detectChanges();
                    expect(this.clrGridWidget.getTopPositionedButtons()).toEqual(['Add']);
                });

                it('can have different configuration for all buttons and a single button', function(this: HasFinderAndGrid): void {
                    this.finder.hostComponent.buttonConfig.inactiveDisplayMode = InactiveButtonDisplayMode.Hide;
                    this.finder.hostComponent.buttonConfig.globalButtons[1].inactiveDisplayMode =
                        InactiveButtonDisplayMode.Disable;
                    this.finder.detectChanges();
                    expect(this.clrGridWidget.getTopPositionedButtons()).toEqual(['Add', 'Remove']);
                });
            });

            describe('globalButtons', () => {
                beforeEach(function(this: HasFinderAndGrid): void {
                    this.finder.hostComponent.buttonConfig.globalButtons = [
                        {
                            label: 'Add',
                            isActive: () => true,
                            handler: () => {},
                            class: 'add',
                        },
                        {
                            label: 'Remove',
                            isActive: () => false,
                            handler: () => {},
                            class: 'remove',
                        },
                        {
                            label: 'Change',
                            isActive: () => false,
                            handler: () => {},
                            class: 'change',
                        },
                    ];
                    this.finder.detectChanges();
                });

                it('shows buttons where shouldDisplay is true or inactiveDisplayMode is disable', function(this: HasFinderAndGrid): void {
                    expect(this.clrGridWidget.getTopPositionedButtons()).toEqual(['Add', 'Remove', 'Change']);
                });

                it('the button handler is called when the button is pressed', function(this: HasFinderAndGrid): void {
                    const spy = spyOn(this.finder.hostComponent.buttonConfig.globalButtons[0], 'handler');
                    expect(this.clrGridWidget.getTopButtonText('add')).toEqual('Add');
                    expect(this.clrGridWidget.isTopButtonEnabled('add')).toBeTruthy();
                    this.clrGridWidget.pressTopButton('add');
                    expect(spy).toHaveBeenCalledTimes(1);
                });
            });

            describe('contextualButtonConfig', () => {
                beforeEach(function(this: HasFinderAndGrid): void {
                    this.finder.hostComponent.selectionType = GridSelectionType.Single;
                    this.finder.hostComponent.columns = [
                        {
                            displayName: 'Column',
                            renderer: 'name',
                        },
                    ];
                    this.finder.hostComponent.buttonConfig.contextualButtonConfig = {
                        buttons: [
                            {
                                label: 'Add',
                                isActive: (row: MockRecord[]) => true,
                                handler: () => {},
                                class: 'a',
                                icon: 'play',
                            },
                            {
                                label: 'Remove',
                                isActive: () => false,
                                handler: () => {},
                                class: 'b',
                                icon: 'pause',
                            },
                            {
                                label: 'Other',
                                isActive: (row: MockRecord[]) => row.length && row[0].name === 'Person 1',
                                handler: () => {},
                                class: 'c',
                                icon: 'pause',
                            },
                        ],
                        featuredCount: 2,
                        featured: ['a', 'c', 'b'],
                        position: ContextualButtonPosition.TOP,
                    };
                    this.finder.detectChanges();
                });

                it('throws an error if a featured button cannot be found', function(this: HasFinderAndGrid): void {
                    const config = Object.assign({}, this.finder.hostComponent.buttonConfig);
                    config.contextualButtonConfig.featured = ['z'];
                    this.finder.hostComponent.buttonConfig = config;
                    expect(() => this.finder.detectChanges()).toThrowError('Featured button was not found');
                });

                describe('getFeaturedButtons()', () => {
                    it('shows only the given number of featured buttons', function(this: HasFinderAndGrid): void {
                        expect(
                            this.finder.hostComponent.grid.getFeaturedButtons(mockData).map(button => button.label)
                        ).toEqual(['Add', 'Remove']);
                    });

                    it('shows all the featured buttons when featuredCount is greater than length', function(this: HasFinderAndGrid): void {
                        this.finder.hostComponent.buttonConfig.contextualButtonConfig.featuredCount = 4;
                        expect(
                            this.finder.hostComponent.grid.getFeaturedButtons(mockData).map(button => button.label)
                        ).toEqual(['Add', 'Remove', 'Other']);
                    });
                });

                describe('top position', () => {
                    it('shows no buttons with nothing selected', function(this: HasFinderAndGrid): void {
                        expect(this.clrGridWidget.getTopPositionedButtons()).toEqual([]);
                    });

                    it('responds when the user presses a contextual button', function(this: HasFinderAndGrid): void {
                        const spy = jasmine.createSpy('clickHandler');
                        this.finder.hostComponent.buttonConfig.contextualButtonConfig.buttons[0].handler = spy;
                        this.clrGridWidget.selectRow(0);
                        this.clrGridWidget.pressTopButton('a');
                        expect(spy).toHaveBeenCalledWith([mockData[0]]);
                    });
                });

                describe('row position', () => {
                    beforeEach(function(this: HasFinderAndGrid): void {
                        this.finder.hostComponent.buttonConfig.contextualButtonConfig.position =
                            ContextualButtonPosition.ROW;
                        this.finder.detectChanges();
                    });

                    it('responds when the user presses a contextual button', function(this: HasFinderAndGrid): void {
                        const spy = jasmine.createSpy('clickHandler');
                        this.finder.hostComponent.buttonConfig.contextualButtonConfig.buttons[0].handler = spy;
                        this.finder.detectChanges();
                        this.clrGridWidget.pressRowButton('a', 0);
                        expect(spy).toHaveBeenCalledWith([mockData[0]]);
                        expect(this.clrGridWidget.getRowButtonText('a', 0)).toEqual('Add');
                        expect(this.clrGridWidget.isRowButtonEnabled('a', 0)).toBeTruthy();
                    });

                    it('adds CSS to set the width based on the maximum number of buttons', function(this: HasFinderAndGrid): void {
                        expect(this.clrGridWidget.getRowButtonContainerClass(0)).toContain('buttons-2');
                    });
                });
            });

            describe('@Input() indicatorType', () => {
                let resolvePromise;

                beforeEach(function(this: HasFinderAndGrid): void {
                    this.finder.hostComponent.buttonConfig.globalButtons = [
                        {
                            label: 'Add',
                            isActive: () => true,
                            handler: () =>
                                new Promise(resolve => {
                                    resolvePromise = resolve;
                                }),
                            class: 'button',
                        },
                    ];
                    this.finder.detectChanges();
                });

                it('is able to show the spinner indicator', function(this: HasFinderAndGrid): void {
                    this.finder.hostComponent.indicatorType = ActivityIndicatorType.SPINNER;
                    this.finder.detectChanges();
                    const spy = spyOn(this.finder.hostComponent.grid.actionReporter, 'monitorActivity');
                    this.clrGridWidget.pressTopButton('button');
                    expect(spy).toHaveBeenCalledTimes(1);
                });

                it('is able to show the banner indicator', function(this: HasFinderAndGrid): void {
                    this.finder.hostComponent.indicatorType = ActivityIndicatorType.BANNER;
                    this.finder.detectChanges();
                    const spy = spyOn(this.finder.hostComponent.grid.actionReporter, 'monitorActivity');
                    this.clrGridWidget.pressTopButton('button');
                    expect(spy).toHaveBeenCalledTimes(1);
                });
            });
        });

        describe('@Input() header', () => {
            it('shows the header if set and allows it to be changed', function(this: HasFinderAndGrid): void {
                this.finder.hostComponent.header = 'Some Header!';
                this.finder.detectChanges();
                expect(this.vcdDatagrid.gridHeader).toEqual('Some Header!');
                this.finder.hostComponent.header = 'Some Other Header!';
                this.finder.detectChanges();
                expect(this.vcdDatagrid.gridHeader).toEqual('Some Other Header!');
            });

            it('does not show a header when none is set', function(this: HasFinderAndGrid): void {
                this.finder.hostComponent.header = undefined;
                this.finder.detectChanges();
                expect(this.vcdDatagrid.gridHeader).toEqual('');
            });
        });

        describe('GridColumn', () => {
            it('enables only sorting when queryFieldName is given but no filter is provided', function(this: HasFinderAndGrid): void {
                this.finder.hostComponent.columns = [{ displayName: 'Name', renderer: 'name', queryFieldName: 'name' }];
                this.finder.detectChanges();
                expect(this.clrGridWidget.component.columns.first.sortable).toEqual(true);
                expect(this.clrGridWidget.component.columns.first.customFilter).toEqual(false);
            });
            // tslint:disable-next-line:max-line-length
            it('enables only filtering when queryFieldName, filter are provided and sortable is set to false', function(this: HasFinderAndGrid): void {
                this.finder.hostComponent.columns = [
                    {
                        displayName: 'Name',
                        renderer: 'name',
                        queryFieldName: 'name',
                        filter: DatagridStringFilter(WildCardPosition.END, ''),
                        sortable: false,
                    },
                ];
                this.finder.detectChanges();
                expect(this.clrGridWidget.component.columns.first.sortable).toEqual(false);
                expect(this.clrGridWidget.component.columns.first.customFilter).toEqual(true);
            });
            // tslint:disable-next-line:max-line-length
            it('enables both filtering and sorting when queryFieldName, filter are provided and sortable is not set to false', function(this: HasFinderAndGrid): void {
                this.finder.hostComponent.columns = [
                    {
                        displayName: 'Name',
                        renderer: 'name',
                        queryFieldName: 'name',
                        filter: DatagridStringFilter(WildCardPosition.END, ''),
                    },
                ];
                this.finder.detectChanges();
                expect(this.clrGridWidget.component.columns.first.sortable).toEqual(true);
                expect(this.clrGridWidget.component.columns.first.customFilter).toEqual(true);
            });
        });
    });

    describe('Column Renderers', () => {
        describe('Default renderer', () => {
            it('uses property path from  "renderer" property of column config ', function(this: HasFinderAndGrid): void {
                this.finder.hostComponent.columns = [{ displayName: '', renderer: 'details.gender' }];
                this.finder.detectChanges();
                expect(this.clrGridWidget.getCellText(0, 0)).toEqual(mockData[0].details.gender);
                expect(this.clrGridWidget.getRowValues(0)).toEqual([mockData[0].details.gender]);
            });
        });

        describe('Function renderer', () => {
            it('renders the string returned from the renderer function', function(this: HasFinderAndGrid): void {
                this.finder.hostComponent.columns = [
                    {
                        displayName: 'Function Renderer',
                        renderer: record => `${record.city}, ${record.state}`,
                    },
                ];
                this.finder.detectChanges();
                expect(this.clrGridWidget.getCellText(0, 0)).toEqual(`${mockData[0].city}, ${mockData[0].state}`);
            });
        });

        describe('Component renderer', () => {
            it('renders the passed in component using config from RendererSpec', function(this: HasFinderAndGrid): void {
                this.finder.hostComponent.columns = [
                    {
                        displayName: 'Component Renderer',
                        renderer: ColumnComponentRendererSpec({
                            type: BoldTextRendererComponent,
                            config: record => ({
                                text: record.name,
                            }),
                        }),
                    },
                ];
                this.finder.detectChanges();
                expect(this.vcdDatagrid.getBoldText(0, 0)).toBe(mockData[0].name);
            });
        });
    });
});

@Component({
    template: `
        <div [ngStyle]="{ height: parentHeight }">
            <vcd-datagrid
                [gridData]="gridData"
                (gridRefresh)="refresh($event)"
                [columns]="columns"
                [clrDatagridCssClass]="clrDatagridCssClass"
                [clrDatarowCssClassGetter]="clrDatarowCssClassGetter"
                [selectionType]="selectionType"
                (selectionChanged)="selectionChanged($event)"
                [paginationCallback]="paginationCallback"
                [paginationDropdownText]="paginationText"
                [pagination]="pagination"
                [buttonConfig]="buttonConfig"
                [height]="height"
                [header]="header"
                [indicatorType]="indicatorType"
            >
                <ng-template let-record="record"> DETAILS: {{ record.name }} </ng-template>
            </vcd-datagrid>
        </div>
    `,
})
export class HostWithDatagridComponent {
    gridData: GridDataFetchResult<MockRecord> = {
        items: mockData,
        totalItems: 150,
    };

    @ViewChild(DatagridComponent, { static: false }) grid!: MockRecordDatagridComponent;

    /** Will be set in tests */
    columns: GridColumn<MockRecord>[] = [];

    clrDatagridCssClass = '';

    selectionType = GridSelectionType.None;

    height?: number;

    parentHeight = 'unset';

    header?: string;

    indicatorType?: ActivityIndicatorType;

    buttonConfig: ButtonConfig<MockRecord> = {
        globalButtons: [],
        contextualButtonConfig: {
            featured: [],
            featuredCount: 0,
            buttons: [],
            position: ContextualButtonPosition.TOP,
        },
    };

    paginationText = 'Total Items';

    pagination: PaginationConfiguration = {
        pageSize: 5,
        pageSizeOptions: [5, 20, 50, 100],
    };

    selectionChanged(selection: MockRecord[]): void {}

    paginationCallback(first: number, last: number, total: number): string {
        return `${first} - ${last} of ${total} items`;
    }

    clrDatarowCssClassGetter(a: MockRecord, index: number): string {
        return '';
    }

    refresh(eventData: GridState<MockRecord>): void {}

    getSelection(): MockRecord[] {
        return this.grid.datagridSelection;
    }
}
