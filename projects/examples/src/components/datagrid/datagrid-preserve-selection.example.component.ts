/*!
 * Copyright 2023 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import {
    CheckBoxStyling,
    DatagridStringFilter,
    GridColumn,
    GridDataFetchResult,
    GridSelectionType,
    GridState,
    WildCardPosition,
} from '@vcd/ui-components';
import { FormControl } from '@angular/forms';

interface Data {
    name: string;
    city: string;
}

/**
 * Preserve selection when set to true will keep the datagrid selection on filter change.
 */
@Component({
    selector: 'vcd-datagrid-preserve-selection-example',
    template: `
        The default behavior is for datagrid to clear the selection whenever the datagrid's filters value are changed.
        Enabling the datagrid preserve selection will keep the selection.

        <p>Toggle to turn datagrid preserve selection on or off</p>
        <form class="clr-form-compact">
            <vcd-form-checkbox
                [formControl]="checkboxControl"
                [label]="'Preserve Selection'"
                [styling]="CheckBoxStyling.TOGGLESWITCH"
            >
            </vcd-form-checkbox>
        </form>
        <vcd-datagrid
            [gridData]="gridData"
            (gridRefresh)="refresh($event)"
            [columns]="columns"
            [selectionType]="selectionType"
            [datagridSelection]="selectedItems"
            (datagridSelectionChange)="selectionChanged($event)"
            [preserveSelection]="checkboxControl.value"
            [trackBy]="trackByName"
        ></vcd-datagrid>
    `,
})
export class DatagridPreserveSelectionExampleComponent {
    protected readonly CheckBoxStyling = CheckBoxStyling;

    selectionType = GridSelectionType.Multi;
    GridSelectionType = GridSelectionType;

    gridData: GridDataFetchResult<Data> = {
        items: [],
    };

    columns: GridColumn<Data>[] = [
        {
            displayName: 'Name',
            renderer: 'name',
            queryFieldName: 'name',
            filter: DatagridStringFilter(WildCardPosition.END, ''),
        },
        {
            displayName: 'City',
            renderer: 'city',
            queryFieldName: 'city',
            filter: DatagridStringFilter(WildCardPosition.END, ''),
        },
    ];

    selectedItems = [{ name: 'Bob', city: 'Palo Alto' }];

    checkboxControl = new FormControl(true);

    selectionChanged(selected: Data[]): void {
        console.log(selected);
    }

    refresh(): void {
        this.gridData = {
            items: [
                { name: 'Bob', city: 'Palo Alto' },
                { name: 'Mary', city: 'Boston' },
                { name: 'Harry', city: 'Austin' },
            ],
            totalItems: 3,
        };
    }

    trackByName = (index: number, record: Data): string => {
        return record.name;
    };
}
