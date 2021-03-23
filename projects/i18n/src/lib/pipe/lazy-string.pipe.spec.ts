/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { LazyString, LazyStringPipe } from './lazy-string.pipe';

describe('LazyStringPipe', () => {
    let fixture: ComponentFixture<LazyStringTestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LazyStringTestComponent, LazyStringPipe],
        }).compileComponents();
        fixture = TestBed.createComponent(LazyStringTestComponent);
    });

    afterEach(() => {
        fixture.destroy();
    });

    it('gives the same string if given a string', async () => {
        fixture.componentInstance.value = 'hello';
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('h1')).nativeElement.textContent).toEqual('hello');
    });

    it('updates to the value of the observable if given an observable', async () => {
        const subject = new BehaviorSubject('stuff');
        fixture.componentInstance.value = subject;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('h1')).nativeElement.textContent).toEqual('stuff');
        subject.next('woah');
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('h1')).nativeElement.textContent).toEqual('woah');
    });

    it('updates to the value of the observable if given a promise', fakeAsync(async () => {
        fixture.componentInstance.value = new Promise<string>((resolve, reject) => {
            setTimeout(() => resolve('stuff'), 2000);
        });
        fixture.detectChanges();
        tick(3000);
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('h1')).nativeElement.textContent).toEqual('stuff');
    }));
});

@Component({
    template: ` <h1>{{ value | lazyString }}</h1> `,
    selector: 'vcd-lazy-string-test',
})
export class LazyStringTestComponent {
    value: LazyString;
}
