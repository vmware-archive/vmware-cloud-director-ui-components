/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { DatagridModule } from '@vcd/ui-components';
import { DatagridRowIconExampleComponent, RowIconRendererComponent } from './datagrid-row-icon.example.component';

@NgModule({
    declarations: [DatagridRowIconExampleComponent, RowIconRendererComponent],
    imports: [CommonModule, ClarityModule, DatagridModule],
    exports: [DatagridRowIconExampleComponent],
    entryComponents: [DatagridRowIconExampleComponent, RowIconRendererComponent],
})
export class DatagridRowIconExampleModule {}
