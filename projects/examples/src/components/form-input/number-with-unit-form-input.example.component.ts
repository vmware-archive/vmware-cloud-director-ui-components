/*!
 * Copyright 2020-2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
    Bytes,
    CheckBoxStyling,
    Hertz,
    NumberWithUnitsFormValidatorsFactory,
    SubscriptionTracker,
    TimePeriod,
    Unit,
    UnitFormatter,
} from '@vcd/ui-components';

@Component({
    selector: 'vcd-number-with-unit-form-example-component',
    styleUrls: ['./number-with-unit-form-input.example.component.scss'],
    templateUrl: './number-with-unit-form-input.example.component.html',
    providers: [SubscriptionTracker],
})
export class NumberWithUnitFormInputExampleComponent {
    formGroup: FormGroup;
    // CPU
    hertzOptions: Unit[] = [Hertz.Mhz, Hertz.Ghz];
    cpuSpeedFormControlValueUnit: Unit = Hertz.Mhz;
    maxCpuAllowedMhz = 2400;
    // Memory
    maxMemoryAllowedMB = 10240;
    memoryOptions: Unit[] = [...Bytes.types];
    memoryFormControlValueUnit: Unit = Bytes.MB;
    Bytes = Bytes;
    // Time Period
    timePeriodOptions: Unit[] = [TimePeriod.HOURS, TimePeriod.DAYS];
    timePeriodBaseUnit: Unit = TimePeriod.HOURS;
    timePeriodMin: number = 1;
    timePeriodMax: number = 720;

    CheckBoxStyling = CheckBoxStyling;

    constructor(
        fb: FormBuilder,
        numberWithUnitsFormValidators: NumberWithUnitsFormValidatorsFactory,
        private unitFormatter: UnitFormatter,
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

        const timePeriodValidator = numberWithUnitsFormValidators.isInRange(
            this.timePeriodMin,
            this.timePeriodMax,
            this.timePeriodBaseUnit,
            this.timePeriodOptions
        );

        this.formGroup = fb.group({
            readonly: new FormControl(false),
            disabled: new FormControl(false),
            memory: new FormControl(1024 * 2, [Validators.required, memoryValidator]),
            cpuLimit: new FormControl(-1, [cpuValidator]),
            timePeriodSelection: new FormControl(1, [timePeriodValidator]),
        });

        this.subscriptionTracker.subscribe(this.formGroup.controls.disabled.valueChanges, (value) => {
            if (value) {
                this.formGroup.controls.cpuLimit.disable();
                this.formGroup.controls.memory.disable();
                this.formGroup.controls.timePeriodSelection.disable();
            } else {
                this.formGroup.controls.cpuLimit.enable();
                this.formGroup.controls.memory.enable();
                this.formGroup.controls.timePeriodSelection.enable();
            }
        });
    }

    get formattedTimePeriodValue() {
        const timePeriodValue = this.formGroup.get('timePeriodSelection').value;

        return this.unitFormatter.format(timePeriodValue, this.timePeriodBaseUnit, this.timePeriodBaseUnit, 0);
    }
}
