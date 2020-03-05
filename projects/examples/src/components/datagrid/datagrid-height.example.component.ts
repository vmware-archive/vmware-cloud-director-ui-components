/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { GridDataFetchResult, GridColumn, GridState, PaginationConfiguration } from '@vcd/ui-components';

interface Data {
    value: string;
}

/**
 * A component that holds an example of setting the height on the datagrid.
 */
@Component({
    selector: 'vcd-datagrid-height-example',
    template: `
        <div
            style="height:300px;
                    flex-direction: column;
                    display: flex;"
        >
            <vcd-datagrid
                [gridData]="gridData"
                (gridRefresh)="refresh($event)"
                [columns]="columns"
                [header]="'Fill Parent'"
            >
            </vcd-datagrid>
        </div>
        <div
            style="height:300px;
                    flex-direction: column;
                    display: flex;"
        >
            <vcd-datagrid
                [gridData]="gridData"
                (gridRefresh)="refresh($event)"
                [columns]="columns"
                [height]="150"
                [pagination]="pagination"
            >
            </vcd-datagrid>
            <h3>Ends Here!</h3>
        </div>
    `,
})
export class DatagridHeightExampleComponent {
    pagination: PaginationConfiguration = {
        pageSize: 'Magic',
        pageSizeOptions: [10],
    };

    gridData: GridDataFetchResult<Data> = {
        items: [],
    };

    columns: GridColumn<Data>[] = [
        {
            displayName: 'Column',
            renderer: 'value',
        },
    ];

    refresh(eventData: GridState<Data>): void {
        this.gridData = {
            items: [{ value: 'a' }, { value: 'b' }],
            totalItems: 2,
        };
    }
}
