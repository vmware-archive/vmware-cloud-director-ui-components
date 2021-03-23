/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { ActionDisplayConfig, ActionItem, ActionStyling, ActionType, TextIcon } from '@vcd/ui-components';

@Component({
    selector: 'vcd-dynamic-availability-example',
    templateUrl: './action-menu-hide-disable-example.component.html',
    styleUrls: ['./action-menu-hide-disable-example.component.scss'],
})
export class ActionMenuHideDisableExampleComponent {
    selectedEntities: any[] = [{ value: 'Selected entity', paused: false }];
    selectedEntitiesForDisabled: any[] = [{ value: 'Selected entity', paused: false }];

    actions: ActionItem<any, any>[] = [
        {
            textKey: 'Grouped actions',
            isTranslatable: false,
            children: [
                {
                    textKey: 'Start',
                    handler: (rec: any[]) => {
                        console.log('Starting ' + rec[0].value);
                        rec[0].paused = false;
                        this.selectedEntities = [...rec];
                    },
                    availability: (rec: any[]) => rec.length === 1 && rec[0].paused,
                    actionType: ActionType.CONTEXTUAL_FEATURED,
                    isTranslatable: false,
                },
                {
                    textKey: 'Stop',
                    handler: (rec: any[]) => {
                        console.log('Stopping ' + rec[0].value);
                        rec[0].paused = true;
                        this.selectedEntities = [...rec];
                    },
                    availability: (rec: any[]) => rec.length === 1 && !rec[0].paused,
                    actionType: ActionType.CONTEXTUAL_FEATURED,
                    isTranslatable: false,
                },
                {
                    textKey: 'Contextual 1',
                    handler: () => console.log('Contextual 1'),
                    isTranslatable: false,
                },
            ],
        },
    ];

    disabledActions: ActionItem<any, any>[] = [
        {
            textKey: 'Start',
            handler: (rec: any[]) => {
                console.log('Starting ' + rec[0].value);
                rec[0].paused = false;
                this.selectedEntitiesForDisabled = [...rec];
            },
            disabled: (rec: any[]) => rec.length === 1 && !rec[0].paused,
            actionType: ActionType.CONTEXTUAL_FEATURED,
            isTranslatable: false,
        },
        {
            textKey: 'Stop',
            handler: (rec: any[]) => {
                console.log('Stopping ' + rec[0].value);
                rec[0].paused = true;
                this.selectedEntitiesForDisabled = [...rec];
            },
            disabled: (rec: any[]) => rec.length === 1 && rec[0].paused,
            actionType: ActionType.CONTEXTUAL_FEATURED,
            isTranslatable: false,
        },
        {
            textKey: 'Contextual 1',
            handler: () => console.log('Contextual 1'),
            isTranslatable: false,
            disabled: () => true,
        },
    ];
    dropdownActionDisplayConfig: ActionDisplayConfig = {
        contextual: {
            featuredCount: 2,
            styling: ActionStyling.INLINE,
            buttonContents: TextIcon.TEXT,
        },
    };
}
