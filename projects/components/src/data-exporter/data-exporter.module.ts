/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { I18nModule } from '@vcd/i18n';
import { DataExporterComponent } from './data-exporter.component';

@NgModule({
    declarations: [DataExporterComponent],
    imports: [CommonModule, ReactiveFormsModule, ClarityModule, I18nModule],
    exports: [DataExporterComponent],
})
export class VcdDataExporterModule {}
