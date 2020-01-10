/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import {
    BoldTextRendererComponent,
    GridColumn,
    GridDataFetchResult,
    GridState,
    RendererSpec,
} from '@vcd/ui-components';

export interface MockRecord {
    name: string;
    city: string;
    state: string;
    details: {
        gender: string;
    };
    age: number;
}

export const mockData: MockRecord[] = [
    {
        name: 'Person 1',
        city: 'Palo Alto',
        state: 'CA',
        details: {
            gender: 'Male',
        },
        age: 30,
    },
    {
        name: 'Person 2',
        city: 'Boston',
        state: 'MA',
        details: {
            gender: 'Female',
        },
        age: 60,
    },
];

@Component({
    templateUrl: '3-renderers-datagrid.example.component.html',
})
export class ThreeRenderersDatagridExampleComponent {
    gridData: GridDataFetchResult<MockRecord> = {
        items: [],
    };

    columns: GridColumn<MockRecord>[] = [
        {
            displayName: 'Component Renderer',
            renderer: RendererSpec({
                type: BoldTextRendererComponent,
                config: record => ({
                    text: record.name,
                }),
            }),
        },

        {
            displayName: 'Function Renderer',
            renderer: (record: MockRecord) => `${record.city}, ${record.state}`,
        },

        {
            displayName: 'Default(string) Renderer',
            renderer: 'details.gender',
        },
    ];

    async refresh(eventData: GridState<MockRecord>): Promise<void> {
        this.gridData = {
            items: mockData,
            totalItems: 2,
            pageSize: 2,
            page: 1,
        };
    }
}
