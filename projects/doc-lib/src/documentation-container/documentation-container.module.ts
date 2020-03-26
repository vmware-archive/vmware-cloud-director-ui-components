/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ApiViewerModule } from '../api-viewer/api-viewer.module';
import { ExampleViewerModule } from '../example-viewer/example-viewer.module';
import { OverviewViewerModule } from '../overview-viewer/overview-viewer.module';
import { DocumentationContainerComponent } from './documentation-container.component';

const declarations = [DocumentationContainerComponent];

@NgModule({
    imports: [ClarityModule, CommonModule, OverviewViewerModule, ApiViewerModule, ExampleViewerModule],
    declarations: [...declarations],
    entryComponents: [DocumentationContainerComponent],
    exports: [...declarations, OverviewViewerModule, ApiViewerModule, ExampleViewerModule],
})
export class DocumentationContainerModule {}
