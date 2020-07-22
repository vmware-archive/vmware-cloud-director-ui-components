/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { I18nModule } from '@vcd/i18n';
import { ErrorBannerComponent } from './error-banner.component';

@NgModule({
    declarations: [ErrorBannerComponent],
    imports: [CommonModule, ClarityModule, I18nModule],
    exports: [ErrorBannerComponent],
    entryComponents: [ErrorBannerComponent],
})
export class VcdErrorBannerModule {}
