/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, Injectable, Pipe, PipeTransform } from '@angular/core';
import { from, Observable } from 'rxjs';

/**
 * The result of a call to either {@link TranslationService.translate} or {@link TranslationService.translateAsync}.
 */
export type LazyString = string | Observable<string> | Promise<string>;

/**
 * Displays the given {@link LazyString} to the page.
 */
@Injectable()
@Pipe({
    name: 'lazyString',
    pure: false,
})
export class LazyStringPipe implements PipeTransform {
    private pipe: AsyncPipe;

    constructor(private changeDetector: ChangeDetectorRef) {
        this.pipe = new AsyncPipe(this.changeDetector);
    }

    transform(value: LazyString): any {
        if (!value || typeof value === 'string') {
            return value;
        }
        if (isPromise(value)) {
            return this.pipe.transform(value);
        }
        return this.pipe.transform(value);
    }
}

function isPromise<R>(object: any): object is Promise<R> {
    return object.then !== undefined;
}
