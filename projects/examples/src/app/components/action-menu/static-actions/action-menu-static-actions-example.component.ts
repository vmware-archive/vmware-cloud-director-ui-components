/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { ActionItem, ActionType } from '@vcd/ui-components';

@Component({
    selector: 'vcd-static-actions-example',
    templateUrl: './action-menu-static-actions-example.component.html',
})
export class ActionMenuStaticActionsExampleComponent {
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
            textKey: 'Disabled Action',
            actionType: ActionType.STATIC_FEATURED,
            isTranslatable: false,
            disabled: true,
        },
    ];
}
