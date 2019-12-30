/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { DatagridComponent, GridDataFetchResult, GridState } from './datagrid.component';
import { GridColumn } from './interfaces/datagrid-column.interface';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DatagridModule } from './datagrid.module';
import { RendererSpec } from './interfaces/component-renderer.interface';
import { HasFinder, WidgetFinder } from '../utils/test/widget-object';
import { BoldTextRendererComponent } from './renderers/bold-text-renderer.component';
import { ClrDatagridWidgetObject } from '../utils/test/datagrid/datagrid.wo';

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

interface HasClrDatagrid {
    datagrid: ClrDatagridWidgetObject;
}

type HasFinderAndGrid = HasFinder & HasClrDatagrid;

const FIRST_ROW = 0;
const FIRST_COLUMN = 0;
const SECOND_COLUMN = 1;
const THIRD_COLUMN = 2;

describe('DatagridComponent', () => {
    beforeEach(async(function(this: HasFinderAndGrid): void {
        TestBed.configureTestingModule({
            imports: [DatagridModule],
            declarations: [HostWithDatagridComponent],
        }).compileComponents();
        this.finder = new WidgetFinder(HostWithDatagridComponent);
        this.datagrid = this.finder.find({
            woConstructor: ClrDatagridWidgetObject,
        });
    }));

    afterEach(function(this: HasFinderAndGrid): void {
        if (this.finder) {
            this.finder.destroy();
        }
        if (this.datagrid) {
            this.datagrid.destroy();
        }
    });

    describe('view data:', () => {
        it('displays correct number of columns', function(this: HasClrDatagrid): void {
            const testHostComponent = new HostWithDatagridComponent();
            expect(this.datagrid.columnCount).toEqual(testHostComponent.columns.length);
        });

        it('displays columns with correct headers', function(this: HasClrDatagrid): void {
            const testHostComponent = new HostWithDatagridComponent();
            testHostComponent.columns.forEach((column, index) => {
                expect(this.datagrid.columnHeaders[index]).toEqual(column.displayName);
            });
        });

        it('displays correct number of rows based on the grid data received', fakeAsync(function(
            this: HasClrDatagrid
        ): void {
            this.datagrid.detectChanges();
            tick();
            expect(this.datagrid.rowCount).toEqual(mockData.length);
        }));

        it('displays loading initially when the grid is rendered', fakeAsync(function(this: HasClrDatagrid): void {
            expect(this.datagrid.component.loading).toBe(true);
            this.datagrid.detectChanges();
            tick();
            expect(this.datagrid.component.loading).toBe(false);
        }));
    });

    describe('Column Renderers:', () => {
        describe('Default renderer', () => {
            it('renders the value at object property path given to "renderer" property of column config', fakeAsync(function(
                this: HasFinderAndGrid
            ): void {
                this.datagrid.detectChanges();
                tick();
                expect(this.datagrid.getCellText(FIRST_ROW, THIRD_COLUMN)).toEqual(mockData[0].details.gender);
            }));
        });

        describe('Function renderer', () => {
            it('renders the string being returned from the renderer function', fakeAsync(function(
                this: HasFinderAndGrid
            ): void {
                this.datagrid.detectChanges();
                tick();
                expect(this.datagrid.getCellText(FIRST_ROW, SECOND_COLUMN)).toEqual(
                    `${mockData[0].city}, ${mockData[0].state}`
                );
            }));
        });

        describe('Component renderer', () => {
            it('renders the component given as component renderer type', fakeAsync(function(
                this: HasFinderAndGrid
            ): void {
                this.datagrid.detectChanges();
                tick();
                expect(this.datagrid.isCellHavingStrongElement(FIRST_ROW, FIRST_COLUMN)).toBe(true);
            }));
            it('configures the component with config given as input', fakeAsync(function(this: HasClrDatagrid): void {
                this.datagrid.detectChanges();
                tick();
                expect(this.datagrid.getCellText(FIRST_ROW, FIRST_COLUMN)).toEqual(mockData[0].name);
            }));
        });
    });
});

@Component({
    template: `
        <vcd-datagrid [gridData]="gridData" (gridRefresh)="refresh($event)" [columns]="columns"></vcd-datagrid>
    `,
})
export class HostWithDatagridComponent {
    gridData: GridDataFetchResult<MockRecord> = {
        items: [],
    };

    columns: GridColumn<MockRecord>[] = [
        {
            displayName: 'Component Renderer',
            renderer: RendererSpec({
                type: BoldTextRendererComponent,
                config: record => ({
                    text: record.name,
                }),
            }),
        },

        {
            displayName: 'String Renderer',
            renderer: (record: MockRecord) => `${record.city}, ${record.state}`,
        },

        {
            displayName: 'Default Renderer',
            renderer: 'details.gender',
        },
    ];

    async refresh(eventData: GridState<MockRecord>): Promise<void> {
        const items = await this.fakeDataLoader();
        this.gridData = {
            items,
            totalItems: 2,
            pageSize: 2,
            page: 1,
        };
    }

    private fakeDataLoader(): Promise<any> {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(mockData);
            });
        });
    }
}
