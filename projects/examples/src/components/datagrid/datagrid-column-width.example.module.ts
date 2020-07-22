/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { VcdComponentsModule } from '@vcd/ui-components';
import { DatagridColumnWidthExampleComponent } from './datagrid-column-width.example.component';

@NgModule({
    declarations: [DatagridColumnWidthExampleComponent],
    imports: [CommonModule, ClarityModule, VcdComponentsModule],
    exports: [DatagridColumnWidthExampleComponent],
    entryComponents: [DatagridColumnWidthExampleComponent],
})
export class DatagridColumnWidthExampleModule {}
