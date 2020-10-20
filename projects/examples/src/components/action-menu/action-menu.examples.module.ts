/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';

import { ActionMenuComponent } from '@vcd/ui-components';
import { Documentation } from '@vmw/ng-live-docs';
import { ActionMenuSearchPauseUnpauseExampleComponent } from './action-menu-search-pause-and-unpause.example.component';
import { ActionMenuSearchPauseAndUnpauseExampleModule } from './action-menu-search-pause-and-unpause.example.module';
import { ActionMenuWithSeparatorsExampleComponent } from './action-menu-with-separators.example.component';
import { ActionMenuWithSeparatorsExampleModule } from './action-menu-with-separators.example.module';
import { ActionSearchExampleComponent } from './action-search.example.component';
import { ActionSearchExampleModule } from './action-search.example.module';
import { ContextualActionsExampleComponent } from './contextual-actions/contextual-actions.example.component';
import { ContextualActionsExampleModule } from './contextual-actions/contextual-actions.example.module';
import { ActionsHideDisableExampleComponent } from './hide-disable/actions-hide-disable.example.component';
import { ActionsHideDisableExampleModule } from './hide-disable/actions-hide-disable.example.module';
import { StaticActionsExampleComponent } from './static-actions/static-actions.example.component';
import { StaticActionsExampleModule } from './static-actions/static-actions.example.module';
// tslint:disable-next-line:max-line-length
import { StaticAndContextualActionsExampleComponent } from './static-and-contextual-actions/static-and-contextual-actions.example.component';
import { StaticAndContextualActionsExampleModule } from './static-and-contextual-actions/static-and-contextual-actions.example.module';

Documentation.registerDocumentationEntry({
    component: ActionMenuComponent,
    displayName: 'Action menu',
    urlSegment: 'action-menu',
    examples: [
        {
            component: StaticActionsExampleComponent,
            forComponent: null,
            title: 'Static actions',
            urlSegment: 'action-menu-static-actions',
        },
        {
            component: ContextualActionsExampleComponent,
            forComponent: null,
            title: 'Contextual actions',
            urlSegment: 'action-menu-contextual-actions',
        },
        {
            component: StaticAndContextualActionsExampleComponent,
            forComponent: null,
            title: 'Static and Contextual actions',
            urlSegment: 'action-menu-static-and-contextual-actions',
        },
        {
            component: ActionsHideDisableExampleComponent,
            forComponent: null,
            title: 'Hiding and disabling of actions',
            urlSegment: 'action-menu-hiding-disabling',
        },
        {
            component: ActionMenuWithSeparatorsExampleComponent,
            forComponent: null,
            title: 'Action Menu with separators',
            urlSegment: 'action-menu-with-separators',
        },
        {
            component: ActionSearchExampleComponent,
            forComponent: null,
            title: 'Action search example',
            urlSegment: 'action-search',
        },
        {
            component: ActionMenuSearchPauseUnpauseExampleComponent,
            forComponent: null,
            title: 'Action search pause and unpause',
            urlSegment: 'action-search-pause-unpause',
        },
    ],
});

@NgModule({
    imports: [
        ActionMenuWithSeparatorsExampleModule,
        ActionMenuSearchPauseAndUnpauseExampleModule,
        StaticActionsExampleModule,
        ContextualActionsExampleModule,
        StaticAndContextualActionsExampleModule,
        ActionsHideDisableExampleModule,
        ActionSearchExampleModule,
    ],
})
export class ActionMenuExamplesModule {}
