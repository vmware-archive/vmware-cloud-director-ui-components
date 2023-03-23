/*!
 * Copyright 2022 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FormSelectComponent, SelectOption } from '@vcd/ui-components';

/**
 * This is hardcoded to show that validator can return anything to be passed to its translation key.
 * In a real application you would never hardcode English in the value.
 * The first value being passed as 'placeholder' is being ignored by the existing translation.
 */
function oneAndThreeRangeValidator(control: AbstractControl): ValidationErrors | null {
    // vcd.cc.warning.numRange=Only numbers in the range of {1} to {2} are allowed
    if (control.value < 1 || control.value > 3) {
        return { 'vcd.cc.warning.numRange': ['placeholder', 'one', 'three'] };
    }
    return null;
}

/**
 * This example shows the select form input validates the selection to be between 1 and 3.
 * The select form input takes a validator that returns an i18n key and replacement values. For example, { 'vcd.cc.warning.numRange': ['one', 'three'] }.
 */
@Component({
    selector: 'vcd-form-select-validation-example-component',
    templateUrl: './form-select-validation.example.component.html',
})
export class FormSelectValidationExampleComponent {
    formGroup = this.fb.group({
        selectInput: ['one', [Validators.required, oneAndThreeRangeValidator]],
    });

    @ViewChild('selectInputComponent', { static: true }) selectInputComponent: FormSelectComponent;

    options: SelectOption[] = [
        {
            display: '',
            value: '',
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

    constructor(private fb: FormBuilder) {}
}
