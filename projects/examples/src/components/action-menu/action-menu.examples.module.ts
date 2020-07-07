/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';

import { ActionMenuComponent } from '@vcd/ui-components';
import { Documentation } from '@vmw/ng-live-docs';
import { ActionMenuExampleComponent } from './action-menu.example.component';
import { ActionMenuExampleModule } from './action-menu.example.module';

Documentation.registerDocumentationEntry({
    component: ActionMenuComponent,
    displayName: 'Action menu',
    urlSegment: 'ActionMenu',
    examples: [
        {
            component: ActionMenuExampleComponent,
            forComponent: null,
            title: 'Action Menu example',
        },
    ],
});

@NgModule({
    imports: [ActionMenuExampleModule],
})
export class ActionMenuExamplesModule {}
