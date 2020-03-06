/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { SpinnerActivityReporterComponent } from './spinner-activity-reporter.component';
import { I18nModule } from '@vcd/i18n';
import { BannerActivityReporterComponent } from './banner-activity-reporter.component';
import { ErrorBannerModule } from '../error/error-banner.module';
import { LoadingIndicatorModule } from '../loading/loading-indicator.module';

@NgModule({
    declarations: [BannerActivityReporterComponent, SpinnerActivityReporterComponent],
    imports: [CommonModule, ClarityModule, I18nModule, ErrorBannerModule, LoadingIndicatorModule],
    exports: [BannerActivityReporterComponent, SpinnerActivityReporterComponent],
    entryComponents: [BannerActivityReporterComponent, SpinnerActivityReporterComponent],
})
export class ActivityReporterModule {}
