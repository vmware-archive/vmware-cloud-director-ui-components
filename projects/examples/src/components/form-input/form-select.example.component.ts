/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormSelectComponent, SelectOption } from '@vcd/ui-components';

@Component({
    selector: 'vcd-form-select-example-component',
    templateUrl: './form-select.example.component.html',
})
export class FormSelectExampleComponent {
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
            display: 'option3',
            value: 'three',
        },
    ];

    constructor(private fb: FormBuilder) {
        this.formGroup = this.fb.group({
            selectInput: ['one', [Validators.required]],
        });
    }
}
