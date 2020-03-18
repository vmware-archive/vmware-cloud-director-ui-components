/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import {
    GridColumn,
    GridDataFetchResult,
    GridState,
    SelectOption,
    WildCardPosition,
    DatagridNumericFilter,
    DatagridSelectFilter,
    DatagridStringFilter,
    DatagridMultiSelectFilter,
    MultiSelectOption,
} from '@vcd/ui-components';
import { mockData, MockRecord } from './mock-data';

@Component({
    template: `
        <button class="btn btn-primary" [disabled]="!selectFilterOptions.length" (click)="removeSelectFilterOption()">
            Remove option
        </button>
        <button class="btn btn-primary" (click)="updateSelectFilterOptions()">Update options</button>
        <vcd-datagrid [gridData]="gridData" (gridRefresh)="refresh($event)" [columns]="columns"></vcd-datagrid>
    `,
    selector: 'vcd-datagrid-filter-example',
})
export class DatagridFilterExampleComponent {
    gridData: GridDataFetchResult<MockRecord> = {
        items: [],
    };

    selectFilterOptions: SelectOption[] = [
        {
            value: 30,
            display: 'Thirty',
        },
        {
            value: 60,
            display: 'sixty',
        },
    ];

    selectFilterWithCustomFiqlOptions: SelectOption[] = [
        {
            display: 'Option 1',
            value: 'field1==false;field2==true',
        },
        {
            display: 'Option 2',
            value: '(field1=ge=1;field2=le=10)',
        },
    ];

    multiSelectFilterOptions: MultiSelectOption[] = [
        {
            value: 'CA',
            display: 'California',
        },
        {
            value: 'MA',
            display: 'Massachusetts',
        },
        {
            value: 'NC',
            display: 'North Carolina',
        },
    ];

    columns: GridColumn<MockRecord>[] = [
        {
            displayName: 'Default String filter',
            renderer: 'state',
            queryFieldName: 'state',
        },
        {
            displayName: 'String filter with wild-card',
            renderer: 'state',
            queryFieldName: 'state',
            filterRendererSpec: DatagridStringFilter(WildCardPosition.END, ''),
        },
        {
            displayName: 'Numeric filter',
            renderer: 'age',
            queryFieldName: 'age',
            filterRendererSpec: DatagridNumericFilter([1, 2]),
        },
        {
            displayName: 'Select filter with dynamic options',
            renderer: 'age',
            queryFieldName: 'age',
            filterRendererSpec: DatagridSelectFilter(this.selectFilterOptions, 60),
        },
        {
            displayName: 'Select filter with custom FIQL',
            renderer: 'age',
            queryFieldName: 'age',
            filterRendererSpec: DatagridSelectFilter(
                this.selectFilterWithCustomFiqlOptions,
                '(field1=ge=1;field2=le=10)',
                true
            ),
        },
        {
            displayName: 'Multi-select filter',
            renderer: 'state',
            queryFieldName: 'state',
            filterRendererSpec: DatagridMultiSelectFilter(this.multiSelectFilterOptions, ['MA', 'NC']),
        },
    ];

    removeSelectFilterOption(): void {
        if (this.selectFilterOptions.length) {
            this.selectFilterOptions.pop();
        }
    }

    updateSelectFilterOptions(): void {
        const selectFilterOptions = [
            {
                value: 'CA',
                display: 'California',
            },
            {
                value: 'MA',
                display: 'Massachusetts',
            },
            {
                value: 'NC',
                display: 'North Carolina',
            },
        ];
        // Not assigning new array, as that would result in the options inside filter component losing the reference and thereby
        // not getting any changes
        this.selectFilterOptions.length = 0;
        selectFilterOptions.forEach(option => this.selectFilterOptions.push(option));
    }

    refresh(eventData: GridState<MockRecord>): void {
        console.log(eventData.filters);
        this.gridData = {
            items: mockData,
            totalItems: 2,
        };
    }
}
