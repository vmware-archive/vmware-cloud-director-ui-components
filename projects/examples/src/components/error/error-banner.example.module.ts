/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorBannerModule } from '@vcd/ui-components';
import { ErrorBannerExampleComponent } from './error-banner.example.component';

@NgModule({
    declarations: [ErrorBannerExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, ErrorBannerModule],
    exports: [ErrorBannerExampleComponent],
    entryComponents: [ErrorBannerExampleComponent],
})
export class ErrorBannerExampleModule {}
