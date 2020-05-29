/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, InjectionToken, LOCALE_ID } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject, Observable } from 'rxjs';
import { I18nModule } from './i18n.module';
import { MessageFormatTranslationService } from './service/message-format-translation-service';
import { TranslationService } from './service/translation-service';

describe('I18nModule', () => {
    describe('forRoot', () => {
        it('provides translate and lazyString pipe', fakeAsync(async () => {
            await TestBed.configureTestingModule({
                imports: [I18nModule.forRoot(), BrowserAnimationsModule],
                providers: [
                    {
                        provide: LOCALE_ID,
                        useValue: 'de',
                    },
                ],
                declarations: [TestClassComponent],
            }).compileComponents();

            (TestBed.get(TranslationService) as TranslationService).registerTranslations({
                de: {
                    'vcd.cc.cancel': 'cancel',
                },
            });

            const fixture = TestBed.createComponent(TestClassComponent);
            tick();
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toEqual('cancel');
            expect(fixture.debugElement.query(By.css('h4')).nativeElement.textContent).toEqual('cancel');
        }));
    });

    describe('forChild', () => {
        it('provides translate and lazyString pipe', fakeAsync(async () => {
            const route = new InjectionToken('ROUTE');
            await TestBed.configureTestingModule({
                imports: [I18nModule.forChild(route, true), BrowserAnimationsModule, HttpClientTestingModule],
                providers: [
                    {
                        provide: LOCALE_ID,
                        useValue: 'de',
                    },
                    {
                        provide: route,
                        useValue: 'route',
                    },
                ],
                declarations: [TestClassComponent],
            }).compileComponents();

            const service = TestBed.get(TranslationService) as MessageFormatTranslationService;
            const observable = new BehaviorSubject({ de: { 'vcd.cc.cancel': 'cancel' } });
            spyOn((service as any).translationLoader, 'getCombinedTranslation').and.returnValue(observable);
            service.registerTranslations();

            const fixture = TestBed.createComponent(TestClassComponent);
            tick();
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toEqual('cancel');
            expect(fixture.debugElement.query(By.css('h4')).nativeElement.textContent).toEqual('cancel');
        }));
    });
});

@Component({
    template: `
        <h2>{{ 'vcd.cc.cancel' | translate }}</h2>
        <h4>{{ text | lazyString }}</h4>
    `,
    selector: 'lib-translate-test',
})
class TestClassComponent {
    text: Observable<string> = this.translationService.translateAsync('vcd.cc.cancel');

    constructor(private translationService: TranslationService) {}
}
