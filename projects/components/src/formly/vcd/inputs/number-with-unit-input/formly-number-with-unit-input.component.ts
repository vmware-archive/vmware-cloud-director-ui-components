/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { UNLIMITED } from '../../../../form/number-with-unit-input/number-with-unit-form-input.component';

@Component({
    selector: 'vcd-formly-number-with-unit-input',
    template: `
        <vcd-number-with-unit-form-input
            [label]="to.label"
            [description]="to.description"
            [showAsterisk]="to.required"
            [isReadOnly]="to.isReadOnly"
            [errorLabels]="errorLabels"
            [placeholder]="to.placeholder"
            [min]="min"
            [max]="max"
            [formControl]="formControl"
            [size]="to.size"
            [maxlength]="to.maxlength"
            [hintPosition]="hintPosition"
            [hint]="to.hint"
            [showUnlimitedOption]="showUnlimitedOption"
            [unlimitedValue]="unlimitedValue"
            [inputValueUnit]="to.inputValueUnit"
            [unitOptions]="to.unitOptions"
        >
        </vcd-number-with-unit-form-input>
    `,
})
export class FormlyNumberWithUnitInputComponent extends FieldType {
    /**
     * {@link NumberWithUnitFormInputComponent.errorLabels}
     */
    get errorLabels(): string[] {
        return this.to.errorLabels || [];
    }
    /**
     * {@link NumberWithUnitFormInputComponent.min}
     */
    get min(): number {
        return this.to.min || UNLIMITED;
    }
    /**
     * {@link NumberWithUnitFormInputComponent.max}
     */
    get max(): number {
        return this.to.max || Number.MAX_SAFE_INTEGER;
    }
    /**
     * {@link NumberWithUnitFormInputComponent.hintPosition}
     */
    get hintPosition(): string {
        return this.to.hintPosition || 'top-left';
    }
    /**
     * {@link NumberWithUnitFormInputComponent.showUnlimitedOption}
     */
    get showUnlimitedOption(): boolean {
        if (typeof this.to.showUnlimitedOption !== 'boolean') {
            return true;
        }
        return this.to.showUnlimitedOption;
    }
    /**
     * {@link NumberWithUnitFormInputComponent.unlimitedValue}
     */
    get unlimitedValue(): number {
        return this.to.unlimitedValue || UNLIMITED;
    }
}
