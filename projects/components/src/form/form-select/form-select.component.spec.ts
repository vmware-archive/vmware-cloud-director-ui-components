/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { SelectOption } from '../../common/interfaces/select-option';
import { WidgetFinder, WidgetObject } from '../../utils/test/widget-object';
import { configureFormInputTestingModule } from '../base-form-control.spec';
import { FormSelectComponent } from './form-select.component';

export class VcdFormSelectWidgetObject extends WidgetObject<FormSelectComponent> {
    static tagName = `vcd-form-select`;

    private get selectElement(): HTMLSelectElement {
        return this.findElement('select').nativeElement;
    }

    /**
     * Returns the 'shape' attribute if defined, returns empty string if undefined
     */
    get clrIconShape(): string {
        const clrIconDebugEl = this.findElement('clr-icon');
        return clrIconDebugEl?.nativeElement.getAttribute('shape') || '';
    }

    get value(): string {
        return this.selectElement.value;
    }

    get validationMessages(): string[] {
        return this.findElement('.clr-subtext').children.map((el) => el.nativeElement.textContent);
    }

    select(index: number): void {
        this.selectElement.selectedIndex = index;
        this.selectElement.dispatchEvent(new Event('change'));
        this.detectChanges();
    }
}

describe('FormSelectComponent', () => {
    let hostComponent: TestHostComponent;
    let finder: WidgetFinder<TestHostComponent>;
    let selectInput: VcdFormSelectWidgetObject;

    beforeEach(async () => {
        await configureFormInputTestingModule(TestHostComponent);
        finder = new WidgetFinder(TestHostComponent);
        finder.detectChanges();
        hostComponent = finder.hostComponent;

        selectInput = finder.find({ woConstructor: VcdFormSelectWidgetObject, className: 'select-input' });
    });

    describe('selectedOption', () => {
        it('matches form control value', () => {
            expect(hostComponent.selectInputComponent.selectedOption.value).toEqual(
                hostComponent.selectInputComponent.formControl.value
            );
        });
        it('is of number type, when the select formControl is set with same number value', () => {
            selectInput.component.formControl.setValue(4);
            expect(hostComponent.selectInputComponent.selectedOption).toEqual(getOptionWithValueAsNumber());
        });
        it('is of number type, when it is selected', () => {
            selectInput.select(hostComponent.options.length - 2);
            expect(hostComponent.selectInputComponent.selectedOption).toEqual(getOptionWithValueAsNumber());
        });
        it('is undefined if the component does not have a value set', () => {
            selectInput.component.formControl.setValue(null);
            expect(selectInput.component.selectedOption).toBe(undefined);
            selectInput.component.formControl.setValue(undefined);
            expect(selectInput.component.selectedOption).toBe(undefined);
        });
        it('allows falsy  values', () => {
            selectInput.component.formControl.setValue('');
            expect(selectInput.component.selectedOption.value).toBe('');
        });
        it('is disabled if the option property `disabled` is set to true', () => {
            selectInput.component.formControl.setValue('five');
            expect(selectInput.component.selectedOption.disabled).toBe(true);
        });
    });

    describe('view to model changes', () => {
        it('updates the form control with value of the option selected from dropdown', () => {
            expect(hostComponent.formGroup.get('selectInput').value).toEqual(hostComponent.options[1].value);
            selectInput.select(2);
            expect(hostComponent.formGroup.get('selectInput').value).toEqual(hostComponent.options[2].value);
        });
    });

    describe('model to view changes', () => {
        it('selects the option in the view whose value matches with value set on the form control', () => {
            expect(selectInput.value).toEqual(hostComponent.options[1].value as string);
            hostComponent.formGroup.get('selectInput').setValue(hostComponent.options[2].value);
            expect(selectInput.value).toEqual(hostComponent.options[2].value as string);
        });
    });

    describe('validation', () => {
        it('does not show error icon before user selects value', () => {
            expect(selectInput.clrIconShape).toEqual('');
        });
        it('shows error icon when a invalid value is selected', () => {
            selectInput.select(0);
            expect(selectInput.clrIconShape).toEqual('exclamation-circle');
        });
        it('does not show error icon when a valid value is selected', () => {
            selectInput.select(1);
            expect(selectInput.clrIconShape).toEqual('');
        });

        it('validator can return key/value where the value is an array to be passed to translation service', () => {
            const selectNumberWo = finder.find({
                woConstructor: VcdFormSelectWidgetObject,
                className: 'select-number-input',
            });
            selectNumberWo.select(5);
            const firstValidationMessage = JSON.parse(selectNumberWo.validationMessages[0]);
            expect(firstValidationMessage).toEqual({
                key: 'vcd.cc.warning.numRange',
                params: ['placeholder', 'one', 'three'],
            });
        });

        it(
            'validator can return key/value where the value is NOT an array,' +
                ' in which case an array of control\'s value is passed to the translation service',
            () => {
                const selectNumberWo = finder.find({
                    woConstructor: VcdFormSelectWidgetObject,
                    className: 'select-number-input',
                });
                selectNumberWo.select(0);
                const firstValidationMessage = JSON.parse(selectNumberWo.validationMessages[0]);
                expect(firstValidationMessage).toEqual({ key: 'vcd.cc.not.a.number', params: ['-'] });
            }
        );
    });
});

@Component({
    template: `
        <form [formGroup]="formGroup">
            <vcd-form-select
                #selectInputComponent
                [options]="options"
                [formControlName]="'selectInput'"
                class="select-input"
            >
            </vcd-form-select>
            <vcd-form-select [options]="numberOptions" [formControlName]="'selectNumber'" class="select-number-input">
            </vcd-form-select>
        </form>
    `,
})
class TestHostComponent {
    formGroup: FormGroup;

    @ViewChild('selectInputComponent', { static: true }) selectInputComponent: FormSelectComponent;

    options: SelectOption[] = [
        {
            display: '',
            value: '',
        },
        {
            display: 'option1',
            value: 'one',
        },
        {
            display: 'option2',
            value: 'two',
        },
        {
            ...getOptionWithValueAsNumber(),
        },
        {
            ...getDisabledOption(),
        },
    ];

    numberOptions: SelectOption[] = [
        {
            display: '-',
            value: '-',
        },
        {
            display: 'zero',
            value: 0,
        },
        {
            display: 'one',
            value: 1,
        },
        {
            display: 'two',
            value: 2,
        },
        {
            display: 'three',
            value: 3,
        },
        {
            display: 'four',
            value: 4,
        },
    ];

    constructor(private fb: FormBuilder) {
        this.formGroup = this.fb.group({
            selectInput: ['one', [Validators.required]],
            selectNumber: [0, [this.numberValidator, this.numRangeValidator]],
        });
    }

    private numberValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        // vcd.cc.not.a.number={0} is not a number
        if (isNaN(Number(control.value))) {
            return { 'vcd.cc.not.a.number': true };
        }

        return null;
    };

    private numRangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const value = Number(control.value);
        if (value < 1 || value > 3) {
            return { 'vcd.cc.warning.numRange': ['placeholder', 'one', 'three'] };
        }
        return null;
    };
}

function getOptionWithValueAsNumber(): SelectOption {
    return { display: 'option4', value: 4 };
}

function getDisabledOption(): SelectOption {
    return {
        display: 'option5',
        value: 'five',
        disabled: true,
    };
}
