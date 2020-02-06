/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { DatagridShowHideExampleComponent } from './datagrid-show-hide.example.component';
import { DatagridModule } from '@vcd/ui-components';

@NgModule({
    declarations: [DatagridShowHideExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, DatagridModule],
    exports: [DatagridShowHideExampleComponent],
    entryComponents: [DatagridShowHideExampleComponent],
})
export class DatagridShowHideExampleModule {}
