/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Directive, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NgControl, ValidatorFn } from '@angular/forms';
import { TranslationService } from '@vcd/i18n';
import { IdGenerator } from '../utils/id-generator/id-generator';
import { CanBeReadOnly } from './interfaces/can-be-read-only.interface';

const idGenerator = new IdGenerator('base-form-control-id');

/**
 * For a given control, apply the given validator and override its setValidators method so that this default validator will always
 * be applied
 * @param control - Control to receive a default validator
 * @param defaultValidator - Validator that will always be present for the form control
 */
export function defaultValidatorForControl(control: AbstractControl, defaultValidator: ValidatorFn): void {
    // `control.validator` may be null, use filter to prevent passing in a null validator
    control.setValidators([defaultValidator, control.validator].filter(Boolean));

    const oldSetValidators = control.setValidators;
    control.setValidators = (validators) => {
        // Could be array, single value or null
        const validatorsArray = Array.isArray(validators) ? validators : [validators].filter(Boolean);
        return oldSetValidators.call(control, [defaultValidator, ...validatorsArray]);
    };
}
/**
 * Wrapper to enforce UX decisions like readonly-ness, label position and error displaying. And also to make
 * the form control backing a form control name directive available to sub classes.
 */
@Directive({})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class BaseFormControl implements ControlValueAccessor, CanBeReadOnly {
    /**
     * Auto generated ID for the input field.
     */
    readonly id: string = idGenerator.generate();

    /**
     * Auto generated ID for the description field.
     */
    readonly descriptionId: string = `${this.id}-description`;

    /**
     * Auto generated ID for the error field.
     */
    readonly errorsId: string = `${this.id}-errors`;

    /**
     * Change callback.
     */
    onChange: (...args: unknown[]) => unknown;

    /**
     * Touch callback.
     */
    onTouch: (...args: unknown[]) => unknown;

    /**
     * Whether the control is disabled.
     */
    disabled = false;

    /**
     * Show the asterisk next to the control when true
     */
    @Input() showAsterisk = false;

    /**
     * The label that appears before the control
     */
    @Input() label: string;

    /**
     * The description that appears below the control
     * \u00A0 is &nbsp; (non-breaking space)
     */
    @Input() description = '\u00A0';

    /**
     * Whether this component is in readonly mode
     */
    @Input() isReadOnly = false;

    /**
     * Error labels to be used instead of NgControl error keys
     */
    @Input() errorLabels: string[] = [];

    /**
     * If this is true, Clarity responsive classes will be added to the component's elements so that label and input
     * elements are on separate lines when on small screens or inside small containers.
     *
     * Note that if a form control is being used inside a `.clr-form-vertical`, the controls should all have
     * isResponsive set to false, since that will cause labels to always display on a separate line and adding
     * the responsive styles would interfere with that
     */
    @Input() isResponsive = true;

    /**
     * FormControlName directive
     */
    formControlNameDirective: NgControl;

    /**
     * To store the initial value of the input form control.
     */
    protected initialValue: number | string | boolean;

    constructor(ngControl: NgControl, protected translationService: TranslationService) {
        if (ngControl) {
            ngControl.valueAccessor = this;
            this.formControlNameDirective = ngControl;
        }
    }

    /**
     * The FormControl associated with the FormControlName directive
     */
    get formControl(): FormControl {
        return this.formControlNameDirective
            ? (this.formControlNameDirective.control as FormControl)
            : new FormControl('');
    }

    get showErrors(): boolean {
        return this.formControl.enabled && !this.formControl.pristine && !this.formControl.valid;
    }

    /**
     * Errors from the form control validation
     */
    get errorKeys(): string[] {
        if (this.errorLabels.length) {
            return this.errorLabels;
        }
        return Object.keys(this.formControl.errors || {});
    }

    /**
     * Return the translated error strings.
     */
    get translatedErrors(): string[] {
        return this.errorKeys.map((errorKey) => {
            return this.translationService.translate(
                errorKey,
                this.getTranslationParams(this.formControl.errors[errorKey])
            );
        });
    }

    registerOnChange(onChange: (...args: unknown[]) => unknown): void {
        this.onChange = onChange;
    }

    registerOnTouched(onTouched: (...args: unknown[]) => unknown): void {
        this.onTouch = onTouched;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    writeValue(val: any): void {}

    /**
     * When errorObjectValue param is not an array we pass back the control's value to stay backward compatible.
     */
    private getTranslationParams(errorObjectValue: any): any {
        if (Array.isArray(errorObjectValue)) {
            return errorObjectValue;
        }

        return [this.formControl.value];
    }
}
