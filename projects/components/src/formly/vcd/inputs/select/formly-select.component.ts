/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Observable, of } from 'rxjs';
import { SelectOption } from '../../../../common/interfaces/select-option';

@Component({
    selector: 'vcd-formly-select',
    template: `
        <vcd-form-select
            [label]="to.label"
            [description]="to.description"
            [showAsterisk]="to.required"
            [isReadOnly]="to.isReadOnly"
            [errorLabels]="errorLabels"
            [formControl]="formControl"
            [options]="selectOptions | async"
        >
        </vcd-form-select>
    `,
})
export class FormlySelectComponent extends FieldType {
    get errorLabels(): string[] {
        return this.to.errorLabels || [];
    }

    get selectOptions(): Observable<SelectOption[]> {
        if (!(this.to.options instanceof Observable)) {
            return of(this.to.options);
        }
        return this.to.options;
    }
}
