/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { FormValidators } from './validators';

describe('FormValidators', () => {
    describe('createNullSafeValidator', () => {
        it('runs the given validator only when there is value on the form control', () => {
            const formControl = new FormControl(null);
            const nullSafeValidator = FormValidators.createNullSafeValidator;
            const maxLengthOf2Validator = Validators.maxLength(2);
            expect(nullSafeValidator(maxLengthOf2Validator)(formControl)).toBeNull();
            formControl.setValue('123');
            expect(nullSafeValidator(maxLengthOf2Validator)(formControl)).toEqual(maxLengthOf2Validator(formControl));
        });
    });
    describe('isNumberInRange', () => {
        let formControl: FormControl;
        let numberInRangeValidator: ValidatorFn;
        beforeEach(() => {
            formControl = new FormControl();
            numberInRangeValidator = FormValidators.isNumberInRange(1, 10, 'translation.key');
        });
        it('returns error when a form control value is not a number', () => {
            formControl.setValue('str');
            expect(numberInRangeValidator(formControl)).toEqual({ 'translation.key': true });
        });
        it('returns null when a form control value is within the given range or returns error otherwise', () => {
            formControl.setValue(5);
            expect(numberInRangeValidator(formControl)).toBeNull();
            formControl.setValue(11);
            expect(numberInRangeValidator(formControl)).toEqual({ 'translation.key': true });
        });
    });
});
