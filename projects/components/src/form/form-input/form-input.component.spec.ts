/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { WidgetFinder, WidgetObject } from '../../utils/test/widget-object';
import { configureFormInputTestingModule } from '../base-form-control.spec';
import { FormInputComponent, getFormattedDateValue } from './form-input.component';

export class VcdFormInputWidgetObject extends WidgetObject<FormInputComponent> {
    static tagName = `vcd-form-input`;

    private get labelElement(): HTMLElement {
        return this.findElement('.clr-form-control > label.clr-control-label')?.nativeElement;
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

    get hasLabelElement(): boolean {
        return !!this.labelElement;
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
    let inputWithoutLabel: VcdFormInputWidgetObject;

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
        inputWithoutLabel = finder.find({ woConstructor: VcdFormInputWidgetObject, className: 'input-without-label' });
    });

    describe('writeValue, when input is of', () => {
        describe('type string', () => {
            it('initializes the input with the value with which formControl is initialized', () => {
                expect(stringInput.value).toEqual(hostComponent.formGroup.controls.stringInput.value);
            });
        });
        describe('type number', () => {
            it('initializes the input by converting the initial form control number value to string of base 10', () => {
                expect(numberInput.value).toEqual(hostComponent.formGroup.controls.numberInput.value.toString());
            });
        });
        describe('type datetime-local', () => {
            it('initializes the input by formatting the initial form control date-string value', () => {
                expect(dateInput.value).toEqual(
                    getFormattedDateValue(hostComponent.formGroup.controls.dateInput.value)
                );
            });
        });
    });

    describe('inputChanged when input entered is of', () => {
        describe('type string', () => {
            it('updates the form control with value entered', () => {
                stringInput.enter('Just testing');
                expect(hostComponent.formGroup.controls.stringInput.value).toEqual('Just testing');
            });
        });
        describe('type number', () => {
            it('updates the form control with string input converted into a floating-point number', () => {
                numberInput.enter('70.9');
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                expect(hostComponent.formGroup.controls.numberInput.value).toEqual(70.9);
            });

            it('is not valid when set to null', () => {
                numberInput.enter(null);
                expect(hostComponent.formGroup.controls.numberInput.valid).toBeFalsy();
            });
        });
        describe('type datetime-local', () => {
            it('updates the form control with string input converted into a ISO formatted date string', () => {
                const dateTimeLocale = getFormattedDateValue(new Date().toLocaleString());
                dateInput.enter(dateTimeLocale);
                expect(hostComponent.formGroup.controls.dateInput.value).toEqual(
                    new Date(dateTimeLocale).toISOString()
                );
            });
        });
    });

    describe('ARIA', () => {
        it('has label "for" attribute set to input id when label is set', () => {
            expect(inputWithLabel.getLabelAttributeValue('for')).toBe(inputWithLabel.getInputAttributeValue('id'));
        });

        it("does not have 'aria-label' attribute when label is set", () => {
            expect(inputWithLabel.getInputAttributeValue('arial-label')).toBe(null);
        });

        it("has 'aria-label' attribute when label is hidden", () => {
            expect(inputWithoutLabel.hasLabelElement).toBe(false);
            expect(inputWithoutLabel.getInputAttributeValue('aria-label')).toBeDefined();
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
        <form>
            <vcd-form-input #stringInput [type]="'text'" [formControl]="controls.stringInput"> </vcd-form-input>
            <vcd-form-input #numberInput [type]="'number'" [formControl]="controls.numberInput"> </vcd-form-input>
            <vcd-form-input #dateInput [type]="'datetime-local'" [formControl]="controls.dateInput"> </vcd-form-input>
            <vcd-form-input #inputWithLabel [label]="'Test'" [formControl]="controls.inputWithLabel"></vcd-form-input>
            <vcd-form-input
                #inputWithDescription
                [description]="'Test'"
                [formControl]="controls.inputWithDescription"
            ></vcd-form-input>
            <vcd-form-input
                #requiredInput
                [showAsterisk]="true"
                [formControl]="controls.requiredInput"
            ></vcd-form-input>
            <vcd-form-input
                class="input-without-label"
                [label]="'Test'"
                [hideLabel]="true"
                [formControl]="controls.inputWithoutLabel"
            ></vcd-form-input>
        </form>
    `,
})
class TestHostComponent {
    formGroup = this.fb.group({
        stringInput: ['test'],
        numberInput: [[70.9], Validators.required],
        dateInput: [new Date().toISOString()],
        inputWithLabel: [''],
        inputWithDescription: [''],
        requiredInput: ['Test', Validators.required],
        inputWithoutLabel: [''],
    });
    controls = this.formGroup.controls;

    constructor(private fb: FormBuilder) {}
}
