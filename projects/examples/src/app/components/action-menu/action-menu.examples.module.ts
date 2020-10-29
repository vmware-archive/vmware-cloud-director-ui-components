/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';

import { ActionMenuComponent } from '@vcd/ui-components';
import { Documentation } from '@vmw/ng-live-docs';
import { ActionMenuContextualActionsExampleComponent } from './contextual-actions/action-menu-contextual-actions-example.component';
import { ActionMenuContextualActionsExampleModule } from './contextual-actions/action-menu-contextual-actions-example.module';
import { ActionMenuHideDisableExampleComponent } from './hide-disable/action-menu-hide-disable-example.component';
import { ActionMenuHideDisableExampleModule } from './hide-disable/action-menu-hide-disable.example.module';
// tslint:disable-next-line:max-line-length
import { ActionMenuSearchPauseUnpauseExampleComponent } from './search-pause-unpause/action-menu-search-pause-and-unpause.example.component';
import { ActionMenuSearchPauseAndUnpauseExampleModule } from './search-pause-unpause/action-menu-search-pause-and-unpause.example.module';
import { ActionMenuSearchExampleComponent } from './search/action-menu-search-example.component';
import { ActionMenuSearchExampleModule } from './search/action-menu-search-example.module';
import { ActionMenuStaticActionsExampleComponent } from './static-actions/action-menu-static-actions-example.component';
import { ActionMenuStaticActionsExampleModule } from './static-actions/action-menu-static-actions-example.module';
// tslint:disable-next-line:max-line-length
import { ActionMenuStaticAndContextualActionsExampleComponent } from './static-and-contextual-actions/action-menu-static-and-contextual-actions-example.component';
import { ActionMenuStaticAndContextualActionsExampleModule } from './static-and-contextual-actions/action-menu-static-and-contextual-actions-example.module';
import { ActionMenuWithSeparatorsExampleComponent } from './with-separators/action-menu-with-separators.example.component';
import { ActionMenuWithSeparatorsExampleModule } from './with-separators/action-menu-with-separators.example.module';

Documentation.registerDocumentationEntry({
    component: ActionMenuComponent,
    displayName: 'Action menu',
    urlSegment: 'action-menu',
    examples: [
        {
            component: ActionMenuStaticActionsExampleComponent,
            forComponent: null,
            title: 'Static actions',
            urlSegment: 'action-menu-static-actions',
        },
        {
            component: ActionMenuContextualActionsExampleComponent,
            forComponent: null,
            title: 'Contextual actions',
            urlSegment: 'action-menu-contextual-actions',
        },
        {
            component: ActionMenuStaticAndContextualActionsExampleComponent,
            forComponent: null,
            title: 'Static and Contextual actions',
            urlSegment: 'action-menu-static-and-contextual-actions',
        },
        {
            component: ActionMenuHideDisableExampleComponent,
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
            component: ActionMenuSearchExampleComponent,
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
        ActionMenuStaticActionsExampleModule,
        ActionMenuContextualActionsExampleModule,
        ActionMenuStaticAndContextualActionsExampleModule,
        ActionMenuHideDisableExampleModule,
        ActionMenuSearchExampleModule,
    ],
})
export class ActionMenuExamplesModule {}
