/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { DatagridModule } from '@vcd/ui-components';
import { DatagridDetailRowExampleComponent } from './datagrid-detail-row.example.component';

@NgModule({
    declarations: [DatagridDetailRowExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, DatagridModule],
    exports: [DatagridDetailRowExampleComponent],
    entryComponents: [DatagridDetailRowExampleComponent],
})
export class DatagridDetailRowExampleModule {}
