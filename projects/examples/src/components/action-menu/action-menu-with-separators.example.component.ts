/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActionDisplayConfig, ActionItem, ActionStyling, TextIcon } from '@vcd/ui-components';

@Component({
    selector: 'vcd-action-menu-with-separators-example',
    templateUrl: 'action-menu-with-separators.example.component.html',
})
export class ActionMenuWithSeparatorsExampleComponent {
    actions: ActionItem<any, any>[] = [
        {
            textKey: 'action.1',
        },
        {
            isSeparator: true,
        },
        {
            textKey: 'action.1',
        },
        {
            isSeparator: true,
        },
        {
            isSeparator: true,
        },
        {
            textKey: 'action.1',
        },
    ];
    actionDisplayConfig: ActionDisplayConfig = {
        contextual: {
            featuredCount: 0,
            styling: ActionStyling.DROPDOWN,
            buttonContents: TextIcon.TEXT,
        },
    };
}
