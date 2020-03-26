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
 * A component that holds an example of setting the height on the datagrid.
 *
 * The parent of the grid must use CSS of `display: flex; flex-direction: column`
 * if you want the grid to fill the height of the parent.
 */
@Component({
    selector: 'vcd-datagrid-height-example',
    styleUrls: ['./datagrid-height.example.component.scss'],
    templateUrl: './datagrid-height.example.component.html',
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
