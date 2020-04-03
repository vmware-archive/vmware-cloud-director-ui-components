/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ComponentsModule } from '@vcd/ui-components';
import { DatagridFilterExampleComponent } from './datagrid-filter.example.component';

@NgModule({
    declarations: [DatagridFilterExampleComponent],
    imports: [CommonModule, ClarityModule, ComponentsModule],
    exports: [DatagridFilterExampleComponent],
    entryComponents: [DatagridFilterExampleComponent],
})
export class DatagridFilterExampleModule {}
