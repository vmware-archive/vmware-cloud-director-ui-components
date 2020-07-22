/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { GridColumn, GridDataFetchResult, GridState } from '@vcd/ui-components';

interface Data {
    value: string;
}

/**
 * Shows the capability of the datagrid to put a header on the top.
 */
@Component({
    selector: 'vcd-datagrid-header-example',
    templateUrl: './datagrid-header.example.component.html',
})
export class DatagridHeaderExampleComponent {
    gridData: GridDataFetchResult<Data> = {
        items: [],
    };

    columns: GridColumn<Data>[] = [
        {
            displayName: 'Column',
            renderer: 'value',
        },
    ];

    header = 'Some Header!';

    refresh(eventData: GridState<Data>): void {
        this.gridData = {
            items: [{ value: 'a' }, { value: 'b' }],
            totalItems: 2,
        };
    }
}
