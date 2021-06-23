/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
    Bytes,
    CheckBoxStyling,
    Hertz,
    NumberWithUnitsFormValidatorsFactory,
    SubscriptionTracker,
    Unit,
} from '@vcd/ui-components';

@Component({
    selector: 'vcd-number-with-unit-form-example-component',
    styleUrls: ['./number-with-unit-form-input.example.component.scss'],
    templateUrl: './number-with-unit-form-input.example.component.html',
    providers: [SubscriptionTracker],
})
export class NumberWithUnitFormInputExampleComponent {
    formGroup: FormGroup;
    hertzOptions: Unit[] = [Hertz.Mhz, Hertz.Ghz];
    cpuSpeedFormControlValueUnit: Unit = Hertz.Mhz;
    maxCpuAllowedMhz = 2400;

    maxMemoryAllowedMB = 10240;
    memoryOptions: Unit[] = [...Bytes.types];
    memoryFormControlValueUnit: Unit = Bytes.MB;

    Bytes = Bytes;
    CheckBoxStyling = CheckBoxStyling;

    constructor(
        fb: FormBuilder,
        numberWithUnitsFormValidators: NumberWithUnitsFormValidatorsFactory,
        private subscriptionTracker: SubscriptionTracker
    ) {
        const memoryValidator = numberWithUnitsFormValidators.isInRange(
            10,
            this.maxMemoryAllowedMB,
            this.memoryFormControlValueUnit,
            this.memoryOptions
        );

        const cpuValidator = numberWithUnitsFormValidators.isInRange(
            0,
            this.maxCpuAllowedMhz,
            this.cpuSpeedFormControlValueUnit,
            this.hertzOptions
        );

        this.formGroup = fb.group({
            readonly: new FormControl(false),
            disabled: new FormControl(false),
            memory: new FormControl(1024 * 2, [Validators.required, memoryValidator]),
            cpuLimit: new FormControl(-1, [cpuValidator]),
        });

        this.subscriptionTracker.subscribe(this.formGroup.controls.disabled.valueChanges, (value) => {
            if (value) {
                this.formGroup.controls.cpuLimit.disable();
                this.formGroup.controls.memory.disable();
            } else {
                this.formGroup.controls.cpuLimit.enable();
                this.formGroup.controls.memory.enable();
            }
        });
    }
}
