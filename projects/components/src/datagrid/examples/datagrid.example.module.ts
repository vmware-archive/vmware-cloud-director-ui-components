/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowHideDatagridExampleComponent } from './show-hide-datagrid.example.component';
import { DatagridModule } from '../../public-api';

/**
 * A module that contains components that are various examples of features of the datagrid.
 */
@NgModule({
    declarations: [ShowHideDatagridExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, DatagridModule],
    exports: [ShowHideDatagridExampleComponent],
    entryComponents: [ShowHideDatagridExampleComponent],
})
export class DatagridExamplesModule {}
