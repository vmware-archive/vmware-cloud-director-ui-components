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

const declarations = [];

/**
 * NOTE: The following two has to be exported otherwise the AoT compiler won't see it.
 */
/**
 * Token that makes the documentation jsons available to the following factory function.
 */
export const FOR_ROOT_DOCUMENTATIONS_TOKEN = new InjectionToken<CompodocSchema[]>(
    'DocLibModule.forRoot() CompoDocRetrieverService doc jsons.'
);

export function getCompoDocRetrieverService(documentations: CompodocSchema[]): DocumentationRetrieverService {
    return new CompoDocRetrieverService(documentations);
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
    public static forRoot(documentations: any[]): ModuleWithProviders {
        return {
            ngModule: DocLibModule,
            providers: [
                // For injecting 'documentations' into factory function, we have to first provide them as injectable.
                {
                    provide: FOR_ROOT_DOCUMENTATIONS_TOKEN,
                    useValue: documentations,
                },
                {
                    provide: DocumentationRetrieverService,
                    useFactory: getCompoDocRetrieverService,
                    deps: [FOR_ROOT_DOCUMENTATIONS_TOKEN],
                },
            ],
        };
    }
}
