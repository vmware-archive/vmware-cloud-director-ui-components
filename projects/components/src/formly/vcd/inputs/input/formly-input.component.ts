/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
    selector: 'vcd-formly-input',
    template: `
        <vcd-form-input
            [label]="to.label"
            [description]="to.description"
            [showAsterisk]="to.required"
            [isReadOnly]="to.isReadOnly"
            [errorLabels]="errorLabels"
            [placeholder]="to.placeholder"
            [min]="min"
            [max]="max"
            [type]="type"
            [formControl]="formControl"
            [size]="to.size"
            [maxlength]="to.maxlength"
            [hintPosition]="hintPosition"
            [hint]="to.hint"
            (enterClicked)="onEnterClicked()"
            (escapeClicked)="onEscapeClicked()"
        >
        </vcd-form-input>
    `,
})
export class FormlyInputComponent extends FieldType {
    /**
     * {@link FormInputComponent.min}
     */
    get min(): number {
        return this.to.min || Number.MIN_SAFE_INTEGER;
    }
    /**
     * {@link FormInputComponent.max}
     */
    get max(): number {
        return this.to.max || Number.MAX_SAFE_INTEGER;
    }
    /**
     * {@link FormInputComponent.type}
     */
    get type(): string {
        return this.to.type || 'text';
    }
    /**
     * {@link FormInputComponent.hintPosition}
     */
    get hintPosition(): string {
        return this.to.hintPosition || 'top-left';
    }
    /**
     * {@link FormInputComponent.errorLabels}
     */
    get errorLabels(): string[] {
        return this.to.errorLabels || [];
    }
    /**
     * {@link FormInputComponent.enterClicked}
     */
    onEnterClicked(): any {
        if (this.to.onEnterClicked) {
            return this.to.onEnterClicked(this.field);
        }
    }
    /**
     * {@link FormInputComponent.escapeClicked}
     */
    onEscapeClicked(): any {
        if (this.to.onEscapeClicked) {
            return this.to.onEscapeClicked(this.field);
        }
    }
}
