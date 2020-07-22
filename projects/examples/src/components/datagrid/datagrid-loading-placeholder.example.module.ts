/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { VcdComponentsModule } from '@vcd/ui-components';
import { DatagridLoadingPlaceholderExampleComponent } from './datagrid-loading-placeholder.example.component';

@NgModule({
    declarations: [DatagridLoadingPlaceholderExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, VcdComponentsModule],
    exports: [DatagridLoadingPlaceholderExampleComponent],
    entryComponents: [DatagridLoadingPlaceholderExampleComponent],
})
export class DatagridLoadingPlaceholderExampleModule {}
