/*!
 * Copyright 2022 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { VcdComponentsModule } from '@vcd/ui-components';
import { DatagridIsRowSelectableExampleComponent } from './datagrid-is-row-selectable-example.component';

@NgModule({
    declarations: [DatagridIsRowSelectableExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, VcdComponentsModule],
    exports: [DatagridIsRowSelectableExampleComponent],
    entryComponents: [DatagridIsRowSelectableExampleComponent],
})
export class DatagridIsRowSelectableExampleModule {}
