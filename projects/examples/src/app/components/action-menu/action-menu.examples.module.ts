/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';

import { ActionMenuComponent } from '@vcd/ui-components';
import { Documentation } from '@vmw/ng-live-docs';
import { ActionMenuContextualActionsExampleComponent } from './contextual-actions/action-menu-contextual-actions-example.component';
import { ActionMenuContextualActionsExampleModule } from './contextual-actions/action-menu-contextual-actions-example.module';
import { ActionMenuDataUiExampleComponent } from './data-ui-attribute/action-menu-data-ui-example.component';
import { ActionMenuDataUiExampleModule } from './data-ui-attribute/action-menu-data-ui-example.module';
import { ActionMenuHideDisableExampleComponent } from './hide-disable/action-menu-hide-disable-example.component';
import { ActionMenuHideDisableExampleModule } from './hide-disable/action-menu-hide-disable.example.module';
import { ActionMenuSearchDebounceExampleComponent } from './search-debounce/action-menu-search-debounce.example.component';
import { ActionMenuSearchDebounceExampleModule } from './search-debounce/action-menu-search-debounce.example.module';
// eslint-disable-next-line max-len
import { ActionMenuSearchPauseUnpauseExampleComponent } from './search-pause-unpause/action-menu-search-pause-and-unpause.example.component';
import { ActionMenuSearchPauseAndUnpauseExampleModule } from './search-pause-unpause/action-menu-search-pause-and-unpause.example.module';
import { ActionMenuSearchExampleComponent } from './search/action-menu-search-example.component';
import { ActionMenuSearchExampleModule } from './search/action-menu-search-example.module';
import { ActionMenuStaticActionsExampleComponent } from './static-actions/action-menu-static-actions-example.component';
import { ActionMenuStaticActionsExampleModule } from './static-actions/action-menu-static-actions-example.module';
// eslint-disable-next-line max-len
import { ActionMenuStaticAndContextualActionsExampleComponent } from './static-and-contextual-actions/action-menu-static-and-contextual-actions-example.component';
// eslint-disable-next-line max-len
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
            title: 'Static actions',
            urlSegment: 'action-menu-static-actions',
        },
        {
            component: ActionMenuContextualActionsExampleComponent,
            title: 'Contextual actions',
            urlSegment: 'action-menu-contextual-actions',
        },
        {
            component: ActionMenuStaticAndContextualActionsExampleComponent,
            title: 'Static and Contextual actions',
            urlSegment: 'action-menu-static-and-contextual-actions',
        },
        {
            component: ActionMenuHideDisableExampleComponent,
            title: 'Hiding and disabling of actions',
            urlSegment: 'action-menu-hiding-disabling',
        },
        {
            component: ActionMenuWithSeparatorsExampleComponent,
            title: 'Action Menu with separators',
            urlSegment: 'action-menu-with-separators',
        },
        {
            component: ActionMenuSearchExampleComponent,
            title: 'Action search example',
            urlSegment: 'action-search',
        },
        {
            component: ActionMenuSearchPauseUnpauseExampleComponent,
            title: 'Action search pause and unpause',
            urlSegment: 'action-search-pause-unpause',
        },
        {
            component: ActionMenuSearchDebounceExampleComponent,
            title: 'Debounced Action Search',
            urlSegment: 'action-menu-search-debounce',
        },
        {
            component: ActionMenuDataUiExampleComponent,
            title: 'Data-ui attributes on actions',
            urlSegment: 'action-menu-data-ui-attr',
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
        ActionMenuSearchDebounceExampleModule,
        ActionMenuDataUiExampleModule,
    ],
})
export class ActionMenuExamplesModule {}
