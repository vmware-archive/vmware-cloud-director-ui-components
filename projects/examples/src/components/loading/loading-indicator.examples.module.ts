/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { LoadingIndicatorComponent } from '@vcd/ui-components';
import { Documentation } from '@vmw/ng-live-docs';
import { LoadingIndicatorExampleComponent } from './loading-indicator.example.component';
import { LoadingIndicatorExampleModule } from './loading-indicator.example.module';

Documentation.registerDocumentationEntry({
    component: LoadingIndicatorComponent,
    displayName: 'Loading Indicator',
    urlSegment: 'loadingIndicator',
    examples: [
        {
            component: LoadingIndicatorExampleComponent,
            forComponent: null,
            title: 'Shows a loading indicator when set to loading',
        },
    ],
});

/**
 * A module that imports all loading indicator examples.
 */
@NgModule({
    imports: [LoadingIndicatorExampleModule],
})
export class LoadingIndicatorExamplesModule {}
