/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormSelectComponent, SelectOption } from '@vcd/ui-components';

@Component({
    selector: 'vcd-form-select-example-component',
    templateUrl: './form-select.example.component.html',
})
export class FormSelectExampleComponent {
    formGroup = this.fb.group({
        selectInput: ['one', [Validators.required]],
    });

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

    constructor(private fb: FormBuilder) {}
}
