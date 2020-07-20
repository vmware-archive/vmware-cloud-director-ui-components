/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { VcdFormlyModule } from '@vcd/ui-components';
import { Documentation } from '@vmw/ng-live-docs';
import { FormlyInputExampleWrapperComponent } from './formly-input-example-wrapper.component';
import { FormlyInputFeaturesExampleComponent } from './formly-input-features.example.component';
import { FormlyInputsExampleComponent } from './formly-inputs.example.component';

/**
 * Our VcdFormlyModule has all the form inputs that can be configured using JS objects instead of HTML. It is built
 * using NgxFormly(https://formly.dev/)
 * The examples tab has two sections:
 * 1. **Features of vcd formly inputs section:** Shows different available features of Vcd formly inputs
 * 2. **List of available vcd formly inputs section:** Displays available Vcd formly inputs
 */
@Component({
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
            component: FormlyInputFeaturesExampleComponent,
            forComponent: null,
            title: 'Features of vcd formly inputs',
            urlSegment: 'formly-input-features',
        },
        {
            component: FormlyInputsExampleComponent,
            forComponent: null,
            title: 'List of available Vcd Formly Inputs',
            urlSegment: 'formly-inputs',
        },
    ],
});

/**
 * A module that imports all error banner examples.
 */
@NgModule({
    declarations: [
        FormlyInputsComponent,
        FormlyInputsExampleComponent,
        FormlyInputFeaturesExampleComponent,
        FormlyInputExampleWrapperComponent,
    ],
    imports: [
        VcdFormlyModule.forRoot({
            wrappers: [
                {
                    name: 'vcd-formly-input-example-wrapper',
                    component: FormlyInputExampleWrapperComponent,
                },
            ],
        }),
        ReactiveFormsModule,
        FormlyModule,
    ],
    exports: [FormlyInputsExampleComponent, FormlyInputFeaturesExampleComponent],
    entryComponents: [
        FormlyInputsExampleComponent,
        FormlyInputFeaturesExampleComponent,
        FormlyInputExampleWrapperComponent,
    ],
})
export class FormlyInputComponentsExamplesModule {}
