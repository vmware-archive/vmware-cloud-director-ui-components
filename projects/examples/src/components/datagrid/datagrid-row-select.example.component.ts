/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { GridDataFetchResult, GridState, GridColumn, GridSelectionType } from '@vcd/ui-components';

interface Data {
    href: string;
    data: number;
}

/**
 * Logs the selected row to the console when the selection changes.
 * Allows for multi, single, or no selection.
 */
@Component({
    selector: 'vcd-datagrid-row-select-example',
    template: `
        <button class="btn btn-primary" (click)="selectionType = GridSelectionType.Single">Single Select</button>
        <button class="btn btn-primary" (click)="selectionType = GridSelectionType.Multi">Multi Select Select</button>
        <button class="btn btn-primary" (click)="selectionType = GridSelectionType.None">No Select Select</button>
        <button class="btn btn-primary" (click)="this.newData()">New Data</button>
        <vcd-datagrid
            [gridData]="gridData"
            (gridRefresh)="refresh($event)"
            [columns]="columns"
            [selectionType]="selectionType"
            (selectionChanged)="selectionChanged($event)"
        ></vcd-datagrid>
    `,
})
export class DatagridRowSelectExampleComponent {
    selectionType = GridSelectionType.Multi;
    GridSelectionType = GridSelectionType;

    gridData: GridDataFetchResult<Data> = {
        items: [],
    };

    columns: GridColumn<Data>[] = [
        {
            displayName: 'Some Column',
            renderer: 'href',
        },
    ];

    selectionChanged(selected: Data[]): void {
        console.log(selected);
    }

    refresh(eventData: GridState<Data>): void {
        this.gridData = {
            items: [{ href: 'a', data: 5 }, { href: 'b', data: 5 }, { href: 'c', data: 5 }],
            totalItems: 2,
        };
    }

    newData(): void {
        this.gridData = {
            items: [{ href: 'a', data: 6 }, { href: 'b', data: 6 }, { href: 'd', data: 6 }],
            totalItems: 2,
        };
    }
}
