/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { DatagridModule } from '@vcd/ui-components';
import { DatagridSortExampleComponent } from './datagrid-sort.example.component';

@NgModule({
    declarations: [DatagridSortExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, DatagridModule],
    exports: [DatagridSortExampleComponent],
    entryComponents: [DatagridSortExampleComponent],
})
export class DatagrilSortExampleModule {}
