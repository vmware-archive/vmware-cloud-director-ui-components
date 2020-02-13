/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { BehaviorSubject } from 'rxjs';
import { TranslationService, TranslationSet } from './translation-service';
import { Observable } from 'rxjs';

/**
 * Interpolate a translation using regex.
 * @param translation the translation to use with positional interpolation points in braces -
 *                    e.g. 'Hello there, {0}.  My name is {1}.'
 * @param params array of interpolations, e.g. ['Brad', 'Janet']
 * @return the interpolated string, e.g. 'Hello there, Brad.  My name is Janet.'
 */
function interpolate(translation: string, params: string[]): string {
    params = params || [];
    return translation.replace(/{([0-9]+)}/g, (_, ...n) => {
        const idx = parseInt(n[0], 10);
        if (params && params[idx]) {
            return params[idx];
        }
        return '';
    });
}

/**
 * Basic translation service to implement ICU positional interpolation only.
 */
export class BasicTranslationService extends TranslationService {
    private translationSet: TranslationSet = {};

    constructor(private preferredLocale: string, protected fallbackLocale: string) {
        super();
    }

    /**
     * Merge translations into registry.
     * @param set new translations.
     */
    public registerTranslations(set: TranslationSet): void {
        for (const locale in set) {
            if (set[locale] !== undefined) {
                if (typeof this.translationSet[locale] === 'undefined') {
                    this.translationSet[locale] = {};
                }
                Object.assign(this.translationSet[locale], set[locale]);
            }
        }
    }

    /**
     * Translate a key with params.
     * If the key is missing from the preferred locale, try the fallback locale.
     * If the key is missing from the fallback locale, returns the key with ? prepended.
     * Otherwise interpolates the template.
     * @param key translation key
     * @param params array of subsitutions.
     * @return translated string.
     */
    public translate(key: string, params?: string[]): string {
        const template: string =
            this.translationSet[this.preferredLocale][key] || this.translationSet[this.fallbackLocale][key];
        if (template) {
            return interpolate(template, params);
        }
        return '?' + key;
    }

    translateAsync(key: string, params?: any[]): Observable<string> {
        return new BehaviorSubject(this.translate(key, params));
    }

    /**
     * Use Intl services to format date.
     * @param date date to format
     * @param options to specify the format of the date string.
     * If is not set, it will use internal default option for date.
     * @return formatted date.
     */
    public formatDate(date: Date, options: FormatDateOptions = this.defaultDateFormat): string {
        return new Intl.DateTimeFormat(this.preferredLocale, options).format(date);
    }

    /**
     * Use Intl services to format time.
     * @param date date to format
     * @param options to specify the format of the time string.
     * If is not set, it will use internal default option for time.
     * @return formatted time.
     */
    public formatTime(date: Date, options: FormatDateOptions = this.defaultTimeFormat): string {
        return new Intl.DateTimeFormat(this.preferredLocale, options).format(date);
    }

    /**
     * Use Intl services to format date and time.
     * @param date date to format
     * @param options to specify the format of the date and time string.
     * If is not set, it will use internal default default option for date and time.
     * @return formatted date and time.
     */
    public formatDateTime(date: Date, options: FormatDateOptions = this.defaultDateTimeFormat): string {
        return new Intl.DateTimeFormat(this.preferredLocale, options).format(date);
    }
}

/**
 * year - Specifies formatting of the year: "2-digit", "numeric". Default: undefined or "numeric"
 * month - Specifies formatting of the month: "2-digit", "numeric", "narrow", "short", "long".
 *         Default: undefined or "numeric"
 * day - Specifies formatting of the day: "2-digit", "numeric". Default: undefined or "numeric"
 * hour - Specifies formatting of the hour: "2-digit", "numeric". Default: undefined
 * minute - Specifies formatting of the minute: "2-digit", "numeric". Default: undefined
 * second - Specifies formatting of the second: "2-digit", "numeric". Default: undefined
 * hour12 - Specifies whether to use a 12-hour format for hours. Default: true (for 12-hour format),
 *          false (for 24-hour format)
 */
export interface FormatDateOptions {
    year?: string;
    month?: string;
    day?: string;
    hour?: string;
    minute?: string;
    second?: string;
    hour12?: boolean;
}
