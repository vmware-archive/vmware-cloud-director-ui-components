/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormSelectComponent, SelectOption } from '@vcd/ui-components';

/**
 * Options within the select element can be disabled by passing in disabled property. See {@link SelectOption#disabled}
 */
@Component({
    selector: 'vcd-form-select-disabled-example',
    templateUrl: './form-select-disabled-options.example.component.html',
})
export class FormSelectDisabledOptionsExampleComponent implements OnInit {
    formGroup = this.fb.group({
        selectInput: ['one', [Validators.required]],
    });

    @ViewChild('selectInputComponent', { static: true }) selectInputComponent: FormSelectComponent;

    options: SelectOption[] = [
        {
            display: '-',
            value: '',
            disabled: true,
        },
        {
            display: 'option1',
            value: 'one',
        },
        {
            display: 'option2',
            value: 'two',
            disabled: true,
        },
        {
            display: 'option3',
            value: 'three',
        },
    ];

    constructor(private fb: FormBuilder) {}

    ngOnInit() {}
}
