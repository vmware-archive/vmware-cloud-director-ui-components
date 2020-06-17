/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { GridColumn, GridDataFetchResult, GridState } from '@vcd/ui-components';

interface Data {
    value: string;
}

/**
 * A component that holds an example of the column CSS class capability.
 */
@Component({
    selector: 'vcd-datagrid-column-width-example',
    styleUrls: ['./datagrid-column-width.example.component.scss'],
    templateUrl: './datagrid-column-width.example.component.html',
})
export class DatagridColumnWidthExampleComponent {
    gridData: GridDataFetchResult<Data> = {
        items: [{ value: 'A' }, { value: 'B' }, { value: 'C' }],
        totalItems: 3,
    };

    columns: GridColumn<Data>[] = [
        {
            displayName: '2in',
            renderer: 'value',
            clrDgColumnClassName: 'col-1',
        },
        {
            displayName: '200px',
            renderer: 'value',
            clrDgColumnClassName: 'col-2',
        },
        {
            displayName: '4em',
            renderer: 'value',
            clrDgColumnClassName: 'col-3',
        },
        {
            displayName: '50pt',
            renderer: 'value',
            clrDgColumnClassName: 'col-4',
        },
        {
            displayName: 'NoWidth',
            renderer: 'value',
        },
    ];

    refresh(): void {
        this.gridData = {
            items: [{ value: 'A' }, { value: 'B' }, { value: 'C' }],
            totalItems: 3,
        };
    }
}
