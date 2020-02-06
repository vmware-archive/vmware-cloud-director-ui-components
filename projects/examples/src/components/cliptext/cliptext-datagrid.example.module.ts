/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CliptextDatagridExampleComponent } from './cliptext-datagrid.example.component';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CliptextModule } from '@vcd/ui-components';

@NgModule({
    declarations: [CliptextDatagridExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, CliptextModule],
    exports: [CliptextDatagridExampleComponent],
    entryComponents: [CliptextDatagridExampleComponent],
})
export class CliptextDatagridExampleModule {}
