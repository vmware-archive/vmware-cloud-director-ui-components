/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { DatagridModule } from '@vcd/ui-components';
import { DatagridRowSelectExampleComponent } from './datagrid-row-select.example.component';

@NgModule({
    declarations: [DatagridRowSelectExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, DatagridModule],
    exports: [DatagridRowSelectExampleComponent],
    entryComponents: [DatagridRowSelectExampleComponent],
})
export class DatagridRowSelectExampleModule {}
