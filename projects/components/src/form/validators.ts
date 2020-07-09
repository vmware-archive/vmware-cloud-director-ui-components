/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { FormControl, ValidatorFn, Validators } from '@angular/forms';

/**
 * validators used for form control validations.
 */
export class FormValidators {
    /**
     * A wrapper that validates that a control's value is defined before running the validator function.
     *
     * @param validator The validator function to run if the control's value is defined.
     */
    static createNullSafeValidator(validator: (...args: any[]) => unknown): ValidatorFn {
        const res = (control: FormControl) => {
            if (Validators.required(control)) {
                return null;
            }
            return validator(control);
        };
        return res;
    }

    /**
     * Create a validator that requires a number to be within a range.
     * Also checks that the value is numeric
     * Accepts a translation key to display proper error messaging
     */
    static isNumberInRange(min: number, max: number, translationKey = 'vcd.cc.warning.numRange'): ValidatorFn {
        const res = FormValidators.createNullSafeValidator((control: any) => {
            const isNumber = !isNaN(parseFloat(control.value)) && isFinite(control.value);
            return control.value >= min && control.value <= max && isNumber ? null : { [translationKey]: true };
        });
        return res;
    }
}
