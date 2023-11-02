/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
import { Component, OnInit } from '@angular/core';
import {
    DatagridStringFilter,
    GridColumn,
    GridDataFetchResult,
    GridState,
    SubscriptionTracker,
    VcdDatagridModule,
    WildCardPosition,
} from '@vcd/ui-components';
import { ClarityModule, ClrCommonFormsModule } from '@clr/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

interface MockDataType {
    name: string;
}

const MOCK_DATA: MockDataType[] = [
    { name: 'Italy' },
    { name: 'Holy See' },
    { name: 'Germany' },
    { name: 'Gibraltar' },
    { name: 'Nepal' },
    { name: 'Greece' },
];

function getColumns(placeholder?: string): GridColumn<MockDataType>[] {
    return [
        {
            displayName: 'Name',
            renderer: 'name',
            queryFieldName: 'name',
            filter: DatagridStringFilter(WildCardPosition.NONE, '', placeholder),
        },
    ];
}
@Component({
    standalone: true,
    imports: [VcdDatagridModule, ClrCommonFormsModule, ClarityModule, ReactiveFormsModule],
    providers: [SubscriptionTracker],
    template: `
        <p>
            The <code>placeholder</code> config property is allowing users to set a filter input placeholder. This
            addition is important for enhancing accessibility, ensuring a more inclusive user experience. The default
            placeholder value ensures this accessibility for cases where users do not provide a custom placeholder.
        </p>
        <p>You can test it with the provided datagrid and input which is bound with a placeholder value.</p>
        <clr-input-container>
            <label>Filter placeholder:</label>
            <input clrInput [formControl]="placeholderControl" #placeholderInput />
        </clr-input-container>
        <vcd-datagrid [gridData]="gridData" (gridRefresh)="refresh($event)" [columns]="columns"></vcd-datagrid>
    `,
})
export class DatagridStringFilterPlaceholderExampleComponent implements OnInit {
    protected gridData: GridDataFetchResult<MockDataType> = {
        items: [],
    };

    protected columns = getColumns();

    protected placeholderControl = new FormControl('');

    constructor(private subscriptionTracker: SubscriptionTracker) {}

    ngOnInit(): void {
        this.subscriptionTracker.subscribe(
            this.placeholderControl.valueChanges.pipe(debounceTime(100)),
            (value) => (this.columns = getColumns(value))
        );
    }

    protected refresh(eventData: GridState<MockDataType>): void {
        this.gridData = {
            items: MOCK_DATA,
            totalItems: 2,
        };
    }
}
