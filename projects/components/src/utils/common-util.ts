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
    /**
     * To get a new copy of an object. Typically used inside unit tests to avoid mutating mock data used by multiple
     * tests
     */
    static getNewObj<T extends { [key: string]: any }>(obj: T): T {
        return { ...obj };
    }
}
