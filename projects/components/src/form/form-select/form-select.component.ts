/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Input, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { SelectOption } from '../../common/interfaces/select-option';
import { BaseFormControl } from '../base-form-control';

/**
 * {@link FormControl} wrapper around a select HTML element
 */
@Component({
    selector: 'vcd-form-select',
    templateUrl: 'form-select.component.html',
    styleUrls: ['../form.scss', './form-select.component.scss'],
})
export class FormSelectComponent extends BaseFormControl {
    /**
     * The displayed options for the select element
     */
    @Input() options: SelectOption[] = [];

    constructor(@Self() @Optional() ngControl: NgControl) {
        super(ngControl);
    }

    get selectedOption(): SelectOption {
        if (!this.options) {
            return undefined;
        }
        // option.value is string | number. Also, formControl.value is string when the dropdown value is manually chosen
        // from the view. It can also be a number when the formControl's value is set from outside to be number. So,
        // we convert both to strings before doing a strict equality.
        return this.options.find(option => option.value.toString() === this.formControl.value.toString());
    }
}
