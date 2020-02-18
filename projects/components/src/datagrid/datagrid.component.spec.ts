/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ViewChild, TemplateRef, ContentChild } from '@angular/core';
import { GridSelectionType } from './datagrid.component';
import { DatagridComponent, GridDataFetchResult, GridState } from './datagrid.component';
import { GridColumn, GridColumnHideable } from './interfaces/datagrid-column.interface';
import { TestBed } from '@angular/core/testing';
import { DatagridModule } from './datagrid.module';
import { RendererSpec } from './interfaces/component-renderer.interface';
import { WidgetFinder } from '../utils/test/widget-object';
import { BoldTextRendererComponent } from './renderers/bold-text-renderer.component';
import { ClrDatagridWidgetObject } from '../utils/test/datagrid/datagrid.wo';
import { WithGridBoldRenderer } from './renderers/bold-text-renderer.wo';

export interface MockRecord {
    name: string;
    city: string;
    state: string;
    details: {
        gender: string;
    };
    age: number;
    href: string;
}

export const mockData: MockRecord[] = [
    {
        name: 'Person 1',
        city: 'Palo Alto',
        state: 'CA',
        details: {
            gender: 'Male',
        },
        age: 30,
        href: '1',
    },
    {
        name: 'Person 2',
        city: 'Boston',
        state: 'MA',
        details: {
            gender: 'Female',
        },
        age: 60,
        href: '2',
    },
];

type MockRecordDatagridComponent = DatagridComponent<MockRecord>;

class GridWithBoldRenderer extends WithGridBoldRenderer(ClrDatagridWidgetObject) {}

interface HasFinderAndGrid {
    finder: WidgetFinder<HostWithDatagridComponent>;
    // The Widget Object for the underlying Clarity grid
    clrGridWidget: GridWithBoldRenderer;
    // The instance of DatagridComponent
    component: MockRecordDatagridComponent;
}

describe('DatagridComponent', () => {
    beforeEach(async function(this: HasFinderAndGrid): Promise<void> {
        await TestBed.configureTestingModule({
            imports: [DatagridModule],
            declarations: [HostWithDatagridComponent],
        }).compileComponents();

        this.finder = new WidgetFinder(HostWithDatagridComponent);
        this.clrGridWidget = this.finder.find(GridWithBoldRenderer);
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
            });

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

                it('displays the proper pagination information on page one', function(this: HasFinderAndGrid): void {
                    expect(this.clrGridWidget.getPaginationDescription()).toEqual(' 1 - 10 of 150 items ');
                    expect(this.clrGridWidget.getPaginationSizeSelectorText()).toEqual('Total Items102050100');
                });
            });
        });

        it('displays loading indicators while data is loading', function(this: HasFinderAndGrid): void {
            this.finder.detectChanges();
            expect(this.clrGridWidget.component.loading).toBe(true, 'Initially loading indicator should be true');
            this.finder.hostComponent.gridData = {
                items: mockData,
                totalItems: 2,
            };
            this.finder.detectChanges();
            expect(this.clrGridWidget.component.loading).toBe(
                false,
                'After setting gridData, loading indicator should not be visible'
            );
        });

        describe('Show/Hide Functionality', () => {
            beforeEach(function(this: HasFinderAndGrid): void {
                this.finder.hostComponent.columns = [
                    {
                        displayName: 'Component Renderer',
                        renderer: RendererSpec({
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
                    pagination: { pageNumber: 1, itemsPerPage: 10 },
                });
                this.clrGridWidget.sortColumn(0);
                expect(refreshMethod).toHaveBeenCalledWith({
                    sortColumn: {
                        name: 'a',
                        reverse: true,
                    },
                    pagination: { pageNumber: 1, itemsPerPage: 10 },
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
                        itemsPerPage: 10,
                    },
                });
            });

            it('goes to page 1 when sorting is clicked', function(this: HasFinderAndGrid): void {
                const refreshMethod = spyOn(this.finder.hostComponent, 'refresh');
                this.clrGridWidget.nextPage();
                this.clrGridWidget.sortColumn(0);
                expect(refreshMethod).toHaveBeenCalledWith({
                    pagination: { pageNumber: 1, itemsPerPage: 10 },
                    sortColumn: { name: 'a', reverse: false },
                });
            });
        });
    });

    describe('Column Renderers', () => {
        describe('Default renderer', () => {
            it('uses property path from  "renderer" property of column config ', function(this: HasFinderAndGrid): void {
                this.finder.hostComponent.columns = [{ displayName: '', renderer: 'details.gender' }];
                this.finder.detectChanges();
                expect(this.clrGridWidget.getCellText(0, 0)).toEqual(mockData[0].details.gender);
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
                        renderer: RendererSpec({
                            type: BoldTextRendererComponent,
                            config: record => ({
                                text: record.name,
                            }),
                        }),
                    },
                ];
                this.finder.detectChanges();
                expect(this.clrGridWidget.getBoldText(0, 0)).toBe(mockData[0].name);
            });
        });
    });
});

@Component({
    template: `
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
        >
            <ng-template let-record="record"> DETAILS: {{ record.name }} </ng-template>
        </vcd-datagrid>
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

    @ViewChild(DatagridComponent, { static: false }) datagrid: DatagridComponent<MockRecord>;

    paginationText = 'Total Items';

    selectionChanged(selection: MockRecord[]): void {}

    paginationCallback(first: number, last: number, total: number): string {
        return `${first} - ${last} of ${total} items`;
    }

    clrDatarowCssClassGetter(a: MockRecord, index: number): string {
        return '';
    }

    refresh(eventData: GridState<MockRecord>): void {}

    getSelection(): MockRecord[] {
        return this.datagrid.getDatagridSelection();
    }
}
