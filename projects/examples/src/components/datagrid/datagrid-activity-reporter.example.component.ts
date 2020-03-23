/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import {
    GridColumn,
    GridDataFetchResult,
    GridState,
    ButtonConfig,
    ContextualButtonPosition,
    ActivityIndicatorType,
} from '@vcd/ui-components';

interface Data {
    value: string;
}

/**
 * Shows the activity banner and how it interacts with the buttons.
 *
 * Press the global button to show the activity reporter, then press either of the buttons
 * to resolve the promise.
 */
@Component({
    selector: 'vcd-datagrid-activity-reporter-example',
    templateUrl: './datagrid-activity-reporter.example.component.html',
})
export class DatagridActivityReporterExampleComponent {
    gridData: GridDataFetchResult<Data> = {
        items: [],
    };

    columns: GridColumn<Data>[] = [
        {
            displayName: 'Some Column',
            renderer: 'value',
        },
    ];

    resolve: () => void;
    reject: (error: Error) => void;
    started = false;
    indicatorType = ActivityIndicatorType.BANNER;

    buttonConfig: ButtonConfig<Data> = {
        globalButtons: [
            {
                label: 'Start Indicator',
                isActive: () => true,
                handler: () => {
                    return new Promise((resolve, reject) => {
                        this.started = true;
                        this.resolve = resolve;
                        this.reject = reject;
                    })
                        .then((): string => {
                            this.started = false;
                            return 'good';
                        })
                        .catch(error => {
                            this.started = false;
                            throw error;
                        });
                },
            },
        ],
        contextualButtonConfig: {
            buttons: [],
            featured: [],
            featuredCount: 0,
            position: ContextualButtonPosition.TOP,
        },
    };

    refresh(eventData: GridState<Data>): void {
        this.gridData = {
            items: [{ value: 'a' }, { value: 'b' }, { value: 'c' }],
            totalItems: 2,
        };
    }
}
