/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import {
    DatagridMultiSelectFilterComponent,
    DatagridNumericFilterComponent,
    DatagridSelectFilterComponent,
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
        {
            displayName: 'Custom Select filter',
            renderer: 'age',
            queryFieldName: 'age',
            filterRendererSpec: FilterComponentRendererSpec({
                type: DatagridSelectFilterComponent,
                config: {
                    options: [
                        {
                            value: 30,
                            display: 'Thirty',
                        },
                        {
                            value: 60,
                            display: 'sixty',
                        },
                    ],
                    value: 60,
                },
            }),
        },
        {
            displayName: 'Custom multi-select filter',
            renderer: 'state',
            queryFieldName: 'state',
            filterRendererSpec: FilterComponentRendererSpec({
                type: DatagridMultiSelectFilterComponent,
                config: {
                    options: [
                        {
                            value: 'CA',
                            display: 'California',
                        },
                        {
                            value: 'MA',
                            display: 'Massachusetts',
                        },
                        {
                            value: 'NC',
                            display: 'North Carolina',
                        },
                    ],
                    value: ['MA', 'NC'],
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
