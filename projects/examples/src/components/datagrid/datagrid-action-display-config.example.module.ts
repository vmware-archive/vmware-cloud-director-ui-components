/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { VcdComponentsModule } from '@vcd/ui-components';
import { DatagridActionDisplayConfigExampleComponent } from './datagrid-action-display-config.example.component';

@NgModule({
    declarations: [DatagridActionDisplayConfigExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, VcdComponentsModule],
    exports: [DatagridActionDisplayConfigExampleComponent],
})
export class DatagridActionDisplayConfigExampleModule {}
