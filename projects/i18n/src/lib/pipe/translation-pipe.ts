/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { PipeTransform, ChangeDetectorRef, Injectable, Pipe } from '@angular/core';
import { TranslationService } from '../service/translation-service';

/**
 * This pipe delegates translation to the translation service.  However, it also
 * marks itself for re-processing if it detects a translation refresh event.
 */
@Injectable()
@Pipe({
    name: 'translate',
    pure: false,
})
export class TranslationPipe implements PipeTransform {
    private value = '';
    private lastKey = '';
    private lastArgs: any[] = [];

    constructor(private translate: TranslationService, private changeDetector: ChangeDetectorRef) {}

    transform(key: string, ...params: any[]): any {
        /*
         TODO: As fancy as this is I don't think this function should make an array from the params.
         If we want to pass a variable length array of strings into this function it's hard to pipe in from a template.
         Example: {{alert.message.code | translate: alert.message.params}} does not work well here.
         */
        if (params && params.length && params[0] instanceof Array) {
            params = params[0];
        }
        if (!key || key.length === 0) {
            return key;
        }

        if (key === this.lastKey && params === this.lastArgs) {
            return this.value;
        }

        this.lastKey = key;
        this.lastArgs = params;
        this.updateValue(key, ...params);
        return this.value;
    }

    private updateValue(key: string, ...args: any[]): void {
        this.translate.translateAsync(key, args).subscribe(result => {
            this.value = result;
            this.changeDetector.markForCheck();
        });
    }
}
