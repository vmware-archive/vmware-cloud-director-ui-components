/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { ActionDisplayConfig, ActionItem, ActionStyling, ActionType, TextIcon } from '@vcd/ui-components';

@Component({
    selector: 'vcd-action-menu-data-ui-example',
    templateUrl: './action-menu-data-ui-example.component.html',
    styleUrls: ['./action-menu-data-ui-example.component.scss'],
})
export class ActionMenuDataUiExampleComponent {
    actions: ActionItem<any, any>[] = [
        {
            textKey: 'actionMenu.dataUi.example.static.featured',
            actionType: ActionType.STATIC_FEATURED,
        },
        {
            textKey: 'actionMenu.dataUi.example.static',
            actionType: ActionType.STATIC,
        },
        {
            textKey: 'Grouped Actions',
            children: [
                {
                    textKey: 'actionMenu.dataUi.example.contextual',
                },
                {
                    textKey: 'actionMenu.dataUi.example.contextual.featured',
                    actionType: ActionType.CONTEXTUAL_FEATURED,
                },
            ],
            isTranslatable: false,
        },
    ];
    inlineActionDisplayConfig: ActionDisplayConfig = {
        contextual: {
            styling: ActionStyling.INLINE,
            buttonContents: TextIcon.TEXT,
        },
    };
}
