/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { ActivityReporterModule } from '@vcd/ui-components';
import { SpinnerActivityReporterExampleComponent } from './spinner-activity-reporter.example.component';

@NgModule({
    declarations: [SpinnerActivityReporterExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, ActivityReporterModule],
    exports: [SpinnerActivityReporterExampleComponent],
    entryComponents: [SpinnerActivityReporterExampleComponent],
})
export class SpinnerActivityReporterExampleModule {}
