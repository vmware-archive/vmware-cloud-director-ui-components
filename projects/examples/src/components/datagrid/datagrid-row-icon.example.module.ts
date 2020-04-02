/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ComponentsModule } from '@vcd/ui-components';
import { DatagridRowIconExampleComponent, RowIconRendererComponent } from './datagrid-row-icon.example.component';

@NgModule({
    declarations: [DatagridRowIconExampleComponent, RowIconRendererComponent],
    imports: [CommonModule, ClarityModule, ComponentsModule],
    exports: [DatagridRowIconExampleComponent],
    entryComponents: [DatagridRowIconExampleComponent, RowIconRendererComponent],
})
export class DatagridRowIconExampleModule {}
