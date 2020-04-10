/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, InjectionToken } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject, Observable } from 'rxjs';
import { I18nModule } from './i18n.module';
import { MessageFormatTranslationService } from './service/message-format-translation-service';
import { TranslationService } from './service/translation-service';
import { CanTranslate } from './service/translation-service.mixin';
import { BOOTSTRAP_DETAILS } from './utils/tokens';

describe('I18nModule', () => {
    it('translates correctly with forRoot', fakeAsync(async () => {
        await TestBed.configureTestingModule({
            imports: [I18nModule.forRoot(), BrowserAnimationsModule],
            providers: [
                {
                    provide: BOOTSTRAP_DETAILS,
                    useValue: { locale: 'en' },
                },
            ],
            declarations: [TestClassComponent],
        }).compileComponents();

        (TestBed.get(TranslationService) as TranslationService).registerTranslations({
            en: {
                'vcd.cc.cancel': 'cancel',
            },
        });

        const fixture = TestBed.createComponent(TestClassComponent);
        tick();
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toEqual('cancel');
        expect(fixture.debugElement.query(By.css('h4')).nativeElement.textContent).toEqual('cancel');
    }));

    it('translates correctly with forChild', fakeAsync(async () => {
        const route = new InjectionToken('ROUTE');
        await TestBed.configureTestingModule({
            imports: [I18nModule.forChild(route, true), BrowserAnimationsModule, HttpClientTestingModule],
            providers: [
                {
                    provide: BOOTSTRAP_DETAILS,
                    useValue: { locale: 'en' },
                },
                {
                    provide: route,
                    useValue: 'route',
                },
            ],
            declarations: [TestClassComponent],
        }).compileComponents();

        const service = TestBed.get(TranslationService) as MessageFormatTranslationService;
        const observable = new BehaviorSubject({ en: { 'vcd.cc.cancel': 'cancel' } });
        spyOn((service as any).translationLoader, 'getCombinedTranslation').and.returnValue(observable);
        service.registerTranslations();

        const fixture = TestBed.createComponent(TestClassComponent);
        tick();
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toEqual('cancel');
        expect(fixture.debugElement.query(By.css('h4')).nativeElement.textContent).toEqual('cancel');
        expect(fixture.debugElement.query(By.css('h3')).nativeElement.textContent).toEqual('?unloaded');
    }));
});

@Component({
    template: `
        <h2>{{ 'vcd.cc.cancel' | translate }}</h2>
        <h3>{{ 'unloaded' | translate }}</h3>
        <h4>{{ text | lazyString }}</h4>
    `,
    selector: 'lib-translate-test',
})
class TestClassComponent extends CanTranslate(class {}) {
    text: Observable<string> = this.translateAsync('vcd.cc.cancel');

    constructor(public translationService: TranslationService) {
        super();
    }
}
