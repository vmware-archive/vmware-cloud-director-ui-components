/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: './form-input.example.component.html',
})
export class FormInputExampleComponent {
    formGroup: FormGroup;

    constructor(private fb: FormBuilder) {
        this.formGroup = this.fb.group({
            ['stringInput']: ['test@vcd.com', [Validators.required, Validators.email, Validators.maxLength(15)]],
            ['numberInput']: [75],
            ['dateInput']: [new Date().toISOString()],
        });
    }
}
