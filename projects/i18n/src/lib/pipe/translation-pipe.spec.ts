/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { ChangeDetectorRef } from '@angular/core';
import { MockTranslationService } from '../service/mock-translation-service';
import { TranslationPipe } from './translation-pipe';
import { TranslationService } from '../service/translation-service';
import { BehaviorSubject } from 'rxjs';

class GeneralTranslationPipe extends TranslationPipe {
    constructor(service: TranslationService, myChangeRef: ChangeDetectorRef) {
        super(service, myChangeRef);
    }
}

class MockChangeDetectorRef extends ChangeDetectorRef {
    constructor() {
        super();
    }

    markForCheck(): void {
        throw new Error('Unimplemented');
    }

    detach(): void {
        throw new Error('Unimplemented');
    }

    detectChanges(): void {
        throw new Error('Unimplemented');
    }

    checkNoChanges(): void {
        throw new Error('Unimplemented');
    }

    reattach(): void {
        throw new Error('Unimplemented');
    }
}

const changeRef = {
    markForCheck: () => {},
};

describe('TranslationPipe', () => {
    it('should forward to translation service', () => {
        const translationService = new MockTranslationService();
        const subject = new GeneralTranslationPipe(translationService, changeRef as ChangeDetectorRef);
        spyOn(translationService, 'translateAsync').and.returnValue(new BehaviorSubject('Hi doctor nick!'));
        const result = subject.transform('test.translation', 'one', 'two', 'three');
        expect(result).toBe('Hi doctor nick!');
        expect(translationService.translateAsync).toHaveBeenCalledWith('test.translation', ['one', 'two', 'three']);
    });
});
