/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { I18nModule } from '@vcd/i18n';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataExporterComponent } from './data-exporter.component';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [DataExporterComponent],
    imports: [CommonModule, ReactiveFormsModule, ClarityModule, I18nModule],
    exports: [DataExporterComponent],
})
export class DataExporterModule {}
