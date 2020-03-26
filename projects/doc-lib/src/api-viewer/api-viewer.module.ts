/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ApiViewerComponent } from './api-viewer.component';

const declarations = [ApiViewerComponent];

@NgModule({
    imports: [ClarityModule, CommonModule],
    declarations: [...declarations],
    exports: [...declarations],
})
export class ApiViewerModule {}
