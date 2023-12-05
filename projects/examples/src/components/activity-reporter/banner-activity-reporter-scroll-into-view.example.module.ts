/*!
 * Copyright 2023 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { VcdComponentsModule } from '@vcd/ui-components';
import { BannerActivityReporterScrollIntoViewExampleComponent } from './banner-activity-reporter-scroll-into-view.example.component';

@NgModule({
    declarations: [BannerActivityReporterScrollIntoViewExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, VcdComponentsModule],
    exports: [BannerActivityReporterScrollIntoViewExampleComponent],
})
export class BannerActivityReporterScrollIntoViewExampleModule {}
