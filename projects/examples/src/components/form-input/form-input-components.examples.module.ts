/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { FormInputComponent, FormSelectComponent } from '@vcd/ui-components';
import { Documentation } from '@vcd/ui-doc-lib';
import { FormInputExampleComponent } from './form-input.example.component';
import { FormInputExampleModule } from './form-input.example.module';
import { FormSelectExampleComponent } from './form-select.example.component';
import { FormSelectExampleModule } from './form-select.example.module';

Documentation.registerDocumentationEntry({
    component: FormInputComponent,
    displayName: 'Inputs',
    urlSegment: 'formInputs',
    examples: [
        {
            component: FormInputExampleComponent,
            forComponent: null,
            title: 'String, Number and Date form inputs',
        },
    ],
});

Documentation.registerDocumentationEntry({
    component: FormSelectComponent,
    displayName: 'Select',
    urlSegment: 'formSelect',
    examples: [
        {
            component: FormSelectExampleComponent,
            forComponent: null,
            title: 'Select form input',
        },
    ],
});

/**
 * A module that imports all error banner examples.
 */
@NgModule({
    imports: [FormInputExampleModule, FormSelectExampleModule],
})
export class FormInputComponentsExamplesModule {}
