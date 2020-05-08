/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { ErrorBannerComponent } from '@vcd/ui-components';
import { Documentation } from '@vmw/ng-live-docs';
import { ErrorBannerExampleComponent } from './error-banner.example.component';
import { ErrorBannerExampleModule } from './error-banner.example.module';

Documentation.registerDocumentationEntry({
    component: ErrorBannerComponent,
    displayName: 'Error Banner',
    urlSegment: 'errorBanner',
    examples: [
        {
            component: ErrorBannerExampleComponent,
            forComponent: null,
            title: 'Error banner when the button is pressed',
        },
    ],
});

/**
 * A module that imports all error banner examples.
 */
@NgModule({
    imports: [ErrorBannerExampleModule],
})
export class ErrorBannerExamplesModule {}
