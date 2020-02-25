/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { DatagridModule } from '@vcd/ui-components';
import { DatagridFilterExampleComponent } from './datagrid-filter.example.component';

@NgModule({
    declarations: [DatagridFilterExampleComponent],
    imports: [CommonModule, ClarityModule, DatagridModule],
    exports: [DatagridFilterExampleComponent],
    entryComponents: [DatagridFilterExampleComponent],
})
export class DatagridFilterExampleModule {}
