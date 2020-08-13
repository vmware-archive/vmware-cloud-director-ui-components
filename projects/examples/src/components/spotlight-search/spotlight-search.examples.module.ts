/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { SpotlightSearchComponent } from '@vcd/ui-components';
import { Documentation } from '@vmw/ng-live-docs';
import { SpotlightSearchExampleComponent } from './spotlight-search-example.component';
import { SpotlightSearchNoTitleExampleComponent } from './spotlight-search-no-title-example.component';
import { SpotlightSearchExampleModule } from './spotlight-search.example.module';

Documentation.registerDocumentationEntry({
    component: SpotlightSearchComponent,
    displayName: 'Spotlight Search',
    urlSegment: 'spotlightSearch',
    examples: [
        {
            component: SpotlightSearchExampleComponent,
            forComponent: null,
            title: 'Async and sync sections',
            urlSegment: 'async-sync-sections',
        },
        {
            component: SpotlightSearchNoTitleExampleComponent,
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
    imports: [SpotlightSearchExampleModule],
})
export class SpotlightSearchExamplesModule {}
