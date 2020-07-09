/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
    selector: 'vcd-formly-input-example-wrapper',
    template: `
        <div class="card">
            <div class="card-block">
                <h3 class="card-title">{{ to.cardTitle }}</h3>
                <div class="card-text">
                    <ng-container #fieldComponent></ng-container>
                </div>
            </div>
        </div>
    `,
})
export class FormlyInputExampleWrapperComponent extends FieldWrapper {
    @ViewChild('fieldComponent', { static: true, read: ViewContainerRef })
    fieldComponent: ViewContainerRef;
}
