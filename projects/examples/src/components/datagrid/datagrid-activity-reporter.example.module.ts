/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ComponentsModule } from '@vcd/ui-components';
import { DatagridActivityReporterExampleComponent } from './datagrid-activity-reporter.example.component';

@NgModule({
    declarations: [DatagridActivityReporterExampleComponent],
    imports: [CommonModule, ClarityModule, ComponentsModule],
    exports: [DatagridActivityReporterExampleComponent],
    entryComponents: [DatagridActivityReporterExampleComponent],
})
export class DatagridActivityReporterExampleModule {}
