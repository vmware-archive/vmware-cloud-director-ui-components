/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { GridDataFetchResult, GridColumn, GridColumnHideable, GridState } from '@vcd/ui-components';

interface Data {
    value: string;
}

/**
 * A component that holds an example of the show/hide columns capability.
 */
@Component({
    selector: 'vcd-datagrid-show-hide-example',
    template: `
        <vcd-datagrid [gridData]="gridData" (gridRefresh)="refresh($event)" [columns]="columns"></vcd-datagrid>
    `,
})
export class DatagridShowHideExampleComponent {
    gridData: GridDataFetchResult<Data> = {
        items: [],
    };

    columns: GridColumn<Data>[] = [
        {
            displayName: 'Shown Initially',
            renderer: 'value',
            hideable: GridColumnHideable.Shown,
        },
        {
            displayName: 'Hidden Initially',
            renderer: 'value',
            hideable: GridColumnHideable.Hidden,
        },
        {
            displayName: 'Always Shown',
            renderer: 'value',
            hideable: GridColumnHideable.Never,
        },
        {
            displayName: 'Always Shown Way #2',
            renderer: 'value',
        },
    ];

    refresh(eventData: GridState<Data>): void {
        this.gridData = {
            items: [{ value: 'a' }, { value: 'b' }],
            totalItems: 2,
            pageSize: 2,
            page: 1,
        };
    }
}
