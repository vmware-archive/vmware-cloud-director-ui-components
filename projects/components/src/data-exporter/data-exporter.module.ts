/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataExporterComponent } from './data-exporter.component';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [DataExporterComponent],
    imports: [CommonModule, ReactiveFormsModule, ClarityModule],
    exports: [DataExporterComponent],
})
export class DataExporterModule {}
