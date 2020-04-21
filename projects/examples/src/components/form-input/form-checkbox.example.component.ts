/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
    CheckBoxStyling,
    FormCheckboxComponent,
} from '../../../../components/src/form/form-checkbox/form-checkbox.component';

@Component({
    templateUrl: `./form-checkbox.example.component.html`,
})
export class FormCheckboxExampleComponent {
    formGroup: FormGroup;

    styling = CheckBoxStyling;

    @ViewChild('checkbox', { static: true }) checkboxComponent: FormCheckboxComponent;
    @ViewChild('toggleswitch', { static: true }) toggleSwitchComponent: FormCheckboxComponent;

    constructor(private fb: FormBuilder) {
        this.formGroup = this.fb.group({
            checkboxInput: [true],
            toggleInput: [false],
        });
    }
}
