/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WidgetFinder, WidgetObject } from '../../utils/test/widget-object';
import { configureFormInputTestingModule } from '../base-form-control.spec';
import { FormInputComponent, getFormattedDateValue } from './form-input.component';

export class VcdFormInputWidgetObject extends WidgetObject<FormInputComponent> {
    static tagName = `vcd-form-input`;

    private get labelElement(): HTMLElement {
        return this.findElement('label').nativeElement;
    }

    private get subtextElement(): HTMLElement {
        return this.findElement('.clr-subtext').nativeElement;
    }

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

    getLabelAttributeValue(attribute: string): string {
        return this.labelElement.getAttribute(attribute);
    }

    getInputAttributeValue(attribute: string): string {
        return this.inputElement.getAttribute(attribute);
    }

    getSubtextAttributeValue(attribute: string): string {
        return this.subtextElement.getAttribute(attribute);
    }
}

describe('FormInputComponent', () => {
    let hostComponent: TestHostComponent;
    let finder: WidgetFinder<TestHostComponent>;
    let stringInput: VcdFormInputWidgetObject;
    let numberInput: VcdFormInputWidgetObject;
    let dateInput: VcdFormInputWidgetObject;
    let inputWithLabel: VcdFormInputWidgetObject;
    let inputWithDescription: VcdFormInputWidgetObject;
    let requiredInput: VcdFormInputWidgetObject;

    beforeEach(async () => {
        await configureFormInputTestingModule(TestHostComponent);
        finder = new WidgetFinder(TestHostComponent);
        finder.detectChanges();
        hostComponent = finder.hostComponent;

        const inputWidgetObjects = finder.findWidgets({ woConstructor: VcdFormInputWidgetObject });
        stringInput = inputWidgetObjects[0];
        numberInput = inputWidgetObjects[1];
        dateInput = inputWidgetObjects[2];
        inputWithLabel = inputWidgetObjects[3];
        inputWithDescription = inputWidgetObjects[4];
        requiredInput = inputWidgetObjects[5];
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

            it('is not valid when set to null', () => {
                numberInput.enter(null);
                expect(hostComponent.formGroup.get('numberInput').valid).toBeFalsy();
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

    describe('ARIA', () => {
        it('has label "for" attribute set to input id when label is set', () => {
            expect(inputWithLabel.getLabelAttributeValue('for')).toBe(inputWithLabel.getInputAttributeValue('id'));
        });

        it('has "aria-required" attribute set to false when "showAsterisk" is "false"', () => {
            expect(inputWithLabel.getInputAttributeValue('aria-required')).toBe('false');
        });

        it('has "aria-required" attribute set to true when "showAsterisk" is "true"', () => {
            expect(requiredInput.getInputAttributeValue('aria-required')).toBe('true');
        });

        it('has "aria-describedby" attribute value set to "errorsId" when "showErrors" is "true"', () => {
            requiredInput.enter(''); // Setting empty input to trigger the required validator.
            expect(requiredInput.getSubtextAttributeValue('id')).toBe(requiredInput.component.errorsId);
            expect(requiredInput.getInputAttributeValue('aria-describedby')).toBe(requiredInput.component.errorsId);
        });

        it('has "aria-describedby" attribute value set to "descriptionId" when "showErrors" is "false"', () => {
            expect(inputWithDescription.getSubtextAttributeValue('id')).toBe(
                inputWithDescription.component.descriptionId
            );
            expect(inputWithDescription.getInputAttributeValue('aria-describedby')).toBe(
                inputWithDescription.component.descriptionId
            );
        });
    });
});

@Component({
    template: `
        <form [formGroup]="formGroup">
            <vcd-form-input #stringInput [type]="'text'" [formControlName]="'stringInput'"> </vcd-form-input>
            <vcd-form-input #numberInput [type]="'number'" [formControlName]="'numberInput'"> </vcd-form-input>
            <vcd-form-input #dateInput [type]="'datetime-local'" [formControlName]="'dateInput'"> </vcd-form-input>
            <vcd-form-input #inputWithLabel [label]="'Test'" [formControlName]="'inputWithLabel'"></vcd-form-input>
            <vcd-form-input
                #inputWithDescription
                [description]="'Test'"
                [formControlName]="'inputWithDescription'"
            ></vcd-form-input>
            <vcd-form-input #requiredInput [showAsterisk]="true" [formControlName]="'requiredInput'"></vcd-form-input>
        </form>
    `,
})
class TestHostComponent {
    formGroup: FormGroup;

    constructor(private fb: FormBuilder) {
        this.formGroup = this.fb.group({
            stringInput: ['test'],
            numberInput: [[70.9], Validators.required],
            dateInput: [new Date().toISOString()],
            inputWithLabel: [''],
            inputWithDescription: [''],
            requiredInput: ['Test', Validators.required],
        });
    }
}
