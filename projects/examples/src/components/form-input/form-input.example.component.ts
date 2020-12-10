/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'vcd-form-input-example-component',
    templateUrl: './form-input.example.component.html',
})
export class FormInputExampleComponent {
    formGroup: FormGroup;

    longHint = `Lorem          ipsum dolor sit amet,
        consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua.`;

    constructor(private fb: FormBuilder) {
        this.formGroup = this.fb.group({
            ['stringInput']: ['test@vcd.com', [Validators.required, Validators.email, Validators.maxLength(15)]],
            ['numberInput']: [75, [Validators.required]],
            ['dateInput']: [new Date().toISOString()],
        });
    }
}
