/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Input, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { TranslationService } from '@vcd/i18n';
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

    /**
     * The direction for displaying the hint
     */
    @Input() hintPosition = 'top-left';

    /**
     * Hint to display in the content of a signpost
     */
    @Input() hint: string;

    constructor(@Self() @Optional() ngControl: NgControl, protected translationService: TranslationService) {
        super(ngControl, translationService);
    }

    get selectedOption(): SelectOption {
        if (!this.options || this.formControl.value === null || this.formControl.value === undefined) {
            return undefined;
        }
        // option.value and formControl.value can be of type number or string
        return this.options.find((option) => option.value.toString() === this.formControl.value.toString());
    }
}
