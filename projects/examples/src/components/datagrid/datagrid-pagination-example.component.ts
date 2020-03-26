/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { GridColumn, GridDataFetchResult, GridState, PaginationConfiguration } from '@vcd/ui-components';

interface Data {
    value: string;
}

/**
 * A component that holds an example of the pagination capability.
 */
@Component({
    selector: 'vcd-datagrid-pagination-example',
    template: `
        <vcd-datagrid
            [gridData]="gridData"
            (gridRefresh)="refresh($event)"
            [columns]="columns"
            [pagination]="paginationInfo"
        >
        </vcd-datagrid>
    `,
})
export class DatagridPaginationExampleComponent {
    gridData: GridDataFetchResult<Data> = {
        items: [],
    };

    paginationInfo: PaginationConfiguration = {
        pageSize: 2,
        pageSizeOptions: [2, 20, 50, 100],
    };

    columns: GridColumn<Data>[] = [
        {
            displayName: 'Column',
            renderer: 'value',
        },
    ];

    refresh(eventData: GridState<Data>): void {
        const data: Data[] = [];
        for (let i = 1; i < 155; i++) {
            data.push({ value: String(i) });
        }
        this.gridData = {
            items: data.slice(
                (eventData.pagination.pageNumber - 1) * eventData.pagination.itemsPerPage,
                eventData.pagination.pageNumber * eventData.pagination.itemsPerPage
            ),
            totalItems: data.length,
        };
    }
}
