/*!
 * Copyright 2022 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import {
    FormCheckboxComponent,
    FormInputComponent,
    FormSelectComponent,
    NumberWithUnitFormInputComponent,
} from '@vcd/ui-components';
import { Documentation } from '@vmw/ng-live-docs';
import { FormCheckboxExampleComponent } from './form-checkbox.example.component';
import { FormCheckboxExampleModule } from './form-checkbox.example.module';
import { FormInputExampleComponent } from './form-input.example.component';
import { FormInputExampleModule } from './form-input.example.module';
import { FormSelectDisabledOptionsExampleComponent } from './form-select-disabled-options.example.component';
import { FormSelectExampleComponent } from './form-select.example.component';
import { FormSelectExampleModule } from './form-select.example.module';
import { NumberWithUnitFormInputUnitlessExampleComponent } from './number-with-unit-form-input-unitless.example.component';
import { NumberWithUnitFormInputUnitlessExampleModule } from './number-with-unit-form-input-unitless.example.module';
import { NumberWithUnitFormInputExampleComponent } from './number-with-unit-form-input.example.component';
import { NumberWithUnitFormInputExampleModule } from './number-with-unit-form-input.example.module';
import { FormSelectValidationExampleComponent } from './form-select-validation.example.component';
import { FormSelectDisabledExampleComponent } from './form-select-disabled.example.component';

Documentation.registerDocumentationEntry({
    component: FormInputComponent,
    displayName: 'Inputs',
    urlSegment: 'formInputs',
    examples: [
        {
            component: FormInputExampleComponent,
            title: 'String, Number and Date form inputs',
            urlSegment: 'form-input',
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
            title: 'Select form input',
            urlSegment: 'form-select',
        },
        {
            component: FormSelectDisabledOptionsExampleComponent,
            title: 'Select form input with disabled options',
            urlSegment: 'form-select-disabled-options',
        },
        {
            component: FormSelectValidationExampleComponent,
            title: 'Select form input validation',
            urlSegment: 'form-select-validation',
        },
        {
            component: FormSelectDisabledExampleComponent,
            title: 'Disabled and ReadOnly Select form input',
            urlSegment: 'form-select-disabled',
        },
    ],
});

Documentation.registerDocumentationEntry({
    component: FormCheckboxComponent,
    displayName: 'Checkbox',
    urlSegment: 'formCheckbox',
    examples: [
        {
            component: FormCheckboxExampleComponent,
            title: 'Checkbox form input',
            urlSegment: 'form-checkbox',
        },
    ],
});

Documentation.registerDocumentationEntry({
    component: NumberWithUnitFormInputComponent,
    displayName: 'Number with unit input',
    urlSegment: 'numberWithUnitFormInput',
    examples: [
        {
            component: NumberWithUnitFormInputExampleComponent,
            title: 'Number with unit form input',
            urlSegment: 'number-with-unit-form-input',
        },
        {
            component: NumberWithUnitFormInputUnitlessExampleComponent,
            title: 'Unitless',
            urlSegment: 'number-with-unit-form-input-unitless',
        },
    ],
});

/**
 * A module that imports all error banner examples.
 */
@NgModule({
    imports: [
        FormInputExampleModule,
        FormSelectExampleModule,
        FormCheckboxExampleModule,
        NumberWithUnitFormInputExampleModule,
        NumberWithUnitFormInputUnitlessExampleModule,
    ],
})
export class FormInputComponentsExamplesModule {}
