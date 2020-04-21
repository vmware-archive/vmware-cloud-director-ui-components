/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { ComponentsModule } from '@vcd/ui-components';
import {
    SubscriptionTrackerExampleComponent,
    SubscriptionTrackerExampleSubComponent,
} from './subscription-tracker.example.component';

@NgModule({
    declarations: [SubscriptionTrackerExampleComponent, SubscriptionTrackerExampleSubComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, ComponentsModule],
    exports: [SubscriptionTrackerExampleComponent],
    entryComponents: [SubscriptionTrackerExampleComponent],
})
export class SubscriptionTrackerExampleModule {}
