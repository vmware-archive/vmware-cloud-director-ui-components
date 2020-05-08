/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { BannerActivityReporterComponent } from '@vcd/ui-components';
import { Documentation } from '@vmw/ng-live-docs';
import { BannerActivityReporterExampleComponent } from './banner-activity-reporter.example.component';
import { BannerActivityReporterExampleModule } from './banner-activity-reporter.example.module';
import { SpinnerActivityReporterExampleComponent } from './spinner-activity-reporter.example.component';
import { SpinnerActivityReporterExampleModule } from './spinner-activity-reporter.example.module';

Documentation.registerDocumentationEntry({
    component: BannerActivityReporterComponent,
    displayName: 'Activity Reporter',
    urlSegment: 'activityReporter',
    examples: [
        {
            component: SpinnerActivityReporterExampleComponent,
            forComponent: null,
            title: 'Show/Hide the spinner activity reporter',
        },
        {
            component: BannerActivityReporterExampleComponent,
            forComponent: null,
            title: 'Show/Hide the banner activity reporter',
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
