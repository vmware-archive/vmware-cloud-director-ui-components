/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { ActionDisplayConfig, ActionItem, ActionStyling, ActionType, TextIcon } from '@vcd/ui-components';

@Component({
    selector: 'vcd-static-and-contextual-actions-example',
    templateUrl: './action-menu-static-and-contextual-actions-example.component.html',
    styleUrls: ['./action-menu-static-and-contextual-actions-example.component.scss'],
})
export class ActionMenuStaticAndContextualActionsExampleComponent {
    actions: ActionItem<any, any>[] = [
        {
            textKey: 'Static 1',
            actionType: ActionType.STATIC,
            isTranslatable: false,
        },
        {
            textKey: 'Static 2',
            actionType: ActionType.STATIC,
            isTranslatable: false,
        },
        {
            textKey: 'Static featured 1',
            actionType: ActionType.STATIC_FEATURED,
            isTranslatable: false,
        },
        {
            textKey: 'Static featured 2',
            actionType: ActionType.STATIC_FEATURED,
            isTranslatable: false,
        },
        {
            textKey: 'Grouped Actions 1',
            children: [
                {
                    textKey: 'Contextual 1',
                    isTranslatable: false,
                },
                {
                    textKey: 'Contextual featured 1',
                    actionType: ActionType.CONTEXTUAL_FEATURED,
                    isTranslatable: false,
                },
            ],
            isTranslatable: false,
        },
        {
            textKey: 'Grouped Actions 2',
            children: [
                {
                    textKey: 'Contextual 2',
                    isTranslatable: false,
                },
                {
                    textKey: 'Contextual featured 2',
                    actionType: ActionType.CONTEXTUAL_FEATURED,
                    isTranslatable: false,
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
