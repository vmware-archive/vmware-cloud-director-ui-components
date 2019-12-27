/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Pipe, PipeTransform } from '@angular/core';

/**
 * Used for executing the functions of column cells which use functions to calculate their values from different
 * properties of an object
 */
@Pipe({
    name: 'functionRenderer',
    pure: true,
})
export class FunctionRendererPipe implements PipeTransform {
    public transform(item: any, renderer: (val: any) => any): string {
        if (!item || !renderer) {
            return null;
        }
        return renderer(item);
    }
}
