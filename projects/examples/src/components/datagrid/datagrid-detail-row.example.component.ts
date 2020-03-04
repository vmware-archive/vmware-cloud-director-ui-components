/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { GridDataFetchResult, GridColumn, GridState } from '@vcd/ui-components';

interface Data {
    value: string;
}

/**
 * Shows an expandable detail template within the rows.
 */
@Component({
    selector: 'vcd-datagrid-show-hide-example',
    template: `
        <vcd-datagrid [gridData]="gridData" (gridRefresh)="refresh($event)" [columns]="columns">
            <ng-template let-record="record"> DETAILS: {{ record.value }} </ng-template>
        </vcd-datagrid>
    `,
})
export class DatagridDetailRowExampleComponent {
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
