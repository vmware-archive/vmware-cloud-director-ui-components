/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Input, OnInit } from '@angular/core';
import { ComponentRenderer, DetailRowConfig, GridColumn, GridDataFetchResult, GridState } from '@vcd/ui-components';

interface Data {
    value: string;
}

/**
 * Shows an expandable detail template within the rows.
 */
@Component({
    selector: 'vcd-datagrid-detail-row-example',
    template: `
        <p>
            The datagrid allows the client to pass in an arbitrary component to be rendered as the expandable detail
            content of the rows. This is passed in as <code>[detailComponent]</code> and has support for using
            <code>[clrLoading]</code> to make the content lazy loaded.
        </p>
        <vcd-datagrid
            [gridData]="gridData"
            (gridRefresh)="refresh($event)"
            [columns]="columns"
            [detailComponent]="lazyDetails"
        >
        </vcd-datagrid>
        <p>The user can also chose to not specify <code>[clrLoading]</code> and the row will no longer be lazy.</p>
        <vcd-datagrid
            [gridData]="gridData"
            (gridRefresh)="refresh($event)"
            [columns]="columns"
            [detailComponent]="noLazyDetails"
        >
        </vcd-datagrid>
        <p>The user can specify <code>[isRowExpanded]</code> to expand the rows by default.</p>
        <vcd-datagrid
            [gridData]="gridData"
            (gridRefresh)="refresh($event)"
            [columns]="columns"
            [detailComponent]="noLazyDetails"
            [isRowExpanded]="true"
        >
        </vcd-datagrid>
    `,
})
export class DatagridDetailRowExampleComponent {
    gridData: GridDataFetchResult<Data> = {
        items: [],
    };

    lazyDetails = DatagridDetailRowSubComponent;
    noLazyDetails = DatagridDetailRowSubNoLazyComponent;

    columns: GridColumn<Data>[] = [
        {
            displayName: 'Column',
            renderer: 'value',
            queryFieldName: 'column',
        },
    ];

    refresh(eventData: GridState<Data>): void {
        this.gridData = {
            items: [{ value: 'a' }, { value: 'b' }],
            totalItems: 2,
        };
    }
}

@Component({
    selector: 'vcd-datagrid-detail-row-sub-example',
    template: `
        <div [clrLoading]="loading">
            <dl>
                <dt>Record</dt>
                <dd>{{ JSON.stringify(config.record) }}</dd>
                <dt>Index</dt>
                <dd>{{ config.index }}</dd>
                <dt>Count</dt>
                <dd>{{ config.count }}</dd>
            </dl>
        </div>
    `,
})
export class DatagridDetailRowSubComponent implements OnInit, ComponentRenderer<DetailRowConfig<Data>> {
    loading = true;
    JSON = JSON;

    @Input() config: DetailRowConfig<Data>;

    ngOnInit(): void {
        setTimeout(() => {
            this.loading = false;
        }, 2000);
    }
}

@Component({
    selector: 'vcd-datagrid-detail-row-sub-example',
    template: `
        <div>
            <dl>
                <dt>Record</dt>
                <dd>{{ JSON.stringify(config.record) }}</dd>
                <dt>Index</dt>
                <dd>{{ config.index }}</dd>
                <dt>Count</dt>
                <dd>{{ config.count }}</dd>
            </dl>
        </div>
    `,
})
export class DatagridDetailRowSubNoLazyComponent implements ComponentRenderer<DetailRowConfig<Data>> {
    JSON = JSON;

    @Input() config: DetailRowConfig<Data>;
}
