/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { DataExporterModule } from '@vcd/ui-components';
import { DataExporterExampleComponent } from './data-exporter.example.component';

@NgModule({
    declarations: [DataExporterExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, DataExporterModule],
    exports: [DataExporterExampleComponent],
    entryComponents: [DataExporterExampleComponent],
})
export class DataExporterExampleModule {}
