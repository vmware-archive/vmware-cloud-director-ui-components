/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { QuickSearchComponent } from '@vcd/ui-components';
import { Documentation } from '@vmw/ng-live-docs';
import { QuickSearchNoTitleExampleComponent } from './quick-search-no-title.example.component';
import { QuickSearchSyncAsyncExampleComponent } from './quick-search-sync-async.example.component';
import { QuickSearchSyncAsyncExampleModule } from './quick-search-sync-async.example.module';

Documentation.registerDocumentationEntry({
    component: QuickSearchComponent,
    displayName: 'Quick Search',
    urlSegment: 'spotlightSearch',
    examples: [
        {
            component: QuickSearchSyncAsyncExampleComponent,
            forComponent: null,
            title: 'Async and sync sections',
            urlSegment: 'async-sync-sections',
        },
        {
            component: QuickSearchNoTitleExampleComponent,
            forComponent: null,
            title: 'Single section with no title',
            urlSegment: 'no-title-section',
        },
    ],
});

/**
 * A module that imports all activity reporter examples.
 */
@NgModule({
    imports: [QuickSearchSyncAsyncExampleModule],
})
export class QuickSearchExamplesModule {}
