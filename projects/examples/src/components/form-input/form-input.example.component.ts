/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'vcd-form-input-example-component',
    templateUrl: './form-input.example.component.html',
})
export class FormInputExampleComponent implements OnInit {
    longHint = `Lorem          ipsum dolor sit amet,
        consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua.`;

    formGroup = this.fb.group({
        ['stringInput']: ['test@vcd.com', [Validators.required, Validators.email, Validators.maxLength(15)]],
        ['numberInput']: [75, [Validators.required]],
        ['dateInput']: [new Date().toISOString()],
        ['disabledInputs']: [false],
    });

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.formGroup.get('disabledInputs').valueChanges.subscribe((value) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            const { stringInput, numberInput, dateInput } = this.formGroup.controls;
            [stringInput, numberInput, dateInput].forEach((c) => (value ? c.disable() : c.enable()));
        });
    }
}
