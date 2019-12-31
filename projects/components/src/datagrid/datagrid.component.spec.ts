/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { GridDataFetchResult, GridState } from './datagrid.component';
import { GridColumn } from './interfaces/datagrid-column.interface';
import { TestBed } from '@angular/core/testing';
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
    datagrid: TestDataGrid;
}

type HasFinderAndGrid = HasFinder<HostWithDatagridComponent> & HasClrDatagrid;

const FIRST_ROW = 0;

const ComponentRenderer = 0;
const FunctionRenderer = 1;
const DefaultRenderer = 2;

describe('ClrDatagridComponent', () => {
    beforeEach(async function(this: HasFinderAndGrid): Promise<void> {
        await TestBed.configureTestingModule({
            imports: [DatagridModule],
            declarations: [HostWithDatagridComponent],
        }).compileComponents();
        this.finder = new WidgetFinder(HostWithDatagridComponent);
        this.datagrid = this.finder.find(TestDataGrid);
        // This does not render the data on the grid
        // detectChanges must be called again since we are updating the
        // grid data synchronously (in this test only) from an event handler
    });

    afterEach(function(this: HasFinderAndGrid): void {
        if (this.finder) {
            this.finder.destroy();
        }
    });

    describe('Grid', () => {
        describe('', () => {
            beforeEach(function(this: HasFinderAndGrid): void {
                this.finder.detectChanges();
            });
            it('displays number of columns', function(this: HasFinderAndGrid): void {
                expect(this.datagrid.columnCount).toBe(this.finder.hostComponent.columns.length);
            });

            it('displays columns with headers', function(this: HasFinderAndGrid): void {
                expect(this.finder.hostComponent.columns.map(col => col.displayName)).toEqual(
                    this.datagrid.columnHeaders
                );
            });

            it('displays rows based on the grid data received', function(this: HasClrDatagrid): void {
                expect(this.datagrid.rowCount).toEqual(mockData.length);
            });
        });

        it('displays loading indicators while data is loading initially', function(this: HasFinderAndGrid): void {
            expect(this.datagrid.component.loading).toBe(true);
            // Change detection will call `@Input() set gridData`, which is typically done asynchronously but
            // synchronously in this test
            this.datagrid.detectChanges();
            expect(this.datagrid.component.loading).toBe(false);
        });
    });

    describe('Column Renderers', () => {
        beforeEach(function(this: HasFinderAndGrid): void {
            this.finder.detectChanges();
        });
        describe('Default renderer', () => {
            it('uses property path from  "renderer" property of column config ', function(this: HasFinderAndGrid): void {
                expect(this.datagrid.getCellText(FIRST_ROW, DefaultRenderer)).toEqual(mockData[0].details.gender);
            });
        });

        describe('Function renderer', () => {
            it('renders the string returned from the renderer function', function(this: HasFinderAndGrid): void {
                expect(this.datagrid.getCellText(FIRST_ROW, FunctionRenderer)).toEqual(
                    `${mockData[0].city}, ${mockData[0].state}`
                );
            });
        });

        describe('Component renderer', () => {
            it('renders the passed in component using config from RendererSpec', function(this: HasFinderAndGrid): void {
                expect(this.datagrid.getBoldText(FIRST_ROW, ComponentRenderer)).toBe(mockData[0].name);
            });
        });
    });
});

class TestDataGrid extends ClrDatagridWidgetObject {
    getBoldText(row: number, column: number): string {
        const cellElement = this.getCell(row, column);
        return this.getNodeText(this.findElement('strong', cellElement));
    }
}

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

    refresh(eventData: GridState<MockRecord>): void {
        this.gridData = {
            items: mockData,
            totalItems: 2,
            pageSize: 2,
            page: 1,
        };
    }
}
