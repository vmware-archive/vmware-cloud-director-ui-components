/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';

const OBJECT_PROPERTY_SEPARATOR = '.';
const DATE_OBJECT_CLASS = '[object Date]';

/**
 * Used for extracting the value of nested property of an object.
 *
 * Example:
 * const obj = {
 *     a: {
 *         b: {
 *             c: 'c'
 *         }
 *     }
 * }
 *
 * Invoking `{{ obj | nestedProperty: 'a.b.c' }}` in a template produces c
 */
@Pipe({
    name: 'nestedProperty',
    pure: true,
})
export class NestedPropertyPipe implements PipeTransform {
    constructor(@Inject(LOCALE_ID) private localeId: string) {}
    public transform<T>(item: any, property: string): string {
        if (!item || !property) {
            return null;
        }
        const splitProperty = property.split(OBJECT_PROPERTY_SEPARATOR);
        let returnValue;
        if (splitProperty.length > 1) {
            let value = item;
            for (const nestedProp of splitProperty) {
                if (isNullOrUndefined(value) || isNullOrUndefined(value[nestedProp])) {
                    return null;
                }
                value = value[nestedProp];
            }
            returnValue = value;
        } else {
            if (isNullOrUndefined(item[property])) {
                return null;
            }
            returnValue = item[property];
        }

        if (typeof returnValue === 'number') {
            return new DecimalPipe(this.localeId).transform(returnValue);
        }
        return returnValue instanceof Date ? new DatePipe(this.localeId).transform(returnValue) : returnValue;
    }
}

/**
 * Utility method for covering the 'null' and 'undefined' checks as 'value == null' is equivalent to 'value === null || value === undefined'
 */
function isNullOrUndefined(value: unknown): boolean {
    return value == null;
}
