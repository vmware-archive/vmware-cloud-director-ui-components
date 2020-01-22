/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CompodocSchema } from './compodoc/compodoc-schema';
import { DocumentationRetrieverService } from './documentation-retriever.service';
import { CompoDocRetrieverService } from './compodoc/compodoc-retriever.service';
import { PrismHighlightService } from './highlight/prism/prism-highlight.service';
import { HighlightService } from './highlight/highlight.service';
import { DocumentationContainerModule } from './documentation-container/documentation-container.module';
import { STACKBLITZ_INFO, StackBlitzInfo, StackBlitzWriterService } from './stack-blitz-writer.service';

const declarations = [];

/**
 * NOTE: The following two has to be exported otherwise the AoT compiler won't see it.
 */

/**
 * Token that makes the documentation JSONs available to the following factory function.
 */
export const DOCUMENTATION_DATA = new InjectionToken<CompodocSchema[]>(
    'DocLibModule.forRoot() CompoDocRetrieverService doc jsons.'
);

/**
 * Token that makes Stqckblitz JSON data available to factory functions
 */
export const STACKBLITZ_DATA = new InjectionToken<StackBlitzInfo>(
    'DocLibModule.forRoot() StackBlitz template JSON data'
);

export function getCompoDocRetrieverService(documentations: CompodocSchema[]): DocumentationRetrieverService {
    return new CompoDocRetrieverService(documentations);
}

export function getStackBlitzWriter(
    sbData: StackBlitzInfo,
    docRetrieverService: DocumentationRetrieverService
): StackBlitzWriterService {
    return new StackBlitzWriterService(sbData, docRetrieverService);
}

@NgModule({
    imports: [DocumentationContainerModule],
    declarations: [...declarations],
    exports: [...declarations, DocumentationContainerModule],
    providers: [{ provide: HighlightService, useClass: PrismHighlightService }],
})
export class DocLibModule {
    /**
     * Called in the host package importing this doc library for providing the documentation JSONs needed for
     * {@link CompoDocRetrieverService}
     */
    public static forRoot(documentations: CompodocSchema[], stackblitzData: StackBlitzInfo): ModuleWithProviders {
        return {
            ngModule: DocLibModule,
            providers: [
                // For injecting 'documentations' into factory function, we have to first provide them as injectable.
                {
                    provide: DOCUMENTATION_DATA,
                    useValue: documentations,
                },
                {
                    provide: STACKBLITZ_INFO,
                    useValue: stackblitzData,
                },
                {
                    provide: DocumentationRetrieverService,
                    useFactory: getCompoDocRetrieverService,
                    deps: [DOCUMENTATION_DATA],
                },
                {
                    provide: StackBlitzWriterService,
                    deps: [STACKBLITZ_DATA, DocumentationRetrieverService],
                    useFactory: getStackBlitzWriter,
                },
            ],
        };
    }
}
