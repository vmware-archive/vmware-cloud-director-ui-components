/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { HttpClient } from '@angular/common/http';
import { ModuleWithProviders, Optional, Provider } from '@angular/core';
import { Inject, InjectionToken, NgModule } from '@angular/core';
import { TranslationLoader } from './loader/translation-loader';
import { FormatDateTimePipe } from './pipe/format-date-time-pipe';
import { TranslationPipe } from './pipe/translation-pipe';
import { MessageFormatTranslationService } from './service/message-format-translation-service';
import { TranslationService } from './service/translation-service';
import { BOOTSTRAP_DETAILS } from './utils/tokens';

let singletonService: TranslationService = null;

export function genericSingletonFactory(details: { locale: string }): TranslationService {
    if (singletonService === null) {
        singletonService = new MessageFormatTranslationService(details.locale, 'en');
    }
    return singletonService;
}

/**
 * A module that mananges translation capabilites for the application.
 */
@NgModule({
    declarations: [TranslationPipe, FormatDateTimePipe],
    exports: [FormatDateTimePipe, TranslationPipe],
})
export class I18nModule {
    /**
     * Creates a {@link I18nModule} using the global translation service.
     */
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: I18nModule,
            providers: [
                {
                    provide: TranslationService,
                    useFactory: genericSingletonFactory,
                    deps: [BOOTSTRAP_DETAILS],
                },
            ],
        };
    }

    /**
     * Creates a {@link I18nModule} using a service that is independent from all other services.
     * @param extensionRoute the route translations are located at.
     * @param combined if the translations are in one file or many different files.
     */
    static forChild(extensionRoute?: InjectionToken<string>, combined?: boolean): ModuleWithProviders {
        /**
         * An implementation of {@link TranslationService} that can inject all of its dependencies.
         */
        class ServiceToUse extends MessageFormatTranslationService {
            constructor(@Inject(BOOTSTRAP_DETAILS) details: { locale: string }, @Optional() loader: TranslationLoader) {
                super(details.locale, 'en', loader, combined);
            }
        }

        const providers: Provider[] = [
            {
                provide: TranslationService,
                useClass: ServiceToUse,
            },
        ];
        // Provide the translation loader if the user provides a URL where the translations should be loaded from.
        if (extensionRoute) {
            providers.push({
                provide: TranslationLoader,
                useFactory: (client: HttpClient, route: string) => {
                    return new TranslationLoader(client, route);
                },
                deps: [HttpClient, extensionRoute],
            });
        }
        return {
            ngModule: I18nModule,
            providers,
        };
    }
}
