/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { VcdComponentsModule } from '@vcd/ui-components';
import {
    DatagridDetailRowExampleComponent,
    DatagridDetailRowSubComponent,
    DatagridDetailRowSubNoLazyComponent,
} from './datagrid-detail-row.example.component';

@NgModule({
    declarations: [
        DatagridDetailRowExampleComponent,
        DatagridDetailRowSubComponent,
        DatagridDetailRowSubNoLazyComponent,
    ],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, VcdComponentsModule],
    exports: [DatagridDetailRowExampleComponent],
    entryComponents: [
        DatagridDetailRowExampleComponent,
        DatagridDetailRowSubComponent,
        DatagridDetailRowSubNoLazyComponent,
    ],
})
export class DatagridDetailRowExampleModule {}
