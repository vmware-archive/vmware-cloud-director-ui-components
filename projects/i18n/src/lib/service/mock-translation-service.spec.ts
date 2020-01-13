/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { MockTranslationService } from './mock-translation-service';

describe('MockTranslationService', () => {
    const service = new MockTranslationService();

    it('uses the perferred local set', () => {
        service.preferredLocale = 'en';
        expect(service.activeLocale).toEqual('en');
    });

    it('formats dates using the default formatter', () => {
        expect(service.formatDate(new Date('1/1/1999'))).toEqual('1/1/1999, 12:00:00 AM');
        expect(service.formatTime(new Date('1/1/1999'))).toEqual('1/1/1999, 12:00:00 AM');
        expect(service.formatDateTime(new Date('1/1/1999'))).toEqual('1/1/1999, 12:00:00 AM');
    });
});
