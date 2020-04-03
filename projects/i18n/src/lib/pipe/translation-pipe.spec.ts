/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MockTranslationService } from '../service/mock-translation-service';
import { TranslationService } from '../service/translation-service';
import { TranslationPipe } from './translation-pipe';

class GeneralTranslationPipe extends TranslationPipe {
    constructor(service: TranslationService, myChangeRef: ChangeDetectorRef) {
        super(service, myChangeRef);
    }
}

const changeRef = {
    markForCheck: () => {},
};

describe('TranslationPipe', () => {
    it('should forward to translation service', () => {
        const translationService = new MockTranslationService();
        const subject = new GeneralTranslationPipe(translationService, changeRef as ChangeDetectorRef);
        const observable = new BehaviorSubject('?test.translation');
        spyOn(translationService, 'translateAsync').and.returnValue(observable);
        expect(subject.transform('test.translation', 'one', 'two', 'three')).toBe('?test.translation');
        observable.next('Hi doctor nick!');
        expect(subject.transform('test.translation', 'one', 'two', 'three')).toBe('Hi doctor nick!');
        expect(translationService.translateAsync).toHaveBeenCalledWith('test.translation', ['one', 'two', 'three']);
    });
});
