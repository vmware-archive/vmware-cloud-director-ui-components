/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { HttpClient } from '@angular/common/http';
import { Injectable, LOCALE_ID, ModuleWithProviders, Optional } from '@angular/core';
import { Inject, InjectionToken, NgModule } from '@angular/core';
import { TranslationLoader } from './loader/translation-loader';
import { FormatDateTimePipe } from './pipe/format-date-time-pipe';
import { LazyStringPipe } from './pipe/lazy-string.pipe';
import { TranslationPipe } from './pipe/translation-pipe';
import { MessageFormatTranslationService } from './service/message-format-translation-service';
import { TranslationService } from './service/translation-service';

let singletonService: TranslationService = null;

export function genericSingletonFactory(locale: string): TranslationService {
    if (singletonService === null) {
        singletonService = new MessageFormatTranslationService(locale, 'en');
    }
    return singletonService;
}

/**
 * An implementation of {@link TranslationService} that can inject all of its dependencies.
 */
@Injectable()
export class InjectedTranslationService extends MessageFormatTranslationService {
    constructor(@Inject(LOCALE_ID) locale: string, @Inject(TranslationLoader) @Optional() loader: TranslationLoader) {
        super(locale, 'en', loader, false);
    }
}
/**
 * An implementation of {@link TranslationService} that can inject all of its dependencies
 * and has combined set to true.
 */
@Injectable()
export class CombinedInjectedTranslationService extends MessageFormatTranslationService {
    constructor(@Inject(LOCALE_ID) locale: string, @Inject(TranslationLoader) @Optional() loader: TranslationLoader) {
        super(locale, 'en', loader, true);
    }
}

const translationProvider = [{ provide: TranslationService, useClass: InjectedTranslationService }];

/**
 * A module that mananges translation capabilites for the application.
 */
@NgModule({
    declarations: [LazyStringPipe, FormatDateTimePipe, TranslationPipe],
    exports: [LazyStringPipe, FormatDateTimePipe, TranslationPipe],
})
export class I18nModule {
    /**
     * Creates a {@link I18nModule} using the global translation service.
     */
    static forRoot(): ModuleWithProviders<I18nModule> {
        return {
            ngModule: I18nModule,
            providers: [
                {
                    provide: TranslationService,
                    useFactory: genericSingletonFactory,
                    deps: [LOCALE_ID],
                },
            ],
        };
    }

    /**
     * Creates a {@link I18nModule} using a service that is independent from all other services.
     * @param extensionRoute the route translations are located at.
     * @param combined if the translations are in one file or many different files.
     */
    static forChild(
        extensionRoute?: string | InjectionToken<string>,
        combined?: boolean
    ): ModuleWithProviders<I18nModule> {
        return {
            ngModule: I18nModule,
            providers: !extensionRoute
                ? [translationProvider]
                : [
                      combined
                          ? {
                                provide: TranslationService,
                                useClass: CombinedInjectedTranslationService,
                            }
                          : translationProvider,
                      {
                          provide: TranslationLoader,
                          useClass: TranslationLoader,
                          deps: [HttpClient, extensionRoute],
                      },
                  ],
        };
    }
}
