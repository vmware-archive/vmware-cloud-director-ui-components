/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { I18nModule, MockTranslationService, TranslationService } from '@vcd/i18n';
import { WidgetFinder } from '../../utils/test';
import { Hertz, Percent, Unit } from '../../utils/unit/unit';
import { UnitFormatter } from '../../utils/unit/unit-formatter';
import { VcdFormModule } from '../form.module';
import { UNLIMITED } from './number-with-unit-form-input.component';
import { NumberWithUnitFormInputWidgetObject } from './number-with-unit-form-input.widget-object';

const [MIN, MAX] = [1000, 10000];
@Component({
    template: `
        <vcd-number-with-unit-form-input
            [formControl]="cpuLimit"
            [label]="'cpu.limit' | translate"
            [unitOptions]="hertzOptions"
            [inputValueUnit]="formControlValueUnit"
            [min]="${MIN}"
            [max]="${MAX}"
            [description]="'sizingPolicies.form.cpuLimit.description' | translate"
            class="initially-null"
        >
        </vcd-number-with-unit-form-input>
        <vcd-number-with-unit-form-input
            [formControl]="cpuLimitInitiallyUnlimited"
            [label]="'cpu.limit' | translate"
            [unitOptions]="hertzOptions"
            [inputValueUnit]="formControlValueUnit"
            [description]="'sizingPolicies.form.cpuLimit.description' | translate"
            class="initially-unlimited"
        >
        </vcd-number-with-unit-form-input>
    `,
})
export class TestHostComponent {
    cpuLimit = new FormControl(null);
    cpuLimitInitiallyUnlimited = new FormControl(UNLIMITED);

    public hertzOptions: Unit[] = [Hertz.Mhz, Hertz.Ghz];
    public formControlValueUnit: Unit = Hertz.Mhz;

    constructor() {}
}

