/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
