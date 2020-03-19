/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingIndicatorExampleComponent } from './loading-indicator.example.component';
import { LoadingIndicatorModule } from '@vcd/ui-components';

@NgModule({
    declarations: [LoadingIndicatorExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, LoadingIndicatorModule],
    exports: [LoadingIndicatorExampleComponent],
    entryComponents: [LoadingIndicatorExampleComponent],
})
export class LoadingIndicatorExampleModule {}
