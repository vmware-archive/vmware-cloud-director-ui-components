/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WidgetFinder, WidgetObject } from '../../utils/test';
import { configureFormInputTestingModule } from '../base-form-control.spec';
import { FormInputComponent, getFormattedDateValue } from './form-input.component';

export class VcdFormInputWidgetObject extends WidgetObject<FormInputComponent> {
    static tagName = `vcd-form-input`;

    private get inputElement(): HTMLInputElement {
        return this.findElement('input').nativeElement;
    }

    get value(): string {
        return this.inputElement.value;
    }

    enter(val: string): void {
        this.inputElement.value = val;
        this.inputElement.dispatchEvent(new Event('input'));
        this.detectChanges();
    }
}

describe('FormInputComponent', () => {
    let hostComponent: TestHostComponent;
    let finder: WidgetFinder<TestHostComponent>;
    let stringInput: VcdFormInputWidgetObject;
    let numberInput: VcdFormInputWidgetObject;
    let dateInput: VcdFormInputWidgetObject;

    beforeEach(async () => {
        await configureFormInputTestingModule(TestHostComponent);
        finder = new WidgetFinder(TestHostComponent);
        finder.detectChanges();
        hostComponent = finder.hostComponent;

        const inputWidgetObjects = finder.findWidgets({ woConstructor: VcdFormInputWidgetObject });
        stringInput = inputWidgetObjects[0];
        numberInput = inputWidgetObjects[1];
        dateInput = inputWidgetObjects[2];
    });

    describe('writeValue, when input is of', () => {
        describe('type string', () => {
            it('initializes the input with the value with which formControl is initialized', () => {
                expect(stringInput.value).toEqual(hostComponent.formGroup.get('stringInput').value);
            });
        });
        describe('type number', () => {
            it('initializes the input by converting the initial form control number value to string of base 10', () => {
                expect(numberInput.value).toEqual(hostComponent.formGroup.get('numberInput').value.toString());
            });
        });
        describe('type datetime-local', () => {
            it('initializes the input by formatting the initial form control date-string value', () => {
                expect(dateInput.value).toEqual(getFormattedDateValue(hostComponent.formGroup.get('dateInput').value));
            });
        });
    });

    describe('inputChanged when input entered is of', () => {
        describe('type string', () => {
            it('updates the form control with value entered', () => {
                stringInput.enter('Just testing');
                expect(hostComponent.formGroup.get('stringInput').value).toEqual('Just testing');
            });
        });
        describe('type number', () => {
            it('updates the form control with string input converted into a floating-point number', () => {
                numberInput.enter('70.9');
                expect(hostComponent.formGroup.get('numberInput').value).toEqual(70.9);
            });
        });
        describe('type datetime-local', () => {
            it('updates the form control with string input converted into a ISO formatted date string', () => {
                const dateTimeLocale = getFormattedDateValue(new Date().toLocaleString());
                dateInput.enter(dateTimeLocale);
                expect(hostComponent.formGroup.get('dateInput').value).toEqual(new Date(dateTimeLocale).toISOString());
            });
        });
    });
});

@Component({
    template: `
        <form [formGroup]="formGroup">
            <vcd-form-input #stringInput [type]="'text'" [formControlName]="'stringInput'"> </vcd-form-input>
            <vcd-form-input #numberInput [type]="'number'" [formControlName]="'numberInput'"> </vcd-form-input>
            <vcd-form-input #dateInput [type]="'datetime-local'" [formControlName]="'dateInput'"> </vcd-form-input>
        </form>
    `,
})
class TestHostComponent {
    formGroup: FormGroup;

    constructor(private fb: FormBuilder) {
        this.formGroup = this.fb.group({
            stringInput: ['test'],
            numberInput: [70.9],
            dateInput: [new Date().toISOString()],
        });
    }
}
