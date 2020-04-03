/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { HttpClient } from '@angular/common/http';
import { ModuleWithProviders, Optional, Provider } from '@angular/core';
import { Inject, InjectionToken, NgModule } from '@angular/core';
import { TranslationLoader } from './loader/translation-loader';
import { DisplayTranslationPipe } from './pipe/display-translation.pipe';
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

const TRANSLATIONS_COMBINED = new InjectionToken('TRANSLATIONS_COMBINED');

/**
 * An implementation of {@link TranslationService} that can inject all of its dependencies.
 */
export class InjectedTranslationService extends MessageFormatTranslationService {
    constructor(
        @Inject(BOOTSTRAP_DETAILS) details: { locale: string },
        @Inject(TranslationLoader) @Optional() loader: TranslationLoader,
        @Inject(TRANSLATIONS_COMBINED) @Optional() combined: boolean
    ) {
        super(details.locale, 'en', loader, combined);
    }
}

/**
 * A module that mananges translation capabilites for the application.
 */
@NgModule({
    declarations: [DisplayTranslationPipe, FormatDateTimePipe, TranslationPipe],
    exports: [DisplayTranslationPipe, FormatDateTimePipe, TranslationPipe],
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
        return {
            ngModule: I18nModule,
            providers: !extensionRoute
                ? [
                      {
                          provide: TranslationService,
                          useClass: InjectedTranslationService,
                      },
                  ]
                : [
                      {
                          provide: TRANSLATIONS_COMBINED,
                          useValue: combined,
                      },
                      {
                          provide: TranslationLoader,
                          useClass: TranslationLoader,
                          deps: [HttpClient, extensionRoute],
                      },
                      {
                          provide: TranslationService,
                          useClass: InjectedTranslationService,
                      },
                  ],
        };
    }
}
