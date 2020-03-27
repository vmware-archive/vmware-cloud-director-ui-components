/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { OverviewViewerModule } from '../overview-viewer/overview-viewer.module';
import { SourceCodeViewerModule } from '../source-code-viewer/source-code-viewer.module';
import { ExampleViewerComponent } from './example-viewer.component';

const declarations = [ExampleViewerComponent];

@NgModule({
    imports: [ClarityModule, CommonModule, SourceCodeViewerModule, OverviewViewerModule],
    declarations: [...declarations],
    exports: [...declarations],
})
export class ExampleViewerModule {}
