/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NestedPropertyPipe } from './nested-property.pipe';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, LOCALE_ID } from '@angular/core';
import { PipesModule } from './pipes.module';
import { By } from '@angular/platform-browser';
import localeFrData from '@angular/common/locales/fr';
import { DatePipe, DecimalPipe, registerLocaleData } from '@angular/common';
import { WidgetObject } from '../../utils/test/widget-object';

const localeEnUs = 'en_US';
const localeFr = 'fr';

describe('NestedPropertyPipe', () => {
    const nestedPropertyPipe = new NestedPropertyPipe(localeEnUs);
    const item = {
        prop1: 'value1',
        prop2: {
            deepProp1: 'value2',
            deepProp2: {
                deeperProp: 'value3',
            },
        },
    };

    it('returns null if item or property is not provided', () => {
        expect(nestedPropertyPipe.transform(null, 'prop')).toBeNull();
        expect(nestedPropertyPipe.transform({}, null)).toBeNull();
    });

    it('returns values for shallow properties', () => {
        expect(nestedPropertyPipe.transform(item, 'prop1')).toEqual('value1');
    });

    it('returns values for deep properties', () => {
        expect(nestedPropertyPipe.transform(item, 'prop2.deepProp1')).toEqual('value2');
    });

    it('returns null for non-existing shallow properties', () => {
        expect(nestedPropertyPipe.transform(item, 'notAvailable')).toEqual(null);
    });

    it('returns null for non-existing deep properties', () => {
        expect(nestedPropertyPipe.transform(item, 'prop2.notAvailable')).toEqual(null);
    });

    describe('localization:', () => {
        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [PipesModule],
                declarations: [TestComponent],
            }).compileComponents();
        });
        it('takes the default locale as "en_US" and formats a input accordingly', () => {
            const testHostWidgetObject = new TestHostWidgetObject(getComponentFixtureWith());
            const expectedNumberOutput = new DecimalPipe(localeEnUs).transform(MOCK_OBJ.number);
            const expectedDateOutput = new DatePipe(localeEnUs).transform(MOCK_OBJ.date);
            expect(testHostWidgetObject.getInnerText('#number')).toEqual(expectedNumberOutput);
            expect(testHostWidgetObject.getInnerText('#date')).toEqual(expectedDateOutput);
        });
        it('formats a decimal number input based on a locale injected', async () => {
            const testHostWidgetObject = new TestHostWidgetObject(getComponentFixtureWith(localeFr));
            const expectedNumberOutput = new DecimalPipe(localeFr).transform(MOCK_OBJ.number);
            const expectedDateOutput = new DatePipe(localeFr).transform(MOCK_OBJ.date);
            expect(testHostWidgetObject.getInnerText('#number')).toEqual(expectedNumberOutput);
            expect(testHostWidgetObject.getInnerText('#date')).toEqual(expectedDateOutput);
        });
    });
});

const MOCK_OBJ = {
    number: 20.15,
    date: new Date('2018-07-22'),
};
@Component({
    template: `
        <span id="number">{{ testObj | nestedProperty: 'number' }}</span>
        <span id="date">{{ testObj | nestedProperty: 'date' }}</span>
    `,
})
export class TestComponent {
    testObj = MOCK_OBJ;
}

function getComponentFixtureWith(locale?: string): ComponentFixture<TestComponent> {
    if (locale) {
        registerLocaleData(localeFrData, localeFr);
        TestBed.overrideProvider(LOCALE_ID, { useValue: localeFr });
    }
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    return fixture;
}

class TestHostWidgetObject extends WidgetObject<TestComponent> {
    constructor(fixture: ComponentFixture<TestComponent>) {
        super(fixture);
    }
    getInnerText(cssSelector: string): string {
        return this.getText(cssSelector);
    }
}
