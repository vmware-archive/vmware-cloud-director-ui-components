/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ComponentsModule } from '@vcd/ui-components';
import { DatagridThreeRenderersExampleComponent } from './datagrid-three-renderers.example.component';

@NgModule({
    declarations: [DatagridThreeRenderersExampleComponent],
    imports: [CommonModule, ClarityModule, ComponentsModule],
    exports: [DatagridThreeRenderersExampleComponent],
    entryComponents: [DatagridThreeRenderersExampleComponent],
})
export class DatagridThreeRenderersExampleModule {}
