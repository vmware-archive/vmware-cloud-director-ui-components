/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import {
    BoldTextRenderer,
    BoldTextRendererComponent,
    ColumnComponentRendererSpec,
    GridColumn,
    GridDataFetchResult,
    GridState,
} from '@vcd/ui-components';
import { mockData, MockRecord } from './mock-data';

@Component({
    template: `
        <vcd-datagrid [gridData]="gridData" (gridRefresh)="refresh($event)" [columns]="columns"></vcd-datagrid>
    `,
    selector: 'vcd-datagrd-three-rendererers-example',
})
export class DatagridThreeRenderersExampleComponent {
    gridData: GridDataFetchResult<MockRecord> = {
        items: [],
    };

    columns: GridColumn<MockRecord>[] = [
        {
            displayName: 'Component Renderer',
            renderer: BoldTextRenderer(rec => rec.name),
        },
        {
            displayName: 'Function Renderer',
            renderer: (record: MockRecord) => `${record.city}, ${record.state}`,
        },

        {
            displayName: 'Default Renderer',
            renderer: 'details.gender',
        },
    ];

    refresh(eventData: GridState<MockRecord>): void {
        this.gridData = {
            items: mockData,
            totalItems: 2,
        };
    }
}
