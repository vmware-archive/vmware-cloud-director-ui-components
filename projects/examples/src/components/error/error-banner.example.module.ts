/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { ComponentsModule } from '@vcd/ui-components';
import { ErrorBannerExampleComponent } from './error-banner.example.component';

@NgModule({
    declarations: [ErrorBannerExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, ComponentsModule],
    exports: [ErrorBannerExampleComponent],
    entryComponents: [ErrorBannerExampleComponent],
})
export class ErrorBannerExampleModule {}
