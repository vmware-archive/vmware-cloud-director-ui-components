/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { VcdComponentsModule } from '@vcd/ui-components';
import { DatagridHeaderExampleComponent } from './datagrid-header.example.component';

@NgModule({
    declarations: [DatagridHeaderExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, VcdComponentsModule],
    exports: [DatagridHeaderExampleComponent],
    entryComponents: [DatagridHeaderExampleComponent],
})
export class DatagridHeaderExampleModule {}
