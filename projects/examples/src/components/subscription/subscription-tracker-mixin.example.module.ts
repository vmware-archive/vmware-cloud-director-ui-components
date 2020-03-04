/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { DatagridModule } from '@vcd/ui-components';
import {
    SubscriptionTrackerMixinExampleComponent,
    SubscriptionTrackerMixinExampleSubComponent,
} from './subscription-tracker-mixin.example.component';

@NgModule({
    declarations: [SubscriptionTrackerMixinExampleComponent, SubscriptionTrackerMixinExampleSubComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, DatagridModule],
    exports: [SubscriptionTrackerMixinExampleComponent],
    entryComponents: [SubscriptionTrackerMixinExampleComponent],
})
export class SubscriptionTrackerMixinExampleModule {}
