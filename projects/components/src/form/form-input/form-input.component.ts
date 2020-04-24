/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { AfterViewInit, Component, ElementRef, Input, Optional, Self, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BaseFormControl } from '../base-form-control';

/**
 * A {@link FormControl} that contains an input that supports string, number and datetime-local input types
 *
 * Example:
 *      <vcd-form-input
 *          type="number"
 *          [formControlName]="Fields.port"
 *          [placeholder]="'port'|translate"
 *          [label]="'network.services.firewall.sourcePort'|translate">
 *      </vcd-form-input>
 */
@Component({
    selector: 'vcd-form-input',
    templateUrl: './form-input.component.html',
    styleUrls: ['../form.scss', './form-input.component.scss'],
})
export class FormInputComponent extends BaseFormControl implements AfterViewInit {
    /**
     * Input 'placeholder' field.
     */
    @Input() placeholder: string = null;

    /**
     * Minimum value allowed.
     * (This is an input specified in the component attribute.)
     */
    @Input() min = Number.MIN_SAFE_INTEGER;

    /**
     * Maximum value allowed.
     * (This is an input specified in the component attribute.)
     */
    @Input() max = Number.MAX_SAFE_INTEGER;

    /**
     * Input 'type' field.
     */
    @Input() type = 'text';

    /**
     * Input 'size' field.
     */
    @Input() size: number = null;

    /**
     * Maximum number of characters (in UTF-16 code units) that the user can enter.
     */
    @Input() maxlength: number = null;

    /**
     * The direction for displaying the hint
     */
    @Input() hintPosition = 'top-left';

    /**
     * Hint to display in the content of a signpost
     */
    @Input() hint: string;

    /**
     * The input field element
     */
    @ViewChild('textInput', { static: true }) textInput: ElementRef;

    constructor(@Self() @Optional() controlDirective: NgControl) {
        super(controlDirective);
    }

    /**
     * Input fields in the vcd-ui app does not support IME input on chrome browser. So in order to fix it, the value
     * being assigned to the form control has to be given to the input HTML element's value using the 'viewChild' query
     * selector inside writeValue function.
     */
    writeValue(value: any): void {
        // The textInput view child element is undefined the first time. So, the initial value is stored in a variable
        // to assign it later to the input field value.
        this.initialValue = value;
        if (!this.textInput) {
            return;
        }

        if (typeof value === 'number') {
            value = value.toString(10);
        }
        if (this.type === 'datetime-local') {
            value = getFormattedDateValue(value);
        }
        this.textInput.nativeElement.value = value;
    }

    ngAfterViewInit(): void {
        // The textInput view child element is only defined after this life cycle hook. So, the writeValue is called
        // here.
        this.writeValue(this.initialValue);
    }

    inputChanged(): void {
        const value = this.textInput.nativeElement.value;
        this.initialValue = value;

        if (this.type === 'number') {
            if (!value) {
                this.onChange(value);
            } else {
                this.onChange(parseFloat(value));
            }
            return;
        }
        if (this.type === 'datetime-local' && value !== '') {
            const isoDateValue = new Date(getFormattedDateValue(value)).toISOString();
            this.onChange(isoDateValue);
            return;
        }
        this.onChange(value);
    }
}

/**
 * To format a date string into a value which can be given to the input html element
 */
export function getFormattedDateValue(value: string): string {
    const date = new Date(value);
    return (
        date.getFullYear() +
        '-' +
        pad(date.getMonth() + 1) +
        '-' +
        pad(date.getDate()) +
        'T' +
        pad(date.getHours()) +
        ':' +
        pad(date.getMinutes())
    );
}

export function pad(num: number): string | number {
    if (num < 10) {
        return '0' + num;
    }
    return num;
}
