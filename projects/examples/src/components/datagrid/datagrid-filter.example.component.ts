/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import {
    BoldTextRendererComponent,
    DatagridNumericFilterComponent,
    GridColumn,
    GridDataFetchResult,
    GridState,
    RendererSpec,
} from '@vcd/ui-components';
import { mockData, MockRecord } from './mock-data';

@Component({
    template: `
        <vcd-datagrid [gridData]="gridData" (gridRefresh)="refresh($event)" [columns]="columns"></vcd-datagrid>
    `,
    selector: 'vcd-datagrid-filter-example',
})
export class DatagridFilterExampleComponent {
    gridData: GridDataFetchResult<MockRecord> = {
        items: [],
    };

    columns: GridColumn<MockRecord>[] = [
        {
            displayName: 'Both Filtering & Sorting',
            renderer: RendererSpec({
                type: BoldTextRendererComponent,
                config: record => ({
                    text: record.name,
                }),
            }),
            queryFieldName: 'name',
        },
        {
            displayName: 'No Filtering & No Sorting',
            renderer: (record: MockRecord) => `${record.city}, ${record.state}`,
        },
        {
            displayName: 'Only Sorting',
            renderer: 'state',
            sortBy: 'state',
        },
        // Only filtering but no sorting - PROBLEM THE FIRST TIME
        {
            displayName: 'Only Filtering',
            renderer: 'details.gender',
            queryFieldName: 'gender',
            notSortable: true,
        },
        {
            displayName: 'Custom Filter Renderer',
            renderer: 'age',
            queryFieldName: 'age',
            filterRendererSpec: RendererSpec({
                type: DatagridNumericFilterComponent,
                config: {
                    value: [1, 2],
                },
            }),
        },
    ];

    refresh(eventData: GridState<MockRecord>): void {
        console.log(eventData.filters);
        this.gridData = {
            items: mockData,
            totalItems: 2,
        };
    }
}
