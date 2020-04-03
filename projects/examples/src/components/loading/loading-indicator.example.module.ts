/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { ComponentsModule } from '@vcd/ui-components';
import { LoadingIndicatorExampleComponent } from './loading-indicator.example.component';

@NgModule({
    declarations: [LoadingIndicatorExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, ComponentsModule],
    exports: [LoadingIndicatorExampleComponent],
    entryComponents: [LoadingIndicatorExampleComponent],
})
export class LoadingIndicatorExampleModule {}
