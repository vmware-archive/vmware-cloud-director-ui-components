/*!
 * Copyright 2020-2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { QuickSearchComponent } from '@vcd/ui-components';
import { Documentation } from '@vmw/ng-live-docs';
import { QuickSearchFiltersExampleComponent } from './filters/quick-search-filters.example.component';
import { QuickSearchFiltersExampleModule } from './filters/quick-search-filters.example.module';
import { QuickSearchNestedProvidersExampleComponent } from './nested-providers/quick-search-nested-providers.example.component';
import { QuickSearchNestedProvidersExampleModule } from './nested-providers/quick-search-nested-providers.example.module';
import { QuickSearchContentProjectionExampleComponent } from './quick-search-content-projection.example.component';
import { QuickSearchContentProjectionExampleModule } from './quick-search-content-projection.example.module';
import { QuickSearchHideEmptySectionExampleComponent } from './quick-search-hide-empty-section-example.component';
import { QuickSearchHideEmptySectionExampleModule } from './quick-search-hide-empty-section-example.module';
import { QuickSearchSyncAsyncExampleComponent } from './quick-search-sync-async.example.component';
import { QuickSearchSyncAsyncExampleModule } from './quick-search-sync-async.example.module';

Documentation.registerDocumentationEntry({
    component: QuickSearchComponent,
    displayName: 'Quick Search',
    urlSegment: 'quickSearch',
    examples: [
        {
            component: QuickSearchSyncAsyncExampleComponent,
            title: 'Async and sync sections',
            urlSegment: 'async-sync-sections',
        },
        {
            component: QuickSearchContentProjectionExampleComponent,
            title: 'Content Projection',
            urlSegment: 'content-projection',
        },
        {
            component: QuickSearchHideEmptySectionExampleComponent,
            title: 'Hide empty section',
            urlSegment: 'hide-empty-section',
        },
        {
            component: QuickSearchFiltersExampleComponent,
            title: 'Quick search filter',
            urlSegment: 'filters',
        },
        {
            component: QuickSearchNestedProvidersExampleComponent,
            title: 'Quick search nested providers',
            urlSegment: 'nested',
        },
    ],
});

/**
 * A module that imports all quick search examples.
 */
@NgModule({
    imports: [
        QuickSearchSyncAsyncExampleModule,
        QuickSearchHideEmptySectionExampleModule,
        QuickSearchContentProjectionExampleModule,
        QuickSearchFiltersExampleModule,
        QuickSearchNestedProvidersExampleModule,
    ],
})
export class QuickSearchExamplesModule {}
