/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

export class CommonUtil {
    /**
     * Rounds number to given floating point, 2 by default.
     * @param value number from float data type
     * @param digits how many numbers will be shown after decimal point
     */
    static roundTo(value: number, digits: number = 2): number {
        if (!value) {
            value = 0;
        }
        return Number(Math.round(Number(value + 'e' + digits)) + 'e-' + digits);
    }
}
