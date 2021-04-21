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
 * Shows linked buttons on the top of the datagrid.
 * Has examples of both buttons that are global and contextual.
 *
 * Enable the delete button to hide it and disable the delete button to show it in disable mode. This is because the
 * inactive display mode of a button can be set as following:
 *  - Hidden - availability is false and disabled is false
 *  - Shown as Disabled - availability is false and disabled is true
 * Please refer to the delete action object configuration in the actions object list configuration.
 */
@Component({
    selector: 'vcd-datagrid-link-example',
    template: `
        <button (click)="changeActionLocation()" class="btn btn-primary">
            Display contextual actions {{ actionDisplayConfig.contextual.position === 'ROW' ? 'on top' : 'in row' }}
        </button>
        <button
            *ngIf="actionDisplayConfig.contextual.position === 'ROW'"
            (click)="changeContextualActionStyling()"
            class="btn btn-primary"
        >
            Display contextual actions {{ actionDisplayConfig.contextual.styling === 'INLINE' ? 'dropdown' : 'inline' }}
        </button>
        <br />
        <vcd-datagrid
            [gridData]="gridData"
            (gridRefresh)="refresh($event)"
            [columns]="columns"
            [actions]="actions"
            [actionDisplayConfig]="actionDisplayConfig"
            [selectionType]="selectionType"
        ></vcd-datagrid>
    `,
    styleUrls: ['datagrid-link.example.component.scss'],
})
export class DatagridLinkExampleComponent<R extends Record> {
    @ViewChild(DatagridComponent, { static: true }) dg: DatagridComponent<R>;

    gridData: GridDataFetchResult<Record> = {
        items: [],
    };

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

    actionDisplayConfig: DatagridActionDisplayConfig = getDefaultDatagridActionDisplayConfig();

    selectionType = GridSelectionType.Single;

    changeActionLocation(): void {
        if (this.actionDisplayConfig.contextual.position === DatagridContextualActionPosition.TOP) {
            this.actionDisplayConfig = {
                contextual: {
                    ...getDefaultDatagridActionDisplayConfig().contextual,
                    position: DatagridContextualActionPosition.ROW,
                },
                staticActionStyling: getDefaultDatagridActionDisplayConfig().staticActionStyling,
            };
            this.selectionType = GridSelectionType.None;
        } else {
            this.actionDisplayConfig = getDefaultDatagridActionDisplayConfig();
            this.selectionType = GridSelectionType.Single;
        }
    }

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

    changeContextualActionStyling(): void {
        this.actionDisplayConfig = {
            contextual: {
                ...this.actionDisplayConfig.contextual,
                styling:
                    this.actionDisplayConfig.contextual.styling === ActionStyling.DROPDOWN
                        ? (ActionStyling.INLINE as any)
                        : ActionStyling.DROPDOWN,
            },
            staticActionStyling: this.actionDisplayConfig.staticActionStyling,
        };
    }
}
