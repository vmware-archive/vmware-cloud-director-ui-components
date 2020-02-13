/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    public getTranslation(language: string): Observable<object> {
        return this.http.get(`${this.assetUrl}${TranslationLoader.PREFIX}${language}${TranslationLoader.SUFFIX}`);
    }

    /**
     * Returns the translations for all languages that are located at the {@link assetUrl}.
     */
    public getCombinedTranslation(): Observable<object> {
        return this.http.get(`${this.assetUrl}/../i18n${TranslationLoader.SUFFIX}`);
    }
}
