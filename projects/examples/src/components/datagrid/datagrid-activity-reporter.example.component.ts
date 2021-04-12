/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import {
    ActionItem,
    ActionType,
    ActivityIndicatorType,
    GridColumn,
    GridDataFetchResult,
    GridState,
} from '@vcd/ui-components';

interface Data {
    value: string;
}

/**
 * Shows the activity banner and how it interacts with the actions
 *
 * If your action handlers return a promise, a banner will be displayed over the grid indicating the loading activity. If the promise fails,
 * the loading banner will be replaced with an error banner, and if the promise resolves, the loading banner will be replaced with a success
 * banner if there is a success message otherwise, the loading banner is dismissed.
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

    indicatorType = ActivityIndicatorType.BANNER;

    private promiseTimeout = 1000;
    private promiseResolveTimeoutId: number;
    private promiseRejectTimeoutId: number;

    actions: ActionItem<any, any>[] = [
        {
            textKey: 'Start normal activity',
            isTranslatable: false,
            actionType: ActionType.STATIC_FEATURED,
            handler: () => this.promiseWithSuccess,
        },
        {
            textKey: 'Start activity with error',
            isTranslatable: false,
            actionType: ActionType.STATIC_FEATURED,
            handler: () => this.promiseWithError,
        },
    ];

    get promiseWithSuccess(): Promise<string> {
        let resolvePromise: (result: string) => void;
        if (this.promiseResolveTimeoutId) {
            clearTimeout(this.promiseResolveTimeoutId);
        }
        this.promiseResolveTimeoutId = setTimeout(() => {
            resolvePromise('Success!');
        }, this.promiseTimeout);

        return new Promise<string>((resolve) => (resolvePromise = resolve));
    }

    get promiseWithError(): Promise<string> {
        let rejectPromise: (error: string) => void;
        if (this.promiseRejectTimeoutId) {
            clearTimeout(this.promiseRejectTimeoutId);
        }
        this.promiseRejectTimeoutId = setTimeout(() => {
            rejectPromise('Error!');
        }, this.promiseTimeout);

        return new Promise<string>((resolve, reject) => (rejectPromise = reject));
    }

    refresh(eventData: GridState<Data>): void {
        this.gridData = {
            items: [{ value: 'a' }, { value: 'b' }, { value: 'c' }],
            totalItems: 2,
        };
    }
}
