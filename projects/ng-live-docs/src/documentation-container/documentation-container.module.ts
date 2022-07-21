/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { ApiViewerModule } from '../api-viewer/api-viewer.module';
import { ExampleViewerModule } from '../example-viewer/example-viewer.module';
import { OverviewViewerModule } from '../overview-viewer/overview-viewer.module';
import { DocumentationContainerApiComponent } from './documentation-container-api.component';
import { DocumentationContainerDocumentationComponent } from './documentation-container-documentation.component';
import { DocumentationContainerExampleComponent } from './documentation-container-example.component';
import { DocumentationContainerComponent } from './documentation-container.component';

const declarations = [
    DocumentationContainerComponent,
    DocumentationContainerDocumentationComponent,
    DocumentationContainerApiComponent,
    DocumentationContainerExampleComponent,
];

@NgModule({
    imports: [ClarityModule, CommonModule, OverviewViewerModule, ApiViewerModule, ExampleViewerModule, RouterModule],
    declarations: [...declarations],
    exports: [...declarations, OverviewViewerModule, ApiViewerModule, ExampleViewerModule],
})
export class DocumentationContainerModule {}
