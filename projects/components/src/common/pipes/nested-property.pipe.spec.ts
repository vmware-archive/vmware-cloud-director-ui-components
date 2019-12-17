/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NestedPropertyPipe } from './nested-property.pipe';
import { TestBed } from '@angular/core/testing';
import { Component, LOCALE_ID } from '@angular/core';
import { PipesModule } from './pipes.module';
import { By } from '@angular/platform-browser';
import localeFrData from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';

const localeEnUs = 'en_US';
const localeFr = 'fr';

describe('NestedPropertyPipe', () => {
    const nestedPropertyPipe = new NestedPropertyPipe(localeEnUs);

    it('returns null if item or property is not provided', () => {
        expect(nestedPropertyPipe.transform(null, 'prop')).toBeNull();
        expect(nestedPropertyPipe.transform({}, null)).toBeNull();
    });

    describe('for a nested object', () => {
        const item = {
            prop1: 'value1',
            prop2: {
                deepProp1: 'value2',
                deepProp2: {
                    deeperProp: 'value3',
                },
            },
        };
        it('returns correct value for any property of the object', () => {
            expect(nestedPropertyPipe.transform(item, 'prop1')).toEqual('value1');
            expect(nestedPropertyPipe.transform(item, 'prop2.deepProp1')).toEqual('value2');
            expect(nestedPropertyPipe.transform(item, 'prop2.deepProp2.deeperProp')).toEqual('value3');
        });

        it('returns null if a unavailable property is provided', () => {
            expect(nestedPropertyPipe.transform(item, 'prop2.notAvailable')).toEqual(null);
        });
    });

    describe('localization:', () => {
        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [PipesModule],
                declarations: [TestComponent],
            }).compileComponents();
        });
        it('takes the default locale as "en_US" and formats a input accordingly', () => {
            const fixture = TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            const nativeElement = fixture.debugElement.query(By.css('span')).nativeElement as HTMLSpanElement;
            expect(nativeElement.innerText).toEqual('20.15');
        });
        it('formats a decimal number input based on a locale injected', async () => {
            registerLocaleData(localeFrData, localeFr);
            TestBed.overrideProvider(LOCALE_ID, { useValue: localeFr });
            const fixture = TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            const nativeElement = fixture.debugElement.query(By.css('span')).nativeElement as HTMLSpanElement;
            expect(nativeElement.innerText).toEqual('20,15');
        });
    });
});

@Component({
    template: `
        <span>{{ testObj | nestedProperty: 'number' }}</span>
    `,
})
export class TestComponent {
    testObj = {
        number: 20.15,
    };
}
