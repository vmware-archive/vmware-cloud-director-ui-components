/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BaseFormControl } from '../base-form-control';

export enum CheckBoxStyling {
    CHECKBOX = 'checkbox',
    TOGGLESWITCH = 'toggle-switch',
}

/**
 * {@link FormControl} wrapper around a input HTML element of checkbox type. The label input from
 * {@link BaseFormControl} is used for displaying a label on the left of a form field and the text input is used for
 * displaying label on the right of checkbox. Use the 'styling' property with a value of 'checkbox' or 'toggle-switch'
 * to display a checkbox or toggle switch on the UI.
 *
 * Example:
 *      <vcd-form-checkbox [formControlName]="Fields.port" [label]="'enabled'|translate"
 *                         [text]="'feature.enabled'|translate">
 *      </vcd-form-checkbox>
 */
@Component({
    selector: 'vcd-form-checkbox',
    templateUrl: './form-checkbox.component.html',
})
export class FormCheckboxComponent extends BaseFormControl {
    /**
     * The label that appears next to the control
     */
    @Input() text: string;

    /**
     * Styling for the checkbox.
     */
    @Input() styling: CheckBoxStyling = CheckBoxStyling.CHECKBOX;

    /**
     * Put the label text on the right.
     */
    @Input() rightLabel = false;

    /**
     * A shape for the icon that appears next to the checkbox.
     */
    @Input() iconShape: string;

    get isCheckbox(): boolean {
        return this.styling === CheckBoxStyling.CHECKBOX;
    }

    constructor(@Self() @Optional() controlDirective: NgControl) {
        super(controlDirective);
    }
}
