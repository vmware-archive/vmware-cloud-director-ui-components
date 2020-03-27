/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

/*
 * Copyright 2018-2019 VMware, Inc. All rights reserved. VMware Confidential
 */
import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../service/translation-service';
import { PlatformUtil } from '../utils/platform-util';

/**
 * This function modifies the timezone format in the provided date string in order to work in IE11
 *  (ex. from :+0000 to +00:00)
 * @param dateStr The provided date string
 *  (Complete date plus hours, minutes, seconds, a decimal fraction of a second and timezone, YYYY-MM-DDThh:mm:ss.sTZD
 * @returns The modified date string
 *  (Complete date plus hours, minutes, seconds, a decimal fraction of a second and timezone YYYY-MM-DDThh:mm:ss.sTZD)
 */
export function formatDateStringToValidFormatForIE(dateStr: string): string {
    if (!PlatformUtil.browser.isIE) {
        return dateStr;
    }

    // If the format is UTC (Coordinated Universal Time), with a special UTC designator ("Z")
    if (dateStr.substr(-1) === 'Z') {
        return dateStr;
    }

    // If the timezone format is correct (ex.: +00:00)
    if (dateStr.charAt(dateStr.length - 3) === ':') {
        return dateStr;
    }

    return `${dateStr.substr(0, dateStr.length - 2)}:${dateStr.substr(-2)}`;
}

/**
 * This pipe delegates format of DateTime to the translation service.  However, it also
 * marks itself for re-processing if it detects a translation refresh event.
 */
@Injectable()
@Pipe({
    name: 'formatDateTime',
    pure: true,
})
export class FormatDateTimePipe implements PipeTransform {
    constructor(private service: TranslationService) {}

    /**
     * Pipe the dateTime into the pipe.
     * @param dateTime dateTime to be formatted
     * @param options determinate how date should be formatted
     */
    transform(dateTime: string | Date, options?: object): any {
        if (!dateTime) {
            return this.service.formatDateTime(new Date(), options);
        }

        if (dateTime instanceof Date) {
            return this.service.formatDateTime(dateTime, options);
        }

        const dateString = formatDateStringToValidFormatForIE(dateTime);

        return this.service.formatDateTime(new Date(dateString), options);
    }
}
