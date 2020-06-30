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
 */
@Component({
    selector: 'vcd-datagrid-link-example',
    template: `
        <button (click)="changeButtonLocation()" class="btn btn-primary">Change Link Location</button><br />
        <button (click)="toggleDisabledState()" class="btn btn-primary">Change Disabled</button><br />
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

    disabledState = true;

    actions: ActionItem<R, HandlerData>[] = [
        {
            textKey: 'Add',
            handler: () => {
                console.log('Adding stuff!');
            },
            availability: () => true,
            class: 'add',
            actionType: ActionType.STATIC_FEATURED,
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
        },
        {
            textKey: 'Delete All',
            handler: () => {
                console.log('Deleting stuff!');
            },
            availability: () => false,
            class: 'delete',
            disabled: () => this.disabledState,
            actionType: ActionType.STATIC,
        },
        {
            textKey: 'Contextual action',
            handler: () => {
                const rec = this.dg.datagridSelection;
                console.log('Contextual action output ' + rec[0].value);
            },
            availability: (rec: R[]) => rec[0].value === 'a' && rec.length === 1,
        },
        {
            textKey: 'Power Actions',
            availability: () => true,
            children: [
                {
                    textKey: 'Start',
                    handler: (rec: R[]) => {
                        console.log('Starting ' + rec[0].value);
                        rec[0].paused = false;
                    },
                    availability: (rec: R[]) => rec.length === 1 && rec[0].paused,
                    actionType: ActionType.CONTEXTUAL_FEATURED,
                },
                {
                    textKey: 'Stop',
                    handler: (rec: R[]) => {
                        console.log('Stopping ' + (rec as R[])[0].value);
                        rec[0].paused = true;
                    },
                    availability: (rec: R[]) => rec.length === 1 && !rec[0].paused,
                    actionType: ActionType.CONTEXTUAL_FEATURED,
                },
            ],
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

    toggleDisabledState(): void {
        this.disabledState = !this.disabledState;
    }

    changeButtonLocation(): void {
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
                // { value: 'a', paused: false },
                // { value: 'b', paused: true },
            ],
            totalItems: 2,
        };
    }
}
