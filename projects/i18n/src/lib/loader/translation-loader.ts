/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class TranslationLoader {
    private static PREFIX = '/i18n/';
    private static SUFFIX = '.json';

    constructor(private http: HttpClient, private assetUrl: string) {}

    public getTranslation(language: string): Observable<object> {
        return this.http.get(`${this.assetUrl}${TranslationLoader.PREFIX}${language}${TranslationLoader.SUFFIX}`);
    }

    public getCombinedTranslation(): Observable<object> {
        return this.http.get(`${this.assetUrl}/../i18n${TranslationLoader.SUFFIX}`);
    }
}
