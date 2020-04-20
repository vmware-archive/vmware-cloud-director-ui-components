/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { SubscriptionTracker } from '@vcd/ui-components';
import { Documentation } from '@vcd/ui-doc-lib';
import { SubscriptionTrackerExampleComponent } from './subscription-tracker.example.component';
import { SubscriptionTrackerExampleModule } from './subscription-tracker.example.module';

Documentation.registerDocumentationEntry({
    component: SubscriptionTracker,
    displayName: 'Subscription Tracker',
    urlSegment: 'subscriptionTracker',
    examples: [
        {
            component: SubscriptionTrackerExampleComponent,
            forComponent: null,
            title: 'Automatically destroy subscriptions when components are destroyed',
        },
    ],
});

/**
 * A module that imports all subscription tracker examples.
 */
@NgModule({
    imports: [SubscriptionTrackerExampleModule],
})
export class SubscriptionTrackerExamplesModule {}
