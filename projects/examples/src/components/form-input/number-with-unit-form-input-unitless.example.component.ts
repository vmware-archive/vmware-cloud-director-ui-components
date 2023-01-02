/*!
 * Copyright 2020-2022 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
    CheckBoxStyling,
    NumberWithUnitsFormValidatorsFactory,
    Percent,
    SubscriptionTracker,
} from '@vcd/ui-components';

@Component({
    selector: 'vcd-number-with-unit-form-input-unitless-example-component',
    styleUrls: ['number-with-unit-form-input-unitless.example.component.scss'],
    templateUrl: 'number-with-unit-form-input-unitless.example.component.html',
    providers: [SubscriptionTracker],
})
export class NumberWithUnitFormInputUnitlessExampleComponent {
    Percent = Percent;
    CheckBoxStyling = CheckBoxStyling;

    noUnitUnlimited = -100;
    maxPercent = 100;

    // Operation Limit
    readonly operationLimitMin: number = 1;
    readonly operationLimitMax: number = 100000;
    readonly operationLimitUnlimited: number = 0;

    percentValidator = this.numberWithUnitsFormValidators.isInRange(1, this.maxPercent, null, null, null);
    percentValidatorShowPercent = this.numberWithUnitsFormValidators.isInRange(
        1,
        this.maxPercent,
        Percent.ZERO_TO_100,
        [Percent.ZERO_TO_100],
        null
    );
    formGroup = this.fb.group({
        readonly: new FormControl(false),
        disabled: new FormControl(false),
        validatorShowPercent: new FormControl(true),
        noUnit: new FormControl(5, [
            Validators.required,
            this.numberWithUnitsFormValidators.isInRange(1, 10, null, null, this.noUnitUnlimited),
        ]),
        percentUnit: new FormControl(50, [this.percentValidatorShowPercent]),
        operationLimit: new FormControl(this.operationLimitUnlimited, [
            this.numberWithUnitsFormValidators.isInRange(
                this.operationLimitMin,
                this.operationLimitMax,
                null,
                null,
                this.operationLimitUnlimited
            ),
        ]),
    });

    constructor(
        private fb: FormBuilder,
        private numberWithUnitsFormValidators: NumberWithUnitsFormValidatorsFactory,
        private subscriptionTracker: SubscriptionTracker
    ) {
        this.subscriptionTracker.subscribe(this.formGroup.controls.disabled.valueChanges, (value) => {
            const { noUnit, percentUnit, operationLimit } = this.formGroup.controls;
            if (value) {
                noUnit.disable();
                percentUnit.disable();
                operationLimit.disable();
            } else {
                noUnit.enable();
                percentUnit.enable();
                operationLimit.enable();
            }
        });

        this.subscriptionTracker.subscribe(this.formGroup.controls.validatorShowPercent.valueChanges, (value) => {
            this.formGroup.controls.percentUnit.setValidators([
                value ? this.percentValidatorShowPercent : this.percentValidator,
            ]);
            this.formGroup.controls.percentUnit.updateValueAndValidity();
        });
    }
}
