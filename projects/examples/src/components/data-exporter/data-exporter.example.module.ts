/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { DataExporterExampleComponent } from './data-exporter.example.component';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { DataExporterModule } from '@vcd/ui-components';

@NgModule({
    declarations: [DataExporterExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, DataExporterModule],
    exports: [DataExporterExampleComponent],
    entryComponents: [DataExporterExampleComponent],
})
export class DataExporterExampleModule {}
