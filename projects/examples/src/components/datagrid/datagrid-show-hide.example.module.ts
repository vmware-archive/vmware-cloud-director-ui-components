/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { DatagridModule } from '@vcd/ui-components';
import { DatagridShowHideExampleComponent } from './datagrid-show-hide.example.component';

@NgModule({
    declarations: [DatagridShowHideExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, DatagridModule],
    exports: [DatagridShowHideExampleComponent],
    entryComponents: [DatagridShowHideExampleComponent],
})
export class DatagridShowHideExampleModule {}
