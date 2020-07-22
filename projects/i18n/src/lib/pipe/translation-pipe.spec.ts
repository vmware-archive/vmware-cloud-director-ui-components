/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { MockTranslationService } from '../service/mock-translation-service';
import { TranslationService } from '../service/translation-service';
import { TranslationPipe } from './translation-pipe';

describe('TranslationPipe', () => {
    it('should forward to translation service', () => {
        const translationService = new MockTranslationService();
        TestBed.configureTestingModule({
            declarations: [TranslationPipeTestComponent, TranslationPipe],
            providers: [
                {
                    provide: TranslationService,
                    useValue: translationService,
                },
            ],
        }).compileComponents();
        const fixture = TestBed.createComponent(TranslationPipeTestComponent);
        fixture.detectChanges();
        const observable = new BehaviorSubject('?test.translation');
        spyOn(translationService, 'translateAsync').and.returnValue(observable);
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('h1')).nativeElement.textContent).toBe('?test.translation');
        observable.next('Hi doctor nick!');
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('h1')).nativeElement.textContent).toBe('Hi doctor nick!');
        expect(translationService.translateAsync).toHaveBeenCalledWith('test.translation', []);
    });
});

@Component({
    template: `
        <h1>{{ key | translate }}</h1>
    `,
    selector: 'lib-translation-pipe-test',
})
export class TranslationPipeTestComponent {
    key = 'test.translation';
}
