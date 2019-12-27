/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NestedPropertyPipe } from './nested-property.pipe';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, LOCALE_ID } from '@angular/core';
import { PipesModule } from './pipes.module';
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

    it('should not throw an error by digging deeper after encountering an unavailable property', () => {
        expect(nestedPropertyPipe.transform(item, 'notAvailable.notThere')).toEqual(null);
    });

    describe('localization:', () => {
        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [PipesModule],
                declarations: [TestComponent],
            }).compileComponents();
        });
        it('takes the default locale as "en_US" and formats a input accordingly', () => {
            const testHostWidgetObject = new TestHostWidgetObject(getComponentFixture());
            const expectedNumberOutput = new DecimalPipe(localeEnUs).transform(MOCK_OBJ.number);
            const expectedDateOutput = new DatePipe(localeEnUs).transform(MOCK_OBJ.date);
            expect(testHostWidgetObject.transformedNumber).toEqual(expectedNumberOutput);
            expect(testHostWidgetObject.transformedDate).toEqual(expectedDateOutput);
        });
        it('formats a decimal number input based on a locale injected', async () => {
            const testHostWidgetObject = new TestHostWidgetObject(getComponentFixture(localeFr));
            const expectedNumberOutput = new DecimalPipe(localeFr).transform(MOCK_OBJ.number);
            const expectedDateOutput = new DatePipe(localeFr).transform(MOCK_OBJ.date);
            expect(testHostWidgetObject.transformedNumber).toEqual(expectedNumberOutput);
            expect(testHostWidgetObject.transformedDate).toEqual(expectedDateOutput);
        });
        it('should not transform number zero as null', () => {
            const testHostWidgetObject = new TestHostWidgetObject(getComponentFixture());
            testHostWidgetObject.numberInput = 0;
            testHostWidgetObject.detectChanges();
            expect(testHostWidgetObject.transformedNumber).not.toBeNull();
            expect(testHostWidgetObject.transformedNumber).toEqual('0');
        });
    });
});

const MOCK_OBJ = {
    number: 20.15,
    date: new Date('2018-07-22'),
};
@Component({
    template: `
        <span class="number">{{ testObj | nestedProperty: 'number' }}</span>
        <span class="date">{{ testObj | nestedProperty: 'date' }}</span>
    `,
})
export class TestComponent {
    testObj = MOCK_OBJ;
}

function getComponentFixture(locale?: string): ComponentFixture<TestComponent> {
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
    get transformedNumber(): string {
        return this.getText('.number');
    }
    get transformedDate(): string {
        return this.getText('.date');
    }

    set numberInput(value: number) {
        this.component.testObj = {
            ...this.component.testObj,
            number: value,
        };
    }
}
