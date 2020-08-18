/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Translations, TranslationSet } from '../service/translation-service';

/**
 * A HTTP loader that can load translations from some assetUrl.
 */
export class TranslationLoader {
    private static PREFIX = '/i18n/';
    private static SUFFIX = '.json';

    /**
     * Constructs the loader to load resources from the given {@link assetUrl}.
     */
    constructor(private http: HttpClient, private assetUrl: string) {}

    /**
     * Returns the translations for the given language that are located at the {@link assetUrl}.
     */
    public getTranslation(language: string): Observable<Translations> {
        const url = `${this.assetUrl}${TranslationLoader.PREFIX}${language}${TranslationLoader.SUFFIX}`;
        return ((this.http.get(url) as any) as Observable<Translations>).pipe(
            catchError((error, caught) => {
                console.log('Could not find translation file located at ' + url);
                return of({});
            })
        );
    }

    /**
     * Returns the translations for all languages that are located at the {@link assetUrl}.
     */
    public getCombinedTranslation(): Observable<TranslationSet> {
        const url = `${this.assetUrl}/../i18n${TranslationLoader.SUFFIX}`;
        return ((this.http.get(url) as any) as Observable<TranslationSet>).pipe(
            catchError((error, caught) => {
                console.log('Could not find translation file located at ' + url);
                return of({});
            })
        );
    }
}
