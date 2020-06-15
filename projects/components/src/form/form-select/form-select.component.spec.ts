/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectOption } from '../../common/interfaces/select-option';
import { WidgetFinder, WidgetObject } from '../../utils/test';
import { configureFormInputTestingModule } from '../base-form-control.spec';
import { FormSelectComponent } from './form-select.component';

export class VcdFormSelectWidgetObject extends WidgetObject<FormSelectComponent> {
    static tagName = `vcd-form-select`;

    private get selectElement(): HTMLSelectElement {
        return this.findElement('select').nativeElement;
    }

    get value(): string {
        return this.selectElement.value;
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

        selectInput = finder.find({ woConstructor: VcdFormSelectWidgetObject });
    });

    describe('selectedOption returns the option whose value', () => {
        it('matches with form control value', () => {
            expect(hostComponent.selectInputComponent.selectedOption.value).toEqual(
                hostComponent.selectInputComponent.formControl.value
            );
        });
        it('is of number type, when the select formControl is set with same number value', () => {
            selectInput.component.formControl.setValue(4);
            expect(hostComponent.selectInputComponent.selectedOption).toEqual(optionWithValueAsNumber);
        });
        it('is of number type, when it is selected', () => {
            selectInput.select(hostComponent.options.length - 1);
            expect(hostComponent.selectInputComponent.selectedOption).toEqual(optionWithValueAsNumber);
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
});

@Component({
    template: `
        <form [formGroup]="formGroup">
            <vcd-form-select #selectInputComponent [options]="options" [formControlName]="'selectInput'">
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
            ...optionWithValueAsNumber,
        },
    ];

    constructor(private fb: FormBuilder) {
        this.formGroup = this.fb.group({
            selectInput: ['one', [Validators.required]],
        });
    }
}

const optionWithValueAsNumber: SelectOption = {
    display: 'option4',
    value: 4,
};
