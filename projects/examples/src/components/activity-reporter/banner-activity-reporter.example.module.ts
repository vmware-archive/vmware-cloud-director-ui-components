/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { ComponentsModule } from '@vcd/ui-components';
import { BannerActivityReporterExampleComponent } from './banner-activity-reporter.example.component';

@NgModule({
    declarations: [BannerActivityReporterExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, ComponentsModule],
    exports: [BannerActivityReporterExampleComponent],
    entryComponents: [BannerActivityReporterExampleComponent],
})
export class BannerActivityReporterExampleModule {}
