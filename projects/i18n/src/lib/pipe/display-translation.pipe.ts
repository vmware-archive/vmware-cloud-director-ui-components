/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, Injectable, Pipe, PipeTransform } from '@angular/core';
import { TranslatedText, TranslationService } from '../service/translation-service';

/**
 * Displays the given {@link TranslatedText} to the page.
 */
@Injectable()
@Pipe({
    name: 'displayTranslation',
    pure: false,
})
export class DisplayTranslationPipe implements PipeTransform {
    constructor(private changeDetector: ChangeDetectorRef) {}

    transform(value: TranslatedText): any {
        if (typeof value === 'string') {
            return value;
        } else {
            return new AsyncPipe(this.changeDetector).transform(value);
        }
    }
}
