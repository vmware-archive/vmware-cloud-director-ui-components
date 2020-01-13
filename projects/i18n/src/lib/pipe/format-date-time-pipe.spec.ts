/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

/*
 * Copyright 2018-2019 VMware, Inc. All rights reserved. VMware Confidential
 */

import { PlatformUtil } from '../utils/platform-util';
import { formatDateStringToValidFormatForIE, FormatDateTimePipe } from './format-date-time-pipe';
import { MockTranslationService } from '../service/mock-translation-service';

describe('FormatDateTimePipe', () => {
    const dateString = '04/26/2018, 4:54:06 PM';
    const date = new Date();
    const formatOptions = {
        year: 2,
        month: '2-digit',
        day: '1-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };

    const dateStringInvalidForIE = '2018-11-06T14:30:45.301+0000';
    const dateStringValidForIE = '2018-11-06T14:30:45.301+00:00';
    const dateStringUTC = '2018-11-06T14:30:45.301Z';

    it('forward to translation service for string', () => {
        const translationService = new MockTranslationService();
        const subject = new FormatDateTimePipe(translationService);

        spyOn(translationService, 'formatDateTime').and.returnValue(date.toDateString());

        const result = subject.transform(dateString, formatOptions);
        expect(result).toBe(date.toDateString());
        expect(translationService.formatDateTime).toHaveBeenCalledWith(new Date(dateString), formatOptions);
    });

    it('forward to translation service for Date', () => {
        const translationService = new MockTranslationService();
        const subject = new FormatDateTimePipe(translationService);

        spyOn(translationService, 'formatDateTime').and.returnValue(date.toDateString());

        const result = subject.transform(new Date(dateString), formatOptions);
        expect(result).toBe(date.toDateString());
        expect(translationService.formatDateTime).toHaveBeenCalledWith(new Date(dateString), formatOptions);
    });

    describe('when the browser is IE11', () => {
        beforeEach(() => {
            spyOn(PlatformUtil.browser, 'isIE').and.returnValue('11');
        });

        it('formats the date string to valid IE format', () => {
            const ieFormattedDateString = formatDateStringToValidFormatForIE(dateStringInvalidForIE);
            expect(ieFormattedDateString).toEqual(dateStringValidForIE);
        });

        it('returns the date string if its format is UTC', () => {
            const ieFormattedDateString = formatDateStringToValidFormatForIE(dateStringUTC);
            expect(ieFormattedDateString).toEqual(dateStringUTC);
        });

        it('returns the date string if its format is valid for IE', () => {
            const ieFormattedDateString = formatDateStringToValidFormatForIE(dateStringValidForIE);
            expect(ieFormattedDateString).toEqual(dateStringValidForIE);
        });
    });
});
