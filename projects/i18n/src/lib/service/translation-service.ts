/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Injectable } from '@angular/core';
import DateTimeFormatOptions = Intl.DateTimeFormatOptions;
import { Observable } from 'rxjs';

/**
 * Basic translations.
 */
export interface Translations {
    [key: string]: string;
}

/**
 * A set of translations.
 */
export interface TranslationSet {
    [locale: string]: Translations;
}

/**
 * The result of a call to either {@link TranslationService.translate} or {@link TranslationService.translateAsync}.
 */
export type TranslatedText = string | Observable<string>;

/**
 * Basic translation service to implement ICU positional interpolation only.
 */
@Injectable()
abstract class TranslationService {
    /**
     * Options to format Date.
     */
    protected readonly defaultDateFormat: DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };

    /**
     * Options to format Time.
     */
    protected readonly defaultTimeFormat: DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    };

    /**
     * Options to format Date and Time.
     */
    protected readonly defaultDateTimeFormat: DateTimeFormatOptions = {
        ...this.defaultDateFormat,
        ...this.defaultTimeFormat,
    };

    /**
     * Register translations (used by moådules)
     */
    abstract registerTranslations(set?: TranslationSet): void;

    /**
     * Translate a key with params and gives an observable that outputs when the translation is available.
     * @param key translation key
     * @param params array of substitutions.
     * @return observable that will update as the translations become available.
     */
    abstract translateAsync(key: string, params?: any[]): Observable<string>;

    /**
     * Translate a key with params. Requires that the translations have already been loaded.
     * @param key translation key
     * @param params array of substitutions.
     * @return translated string.
     */
    abstract translate(key: string, params?: any[]): string;

    /**
     * Format a date with current locale.
     * @param date date
     * @param options to specify the format of the date string.
     * @return formatted date.
     */
    abstract formatDate(date: Date, options?: object): string;

    /**
     * Format a time with current locale.
     * @param date date
     * @param options to specify the format of the time string.
     * @return formatted time.
     */
    abstract formatTime(date: Date, options?: object): string;

    /**
     * Format a date and time with current locale.
     * @param date date
     * @param options to specify the format of the date and time string.
     * @return formatted date and time.
     */
    abstract formatDateTime(date: Date, options?: object): string;
}

export { TranslationService };
