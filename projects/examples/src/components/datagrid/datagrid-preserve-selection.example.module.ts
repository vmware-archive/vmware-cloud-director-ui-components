/*!
 * Copyright 2023 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { VcdComponentsModule } from '@vcd/ui-components';
import { DatagridPreserveSelectionExampleComponent } from './datagrid-preserve-selection.example.component';

@NgModule({
    declarations: [DatagridPreserveSelectionExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, VcdComponentsModule],
    exports: [DatagridPreserveSelectionExampleComponent],
})
export class DatagridPreserveSelectionExampleModule {}
