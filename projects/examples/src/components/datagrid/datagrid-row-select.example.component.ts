/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import {
    GridColumn,
    GridDataFetchResult,
    GridSelectionType,
    GridState,
    PaginationConfiguration,
} from '@vcd/ui-components';

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
        <vcd-datagrid
            [gridData]="gridData"
            (gridRefresh)="refresh($event)"
            [columns]="columns"
            [selectionType]="selectionType"
            (datagridSelectionChange)="selectionChanged($event)"
            [(datagridSelection)]="selectedItems"
            [pagination]="paginationInfo"
            [preserveSelection]="true"
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

    selectedItems = [{ href: 'c' }];

    paginationInfo: PaginationConfiguration = {
        pageSize: 2,
    };

    selectionChanged(selected: Data[]): void {
        console.log(selected);
    }

    refresh(eventData: GridState<Data>): void {
        this.gridData = {
            items: [{ href: 'a', data: 5 }, { href: 'b', data: 5 }, { href: 'c', data: 5 }].slice(
                (eventData.pagination.pageNumber - 1) * eventData.pagination.itemsPerPage,
                eventData.pagination.pageNumber * eventData.pagination.itemsPerPage
            ),
            totalItems: 3,
        };
    }
}
