/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { ComponentsModule } from '@vcd/ui-components';
import { DatagridSortExampleComponent } from './datagrid-sort.example.component';

@NgModule({
    declarations: [DatagridSortExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, ComponentsModule],
    exports: [DatagridSortExampleComponent],
    entryComponents: [DatagridSortExampleComponent],
})
export class DatagridSortExampleModule {}
