/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { VcdActionMenuModule, VcdComponentsModule } from '@vcd/ui-components';
import { DatagridActionMenuTrackingExampleComponent } from './datagrid-action-menu-tracking-example.component';

@NgModule({
    declarations: [DatagridActionMenuTrackingExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, VcdComponentsModule, VcdActionMenuModule],
    exports: [DatagridActionMenuTrackingExampleComponent],
    entryComponents: [DatagridActionMenuTrackingExampleComponent],
})
export class DatagridActionMenuTrackerExampleModule {}
