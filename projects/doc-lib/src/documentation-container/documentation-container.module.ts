/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { DocumentationContainerComponent } from './documentation-container.component';
import { OverviewViewerModule } from '../overview-viewer/overview-viewer.module';
import { ExampleViewerModule } from '../example-viewer/example-viewer.module';
import { ApiViewerModule } from '../api-viewer/api-viewer.module';

const declarations = [DocumentationContainerComponent];

@NgModule({
    imports: [ClarityModule, CommonModule, OverviewViewerModule, ApiViewerModule, ExampleViewerModule],
    declarations: [...declarations],
    entryComponents: [DocumentationContainerComponent],
    exports: [...declarations, OverviewViewerModule, ApiViewerModule, ExampleViewerModule],
})
export class DocumentationContainerModule {}
