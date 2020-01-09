/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ViewChild } from '@angular/core';
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
    },
    {
        name: 'Person 2',
        city: 'Boston',
        state: 'MA',
        details: {
            gender: 'Female',
        },
        age: 60,
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
        });

        it('displays loading indicators while data is loading', function(this: HasFinderAndGrid): void {
            spyOn(this.finder.hostComponent, 'refresh').and.callFake(() => {
                this.finder.detectChanges();
                expect(this.clrGridWidget.component.loading).toBe(true, 'Initially loading indicator should be true');
                this.finder.hostComponent.gridData = {
                    items: mockData,
                    totalItems: 2,
                    pageSize: 2,
                    page: 1,
                };
                this.finder.detectChanges();
                expect(this.clrGridWidget.component.loading).toBe(
                    false,
                    'After setting gridData, loading indicator should not be visible'
                );
            });
            this.finder.detectChanges();
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
        ></vcd-datagrid>
    `,
})
export class HostWithDatagridComponent {
    gridData: GridDataFetchResult<MockRecord> = {
        items: mockData,
        totalItems: 2,
        pageSize: 2,
        page: 1,
    };

    @ViewChild(DatagridComponent, { static: false }) grid!: MockRecordDatagridComponent;

    /** Will be set in tests */
    columns: GridColumn<MockRecord>[] = [];

    clrDatagridCssClass = '';

    clrDatarowCssClassGetter(a: MockRecord, index: number): string {
        return '';
    }

    refresh(eventData: GridState<MockRecord>): void {}
}
