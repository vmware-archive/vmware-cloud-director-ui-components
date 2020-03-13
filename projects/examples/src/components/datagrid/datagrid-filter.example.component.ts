/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import {
    DatagridNumericFilterComponent,
    DatagridStringFilterComponent,
    FilterComponentRendererSpec,
    GridColumn,
    GridDataFetchResult,
    GridState,
    WildCardPosition,
    DatagridNumericFilter,
    DatagridStringFilter,
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
            displayName: 'Default String filter',
            renderer: 'state',
            queryFieldName: 'state',
        },
        {
            displayName: 'Custom String filter',
            renderer: 'state',
            queryFieldName: 'state',
            filterRendererSpec: DatagridStringFilter(WildCardPosition.END, ''),
        },
        {
            displayName: 'Custom Numeric filter',
            renderer: 'age',
            queryFieldName: 'age',
            filterRendererSpec: DatagridNumericFilter([1, 2]),
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
