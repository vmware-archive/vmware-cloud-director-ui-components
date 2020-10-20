/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { ActionDisplayConfig, ActionItem, ActionStyling, ActionType, TextIcon } from '@vcd/ui-components';

@Component({
    selector: 'vcd-contextual-actions-example',
    templateUrl: './contextual-actions.example.component.html',
    styleUrls: ['./contextual-actions.example.component.scss'],
})
export class ContextualActionsExampleComponent {
    actions: ActionItem<any, any>[] = [
        {
            textKey: 'Grouped Actions 1',
            children: [
                {
                    textKey: 'Add',
                    isTranslatable: false,
                    icon: 'plus',
                },
                {
                    textKey: 'Delete featured',
                    actionType: ActionType.CONTEXTUAL_FEATURED,
                    isTranslatable: false,
                    icon: 'trash',
                },
            ],
            isTranslatable: false,
        },
        {
            textKey: 'Grouped Actions 2',
            children: [
                {
                    textKey: 'Delete',
                    isTranslatable: false,
                    icon: 'trash',
                },
                {
                    textKey: 'Add featured',
                    actionType: ActionType.CONTEXTUAL_FEATURED,
                    isTranslatable: false,
                    icon: 'plus',
                },
            ],
            isTranslatable: false,
        },
        {
            textKey: 'Power actions',
            isTranslatable: false,
            children: [
                {
                    textKey: 'Start',
                    handler: () => {
                        console.log('Starting');
                    },
                    actionType: ActionType.CONTEXTUAL_FEATURED,
                    isTranslatable: false,
                    icon: 'play',
                },
            ],
        },
    ];
    inlineActionDisplayConfig: ActionDisplayConfig = {
        contextual: {
            featuredCount: 2,
            styling: ActionStyling.INLINE,
            buttonContents: TextIcon.TEXT,
        },
    };
    dropdownActionDisplayConfig: ActionDisplayConfig = {
        contextual: {
            featuredCount: 2,
            styling: ActionStyling.DROPDOWN,
            buttonContents: TextIcon.TEXT,
        },
    };
    featuredCountActionDisplayConfig: ActionDisplayConfig = {
        contextual: {
            featuredCount: 1,
            styling: ActionStyling.INLINE,
            buttonContents: TextIcon.TEXT,
        },
    };
    buttonContentsActionDisplayConfig: ActionDisplayConfig = {
        contextual: {
            featuredCount: 2,
            styling: ActionStyling.INLINE,
            buttonContents: TextIcon.ICON,
        },
    };
    buttonContentsActionDisplayConfig2: ActionDisplayConfig = {
        contextual: {
            ...this.buttonContentsActionDisplayConfig.contextual,
            buttonContents: TextIcon.ICON_AND_TEXT,
        },
    };
}
