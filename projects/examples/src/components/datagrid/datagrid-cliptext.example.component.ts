/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { BoldTextRenderer, GridColumn, GridDataFetchResult, GridState, TooltipSize } from '@vcd/ui-components';

interface Data {
    value: string;
}

/**
 * Shows cliptext on the columns, except for the last one.
 */
@Component({
    selector: 'vcd-datagrid-cliptext-example',
    templateUrl: './datagrid-cliptext.example.component.html',
})
export class DatagridCliptextExampleComponent {
    gridData: GridDataFetchResult<Data> = {
        items: [],
    };

    columns: GridColumn<Data>[] = [
        {
            displayName: 'Column 1',
            renderer: BoldTextRenderer(rec => rec.value),
        },
        {
            displayName: 'Column 2',
            renderer: 'value',
        },
        {
            displayName: 'Column 3',
            renderer: 'value',
        },
        {
            displayName: 'Column 4',
            renderer: 'value',
            cliptextConfig: {
                size: TooltipSize.md,
            },
        },
        {
            displayName: 'Column 5',
            renderer: 'value',
            cliptextConfig: { disabled: true },
        },
    ];

    refresh(eventData: GridState<Data>): void {
        this.gridData = {
            items: [{ value: 'longggggggggggggggggggggggggggggg' }],
            totalItems: 1,
        };
    }
}
