/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ComponentsModule } from '@vcd/ui-components';
import { DatagridCssClassesExampleComponent } from './datagrid-css-classes.example.component';

@NgModule({
    declarations: [DatagridCssClassesExampleComponent],
    imports: [CommonModule, ClarityModule, ComponentsModule],
    exports: [DatagridCssClassesExampleComponent],
    entryComponents: [DatagridCssClassesExampleComponent],
})
export class DatagridCssClassesExampleModule {}