describe('VcdNumberWithUnitFormInputComponent', () => {
    let numberWithUnitInput: NumberWithUnitFormInputWidgetObject;
    let finder: WidgetFinder<TestHostComponent>;
    const ts: TranslationService = new MockTranslationService();

    beforeEach(fakeAsync(async () => {
        await TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                I18nModule,
                FormsModule,
                ReactiveFormsModule,
                ClarityModule,
                VcdFormModule,
            ],
            declarations: [TestHostComponent],
            providers: [
                {
                    provide: TranslationService,
                    useClass: MockTranslationService,
                },
                UnitFormatter,
            ],
        }).compileComponents();
        finder = new WidgetFinder(TestHostComponent);
        finder.detectChanges();
        numberWithUnitInput = finder.find({
            woConstructor: NumberWithUnitFormInputWidgetObject,
            className: 'initially-null',
        });
    }));

    afterEach(() => {
        numberWithUnitInput = null;
    });

    describe('showUnlimitedOption', () => {
        it('shows the unlimited checkbox by default', () => {
            expect(numberWithUnitInput.unlimitedFormControl).toBeTruthy();
        });

        it('disables the value and unit fields when unlimited checkbox is checked', () => {
            numberWithUnitInput.unlimitedFormControl.setValue(true);
            numberWithUnitInput.detectChanges();
            expect(numberWithUnitInput.valueFormControl.disabled).toBeTruthy('Value field should have been disabled');
            expect(numberWithUnitInput.unitFormControl.disabled).toBeTruthy('Unit field should have been disabled');
        });
    });

    describe('unitOptions', () => {
        it('displays unit options', () => {
            expect(numberWithUnitInput.unitFormControl).toBeTruthy();
        });

        it('selects GHz for a unit', () => {
            numberWithUnitInput.selectUnit(Hertz.Ghz);
            numberWithUnitInput.detectChanges();
            expect(numberWithUnitInput.selectedUnitDisplayValue).toEqual('GHz');
        });

        it('does not display a dropdown when there is a single unit', () => {
            // Using percent as an example
            const percentUnit = new Percent(1);
            numberWithUnitInput.setUnitOptionsToPercent();
            expect(numberWithUnitInput.singleUnitDisplayText.trim()).toBe(
                ts.translate(percentUnit.getUnitNameTranslationKey(), [])
            );
            expect(numberWithUnitInput.isUnitDropDownDisplayed).toBe(false);
            numberWithUnitInput.valueFormControl.setValue(50);
            numberWithUnitInput.detectChanges();
            expect(numberWithUnitInput.formControl.value).toEqual(0.5);
        });

        it('does not display units when there are no units defined', () => {
            // Sometimes you want the unlimited behavior, but no units
            numberWithUnitInput.setUnitOptionsToNone();
            expect(numberWithUnitInput.singleUnitDisplayText).toBe('');
            expect(numberWithUnitInput.isUnitDropDownDisplayed).toBe(false);
            numberWithUnitInput.valueFormControl.setValue(50);
            numberWithUnitInput.detectChanges();
            expect(numberWithUnitInput.formControl.value).toEqual(50);
        });
    });

    describe('FormControl value', () => {
        it('has a null value and unlimited option unchecked on form reset', () => {
            numberWithUnitInput.setInputValueUnit(Hertz.Mhz);
            numberWithUnitInput.selectUnit(Hertz.Ghz);
            numberWithUnitInput.detectChanges();
            expect(numberWithUnitInput.unlimitedFormControl.value).toBe(false);
            expect(numberWithUnitInput.formControl.value).toEqual(null);
        });

        it('has a value set in inputValueUnit Unit', () => {
            numberWithUnitInput.setInputValueUnit(Hertz.Mhz);
            numberWithUnitInput.selectUnit(Hertz.Ghz);
            numberWithUnitInput.valueFormControl.setValue(10);
            numberWithUnitInput.detectChanges();
            expect(numberWithUnitInput.formControl.value).toEqual(1000 * 10);
        });

        it('has a value of UNLIMITED when unlimited checkbox is checked', () => {
            numberWithUnitInput.unlimitedFormControl.setValue(true);
            numberWithUnitInput.detectChanges();
            expect(numberWithUnitInput.formControl.value).toEqual(UNLIMITED);
        });

        it('disables text input when initialized to unlimited', () => {
            const numberWithUnitInputInitializedUnlimited = finder.find({
                woConstructor: NumberWithUnitFormInputWidgetObject,
                className: 'initially-unlimited',
            });
            expect(numberWithUnitInputInitializedUnlimited.valueFormControl.enabled).toEqual(false);
            expect(numberWithUnitInputInitializedUnlimited.unitFormControl.enabled).toEqual(false);
        });

        it('disables text input when set to unlimited programmatically', () => {
            numberWithUnitInput.formControl.setValue(UNLIMITED);
            numberWithUnitInput.detectChanges();
            expect(numberWithUnitInput.valueFormControl.enabled).toEqual(false);
            expect(numberWithUnitInput.unitFormControl.enabled).toEqual(false);
        });
    });

    describe('FormControl display value', () => {
        it('is in GHz when input value is greater than 1000 Mhz', () => {
            numberWithUnitInput.setInputValueUnit(Hertz.Mhz);
            numberWithUnitInput.selectUnit(Hertz.Mhz);
            numberWithUnitInput.valueFormControl.setValue(2000);
            numberWithUnitInput.detectChanges();
            expect(numberWithUnitInput.displayValue).toEqual(
                ts.translate(Hertz.Ghz.getValueWithUnitTranslationKey(), [2])
            );
        });
    });

    describe('Validation', () => {
        it('@Input min/max are inclusive', () => {
            numberWithUnitInput.formControl.setValue(MIN - 1);
            expect(numberWithUnitInput.formControl.valid).toBe(false);
            numberWithUnitInput.formControl.setValue(MIN);
            expect(numberWithUnitInput.formControl.valid).toBe(true);
            numberWithUnitInput.formControl.setValue(MAX + 1);
            expect(numberWithUnitInput.formControl.valid).toBe(false);
            numberWithUnitInput.formControl.setValue(MAX);
            expect(numberWithUnitInput.formControl.valid).toBe(true);
        });
    });

    describe('ReadOnly', () => {
        it('displays its value as regular text without input fields using the best format available', () => {
            numberWithUnitInput.formControl.setValue(8192);
            numberWithUnitInput.component.isReadOnly = true;
            numberWithUnitInput.detectChanges();

            expect(numberWithUnitInput.readonlyText).toBe(
                ts.translate(Hertz.Ghz.getValueWithUnitTranslationKey(), [8.19])
            );
        });
    });

    describe('inputValueUnit', () => {
        it('sets value in GHz units to FormControl Value for input selected unit is MHz', () => {
            numberWithUnitInput.setInputValueUnit(Hertz.Ghz);
            numberWithUnitInput.selectUnit(Hertz.Mhz);
            numberWithUnitInput.valueFormControl.setValue(2000);
            numberWithUnitInput.detectChanges();
            expect(numberWithUnitInput.formControl.value).toEqual(2000 / 1000);
        });

        it('sets value in 0-1 percent to FormControl Value ' + 'for input selected unit is 0-100 percent', () => {
            numberWithUnitInput.setUnitOptionsToPercent();
            numberWithUnitInput.setInputValueUnit(Percent.ZERO_TO_1);
            numberWithUnitInput.selectUnit(Percent.ZERO_TO_100);
            numberWithUnitInput.valueFormControl.setValue(98);
            numberWithUnitInput.detectChanges();
            expect(numberWithUnitInput.formControl.value).toEqual(98 / 100);
        });
    });

    describe('setDisabledState', () => {
        it(
            'disables or enables comboUnitOptions and limited formControls when cpuLimit formControl is disabled or' +
                'enabled',
            () => {
                numberWithUnitInput.formControl.disable();
                numberWithUnitInput.detectChanges();
                expect(numberWithUnitInput.valueFormControl.disabled).toBe(true);
                expect(numberWithUnitInput.unitFormControl.disabled).toBe(true);
                numberWithUnitInput.formControl.enable();
                numberWithUnitInput.detectChanges();
                expect(numberWithUnitInput.valueFormControl.enabled).toBe(true);
                expect(numberWithUnitInput.unitFormControl.enabled).toBe(true);
            }
        );
    });
});
