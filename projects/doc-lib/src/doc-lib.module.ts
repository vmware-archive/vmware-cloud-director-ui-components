/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { DocumentationContainerComponent } from './documentation-container/documentation-container.component';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { CompodocSchema } from './compodoc/compodoc-schema';
import { DocumentationRetrieverService } from './documentation-retriever.service';
import { CompoDocRetrieverService } from './compodoc/compodoc-retriever.service';
import { OverviewViewerComponent } from './overview-viewer/overview-viewer.component';
import { ApiViewerComponent } from './api-viewer/api-viewer.component';
import { ExampleViewerComponent } from './example-viewer/example-viewer.component';
import { SourceCodeViewerComponent } from './source-code-viewer/source-code-viewer.component';
import { HighlightService } from './highlight/highlight.service';
import { PrismHighlightService } from './highlight/prism/prism-highlight.service';

const declarations = [
    DocumentationContainerComponent,
    OverviewViewerComponent,
    ApiViewerComponent,
    ExampleViewerComponent,
    SourceCodeViewerComponent,
];

@NgModule({
    imports: [ClarityModule, CommonModule],
    declarations: [...declarations],
    entryComponents: [DocumentationContainerComponent],
    exports: [...declarations],
    providers: [{ provide: HighlightService, useClass: PrismHighlightService }],
})
export class DocLibModule {
    /**
     * Called in the host package importing this doc library for providing the documentation JSONs needed for
     * {@link CompoDocRetrieverService}
     */
    public static forRoot(documentations: CompodocSchema[]): ModuleWithProviders {
        return {
            ngModule: DocLibModule,
            providers: [
                { provide: DocumentationRetrieverService, useValue: new CompoDocRetrieverService(documentations) },
            ],
        };
    }
}
