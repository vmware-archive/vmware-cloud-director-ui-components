/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { VcdActionMenuModule, VcdComponentsModule } from '@vcd/ui-components';
import { DatagridLinkExampleComponent } from './datagrid-link.example.component';

@NgModule({
    declarations: [DatagridLinkExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, VcdComponentsModule, VcdActionMenuModule],
    exports: [DatagridLinkExampleComponent],
    entryComponents: [DatagridLinkExampleComponent],
})
export class DatagridLinkExampleModule {}
