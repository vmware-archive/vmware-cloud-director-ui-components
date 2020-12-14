/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { QuickSearchComponent } from '@vcd/ui-components';
import { Documentation } from '@vmw/ng-live-docs';
import { QuickSearchContentProjectionExampleComponent } from './quick-search-content-projection.example.component';
import { QuickSearchContentProjectionExampleModule } from './quick-search-content-projection.example.module';
import { QuickSearchSyncAsyncExampleComponent } from './quick-search-sync-async.example.component';
import { QuickSearchSyncAsyncExampleModule } from './quick-search-sync-async.example.module';

Documentation.registerDocumentationEntry({
    component: QuickSearchComponent,
    displayName: 'Quick Search',
    urlSegment: 'quickSearch',
    examples: [
        {
            component: QuickSearchSyncAsyncExampleComponent,
            forComponent: null,
            title: 'Async and sync sections',
            urlSegment: 'async-sync-sections',
        },
        {
            component: QuickSearchContentProjectionExampleComponent,
            forComponent: null,
            title: 'Content Projection',
            urlSegment: 'content-projection',
        },
    ],
});

/**
 * A module that imports all quick search examples.
 */
@NgModule({
    imports: [QuickSearchSyncAsyncExampleModule, QuickSearchContentProjectionExampleModule],
})
export class QuickSearchExamplesModule {}
