/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { BannerActivityReporterComponent, SpinnerActivityReporterComponent } from '@vcd/ui-components';
import { Documentation } from '@vmw/ng-live-docs';
import { BannerActivityReporterExampleComponent } from './banner-activity-reporter.example.component';
import { BannerActivityReporterExampleModule } from './banner-activity-reporter.example.module';
import { SpinnerActivityReporterExampleComponent } from './spinner-activity-reporter.example.component';
import { SpinnerActivityReporterExampleModule } from './spinner-activity-reporter.example.module';

Documentation.registerDocumentationEntry({
    component: BannerActivityReporterComponent,
    displayName: 'Banner Activity Reporter',
    urlSegment: 'bannerActivityReporter',
    examples: [
        {
            component: BannerActivityReporterExampleComponent,
            title: 'Show/Hide the banner activity reporter',
            urlSegment: 'banner-activity-reporter',
        },
    ],
});

Documentation.registerDocumentationEntry({
    component: SpinnerActivityReporterComponent,
    displayName: 'Spinner Activity Reporter',
    urlSegment: 'spinnerActivityReporter',
    examples: [
        {
            component: SpinnerActivityReporterExampleComponent,
            title: 'Show/Hide the spinner activity reporter',
            urlSegment: 'spinner-activity-reporter',
        },
    ],
});

/**
 * A module that imports all activity reporter examples.
 */
@NgModule({
    imports: [SpinnerActivityReporterExampleModule, BannerActivityReporterExampleModule],
})
export class ActivityReporterExamplesModule {}
