/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { VcdComponentsModule } from '@vcd/ui-components';
import { DatagridActionDisplayExampleComponent } from './datagrid-action-display.example.component';

@NgModule({
    declarations: [DatagridActionDisplayExampleComponent],
    imports: [CommonModule, ClarityModule, VcdComponentsModule],
    exports: [DatagridActionDisplayExampleComponent],
    entryComponents: [DatagridActionDisplayExampleComponent],
})
export class DatagridActionDisplayExampleModule {}
