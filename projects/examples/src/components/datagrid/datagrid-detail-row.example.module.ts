/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { ComponentsModule } from '@vcd/ui-components';
import { DatagridDetailRowExampleComponent } from './datagrid-detail-row.example.component';

@NgModule({
    declarations: [DatagridDetailRowExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, ComponentsModule],
    exports: [DatagridDetailRowExampleComponent],
    entryComponents: [DatagridDetailRowExampleComponent],
})
export class DatagridDetailRowExampleModule {}
