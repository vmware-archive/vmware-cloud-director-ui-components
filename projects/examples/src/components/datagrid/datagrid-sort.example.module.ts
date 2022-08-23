/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { VcdComponentsModule } from '@vcd/ui-components';
import { DatagridSortExampleComponent } from './datagrid-sort.example.component';

@NgModule({
    declarations: [DatagridSortExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, VcdComponentsModule],
    exports: [DatagridSortExampleComponent],
})
export class DatagridSortExampleModule {}
