/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TranslationService, TranslationSet } from './translation-service';

@Injectable()
class MockTranslationService extends TranslationService {
    preferredLocale: string;

    constructor() {
        super();
    }

    registerTranslations(set: TranslationSet): void {
        // Does nothing
    }

    getActiveLocale(): string {
        return this.preferredLocale;
    }

    translate(key: string, params?: any[]): string {
        return JSON.stringify({ key, params });
    }

    translateAsync(key: string, params?: any[]): Observable<string> {
        return new BehaviorSubject(this.translate(key, params));
    }

    formatNumber(number: number): string {
        return number.toLocaleString();
    }

    formatDate(date: Date): string {
        return date.toLocaleString();
    }

    formatTime(date: Date): string {
        return date.toLocaleString();
    }

    formatDateTime(date: Date): string {
        return date.toLocaleString();
    }
}

export { MockTranslationService };
