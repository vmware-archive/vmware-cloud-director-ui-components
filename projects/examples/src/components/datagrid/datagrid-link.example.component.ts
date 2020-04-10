/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import {
    ButtonConfig,
    ContextualButtonPosition,
    GridColumn,
    GridDataFetchResult,
    GridSelectionType,
    GridState,
    InactiveButtonDisplayMode,
    TextIcon,
} from '@vcd/ui-components';

interface Data {
    value: string;
    paused: boolean;
}

/**
 * Shows linked buttons on the top of the datagrid.
 * Has examples of both buttons that are global and contextual.
 */
@Component({
    selector: 'vcd-datagrid-link-example',
    template: `
        <button (click)="this.changeButtonLocation()" class="btn btn-primary">Change Link Location</button><br />
        <vcd-datagrid
            [gridData]="gridData"
            (gridRefresh)="refresh($event)"
            [columns]="columns"
            [buttonConfig]="buttonConfig"
            [selectionType]="selectionType"
        ></vcd-datagrid>
    `,
})
export class DatagridLinkExampleComponent {
    gridData: GridDataFetchResult<Data> = {
        items: [],
    };

    columns: GridColumn<Data>[] = [
        {
            displayName: 'Some Value',
            renderer: 'value',
        },
    ];

    buttonConfig: ButtonConfig<Data> = {
        globalButtons: [
            {
                label: 'Add',
                handler: () => {
                    console.log('Adding stuff!');
                },
                isActive: () => true,
                class: 'add',
            },
            {
                label: 'Delete All',
                handler: () => {
                    console.log('Deleting stuff!');
                },
                isActive: () => false,
                class: 'delete',
            },
        ],
        contextualButtonConfig: {
            buttons: [
                {
                    label: 'Start',
                    handler: (rec: Data[]) => {
                        console.log('Starting ' + rec[0].value);
                        rec[0].paused = false;
                    },
                    isActive: (rec: Data[]) => rec.length === 1 && rec[0].paused,
                    class: 'a',
                    icon: 'play',
                    inactiveDisplayMode: InactiveButtonDisplayMode.Hide,
                },
                {
                    label: 'Stop',
                    handler: (rec: Data[]) => {
                        console.log('Stopping ' + rec[0].value);
                        rec[0].paused = true;
                    },
                    isActive: (rec: Data[]) => rec.length === 1 && !rec[0].paused,
                    class: 'b',
                    icon: 'pause',
                    inactiveDisplayMode: InactiveButtonDisplayMode.Hide,
                },
                {
                    label: 'Anythign',
                    handler: (rec: Data[]) => {
                        console.log('Adding ' + rec[0].value);
                    },
                    isActive: (rec: Data[]) => rec.length === 1 && rec[0].value === 'a',
                    class: 'c',
                    icon: 'warn',
                },
            ],
            featuredCount: 3,
            featured: ['a', 'b', 'c'],
            position: ContextualButtonPosition.TOP,
            buttonContents: TextIcon.TEXT,
        },
        inactiveDisplayMode: InactiveButtonDisplayMode.Disable,
    };

    selectionType = GridSelectionType.Single;

    changeButtonLocation(): void {
        if (this.buttonConfig.contextualButtonConfig.position === ContextualButtonPosition.TOP) {
            this.buttonConfig.contextualButtonConfig.position = ContextualButtonPosition.ROW;
            this.selectionType = GridSelectionType.None;
        } else {
            this.buttonConfig.contextualButtonConfig.position = ContextualButtonPosition.TOP;
            this.selectionType = GridSelectionType.Single;
        }
    }

    refresh(eventData: GridState<Data>): void {
        this.gridData = {
            items: [
                { value: 'a', paused: false },
                { value: 'b', paused: true },
                { value: 'a', paused: true },
                { value: 'b', paused: true },
                { value: 'a', paused: false },
                { value: 'b', paused: true },
            ],
            totalItems: 2,
        };
    }
}
