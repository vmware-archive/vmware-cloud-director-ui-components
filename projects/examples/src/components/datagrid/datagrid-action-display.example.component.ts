/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ViewChild } from '@angular/core';
import {
    ActionDisplayConfig,
    ActionItem,
    ActionStyling,
    ActionType,
    DatagridActionDisplayConfig,
    DatagridComponent,
    DatagridContextualActionPosition,
    getDefaultDatagridActionDisplayConfig,
    GridColumn,
    GridDataFetchResult,
    GridSelectionType,
    GridState,
    TextIcon,
} from '@vcd/ui-components';

interface Record {
    value: string;
    paused: boolean;
}

interface Blah {
    foo: string;
    bar: string;
}

type HandlerData = Record[] | Blah;

/**
 *
 */
@Component({
    selector: 'vcd-datagrid-action-display-example',
    templateUrl: `./datagrid-action-display.example.component.html`,
    styleUrls: ['datagrid-action-display.example.component.scss'],
})
export class DatagridActionDisplayExampleComponent<R extends Record> {
    @ViewChild(DatagridComponent, { static: true }) dg: DatagridComponent<R>;

    gridData: GridDataFetchResult<Record> = {
        items: [],
    };

    singleSelectionType = GridSelectionType.Single;

    columns: GridColumn<R>[] = [
        {
            displayName: 'Some Value',
            renderer: 'value',
        },
    ];

    actions: ActionItem<R, HandlerData>[] = [
        {
            textKey: 'Add',
            handler: () => {
                console.log('Adding stuff!');
            },
            class: 'add',
            actionType: ActionType.STATIC_FEATURED,
            isTranslatable: false,
        },
        {
            textKey: 'Custom handler data',
            handler: (rec: R[], data: Blah) => {
                console.log('Custom handler data ' + JSON.stringify(data));
            },
            handlerData: { foo: 'foo', bar: 'bar' },
            class: 'b',
            icon: 'pause',
            actionType: ActionType.STATIC,
            isTranslatable: false,
        },
        {
            textKey: 'Contextual action',
            handler: () => {
                console.log('Contextual action output');
            },
            availability: (rec: R[]) => rec.length === 1,
            isTranslatable: false,
        },
        {
            textKey: 'power.actions',
            children: [
                {
                    textKey: 'Start',
                    handler: (rec: R[]) => {
                        console.log('Starting ' + rec[0].value);
                        rec[0].paused = false;
                    },
                    availability: (rec: R[]) => rec.length === 1 && rec[0].paused,
                    actionType: ActionType.CONTEXTUAL_FEATURED,
                    isTranslatable: false,
                },
                {
                    textKey: 'Stop',
                    handler: (rec: R[]) => {
                        console.log('Stopping ' + (rec as R[])[0].value);
                        rec[0].paused = true;
                    },
                    availability: (rec: R[]) => rec.length === 1 && !rec[0].paused,
                    actionType: ActionType.CONTEXTUAL_FEATURED,
                    isTranslatable: false,
                },
            ],
        },
        {
            textKey: 'grouped.actions',
            children: [
                {
                    textKey: 'Contextual featured',
                    actionType: ActionType.CONTEXTUAL_FEATURED,
                    handler: () => null,
                    isTranslatable: false,
                },
                {
                    textKey: 'Contextual 2',
                    handler: () => null,
                    isTranslatable: false,
                },
            ],
            isTranslatable: true,
        },
    ];

    topAndInlineActionDisplayConfig: DatagridActionDisplayConfig = getDefaultDatagridActionDisplayConfig();

    rowAndInlineActionDisplayConfig: DatagridActionDisplayConfig = {
        contextual: {
            styling: ActionStyling.INLINE,
            position: DatagridContextualActionPosition.ROW,
        },
    };

    rowAndDropdownActionDisplayConfig: DatagridActionDisplayConfig = {
        contextual: {
            styling: ActionStyling.DROPDOWN,
            position: DatagridContextualActionPosition.ROW,
        },
    };

    refresh(eventData: GridState<R>): void {
        this.gridData = {
            items: [
                { value: 'a', paused: false },
                { value: 'b', paused: true },
                { value: 'a', paused: true },
                { value: 'b', paused: false },
            ],
            totalItems: 2,
        };
    }
}
