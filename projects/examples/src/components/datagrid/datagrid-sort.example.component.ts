/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { GridDataFetchResult, GridColumn, GridState } from '@vcd/ui-components';

interface Data {
    value: string;
    someBool: boolean;
}

/**
 * A component that holds an example of the sorting columns capability.
 */
@Component({
    selector: 'vcd-datagrid-sort-example',
    template: `
        <vcd-datagrid [gridData]="gridData" (gridRefresh)="refresh($event)" [columns]="columns"> </vcd-datagrid>
    `,
})
export class DatagridSortExampleComponent {
    gridData: GridDataFetchResult<Data> = {
        items: [],
    };

    columns: GridColumn<Data>[] = [
        {
            displayName: 'Column',
            renderer: 'value',
        },
        {
            displayName: 'Boolean',
            renderer: 'someBool',
        },
    ];

    refresh(eventData: GridState<Data>): void {
        let data = [
            { value: 'a', someBool: true },
            { value: 'b', someBool: false },
            { value: 'c', someBool: true },
            { value: 'a', someBool: false },
            { value: 'f', someBool: true },
            { value: 'c', someBool: true },
        ];
        if (eventData.columnSorted) {
            if (eventData.columnSorted.name === 'Column') {
                data = data.sort((a, b) => a.value.localeCompare(b.value));
                if (eventData.columnSorted.reverse) {
                    data = data.reverse();
                }
            }
            if (eventData.columnSorted.name === 'Boolean') {
                data = data.sort((a, b) => (a.someBool === b.someBool ? 0 : a.someBool ? -1 : 1));
                if (eventData.columnSorted.reverse) {
                    data = data.reverse();
                }
            }
        }
        this.gridData = {
            items: data,
            totalItems: 2,
            pageSize: 2,
            page: 1,
        };
    }
}
