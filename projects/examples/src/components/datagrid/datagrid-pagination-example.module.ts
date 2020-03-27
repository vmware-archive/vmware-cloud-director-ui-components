/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { DatagridModule } from '@vcd/ui-components';
import { DatagridPaginationExampleComponent } from './datagrid-pagination-example.component';

@NgModule({
    declarations: [DatagridPaginationExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, DatagridModule],
    exports: [DatagridPaginationExampleComponent],
    entryComponents: [DatagridPaginationExampleComponent],
})
export class DatagridPagionationExampleModule {}
