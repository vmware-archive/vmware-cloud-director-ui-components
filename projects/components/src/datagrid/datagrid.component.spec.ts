/*!
 * Copyright 2019-2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, HostBinding, TrackByFunction, ViewChild } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingListener } from '@clr/angular';
import { MockTranslationService, TranslationService } from '@vcd/i18n';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ActivityPromiseResolver } from '../common/activity-reporter/activity-promise-resolver';
import {
    ActionDisplayConfig,
    ActionHandlerType,
    ActionItem,
    ActionStyling,
    ActionType,
    TextIcon
} from '../common/interfaces/action-item.interface';
import { ShowClippedTextDirective, TooltipSize } from '../lib/directives/show-clipped-text.directive';
import { ClrDatagridWidgetObject } from '../utils/test/datagrid/datagrid.wo';
import { VcdDatagridWidgetObject } from '../utils/test/datagrid/vcd-datagrid.wo';
import { timeout } from '../utils/test/test-utils';
import { AngularWidgetObjectFinder } from '../utils/test/widget-object/angular-widget-finder';
import { TestElement } from '../utils/test/widget-object/angular-widget-object';
import {
    ActivityIndicatorType,
    ContextualActionPosition,
    DatagridComponent,
    DEFAULT_PAGINATION_TRANSLATION_KEY,
    GridDataFetchResult,
    GridSelectionType,
    GridState,
    PaginationConfiguration
} from './datagrid.component';
import { VcdDatagridModule } from './datagrid.module';
import { DatagridStringFilter, WildCardPosition } from './filters/datagrid-string-filter.component';
import { ColumnComponentRendererSpec, GridColumn, GridColumnHideable } from './interfaces/datagrid-column.interface';
import { mockData, MockRecord } from './mock-data';
import { BoldTextRendererComponent } from './renderers/bold-text-renderer.component';

interface RecordId {
    name: string;
}

type MockRecordDatagridComponent = DatagridComponent<MockRecord, RecordId>;

interface HasFinderAndGrid {
    finder: AngularWidgetObjectFinder;
    // The Widget Object for the underlying Clarity grid
    clrGridWidget: ClrDatagridWidgetObject<TestElement>;
    // The Widget Object for the VCD Datagrid
    vcdDatagrid: VcdDatagridWidgetObject<TestElement>;
    hostComponent: HostWithDatagridComponent;
}

describe('DatagridComponent', () => {
    beforeEach(async function(this: HasFinderAndGrid): Promise<void> {
        await TestBed.configureTestingModule({
            imports: [VcdDatagridModule, BrowserAnimationsModule],
            providers: [
                {
                    provide: TranslationService,
                    useValue: new MockTranslationService(),
                },
                ActivityPromiseResolver,
            ],
            declarations: [HostWithDatagridComponent, DatagridDetailsComponent, DatagridDetailsPaneComponent],
        }).compileComponents();

        this.finder = new AngularWidgetObjectFinder(HostWithDatagridComponent);
        // @ts-ignore
        this.vcdDatagrid = this.finder.find(VcdDatagridWidgetObject);
        this.clrGridWidget = this.vcdDatagrid.clrDatagrid;
        this.hostComponent = this.finder.hostComponent as HostWithDatagridComponent;
    });

    describe('Grid', () => {
        describe('', () => {
            beforeEach(function(this: HasFinderAndGrid): void {
                (this.hostComponent as HostWithDatagridComponent).columns = [
                    { displayName: 'Name', renderer: 'name' },
                    { displayName: 'City', renderer: 'city' },
                ];
                this.finder.detectChanges();
            });
            it('displays number of columns', function(this: HasFinderAndGrid): void {
                expect(this.clrGridWidget.getColumns().length()).toBe(this.hostComponent.columns.length);
            });

            it('displays columns with headers', function(this: HasFinderAndGrid): void {
                expect(
                    this.clrGridWidget
                        .getColumnHeaders()
                        .toArray()
                        .map((columnHeader: TestElement) => columnHeader.text())
                ).toEqual(this.hostComponent.columns.map(col => col.displayName));
            });

            it('displays the correct headers even when columns are reloaded', function(this: HasFinderAndGrid): void {
                this.hostComponent.columns = [{ displayName: 'One More', renderer: 'name' }];
                this.finder.detectChanges();
                expect(
                    this.clrGridWidget
                        .getColumnHeaders()
                        .toArray()
                        .map((columnHeader: TestElement) => columnHeader.text())
                ).toEqual(this.hostComponent.columns.map(col => col.displayName));
                expect(this.clrGridWidget.getColumnHeader(0).text()).toEqual(this.hostComponent.columns[0].displayName);
            });

            it('displays rows based on the grid data received', function(this: HasFinderAndGrid): void {
                expect(this.clrGridWidget.getRows().length()).toBe(mockData.length);
            });

            it('gives proper css class for the grid', function(this: HasFinderAndGrid): void {
                this.hostComponent.clrDatagridCssClass = 'some_class';
                this.finder.detectChanges();
                expect(this.clrGridWidget.clrDatagrid.classes()).toContain('some_class');
            });

            it('sets no default CSS classnames for the rows', function(this: HasFinderAndGrid): void {
                expect(this.clrGridWidget.getRow(0).classes()).toEqual(['datagrid-row', 'ng-star-inserted']);
            });

            it('sets CSS classnames on rows', function(this: HasFinderAndGrid): void {
                const firstCall = ['firstRowA', 'secondRowA'];
                const secondCall = ['firstRowB', 'secondRowB'];
                this.hostComponent.clrDatarowCssClassGetter = (rec: MockRecord, index: number) => {
                    return firstCall[index];
                };
                this.finder.detectChanges();
                expect(this.clrGridWidget.getRow(0).classes()).toContain(
                    'firstRowA',
                    'Expected the initial class to display for the first row.'
                );
                expect(this.clrGridWidget.getRow(1).classes()).toContain(
                    'secondRowA',
                    'Expected some different initial class to display for the second row.'
                );
                this.hostComponent.clrDatarowCssClassGetter = (rec: MockRecord, index: number) => {
                    return secondCall[index];
                };
                this.finder.detectChanges();
                expect(this.clrGridWidget.getRow(0).classes()).toContain(
                    'firstRowB',
                    'Expected a new class to display for the first row.'
                );
                expect(this.clrGridWidget.getRow(1).classes()).toContain(
                    'secondRowB',
                    'Expected a different new class to display for the second row.'
                );
            });

            describe('@Input() columns', () => {
                beforeEach(function(this: HasFinderAndGrid): void {
                    this.hostComponent.gridData = {
                        items: [],
                        totalItems: 0,
                    };
                    this.finder.detectChanges();
                });

                it('allows users to update the columns', fakeAsync(function(this: HasFinderAndGrid): void {
                    this.hostComponent.columns = [...this.hostComponent.columns];
                    this.finder.detectChanges();
                    tick();
                    expect(
                        this.vcdDatagrid.clrDatagrid
                            .getColumnHeaders()
                            .toArray()
                            .map(el => el.text())
                    ).toEqual(['Name', 'City']);
                }));
            });

            describe('@Input() columns.disableCliptext', () => {
                beforeEach(function(this: HasFinderAndGrid): void {
                    this.hostComponent.gridData = {
                        items: mockData,
                        totalItems: 2,
                    };
                    this.finder.detectChanges();
                });

                it('clips text when disableCliptext is unset', function(this: HasFinderAndGrid): void {
                    this.hostComponent.columns = [{ displayName: 'Name', renderer: 'name' }];
                    this.finder.detectChanges();
                    const res = this.clrGridWidget
                        .getCell(0, 0)
                        .getInjector()
                        .get(ShowClippedTextDirective);
                    expect(res.disabled).toBeFalsy();
                });

                it('clips text when disableCliptext is false', function(this: HasFinderAndGrid): void {
                    this.hostComponent.columns = [
                        { displayName: 'Name', renderer: 'name', cliptextConfig: { size: TooltipSize.md } },
                    ];
                    this.finder.detectChanges();
                    const res = this.clrGridWidget
                        .getCell(0, 0)
                        .getInjector()
                        .get(ShowClippedTextDirective);
                    expect(res.disabled).toBeFalsy();
                });

                it('does not clip text when disableCliptext is true', function(this: HasFinderAndGrid): void {
                    this.hostComponent.columns = [
                        { displayName: 'Name', renderer: 'name', cliptextConfig: { disabled: true } },
                    ];
                    this.finder.detectChanges();
                    const res = this.clrGridWidget
                        .getCell(0, 0)
                        .getInjector()
                        .get(ShowClippedTextDirective);
                    expect(res.disabled).toBeTruthy();
                });
            });

            describe('@Input() columns.clrDgColumnClassName', () => {
                beforeEach(function(this: HasFinderAndGrid): void {
                    this.hostComponent.gridData = {
                        items: mockData,
                        totalItems: 2,
                    };
                    this.finder.detectChanges();
                });

                it('sets the width of the column to the given height', function(this: HasFinderAndGrid): void {
                    this.hostComponent.columns = [
                        { displayName: 'Name', renderer: 'name', clrDgColumnClassName: 'some-class' },
                        { displayName: 'Name', renderer: 'name' },
                    ];
                    this.finder.detectChanges();
                    expect(this.clrGridWidget.getColumn(0).classes()).toContain('some-class');
                    expect(this.clrGridWidget.getColumn(1).classes()).not.toContain('some-class');
                });
            });

            describe('@Input() selectionType', () => {
                it('has multi selection capabilities when set to multi selection', function(this: HasFinderAndGrid): void {
                    this.hostComponent.selectionType = GridSelectionType.Multi;
                    this.finder.detectChanges();
                    expect(this.clrGridWidget.getCheckboxWrapper().length()).toBeGreaterThan(0);
                });

                it('has single selection capabilities when set to single selection', function(this: HasFinderAndGrid): void {
                    this.hostComponent.selectionType = GridSelectionType.Single;
                    this.finder.detectChanges();
                    expect(this.clrGridWidget.getRadioWrapper().length()).toBeGreaterThan(0);
                });

                it('has none selection capabilities when set to none', function(this: HasFinderAndGrid): void {
                    this.hostComponent.selectionType = GridSelectionType.None;
                    this.finder.detectChanges();
                    expect(this.clrGridWidget.getCheckboxWrapper().length()).toEqual(0);
                    expect(this.clrGridWidget.getRadioWrapper().length()).toEqual(0);
                });
            });

            describe('@Input() datagridSelection', () => {
                it('emits multiple rows when set to multi selection', fakeAsync(function(this: HasFinderAndGrid): void {
                    this.hostComponent.selectionType = GridSelectionType.Multi;
                    this.finder.detectChanges();
                    this.clrGridWidget.getSelectionLabelForRow(0).click();
                    tick();
                    expect(this.hostComponent.datagridSelection).toEqual([mockData[0]]);
                    this.clrGridWidget.getSelectionLabelForRow(1).click();
                    tick();
                    expect(this.hostComponent.datagridSelection).toEqual(mockData);
                }));

                it('emits only one row when set to single selection', function(this: HasFinderAndGrid): void {
                    this.hostComponent.selectionType = GridSelectionType.Single;
                    this.finder.detectChanges();
                    this.clrGridWidget.getSelectionLabelForRow(0).click();
                    expect(this.hostComponent.datagridSelection).toEqual([mockData[0]]);
                    this.clrGridWidget.getSelectionLabelForRow(1).click();
                    expect(this.hostComponent.datagridSelection).toEqual([mockData[1]]);
                });

                it('returns an empty array when there is no initial selection', function(this: HasFinderAndGrid): void {
                    this.hostComponent.selectionType = GridSelectionType.Single;
                    this.finder.detectChanges();
                    expect(this.hostComponent.datagridSelection).toEqual([]);
                });
            });

            describe('@Output() selectionChanged', () => {
                it('emits multiple rows when set to multi selection', fakeAsync(function(this: HasFinderAndGrid): void {
                    this.hostComponent.selectionType = GridSelectionType.Multi;
                    this.finder.detectChanges();
                    spyOn(this.hostComponent, 'selectionChanged');
                    this.clrGridWidget.getSelectionLabelForRow(0).click();
                    tick();
                    expect(this.hostComponent.selectionChanged).toHaveBeenCalledWith([mockData[0]]);
                    this.clrGridWidget.getSelectionLabelForRow(1).click();
                    tick();
                    expect(this.hostComponent.selectionChanged).toHaveBeenCalledWith(mockData);
                }));

                it('emits only one row when set to single selection', function(this: HasFinderAndGrid): void {
                    this.hostComponent.selectionType = GridSelectionType.Single;
                    this.finder.detectChanges();
                    spyOn(this.hostComponent, 'selectionChanged');
                    this.clrGridWidget.getSelectionLabelForRow(0).click();
                    expect(this.hostComponent.selectionChanged).toHaveBeenCalledWith([mockData[0]]);
                    this.clrGridWidget.getSelectionLabelForRow(1).click();
                    expect(this.hostComponent.selectionChanged).toHaveBeenCalledWith([mockData[1]]);
                });

                it('emits empty array when single selection is cleared', function(this: HasFinderAndGrid): void {
                    this.hostComponent.selectionType = GridSelectionType.Single;
                    this.finder.detectChanges();
                    spyOn(this.hostComponent, 'selectionChanged');
                    this.clrGridWidget.getSelectionLabelForRow(0).click();
                    expect(this.hostComponent.selectionChanged).toHaveBeenCalledWith([mockData[0]]);
                    this.hostComponent.datagridSelection = [];
                    this.finder.detectChanges();
                    expect(this.hostComponent.selectionChanged).toHaveBeenCalledWith([]);
                });

                it('emits empty array when multiple selection is cleared', async function(this: HasFinderAndGrid): Promise<void> {
                    this.hostComponent.selectionType = GridSelectionType.Multi;
                    this.finder.detectChanges();
                    spyOn(this.hostComponent, 'selectionChanged');
                    this.clrGridWidget.getSelectionLabelForRow(0).click();
                    await timeout(0);
                    expect(this.hostComponent.selectionChanged).toHaveBeenCalledWith([mockData[0]]);
                    this.hostComponent.datagridSelection = [];
                    this.finder.detectChanges();
                    expect(this.hostComponent.selectionChanged).toHaveBeenCalledWith([]);
                });
            });

            describe('@Input() gridData', () => {
                describe('when data is refreshed removed a row selected a row if the row is removed', () => {
                    it('in single selection', fakeAsync(async function(this: HasFinderAndGrid): Promise<void> {
                        this.hostComponent.selectionType = GridSelectionType.Single;
                        this.hostComponent.gridData = {
                            items: mockData,
                            totalItems: 2,
                        };
                        this.finder.detectChanges();
                        tick();
                        this.clrGridWidget.getSelectionLabelForRow(1).click();
                        tick();
                        const component = this.vcdDatagrid.vcdDatagrid.getComponentInstance() as MockRecordDatagridComponent;
                        expect(component.datagridSelection).toEqual([mockData[1]]);
                        this.hostComponent.gridData = {
                            items: [mockData[0]],
                            totalItems: 2,
                        };
                        this.finder.detectChanges();
                        tick();
                        expect(component.datagridSelection).toEqual([]);
                    }));

                    it('in multi selection', async function(this: HasFinderAndGrid): Promise<void> {
                        this.hostComponent.selectionType = GridSelectionType.Multi;
                        this.hostComponent.gridData = {
                            items: mockData,
                            totalItems: 2,
                        };
                        this.finder.detectChanges();
                        this.clrGridWidget.getSelectionLabelForRow(0).click();
                        await timeout(0);
                        this.clrGridWidget.getSelectionLabelForRow(1).click();
                        await timeout(0);
                        expect(this.hostComponent.datagridSelection).toEqual(mockData);
                        this.hostComponent.gridData = {
                            items: [mockData[0]],
                            totalItems: 2,
                        };
                        this.finder.detectChanges();
                        await timeout(0);
                        this.finder.detectChanges();
                        expect(this.hostComponent.datagridSelection).toEqual([mockData[0]]);
                    });
                });

                it('keeps selected an item if the item is not removed on refresh', function(this: HasFinderAndGrid): void {
                    this.hostComponent.selectionType = GridSelectionType.Single;
                    this.finder.detectChanges();
                    this.clrGridWidget.getSelectionLabelForRow(1).click();
                    expect(this.hostComponent.datagridSelection).toEqual([mockData[1]]);
                    this.hostComponent.gridData = {
                        items: [mockData[1]],
                        totalItems: 2,
                    };
                    this.finder.detectChanges();
                    expect(this.hostComponent.datagridSelection).toEqual([mockData[1]]);
                });

                it('allows you to initially select an item not on the current page', async function (this: HasFinderAndGrid): Promise<
                    void
                > {
                    this.hostComponent.selectionType = GridSelectionType.Multi;
                    this.hostComponent.preserveSelection = true;
                    this.finder.detectChanges();
                    this.hostComponent.gridData = {
                        items: [mockData[0]],
                        totalItems: 2,
                    };
                    this.finder.detectChanges();
                    await timeout(0);
                    this.hostComponent.datagridSelection = [{ name: mockData[1].name }];
                    this.finder.detectChanges();
                    expect(this.hostComponent.datagridSelection).toEqual([{ name: mockData[1].name }]);
                    this.hostComponent.gridData = {
                        items: [mockData[1]],
                        totalItems: 2,
                    };
                    this.finder.detectChanges();
                    await timeout(0);
                    this.finder.detectChanges();
                    console.log(this.hostComponent.datagridSelection);
                    expect(this.hostComponent.datagridSelection).toEqual([mockData[1]]);
                });
            });

            describe('@Input() pagination', () => {
                let translationService: TranslationService;
                beforeEach(() => {
                    translationService = TestBed.inject(TranslationService);
                });
                describe('pageSize', () => {
                    it('can set the page size before AfterViewInit', function(this: HasFinderAndGrid): void {
                        this.finder.detectChanges();
                        expect(this.clrGridWidget.getPaginationDescription().text()).toEqual(
                            translationService.translate(DEFAULT_PAGINATION_TRANSLATION_KEY, [
                                { firstItem: 1, lastItem: 5, totalItems: 150 },
                            ])
                        );
                    });

                    it('finds the most rows that can fit in the set height with magic pagination', fakeAsync(function(
                        this: HasFinderAndGrid
                    ): void {
                        this.hostComponent.parentHeight = '2000px';
                        this.finder.detectChanges();
                        this.hostComponent.pagination = {
                            pageSize: 'Magic',
                            pageSizeOptions: [10],
                        };
                        this.finder.detectChanges();
                        tick();
                        expect(this.clrGridWidget.getPaginationDescription().text()).toEqual(
                            translationService.translate(DEFAULT_PAGINATION_TRANSLATION_KEY, [
                                { firstItem: 1, lastItem: 52, totalItems: 150 },
                            ])
                        );
                    }));

                    it('shows a minimum of 15 rows', function(this: HasFinderAndGrid): void {
                        this.hostComponent.parentHeight = '200px';
                        this.finder.detectChanges();
                        this.hostComponent.pagination = {
                            pageSize: 'Magic',
                            pageSizeOptions: [10],
                        };
                        this.finder.detectChanges();
                        expect(this.clrGridWidget.getPaginationDescription().text()).toEqual(
                            translationService.translate(DEFAULT_PAGINATION_TRANSLATION_KEY, [
                                { firstItem: 1, lastItem: 15, totalItems: 150 },
                            ])
                        );
                    });

                    it('allows the user to set a custom row height with magic pagination ', function(this: HasFinderAndGrid): void {
                        this.hostComponent.parentHeight = '2000px';
                        this.finder.detectChanges();
                        this.hostComponent.pagination = {
                            pageSize: 'Magic',
                            pageSizeOptions: [10],
                            rowHeight: 100,
                        };
                        this.finder.detectChanges();
                        expect(this.clrGridWidget.getPaginationDescription().text()).toEqual(
                            translationService.translate(DEFAULT_PAGINATION_TRANSLATION_KEY, [
                                { firstItem: 1, lastItem: 19, totalItems: 150 },
                            ])
                        );
                    });

                    it('uses grid height when height is set to calculate page size ', fakeAsync(function(
                        this: HasFinderAndGrid
                    ): void {
                        this.hostComponent.parentHeight = '2000px';
                        this.hostComponent.height = 1000;
                        this.hostComponent.pagination = {
                            pageSize: 'Magic',
                            pageSizeOptions: [10],
                        };
                        this.finder.detectChanges();
                        tick();
                        expect(this.clrGridWidget.getPaginationDescription().text()).toEqual(
                            translationService.translate(DEFAULT_PAGINATION_TRANSLATION_KEY, [
                                { firstItem: 1, lastItem: 25, totalItems: 150 },
                            ])
                        );
                    }));

                    it('lets the user set rows per page', function(this: HasFinderAndGrid): void {
                        this.hostComponent.pagination = {
                            pageSize: 100,
                            pageSizeOptions: [10],
                        };
                        this.finder.detectChanges();
                        expect(this.clrGridWidget.getPaginationDescription().text()).toEqual(
                            translationService.translate(DEFAULT_PAGINATION_TRANSLATION_KEY, [
                                { firstItem: 1, lastItem: 100, totalItems: 150 },
                            ])
                        );
                    });

                    it('creates a smaller page when action buttons are present', function(this: HasFinderAndGrid): void {
                        this.hostComponent.parentHeight = '2000px';
                        this.hostComponent.actions = [
                            {
                                textKey: 'Add',
                                availability: () => true,
                                handler: () => null,
                                actionType: ActionType.STATIC_FEATURED,
                            },
                        ];
                        this.hostComponent.contextualActionPosition = ContextualActionPosition.ROW;
                        this.finder.detectChanges();
                        this.hostComponent.pagination = {
                            pageSize: 'Magic',
                            pageSizeOptions: [10],
                        };
                        this.finder.detectChanges();
                        expect(this.clrGridWidget.getPaginationDescription().text()).toEqual(
                            translationService.translate(DEFAULT_PAGINATION_TRANSLATION_KEY, [
                                { firstItem: 1, lastItem: 51, totalItems: 150 },
                            ])
                        );
                    });

                    it('creates a smaller page size when a header is present', function(this: HasFinderAndGrid): void {
                        this.hostComponent.parentHeight = '1990px';
                        this.hostComponent.header = 'Some Header';
                        this.finder.detectChanges();
                        this.hostComponent.pagination = {
                            pageSize: 'Magic',
                            pageSizeOptions: [10],
                        };
                        this.finder.detectChanges();
                        expect(this.clrGridWidget.getPaginationDescription().text()).toEqual(
                            translationService.translate(DEFAULT_PAGINATION_TRANSLATION_KEY, [
                                { firstItem: 1, lastItem: 51, totalItems: 150 },
                            ])
                        );
                    });
                });

                describe('pageSizeOptions', () => {
                    it('allows the user to input undefined', function(this: HasFinderAndGrid): void {
                        this.hostComponent.pagination = {
                            ...this.hostComponent.pagination,
                            shouldShowPageSizeSelector: true,
                            pageSizeOptions: undefined,
                        };
                        this.finder.detectChanges();
                        expect(this.clrGridWidget.getPaginationSizeSelector().text()).toEqual('Total Items5');
                    });
                });

                describe('shouldShowPageSizeSelector', () => {
                    it('hides the dropdown when set to false', function(this: HasFinderAndGrid): void {
                        this.hostComponent.pagination = {
                            ...this.hostComponent.pagination,
                            shouldShowPageSizeSelector: false,
                        };
                        this.finder.detectChanges();
                        expect(this.clrGridWidget.getPaginationSizeSelector().length()).toEqual(0);
                    });

                    it('shows the dropdown when set to true', function(this: HasFinderAndGrid): void {
                        this.hostComponent.pagination = {
                            ...this.hostComponent.pagination,
                            shouldShowPageSizeSelector: true,
                        };
                        this.finder.detectChanges();
                        expect(this.clrGridWidget.getPaginationSizeSelector().text()).toEqual('Total Items52050100');
                    });
                });
            });

            describe('@Input() paginationDropdownText', () => {
                it('displays the pagination dropdown information on page one', function(this: HasFinderAndGrid): void {
                    this.hostComponent.pagination = {
                        ...this.hostComponent.pagination,
                        shouldShowPageSizeSelector: true,
                    };
                    this.finder.detectChanges();
                    expect(this.clrGridWidget.getPaginationSizeSelector().text()).toEqual('Total Items52050100');
                });
            });

            describe('@Input() height', () => {
                it('defaults to parent height when height is not set', function(this: HasFinderAndGrid): void {
                    this.hostComponent.height = undefined;
                    this.finder.detectChanges();
                    expect(this.vcdDatagrid.vcdDatagrid.classes()).toContain('fill-parent');
                    expect(this.vcdDatagrid.vcdDatagrid.getStylePropertyValue('--datagrid-height')).toEqual('unset');
                });

                it('uses the given height when height is set', function(this: HasFinderAndGrid): void {
                    this.hostComponent.height = 200;
                    this.finder.detectChanges();
                    expect(this.vcdDatagrid.vcdDatagrid.getStylePropertyValue('--datagrid-height')).toEqual('200px');
                });

                it('allows the height to be dynamically changed', function(this: HasFinderAndGrid): void {
                    this.hostComponent.height = 200;
                    this.finder.detectChanges();
                    expect(this.vcdDatagrid.vcdDatagrid.getStylePropertyValue('--datagrid-height')).toEqual('200px');
                    this.hostComponent.height = undefined;
                    this.finder.detectChanges();
                    expect(this.vcdDatagrid.vcdDatagrid.classes()).toContain('fill-parent');
                    expect(this.vcdDatagrid.vcdDatagrid.getStylePropertyValue('--datagrid-height')).toEqual('unset');
                });
            });
        });

        describe('@Input() emptyGridPlaceholder', () => {
            it('does not show the placeholder while the grid is loading', function(this: HasFinderAndGrid): void {
                this.finder.detectChanges();
                expect(this.clrGridWidget.getSpinner().length()).toBeGreaterThan(0);
                expect(this.clrGridWidget.getPlaceHolder().text()).toEqual('');
            });

            it('shows the placeholder if the grid is empty', function(this: HasFinderAndGrid): void {
                this.finder.detectChanges();
                expect(this.clrGridWidget.getSpinner().length()).toBeGreaterThan(0);
                this.hostComponent.gridData = {
                    items: [],
                    totalItems: 0,
                };
                this.finder.detectChanges();
                expect(this.clrGridWidget.getSpinner().length()).toEqual(0);
                expect(this.clrGridWidget.getPlaceHolder().text()).toEqual('Placeholder');
            });

            it('does not show the placeholder if the grid has data', function(this: HasFinderAndGrid): void {
                this.finder.detectChanges();
                expect(this.clrGridWidget.getSpinner().length()).toBeGreaterThan(0);
                this.hostComponent.gridData = {
                    items: mockData,
                    totalItems: 2,
                };
                this.finder.detectChanges();
                expect(this.clrGridWidget.getSpinner().length()).toEqual(0);
                expect(this.clrGridWidget.getPlaceHolder().text()).toEqual('');
            });
        });

        it('displays loading indicators while data is loading', function(this: HasFinderAndGrid): void {
            this.finder.detectChanges();
            expect(this.clrGridWidget.clrDatagrid.getComponentInstance().loading).toBe(
                true,
                'Initially loading indicator should be true'
            );
            this.hostComponent.gridData = {
                items: mockData,
                totalItems: 2,
            };
            this.finder.detectChanges();
            expect(this.clrGridWidget.clrDatagrid.getComponentInstance().loading).toBe(
                false,
                'After setting gridData, loading indicator should not be visible'
            );
        });

        describe('Show/Hide Functionality', () => {
            function isColumnDisplayed(element: TestElement): boolean {
                return element.elements[0].classes['datagrid-hidden-column'] !== true;
            }

            beforeEach(function(this: HasFinderAndGrid): void {
                this.hostComponent.columns = [
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
                expect(isColumnDisplayed(this.clrGridWidget.getColumn(0))).toBe(true);
            });

            it('shows the columns with hidable value of  "Shown"', function(this: HasFinderAndGrid): void {
                expect(isColumnDisplayed(this.clrGridWidget.getColumn(1))).toBe(true);
            });

            it('hides the columns with hidable value of  "Hidden"', function(this: HasFinderAndGrid): void {
                expect(isColumnDisplayed(this.clrGridWidget.getColumn(2))).toBe(false);
                expect(
                    this.clrGridWidget
                        .getHiddenColumnHeaders()
                        .toArray()
                        .map((header: TestElement) => header.text())
                ).toEqual(['Default Renderer']);
            });

            it('shows the columns with hidable value of undefined', function(this: HasFinderAndGrid): void {
                expect(isColumnDisplayed(this.clrGridWidget.getColumn(3))).toBe(true);
            });
        });

        describe('@Input() detailComponent', () => {
            beforeEach(function(this: HasFinderAndGrid): void {
                this.hostComponent.columns = [
                    {
                        displayName: 'Column',
                        renderer: 'name',
                    },
                ];
                this.hostComponent.detailPane = undefined;
                this.finder.detectChanges();
            });

            it('opens one detail pane when you click the button', function(this: HasFinderAndGrid): void {
                this.clrGridWidget
                    .getDetailRowButtons()
                    .toArray()[0]
                    .click();
                expect(this.clrGridWidget.getDetailRows().length()).toEqual(1);
            });
        });

        describe('@Input() isRowExpanded', () => {
            beforeEach(function(this: HasFinderAndGrid): void {
                this.hostComponent.columns = [
                    {
                        displayName: 'Column',
                        renderer: 'name',
                    },
                ];
                this.hostComponent.detailPane = undefined;
                this.finder.detectChanges();
            });

            it('does NOT expand row when false', function(this: HasFinderAndGrid): void {
                expect(this.clrGridWidget.getDetailRows().length()).toEqual(0);
            });

            it('expands row when true', function(this: HasFinderAndGrid): void {
                this.hostComponent.isRowExpanded = true;
                this.finder.detectChanges();
                expect(this.clrGridWidget.getDetailRows().length()).toEqual(2);
            });
        });

        describe('@Input() detailPane', () => {
            beforeEach(function(this: HasFinderAndGrid): void {
                this.hostComponent.columns = [
                    {
                        displayName: 'Column',
                        renderer: 'name',
                    },
                ];
                this.finder.detectChanges();
            });

            it('opens one detail pane when you click the button', function(this: HasFinderAndGrid): void {
                this.clrGridWidget
                    .getDetailPaneButtons()
                    .toArray()[0]
                    .click();
                this.finder.detectChanges();
                expect(this.clrGridWidget.getDetailPanes().length()).toEqual(1);
                expect(this.clrGridWidget.getDetailPaneHeader().text()).toEqual('Palo Alto');
            });

            it('gives the same config when called with the same arguments', function(this: HasFinderAndGrid): void {
                this.clrGridWidget
                    .getDetailPaneButtons()
                    .toArray()[0]
                    .click();
                this.finder.detectChanges();
                expect(this.hostComponent.grid.getDetailPaneRenderSpec(mockData[0])).toEqual(
                    this.hostComponent.grid.getDetailPaneRenderSpec(mockData[0])
                );
            });

            it('updates the detail pane when the record changes', function(this: HasFinderAndGrid): void {
                this.clrGridWidget
                    .getDetailPaneButtons()
                    .toArray()[0]
                    .click();
                this.finder.detectChanges();
                expect(this.clrGridWidget.getDetailPanes().length()).toEqual(1);
                expect(this.clrGridWidget.getDetailPaneHeader().text()).toEqual('Palo Alto');
                this.hostComponent.gridData = {
                    items: [
                        {
                            ...mockData[0],
                            city: 'NEW',
                        },
                    ],
                    totalItems: 2,
                };
                this.finder.detectChanges();
                expect(this.clrGridWidget.getDetailPanes().length()).toEqual(1);
                expect(this.clrGridWidget.getDetailPaneHeader().text()).toEqual('NEW');
            });
        });

        describe('getRowLoadingListenerInjector()', () => {
            beforeEach(function(this: HasFinderAndGrid): void {
                this.hostComponent.columns = [
                    {
                        displayName: 'Column',
                        renderer: 'name',
                    },
                ];
                this.finder.detectChanges();
            });
        });

        describe('@Output() refresh', () => {
            beforeEach(function(this: HasFinderAndGrid): void {
                this.hostComponent.columns = [
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
                const refreshMethod = spyOn(this.hostComponent, 'refresh');
                this.clrGridWidget.getColumnHeader(0).click();
                expect(refreshMethod).toHaveBeenCalledWith({
                    sortColumn: {
                        name: 'a',
                        reverse: false,
                    },
                    pagination: { pageNumber: 1, itemsPerPage: 5 },
                });
                this.clrGridWidget.getColumnHeader(0).click();
                expect(refreshMethod).toHaveBeenCalledWith({
                    sortColumn: {
                        name: 'a',
                        reverse: true,
                    },
                    pagination: { pageNumber: 1, itemsPerPage: 5 },
                });
            });

            it('does not sort a column without a queryFieldName', function(this: HasFinderAndGrid): void {
                const refreshMethod = spyOn(this.hostComponent, 'refresh');
                this.clrGridWidget.getColumnHeader(1).click();
                expect(refreshMethod).toHaveBeenCalledTimes(0);
            });

            it('allows the user to change pages', function(this: HasFinderAndGrid): void {
                const refreshMethod = spyOn(this.hostComponent, 'refresh');
                this.clrGridWidget.getNextButton().click();
                expect(refreshMethod).toHaveBeenCalledWith({
                    pagination: {
                        pageNumber: 2,
                        itemsPerPage: 5,
                    },
                });
            });

            it('goes to page 1 when sorting is clicked', function(this: HasFinderAndGrid): void {
                const refreshMethod = spyOn(this.hostComponent, 'refresh');
                this.clrGridWidget.getNextButton().click();
                this.clrGridWidget.getColumnHeader(0).click();
                expect(refreshMethod).toHaveBeenCalledWith({
                    pagination: { pageNumber: 1, itemsPerPage: 5 },
                    sortColumn: { name: 'a', reverse: false },
                });
            });
        });

        describe('@Input() actions', () => {
            it(
                'adds the logic of calling datagrids actionReporter.monitorGet method to action handler' +
                    ' when the handler returns a promise',
                function(this: HasFinderAndGrid): void {
                    this.finder.detectChanges();
                    const component = this.hostComponent.grid;
                    const actionHandlerWithoutPromise: ActionHandlerType<any, any> = () => null;
                    const actionHandlerThatReturnsPromise: ActionHandlerType<any, any> = () => new Promise(() => null);
                    this.hostComponent.indicatorType = ActivityIndicatorType.BANNER;
                    this.hostComponent.actions = [
                        {
                            textKey: 'ActionThatDoesNotReturnPromise',
                            handler: actionHandlerWithoutPromise,
                            availability: () => true,
                        },
                        {
                            textKey: 'ActionThatReturnsPromise',
                            handler: actionHandlerThatReturnsPromise,
                            availability: () => true,
                        },
                    ];
                    this.finder.detectChanges();
                    const monitorGetSpy = spyOn(component.actionReporter, 'monitorGet').and.callFake(() => null);
                    component.actions[0].handler();
                    expect(monitorGetSpy).not.toHaveBeenCalled();
                    component.actions[1].handler();
                    expect(monitorGetSpy).toHaveBeenCalled();
                }
            );

            it('does not change what trackBy is used', function(this: HasFinderAndGrid): void {
                this.hostComponent.gridData = {
                    items: mockData,
                    totalItems: 2,
                };
                this.finder.detectChanges();

                this.hostComponent.actions = [
                    {
                        textKey: 'static.action',
                        handler: () => null,
                        availability: () => true,
                        actionType: ActionType.STATIC,
                    },
                ];
                this.finder.detectChanges();

                console.log(this.hostComponent.getGridTrackBy().toString());

                expect(this.hostComponent.getGridTrackBy()(0, mockData[0])).toEqual(mockData[0].name);
            });
        });

        describe('shouldShowActionBarOnTop', () => {
            it('returns true when there are static actions', function(this: HasFinderAndGrid): void {
                this.finder.detectChanges();
                const component = this.hostComponent.grid;
                this.hostComponent.actions = [
                    {
                        textKey: 'static.action',
                        handler: () => null,
                        availability: () => true,
                        actionType: ActionType.STATIC,
                    },
                ];
                this.finder.detectChanges();
                expect(component.shouldShowActionBarOnTop).toBeTruthy();
            });
            it('returns true when there are contextual actions to be displayed on top', function(this: HasFinderAndGrid): void {
                this.finder.detectChanges();
                const component = this.hostComponent.grid;
                this.hostComponent.gridData = {
                    items: mockData,
                    totalItems: 2,
                };
                this.finder.detectChanges();
                this.hostComponent.selectionType = GridSelectionType.Single;
                this.hostComponent.contextualActionPosition = ContextualActionPosition.TOP;
                this.hostComponent.actions = [
                    {
                        textKey: 'contextual.action',
                        handler: () => null,
                        availability: () => true,
                        actionType: ActionType.CONTEXTUAL,
                    },
                ];
                this.finder.detectChanges();
                // This is because contextual actions requires entities to be selected
                this.clrGridWidget.getSelectionLabelForRow(0).click();
                this.finder.detectChanges();
                expect(component.shouldShowActionBarOnTop).toBeTruthy();
            });
        });

        describe('@Input() header', () => {
            it('shows the header if set and allows it to be changed', function(this: HasFinderAndGrid): void {
                this.hostComponent.header = 'Some Header!';
                this.finder.detectChanges();
                expect(this.vcdDatagrid.getHeader().text()).toEqual('Some Header!');
                this.hostComponent.header = 'Some Other Header!';
                this.finder.detectChanges();
                expect(this.vcdDatagrid.getHeader().text()).toEqual('Some Other Header!');
            });

            it('does not show a header when none is set', function(this: HasFinderAndGrid): void {
                this.hostComponent.header = undefined;
                this.finder.detectChanges();
                expect(this.vcdDatagrid.getHeader().length()).toEqual(0);
            });
        });

        describe('GridColumn', () => {
            it('enables only sorting when queryFieldName is given but no filter is provided', function(this: HasFinderAndGrid): void {
                this.hostComponent.columns = [{ displayName: 'Name', renderer: 'name', queryFieldName: 'name' }];
                this.finder.detectChanges();
                const el = this.clrGridWidget.clrDatagrid.getComponentInstance();
                expect(el.columns.first.sortable).toEqual(true);
                expect(el.columns.first.customFilter).toEqual(false);
            });
            // tslint:disable-next-line:max-line-length
            it('enables only filtering when queryFieldName, filter are provided and sortable is set to false', function(this: HasFinderAndGrid): void {
                this.hostComponent.columns = [
                    {
                        displayName: 'Name',
                        renderer: 'name',
                        queryFieldName: 'name',
                        filter: DatagridStringFilter(WildCardPosition.END, ''),
                        sortable: false,
                    },
                ];
                this.finder.detectChanges();
                const el = this.clrGridWidget.clrDatagrid.getComponentInstance();
                expect(el.columns.first.sortable).toEqual(false);
                expect(el.columns.first.customFilter).toEqual(true);
            });
            // tslint:disable-next-line:max-line-length
            it('enables both filtering and sorting when queryFieldName, filter are provided and sortable is not set to false', function(this: HasFinderAndGrid): void {
                this.hostComponent.columns = [
                    {
                        displayName: 'Name',
                        renderer: 'name',
                        queryFieldName: 'name',
                        filter: DatagridStringFilter(WildCardPosition.END, ''),
                    },
                ];
                this.finder.detectChanges();
                const el = this.clrGridWidget.clrDatagrid.getComponentInstance();
                expect(el.columns.first.sortable).toEqual(true);
                expect(el.columns.first.customFilter).toEqual(true);
            });
        });

        describe('columnsUpdated event', () => {
            it('is fired when columns is set', function(this: HasFinderAndGrid): void {
                this.finder.detectChanges();
                const spy = spyOn(this.hostComponent.grid.columnsUpdated, 'emit').and.callThrough();
                this.hostComponent.columns = [
                    {
                        displayName: 'Column',
                        renderer: 'name',
                    },
                ];
                this.finder.detectChanges();
                expect(spy).toHaveBeenCalled();
            });
            it('is not fired when addColumn or removeColumn is called', function(this: HasFinderAndGrid): void {
                this.finder.detectChanges();
                const spy = spyOn(this.hostComponent.grid.columnsUpdated, 'emit').and.callThrough();
                this.hostComponent.grid.addColumn({
                    displayName: 'Column2',
                    renderer: 'name2',
                });
                this.finder.detectChanges();
                expect(spy).not.toHaveBeenCalled();
                this.hostComponent.grid.removeColumn({
                    displayName: 'Column2',
                    renderer: 'name2',
                });
                this.finder.detectChanges();
                expect(spy).not.toHaveBeenCalled();
            });
        });

        describe('addColumn', () => {
            beforeEach(function(this: HasFinderAndGrid): void {
                this.hostComponent.columns = [
                    {
                        displayName: 'Column',
                        renderer: 'name',
                    },
                ];
                this.finder.detectChanges();
            });
            it('adds the passed in column to list of existing grid columns', function(this: HasFinderAndGrid): void {
                expect(this.hostComponent.grid.columns.length).toBe(1);
                this.hostComponent.grid.addColumn({
                    displayName: 'Column2',
                    renderer: 'name2',
                });
                this.finder.detectChanges();
                expect(this.hostComponent.grid.columns.length).toBe(2);
                expect(this.hostComponent.grid.columns[1].displayName).toBe('Column2');
            });
            it(
                'updates a existing column if a column exists with same display name as the column passed ' + 'in',
                function(this: HasFinderAndGrid): void {
                    expect(this.hostComponent.grid.columns[0].renderer).toBe('name');
                    this.hostComponent.grid.addColumn({
                        displayName: 'Column',
                        renderer: 'updated-name',
                    });
                    this.finder.detectChanges();
                    expect(this.hostComponent.grid.columns[0].renderer).toBe('updated-name');
                }
            );
        });

        describe('removeColumn', () => {
            beforeEach(function(this: HasFinderAndGrid): void {
                this.hostComponent.columns = [
                    {
                        displayName: 'Column',
                        renderer: 'name',
                    },
                ];
                this.finder.detectChanges();
            });
            it('removes the column from list of existing grid columns', function(this: HasFinderAndGrid): void {
                expect(this.hostComponent.grid.columns.length).toBe(1);
                this.hostComponent.grid.removeColumn({
                    displayName: 'Column',
                    renderer: 'name',
                });
                this.finder.detectChanges();
                expect(this.hostComponent.grid.columns.length).toBe(0);
            });
            it(
                'does not do anything if there is no column with same display name as the column passed ' + 'in',
                function(this: HasFinderAndGrid): void {
                    expect(this.hostComponent.grid.columns.length).toBe(1);
                    this.hostComponent.grid.removeColumn({
                        displayName: 'Non-existing-Column',
                        renderer: 'name',
                    });
                    this.finder.detectChanges();
                    expect(this.hostComponent.grid.columns.length).toBe(1);
                }
            );
        });

        describe('getPaginationTranslation', () => {
            it('returns translated string', async function(this: HasFinderAndGrid): Promise<void> {
                this.finder.detectChanges();
                const component = this.hostComponent.grid;
                const translatedString = await (component.getPaginationTranslation({
                    firstItem: 1,
                    lastItem: 10,
                    totalItems: 100,
                } as any) as Observable<string>)
                    .pipe(first())
                    .toPromise();

                expect(translatedString).toBe(
                    TestBed.inject(TranslationService).translate(DEFAULT_PAGINATION_TRANSLATION_KEY, [
                        { firstItem: 2, lastItem: 11, totalItems: 100 },
                    ])
                );
            });
        });
    });

    describe('Column Renderers', () => {
        describe('Default renderer', () => {
            it('uses property path from  "renderer" property of column config ', function(this: HasFinderAndGrid): void {
                this.hostComponent.columns = [{ displayName: '', renderer: 'details.gender' }];
                this.finder.detectChanges();
                expect(this.clrGridWidget.getCell(0, 0).text()).toEqual(mockData[0].details.gender);
                expect(
                    this.clrGridWidget
                        .getRowCell(0)
                        .toArray()
                        .map((cell: TestElement) => cell.text())
                ).toEqual([mockData[0].details.gender]);
            });
        });

        describe('Function renderer', () => {
            it('renders the string returned from the renderer function', function(this: HasFinderAndGrid): void {
                this.hostComponent.columns = [
                    {
                        displayName: 'Function Renderer',
                        renderer: record => `${record.city}, ${record.state}`,
                    },
                ];
                this.finder.detectChanges();
                expect(this.clrGridWidget.getCell(0, 0).text()).toEqual(`${mockData[0].city}, ${mockData[0].state}`);
            });
        });

        describe('Component renderer', () => {
            it('renders the passed in component using config from RendererSpec', function(this: HasFinderAndGrid): void {
                this.hostComponent.columns = [
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
                expect(
                    this.clrGridWidget
                        .getCell(0, 0)
                        .queryElements('strong')
                        .text()
                ).toBe(mockData[0].name);
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
                (datagridSelectionChange)="selectionChanged($event)"
                [paginationDropdownText]="paginationText"
                [pagination]="pagination"
                [actions]="actions"
                [actionDisplayConfig]="actionDisplayConfig"
                [contextualActionPosition]="contextualActionPosition"
                [height]="height"
                [header]="header"
                [indicatorType]="indicatorType"
                [trackBy]="trackBy"
                [detailComponent]="details"
                [isRowExpanded]="isRowExpanded"
                [emptyGridPlaceholder]="placeholder"
                [detailPane]="detailPane"
                [(datagridSelection)]="datagridSelection"
                [preserveSelection]="preserveSelection"
            >
            </vcd-datagrid>
        </div>
    `,
})
export class HostWithDatagridComponent {
    gridData: GridDataFetchResult<MockRecord> = {
        items: mockData,
        totalItems: 150,
    };

    @ViewChild(DatagridComponent) grid!: MockRecordDatagridComponent;

    /** Will be set in tests */
    columns: GridColumn<MockRecord>[] = [];

    clrDatagridCssClass = '';

    selectionType = GridSelectionType.None;

    height?: number;

    @HostBinding('class.height') parentHeight = 'unset';

    header?: string;

    indicatorType?: ActivityIndicatorType;

    actions: ActionItem<MockRecord, unknown>[] = [];

    actionDisplayConfig: ActionDisplayConfig = {
        contextual: {
            featuredCount: 0,
            styling: ActionStyling.INLINE,
            buttonContents: TextIcon.TEXT,
        },
        staticActionStyling: ActionStyling.INLINE,
    };

    contextualActionPosition: ContextualActionPosition = ContextualActionPosition.TOP;

    details = DatagridDetailsComponent;

    isRowExpanded = false;

    detailPane = {
        header: (record: MockRecord) => record.city,
        component: DatagridDetailsPaneComponent,
    };

    paginationText = 'Total Items';

    placeholder = 'Placeholder';

    pagination: PaginationConfiguration = {
        pageSize: 5,
        pageSizeOptions: [5, 20, 50, 100],
    };

    datagridSelection: RecordId[] = [];

    preserveSelection = false;

    trackBy = (index, record: RecordId) => record.name;

    selectionChanged(selection: MockRecord[]): void {}

    clrDatarowCssClassGetter(a: MockRecord, index: number): string {
        return '';
    }

    refresh(eventData: GridState<MockRecord>): void {}

    getGridTrackBy(): TrackByFunction<MockRecord> {
        return this.grid.datagrid.items.trackBy;
    }
}

@Component({
    template: `
        DETAILS
    `,
})
class DatagridDetailsComponent {
    constructor(public loadingListener: LoadingListener) {}
}

@Component({
    template: `
        <h2 class="config">Count{{ configSetTimes }}</h2>
    `,
})
class DatagridDetailsPaneComponent {
    configSetTimes = 0;
    constructor() {}

    set config(config: any) {
        this.configSetTimes++;
    }
}
