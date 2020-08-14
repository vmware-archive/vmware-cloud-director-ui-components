/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import MessageFormat from 'messageformat';
import { combineLatest, Observable, of, ReplaySubject } from 'rxjs';
import { last, map } from 'rxjs/operators';
import { TranslationLoader } from '../loader/translation-loader';
import { FormatDateOptions, TRANSLATION_MAPPING, TranslationService, TranslationSet } from './translation-service';

/**
 * Translation service to implement ICU MessageFormat.
 */
export class MessageFormatTranslationService extends TranslationService {
    constructor(
        private preferredLocale: string,
        protected fallbackLocale: string,
        private translationLoader?: TranslationLoader,
        private combinedTranslations?: boolean
    ) {
        super();
        this.preferredLocale = TRANSLATION_MAPPING[this.preferredLocale] || this.preferredLocale;
        this.fallbackLocale = TRANSLATION_MAPPING[this.fallbackLocale] || this.fallbackLocale;
    }
    private translationSet: TranslationSet = {};
    private asyncTranslationSet = new ReplaySubject<TranslationSet>(1);
    /**
     * Merge translations into registry.
     * @param set new translations.
     */
    public registerTranslations(set?: TranslationSet): void {
        if (set) {
            for (const locale in set) {
                if (set[locale] !== undefined) {
                    if (typeof this.translationSet[locale] === 'undefined') {
                        this.translationSet[locale] = {};
                    }
                    Object.assign(this.translationSet[locale], set[locale]);
                }
            }
            this.asyncTranslationSet.next(this.translationSet);
        } else if (this.translationLoader) {
            let asyncTranslations: Observable<TranslationSet>;
            if (this.combinedTranslations) {
                asyncTranslations = this.translationLoader.getCombinedTranslation();
            } else {
                asyncTranslations = combineLatest([
                    this.translationLoader.getTranslation(this.preferredLocale),
                    this.translationLoader.getTranslation(this.fallbackLocale),
                ]).pipe(
                    map(([preferredTranslations, fallbackTranslations]) => ({
                        [this.preferredLocale]: preferredTranslations,
                        [this.fallbackLocale]: fallbackTranslations,
                    }))
                );
            }
            asyncTranslations.subscribe(translations => {
                if (typeof this.translationSet[this.preferredLocale] === 'undefined') {
                    this.translationSet[this.preferredLocale] = {};
                }
                if (typeof this.translationSet[this.fallbackLocale] === 'undefined') {
                    this.translationSet[this.fallbackLocale] = {};
                }
                Object.assign(this.translationSet[this.preferredLocale], translations[this.preferredLocale]);
                Object.assign(this.translationSet[this.fallbackLocale], translations[this.fallbackLocale]);
                this.asyncTranslationSet.next(translations);
            });
        } else {
            throw new Error('Need to supply translations!');
        }
    }

    /**
     * Translate a key with params.
     * If the key is missing from the preferred locale, try the fallback locale.
     * If the key is missing from the fallback locale, returns the key with ? prepended.
     * Otherwise uses message-format to format the string.
     * @param key translation key
     * @param params array of subsitutions. arrays can be of the form [a, b, c] for positional parameters
     *      or [{'key1': a, 'key2' b}]
     * @return translated string.
     */
    public translate(key: string, params?: any[]): string {
        const paramObject = params ? (params.length ? params[0] : {}) : {};
        if (paramObject !== null && typeof paramObject === 'object') {
            // Use the object of parameters
            return this.translateHelper(key, paramObject, this.translationSet);
        } else {
            // Use the array of parameters
            return this.translateHelper(key, params, this.translationSet);
        }
    }

    /**
     * Translate a key wih params using an observable return.
     * If te key is missing from the preferred locale, try the fallback locale.
     * If the key is missing from the fallback locale, returns the key with ? prepended.
     * Otherwise uses message-format to format the string.
     * @param key translation key
     * @param params array of subsitutions. arrays can be of the form [a, b, c] for positional parameters
     *      or [{'key1': a, 'key2' b}]
     * @return an observable of the translated string.
     */
    public translateAsync(key: string, params?: any[]): Observable<string> {
        const paramObject = params ? (params.length ? params[0] : {}) : {};
        if (paramObject !== null && typeof paramObject === 'object') {
            // Use the object of parameters
            return this.asyncTranslationSet.pipe(
                map(translations => this.translateHelper(key, paramObject, translations))
            );
        } else {
            // Use the array of parameters
            return this.asyncTranslationSet.pipe(map(translations => this.translateHelper(key, params, translations)));
        }
    }

    private translateHelper(key: string, params: any, translations: TranslationSet): string {
        if (translations[this.preferredLocale] && translations[this.preferredLocale][key]) {
            return this.formatString(this.preferredLocale, key, params, translations);
        } else if (translations[this.fallbackLocale] && translations[this.fallbackLocale][key]) {
            return this.formatString(this.fallbackLocale, key, params, translations);
        }
        return '?' + key;
    }

    private formatString(locale: string, key: string, translationMap: object, translations: TranslationSet): string {
        const template = translations[locale][key];
        const message = new MessageFormat(locale).compile(template);
        return message(translationMap);
    }

    /**
     * Use Intl services to format date.
     * @param date date to format
     * @param options to specify the format of the date string.
     * If is not set, it will use internal default option for date.
     * @return formatted date.
     */
    public formatDate(date: Date, options?: FormatDateOptions): string {
        if (options) {
            return new Intl.DateTimeFormat(this.preferredLocale, options).format(date);
        }
        return new Intl.DateTimeFormat(this.preferredLocale, this.defaultDateFormat).format(date);
    }

    /**
     * Use Intl services to format time.
     * @param date date to format
     * @param options to specify the format of the time string.
     * If is not set, it will use internal default option for time.
     * @return formatted time.
     */
    public formatTime(date: Date, options?: FormatDateOptions): string {
        if (options) {
            return new Intl.DateTimeFormat(this.preferredLocale, options).format(date);
        }
        return new Intl.DateTimeFormat(this.preferredLocale, this.defaultTimeFormat).format(date);
    }

    /**
     * Use Intl services to format date and time.
     * @param date date to format
     * @param options to specify the format of the date and time string.
     * If is not set, it will use internal default option for date and time.
     * @return formatted date and time.
     */
    public formatDateTime(date: Date, options?: FormatDateOptions): string {
        if (options) {
            return new Intl.DateTimeFormat(this.preferredLocale, options).format(date);
        }
        return new Intl.DateTimeFormat(this.preferredLocale, this.defaultDateTimeFormat).format(date);
    }
}
