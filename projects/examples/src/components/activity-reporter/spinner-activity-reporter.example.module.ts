/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { VcdComponentsModule } from '@vcd/ui-components';
import { SpinnerActivityReporterExampleComponent } from './spinner-activity-reporter.example.component';

@NgModule({
    declarations: [SpinnerActivityReporterExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, VcdComponentsModule],
    exports: [SpinnerActivityReporterExampleComponent],
})
export class SpinnerActivityReporterExampleModule {}
