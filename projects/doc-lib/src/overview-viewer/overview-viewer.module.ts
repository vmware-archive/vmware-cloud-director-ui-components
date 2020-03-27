/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { OverviewViewerComponent } from './overview-viewer.component';

const declarations = [OverviewViewerComponent];

@NgModule({
    imports: [ClarityModule, CommonModule],
    declarations: [...declarations],
    exports: [...declarations],
})
export class OverviewViewerModule {}
