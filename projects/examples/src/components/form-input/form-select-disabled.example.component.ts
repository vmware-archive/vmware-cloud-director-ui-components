/*!
 * Copyright 2022 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectOption } from '@vcd/ui-components';

@Component({
    selector: 'vcd-form-select-disabled-example-component',
    templateUrl: './form-select-disabled.example.component.html',
})
export class FormSelectDisabledExampleComponent {
    formGroup = new FormGroup({
        disabledSelect: new FormControl({ value: 'three', disabled: true }, [Validators.required]),
        readOnlySelect: new FormControl('two', [Validators.required]),
    });

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
}
