/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { VcdComponentsModule } from '@vcd/ui-components';
import { DatagridCliptextExampleComponent } from './datagrid-cliptext.example.component';

@NgModule({
    declarations: [DatagridCliptextExampleComponent],
    imports: [CommonModule, ClarityModule, VcdComponentsModule],
    exports: [DatagridCliptextExampleComponent],
})
export class DatagridCliptextExampleModule {}
