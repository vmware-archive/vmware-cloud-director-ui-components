/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { I18nModule } from '@vcd/i18n';
import { VcdErrorBannerModule } from '../error/error-banner.module';
import { VcdLoadingIndicatorModule } from '../loading/loading-indicator.module';
import { BannerActivityReporterComponent } from './banner-activity-reporter.component';
import { SpinnerActivityReporterComponent } from './spinner-activity-reporter.component';

@NgModule({
    declarations: [BannerActivityReporterComponent, SpinnerActivityReporterComponent],
    imports: [CommonModule, ClarityModule, I18nModule, VcdErrorBannerModule, VcdLoadingIndicatorModule],
    exports: [BannerActivityReporterComponent, SpinnerActivityReporterComponent],
    entryComponents: [BannerActivityReporterComponent, SpinnerActivityReporterComponent],
})
export class VcdActivityReporterModule {}
