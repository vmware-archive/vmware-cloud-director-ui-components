/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { MockTranslationService } from './mock-translation-service';
import { TranslationService } from './translation-service';
import { CanTranslate } from './translation-service.mixin';

describe('CanTranslate', () => {
    it('allows a class to directly translate', () => {
        const mock = new MockTranslationService();
        const spy = spyOn(mock, 'translate');
        const test = new CanTranslateTest(mock);
        test.translate('hello');
        expect(spy).toHaveBeenCalledWith('hello', undefined);
    });

    it('allows a class to async translate', () => {
        const mock = new MockTranslationService();
        const spy = spyOn(mock, 'translateAsync');
        const test = new CanTranslateTest(mock);
        test.translateAsync('hello');
        expect(spy).toHaveBeenCalledWith('hello', undefined);
    });
});

class CanTranslateTest extends CanTranslate(class {}) {
    constructor(public translationService: TranslationService) {
        super();
    }
}
