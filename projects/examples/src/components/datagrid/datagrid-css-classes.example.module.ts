/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { DatagridModule } from '@vcd/ui-components';
import { DatagridCssClassesExampleComponent } from './datagrid-css-classes.example.component';

@NgModule({
    declarations: [DatagridCssClassesExampleComponent],
    imports: [CommonModule, ClarityModule, DatagridModule],
    exports: [DatagridCssClassesExampleComponent],
    entryComponents: [DatagridCssClassesExampleComponent],
})
export class DatagridCssClassesExampleModule {}