/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Input, OnInit } from '@angular/core';
import { ComponentRenderer, DetailPaneConfig, GridColumn, GridDataFetchResult, GridState } from '@vcd/ui-components';

interface Data {
    value: string;
}

/**
 * Shows an expandable detail pane next to the rows.
 */
@Component({
    selector: 'vcd-datagrid-detail-pane-example',
    template: `
        <p>
            The datagrid allows the client to pass in an arbitrary component to be rendered as the expandable detail
            pane for a row. This is passed in as <code>[detailPane]</code>
        </p>
        <vcd-datagrid [gridData]="gridData" (gridRefresh)="refresh($event)" [columns]="columns" [detailPane]="pane">
        </vcd-datagrid>
    `,
})
export class DatagridDetailPaneExampleComponent {
    gridData: GridDataFetchResult<Data> = {
        items: [],
    };

    pane = {
        header: 'Pane!',
        component: DatagridDetailPaneSubComponent,
    };

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
    selector: 'vcd-datagrid-detail-pane-sub-example',
    template: `
        <div>
            <dl>
                <dt>Record</dt>
                <dd>{{ JSON.stringify(config.record) }}</dd>
            </dl>
        </div>
    `,
})
export class DatagridDetailPaneSubComponent implements ComponentRenderer<DetailPaneConfig<Data>> {
    JSON = JSON;

    @Input() config: DetailPaneConfig<Data>;
}
