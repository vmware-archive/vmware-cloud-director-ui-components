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
 * A component that holds an example of the css classes per row capability.
 */
@Component({
    selector: 'vcd-datagrid-css-classes-example',
    styles: [
        `
            ::ng-deep .yellow-row {
                background-color: greenyellow;
            }

            ::ng-deep .red-row {
                background-color: lightcoral;
            }
        `,
    ],
    template: `
        <vcd-datagrid
            [gridData]="gridData"
            (gridRefresh)="refresh($event)"
            [columns]="columns"
            [clrDatarowCssClassGetter]="clrDatarowCssClassGetter"
        ></vcd-datagrid>
    `,
})
export class DatagridCssClassesExampleComponent {
    gridData: GridDataFetchResult<Data> = {
        items: [],
    };

    columns: GridColumn<Data>[] = [
        {
            displayName: 'Some Column',
            renderer: 'value',
        },
    ];

    refresh(eventData: GridState<Data>): void {
        this.gridData = {
            items: [{ value: 'warn' }, { value: 'error' }, { value: 'ok' }, { value: 'ok' }, { value: 'error' }],
            totalItems: 2,
        };
    }

    clrDatarowCssClassGetter(entity: Data, index: number): string {
        if (entity.value === 'warn') {
            return 'yellow-row';
        } else if (entity.value === 'error') {
            return 'red-row';
        } else {
            return '';
        }
    }
}
