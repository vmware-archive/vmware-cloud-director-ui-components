/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { IdGenerator } from '../utils/id-generator/id-generator';
import { CanBeReadOnly } from './interfaces/can-be-read-only.interface';

const idGenerator = new IdGenerator('base-form-control-id');

/**
 * Wrapper to enforce UX decisions like readonly-ness, label position and error displaying. And also to make
 * the form control backing a form control name directive available to sub classes.
 */
export abstract class BaseFormControl implements ControlValueAccessor, CanBeReadOnly {
    /**
     * Auto generated ID for the input field.
     */
    id: string;

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
     * FormControlName directive
     */
    formControlNameDirective: NgControl;

    /**
     * To store the initial value of the input form control.
     */
    protected initialValue: number | string | boolean;

    protected constructor(ngControl: NgControl) {
        this.id = idGenerator.generate();
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
}
