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
    SubscriptionTrackerMixinExampleComponent,
    SubscriptionTrackerMixinExampleSubComponent,
} from './subscription-tracker-mixin.example.component';

@NgModule({
    declarations: [SubscriptionTrackerMixinExampleComponent, SubscriptionTrackerMixinExampleSubComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, ComponentsModule],
    exports: [SubscriptionTrackerMixinExampleComponent],
    entryComponents: [SubscriptionTrackerMixinExampleComponent],
})
export class SubscriptionTrackerMixinExampleModule {}
