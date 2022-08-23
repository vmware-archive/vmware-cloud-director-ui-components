/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { VcdComponentsModule } from '@vcd/ui-components';
import { DatagridThreeRenderersExampleComponent } from './datagrid-three-renderers.example.component';

@NgModule({
    declarations: [DatagridThreeRenderersExampleComponent],
    imports: [CommonModule, ClarityModule, VcdComponentsModule],
    exports: [DatagridThreeRenderersExampleComponent],
})
export class DatagridThreeRenderersExampleModule {}
