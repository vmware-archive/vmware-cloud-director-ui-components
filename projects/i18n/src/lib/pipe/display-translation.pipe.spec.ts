/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { TranslatedText } from '../service/translation-service';
import { DisplayTranslationPipe } from './display-translation.pipe';

describe('DisplayTranslationPipe', () => {
    it('gives the same string if given a string', async () => {
        await TestBed.configureTestingModule({
            declarations: [DisplayTranslationTestComponent, DisplayTranslationPipe],
        }).compileComponents();
        const fixture = TestBed.createComponent(DisplayTranslationTestComponent);
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('h1')).nativeElement.textContent).toEqual('hello');
    });

    it('updates to the value of the observable if given an observable', async () => {
        await TestBed.configureTestingModule({
            declarations: [DisplayTranslationTestComponent, DisplayTranslationPipe],
        }).compileComponents();
        const fixture = TestBed.createComponent(DisplayTranslationTestComponent);
        const subject = new BehaviorSubject('stuff');
        fixture.componentInstance.value = subject;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('h1')).nativeElement.textContent).toEqual('stuff');
        subject.next('woah');
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('h1')).nativeElement.textContent).toEqual('woah');
    });
});

@Component({
    template: `
        <h1>{{ value | displayTranslation }}</h1>
    `,
    selector: 'lib-display-translation-test',
})
export class DisplayTranslationTestComponent {
    value: TranslatedText = 'hello';
}
