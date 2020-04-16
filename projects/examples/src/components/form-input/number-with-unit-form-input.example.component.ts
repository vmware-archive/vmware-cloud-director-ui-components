/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Bytes, Hertz, Unit } from '@vcd/ui-components';

@Component({
    templateUrl: './number-with-unit-form-input.example.component.html',
})
export class NumberWithUnitFormInputExampleComponent {
    formGroup: FormGroup;
    hertzOptions: Unit[] = [Hertz.Mhz, Hertz.Ghz];
    cpuSpeedFormControlValueUnit: Unit = Hertz.Mhz;

    memoryOptions: Unit[] = [...Bytes.types];
    memoryFormControlValueUnit: Unit = Bytes.MB;

    constructor(fb: FormBuilder) {
        this.formGroup = fb.group({
            cpuLimit: new FormControl(0),
            memory: new FormControl(0),
        });
    }
}
