/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { VcdComponentsModule } from '@vcd/ui-components';
import { DatagridFilterExampleComponent } from './datagrid-filter.example.component';

@NgModule({
    declarations: [DatagridFilterExampleComponent],
    imports: [CommonModule, ClarityModule, VcdComponentsModule],
    exports: [DatagridFilterExampleComponent],
})
export class DatagridFilterExampleModule {}
