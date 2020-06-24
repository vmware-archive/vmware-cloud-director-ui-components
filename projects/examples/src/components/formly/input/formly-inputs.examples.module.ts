/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { VcdFormlyModule } from '@vcd/ui-components';
import { Documentation } from '@vmw/ng-live-docs';
import { FormlyInputsExampleComponent } from './formly-inputs.example.component';

/**
 * Formly library's FieldType wrappers around the vcd form inputs. Used for rendering the vcd forms using JS objects.
 */
@Component({
    selector: 'vcd-formly-inputs',
    template: ``,
})
export class FormlyInputsComponent {
    /**
     * This is a dummy component created only for providing the JS doc required for the content of Documentation tab in
     * examples website. This is because, Vcd formly inputs follow the same object configuration
     * {@link VcdFormlyFieldConfig} and they don't require a separate component for each Vcd formly input and they
     * also don't require a separate nav item in our website.
     */
}

Documentation.registerDocumentationEntry({
    component: FormlyInputsComponent,
    displayName: 'Vcd Formly Inputs',
    urlSegment: 'vcdFormlyInputs',
    examples: [
        {
            component: FormlyInputsExampleComponent,
            forComponent: null,
            title: 'Vcd Formly Inputs',
        },
    ],
});

/**
 * A module that imports all error banner examples.
 */
@NgModule({
    declarations: [FormlyInputsComponent, FormlyInputsExampleComponent],
    imports: [VcdFormlyModule, ReactiveFormsModule, FormlyModule],
    exports: [FormlyInputsExampleComponent],
    entryComponents: [FormlyInputsExampleComponent],
})
export class FormlyInputComponentsExamplesModule {}
