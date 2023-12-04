/*!
 * Copyright 2020-2023 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { BannerActivityReporterComponent, SpinnerActivityReporterComponent } from '@vcd/ui-components';
import { Documentation } from '@vmw/ng-live-docs';
import { BannerActivityReporterExampleComponent } from './banner-activity-reporter.example.component';
import { BannerActivityReporterExampleModule } from './banner-activity-reporter.example.module';
import { SpinnerActivityReporterExampleComponent } from './spinner-activity-reporter.example.component';
import { SpinnerActivityReporterExampleModule } from './spinner-activity-reporter.example.module';
import { BannerActivityReporterScrollIntoViewExampleComponent } from './banner-activity-reporter-scroll-into-view.example.component';
import { BannerActivityReporterScrollIntoViewExampleModule } from './banner-activity-reporter-scroll-into-view.example.module';

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
        {
            component: BannerActivityReporterScrollIntoViewExampleComponent,
            title: 'Scroll into view of the banner activity reporter',
            urlSegment: 'banner-activity-reporter-scroll-into-view',
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
    imports: [
        SpinnerActivityReporterExampleModule,
        BannerActivityReporterExampleModule,
        BannerActivityReporterScrollIntoViewExampleModule,
    ],
})
export class ActivityReporterExamplesModule {}
