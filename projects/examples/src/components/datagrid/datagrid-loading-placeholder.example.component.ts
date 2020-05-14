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
 * Press the first button to stop loading and show the placeholder.
 */
@Component({
    selector: 'vcd-datagrid-loading-placeholder-example',
    templateUrl: './datagrid-loading-placeholder.example.component.html',
})
export class DatagridLoadingPlaceholderExampleComponent {
    gridData: GridDataFetchResult<Data> = {
        items: [],
    };

    columns: GridColumn<Data>[] = [
        {
            displayName: 'Column',
            renderer: 'value',
        },
    ];

    setData(): void {
        this.gridData = {
            items: [],
            totalItems: 0,
        };
    }
}
