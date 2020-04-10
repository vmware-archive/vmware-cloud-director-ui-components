/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Type } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslationService } from './translation-service';

// tslint:disable-next-line: typedef
export function CanTranslate<TBase extends Type<{}>>(Base: TBase) {
    abstract class Temp extends Base {
        abstract translationService: TranslationService;
        /**
         * Translate a key with params and gives an observable that outputs when the translation is available.
         * @param key translation key
         * @param params array of substitutions.
         * @return observable that will update as the translations become available.
         */
        translateAsync(key: string, params?: any[]): Observable<string> {
            return this.translationService.translateAsync(key, params);
        }

        /**
         * Translate a key with params. Requires that the translations have already been loaded.
         * @param key translation key
         * @param params array of substitutions.
         * @return translated string.
         */
        translate(key: string, params?: any[]): string {
            return this.translationService.translate(key, params);
        }
    }
    return Temp;
}
