/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Type, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MockTranslationService, TranslationService } from '@vcd/i18n';
import { WidgetFinder } from '../utils/test';
import { FormInputComponent } from './form-input/form-input.component';
import { VcdFormInputWidgetObject } from './form-input/form-input.component.spec';
import { VcdFormModule } from './form.module';

/**
 * Tests for the BaseFormControl base class use the sub class VcdFormInputComponent instead of writing a dummy
 * implementation
 */
describe('BaseFormControl', () => {
    let hostComponent: TestHostComponent;
    let finder: WidgetFinder<TestHostComponent>;
    let stringInput: VcdFormInputWidgetObject;

    beforeEach(async () => {
        await configureFormInputTestingModule(TestHostComponent);
        finder = new WidgetFinder(TestHostComponent);
        finder.detectChanges();
        hostComponent = finder.hostComponent;

        const inputWidgetObjects = finder.findWidgets({ woConstructor: VcdFormInputWidgetObject });
        stringInput = inputWidgetObjects[0];
    });

    describe('formControl', () => {
        it('returns the form control associated with the VcdFormInputComponent', () => {
            expect(hostComponent.baseFormInput.formControl).toBe(hostComponent.formGroup.get(
                'stringInput'
            ) as FormControl);
        });
    });

    describe('showErrors', () => {
        it('returns true when form control is invalid and false when valid', () => {
            expect(hostComponent.baseFormInput.formControl.valid).toEqual(true);
            stringInput.enter('');
            expect(hostComponent.baseFormInput.formControl.valid).toEqual(false);
        });
    });

    describe('errorKeys', () => {
        it('returns error keys from form control errors object', () => {
            stringInput.enter('');
            expect(hostComponent.baseFormInput.errorKeys).toEqual(
                Object.keys(hostComponent.baseFormInput.formControl.errors)
            );
        });
    });

    describe('registerOnChange', () => {
        it('initializes the onChange method with a function', () => {
            expect(hostComponent.baseFormInput.onChange).toBeDefined();
            expect(typeof hostComponent.baseFormInput.onChange).toEqual('function');
        });
        it('onChange method gets called when input changes', () => {
            const onChangeSpy = spyOn(hostComponent.baseFormInput, 'onChange');
            stringInput.enter('whatever');
            expect(onChangeSpy).toHaveBeenCalledWith('whatever');
        });
    });

    it('registerOnTouched initializes the onTouch method with a function', () => {
        expect(hostComponent.baseFormInput.onTouch).toBeDefined();
        expect(typeof hostComponent.baseFormInput.onTouch).toEqual('function');
    });

    it('setDisabledState gets called with a boolean when formControl is enabled or disabled', () => {
        const spy = spyOn(hostComponent.baseFormInput, 'setDisabledState');
        hostComponent.baseFormInput.formControl.disable();
        expect(spy).toHaveBeenCalledWith(true);
        hostComponent.baseFormInput.formControl.enable();
        expect(spy).toHaveBeenCalledWith(false);
    });
});

@Component({
    template: `
        <form [formGroup]="formGroup">
            <vcd-form-input #stringInput [type]="'text'" [formControlName]="'stringInput'"> </vcd-form-input>
        </form>
    `,
})
class TestHostComponent {
    formGroup: FormGroup;

    @ViewChild('stringInput', { static: true }) baseFormInput: FormInputComponent;

    constructor(private fb: FormBuilder) {
        this.formGroup = this.fb.group({
            ['stringInput']: ['test', [Validators.required]],
        });
    }
}

export async function configureFormInputTestingModule(testHostComponent: Type<unknown>): Promise<void> {
    await TestBed.configureTestingModule({
        imports: [VcdFormModule, ReactiveFormsModule],
        declarations: [testHostComponent],
        providers: [
            {
                provide: TranslationService,
                useClass: MockTranslationService,
            },
        ],
    }).compileComponents();
}
