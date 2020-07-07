/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ViewChild } from '@angular/core';
import {
    ActionDisplayConfig,
    ActionItem,
    ActionType,
    ContextualActionPosition,
    DatagridComponent,
    GridColumn,
    GridDataFetchResult,
    GridSelectionType,
    GridState,
    TextIcon,
} from '@vcd/ui-components';
import { ActionStyling } from '../../../../components/src/common/interfaces';

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
 * Hidden - availability is false and disabled is false
 * Shown as Disabled - availability is false and disabled is true
 * Please refer to the delete action object configuration in the actions object list configuration.
 */
@Component({
    selector: 'vcd-datagrid-link-example',
    template: `
        <button (click)="changeActionLocation()" class="btn btn-primary">
            Display contextual actions {{ contextualActionPosition === 'ROW' ? 'on top' : 'in row' }}
        </button>
        <button
            *ngIf="contextualActionPosition === 'ROW'"
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
            [contextualActionPosition]="contextualActionPosition"
            [selectionType]="selectionType"
        ></vcd-datagrid>
    `,
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
            availability: () => true,
            class: 'add',
            actionType: ActionType.STATIC_FEATURED,
            isNotTranslatable: true,
        },
        {
            textKey: 'Custom handler data',
            handler: (rec: R[], data: Blah) => {
                console.log('Custom handler data ' + JSON.stringify(data));
            },
            handlerData: { foo: 'foo', bar: 'bar' },
            availability: () => true,
            class: 'b',
            icon: 'pause',
            actionType: ActionType.STATIC,
            isNotTranslatable: true,
        },
        {
            textKey: 'Contextual action',
            handler: () => {
                console.log('Contextual action output');
            },
            availability: (rec: R[]) => rec.length === 1,
            isNotTranslatable: true,
        },
        {
            textKey: 'Power Actions',
            children: [
                {
                    textKey: 'Start',
                    handler: (rec: R[]) => {
                        console.log('Starting ' + rec[0].value);
                        rec[0].paused = false;
                    },
                    availability: (rec: R[]) => rec.length === 1 && rec[0].paused,
                    actionType: ActionType.CONTEXTUAL_FEATURED,
                    isNotTranslatable: true,
                },
                {
                    textKey: 'Stop',
                    handler: (rec: R[]) => {
                        console.log('Stopping ' + (rec as R[])[0].value);
                        rec[0].paused = true;
                    },
                    availability: (rec: R[]) => rec.length === 1 && !rec[0].paused,
                    actionType: ActionType.CONTEXTUAL_FEATURED,
                    isNotTranslatable: true,
                },
            ],
            isNotTranslatable: true,
        },
        {
            textKey: 'Grouped actions',
            children: [
                {
                    textKey: 'Contextual featured',
                    actionType: ActionType.CONTEXTUAL_FEATURED,
                    handler: () => null,
                    isNotTranslatable: true,
                },
                {
                    textKey: 'Contextual 2',
                    handler: () => null,
                    isNotTranslatable: true,
                },
            ],
            isNotTranslatable: true,
        },
    ];

    actionDisplayConfig: ActionDisplayConfig = {
        contextual: {
            featuredCount: 3,
            styling: ActionStyling.INLINE,
            buttonContents: TextIcon.TEXT,
        },
        staticActionStyling: ActionStyling.INLINE,
    };

    contextualActionPosition: ContextualActionPosition = ContextualActionPosition.TOP;

    selectionType = GridSelectionType.Single;

    changeActionLocation(): void {
        if (this.contextualActionPosition === ContextualActionPosition.TOP) {
            this.contextualActionPosition = ContextualActionPosition.ROW;
            this.selectionType = GridSelectionType.None;
        } else {
            this.contextualActionPosition = ContextualActionPosition.TOP;
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
            ...this.actionDisplayConfig,
            contextual: {
                ...this.actionDisplayConfig.contextual,
                styling:
                    this.actionDisplayConfig.contextual.styling === ActionStyling.DROPDOWN
                        ? ActionStyling.INLINE
                        : ActionStyling.DROPDOWN,
            },
        };
    }
}
