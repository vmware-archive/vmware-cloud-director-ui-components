/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Pipe, PipeTransform } from '@angular/core';

const OBJECT_PROPERTY_SEPARATOR = '.';

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
    public transform<T>(item: any, property: string): string {
        if (!item || !property) {
            return null;
        }
        const splitProperty = property.split(OBJECT_PROPERTY_SEPARATOR);
        if (splitProperty.length > 1) {
            let value = item;
            for (const nestedProp of splitProperty) {
                if (value == null || typeof value === 'undefined' || typeof value[nestedProp] === 'undefined') {
                    return null;
                }
                value = value[nestedProp];
            }
            return value;
        } else {
            return item[property];
        }
    }
}
