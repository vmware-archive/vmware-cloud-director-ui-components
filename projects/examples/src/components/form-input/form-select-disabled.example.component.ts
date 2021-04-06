/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormSelectComponent, SelectOption } from '@vcd/ui-components';

/**
 * Options within the select element can be disabled by passing in disabled property. See {@link SelectOption#disabled}
 */
@Component({
    selector: 'vcd-form-select-disabled-example',
    templateUrl: './form-select-disabled.example.component.html',
})
export class FormSelectDisabledExampleComponent implements OnInit {
    formGroup: FormGroup;

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

    constructor(private fb: FormBuilder) {
        this.formGroup = this.fb.group({
            selectInput: ['one', [Validators.required]],
        });
    }

    ngOnInit() {}
}
