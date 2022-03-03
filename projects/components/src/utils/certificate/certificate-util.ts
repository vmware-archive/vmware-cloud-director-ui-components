/*!
 * Copyright 2022 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import dayjs from 'dayjs';

/**
 * Preselection modes for the certificate chain tree details.
 */
export const PRESELECTION_MODE_ROOT = 0;
export const PRESELECTION_MODE_LEAF = 1;

/**
 * Utilities for Certificates.
 */
export class CertificateUtil {
    /**
     * Checks if the specified certificate valid to date is in the past.
     * @param validTo the Date to which the certificate is valid.
     *
     * @returns true in case the certificate is already expired.
     */
    public static isExpired(validTo: Date): boolean {
        return dayjs(validTo).isBefore(dayjs());
    }

    /**
     * Checks if the specified certificate valid to date is in one week from now.
     * @param validTo the Date to which the certificate is valid.
     *
     * @returns true in case the certificate is about to expire in the next week.
     */
    public static isExpiringInWeekNow(validTo: Date): boolean {
        const weekFromNow = dayjs().add(7, 'days');

        return this.isSameOrBefore(validTo, weekFromNow);
    }

    /**
     * Checks if the specified certificate valid to date is in one month from now.
     * @param validTo the Date to which the certificate is valid.
     *
     * @returns true in case the certificate is about to expire in the next month.
     */
    public static isExpiringInMonthNow(validTo: Date): boolean {
        const monthFromNow: dayjs.Dayjs = dayjs().add(1, 'month');

        return this.isSameOrBefore(validTo, monthFromNow);
    }

    public static validateToAndFrom(from: Date, to: Date): Boolean {
        if (!dayjs(from).isBefore(dayjs())) {
            return false;
        } else if (!dayjs(to).isAfter(dayjs())) {
            return false;
        }

        return true;
    }

    private static isSameOrBefore(validTo: Date, dateToCheck: dayjs.Dayjs): boolean {
        const dayjsValidTo = dayjs(validTo);

        return dayjsValidTo.isSame(dateToCheck) || dayjsValidTo.isBefore(dateToCheck);
    }
}
