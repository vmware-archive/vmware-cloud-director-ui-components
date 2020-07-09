/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { VcdFormlyFieldConfig, VcdFormlyInputTypes, VcdFormlyTemplateOptions } from '@vcd/ui-components';

enum UiFields {
    basic = 'basic',
    basicWithWrapper = 'basicWithWrapper',
    initialValue = 'initialValue',
    builtInValidator = 'builtInValidator',
    customValidator = 'customValidator',
    dynamicTemplateOption = 'dynamicTemplateOption',
}

@Component({
    template: `
        <div class="clr-form-horizontal">
            <formly-form [model]="model" [fields]="fields" [options]="options"></formly-form>
            <br />
            <a role="tooltip" aria-haspopup="true" class="tooltip">
                <button class="btn btn-primary" (click)="submit()">Log form value</button>
                <span class="tooltip-content"
                    >Click this to see the values of all above inputs as part of a form value being printed in the
                    browser console using FormlyForm's model input object</span
                >
            </a>
        </div>
    `,
})
export class FormlyInputFeaturesExampleComponent {
    model: unknown = {
        [UiFields.basic]: null,
        [UiFields.basicWithWrapper]: null,
        [UiFields.initialValue]: 'This is the initial value',
        [UiFields.builtInValidator]: null,
        [UiFields.customValidator]: null,
        [UiFields.dynamicTemplateOption]: null,
    };

    options: FormlyFormOptions = {
        formState: {
            label: 'Dynamic label',
        },
    };

    fields: VcdFormlyFieldConfig[] = [
        {
            key: UiFields.basic,
            type: VcdFormlyInputTypes.input,
            templateOptions: {
                label: 'Basic input without wrapper',
                placeholder: 'Placeholder',
                description: 'This input does not have any wrapping component around it like other inputs below',
            },
        },
        {
            key: UiFields.basicWithWrapper,
            wrappers: ['vcd-formly-input-example-wrapper'],
            type: VcdFormlyInputTypes.input,
            templateOptions: {
                label: 'Input',
                placeholder: 'Placeholder',
                cardTitle: 'Basic input with wrapper component',
                description:
                    'Basic input with wrapper around it. This input along with all the inputs below has a wrapper component set using' +
                    ' templateOption called wrapper. Refer to FormlyInputComponentsExamplesModule in the code base to see how a custom' +
                    'wrapper component is made part of VcdFormlyModule.',
            },
        },
        {
            key: UiFields.initialValue,
            wrappers: ['vcd-formly-input-example-wrapper'],
            type: VcdFormlyInputTypes.input,
            templateOptions: {
                label: 'Input',
                cardTitle: 'Initial value',
                description: 'Input with an initial value set using the FormlyForm model input',
            },
        },
        {
            key: UiFields.builtInValidator,
            wrappers: ['vcd-formly-input-example-wrapper'],
            type: VcdFormlyInputTypes.input,
            templateOptions: {
                ...TEMPLATE_OPTIONS,
                label: 'Required input',
                required: true,
                cardTitle: 'Built in validator',
                description:
                    'This input is made required using builtin validation added by the required templateOption',
            },
        },
        {
            key: UiFields.customValidator,
            wrappers: ['vcd-formly-input-example-wrapper'],
            type: VcdFormlyInputTypes.input,
            templateOptions: {
                ...TEMPLATE_OPTIONS,
                cardTitle: 'Custom validator',
                description:
                    'Enter an input of more than 4 characters in length to see the custom max length validator being applied',
            },
            validators: {
                validation: [customMaxLengthValidatorFunction],
            },
        },
        {
            key: UiFields.dynamicTemplateOption,
            wrappers: ['vcd-formly-input-example-wrapper'],
            type: VcdFormlyInputTypes.input,
            templateOptions: {
                ...TEMPLATE_OPTIONS,
                cardTitle: 'Dynamic template option',
                description: 'Input label will be changed to whatever is typed into the input field',
            },
            expressionProperties: {
                'templateOptions.label': 'formState.label',
            },
            hooks: {
                onInit: (field?: FormlyFieldConfig) => {
                    field.formControl.valueChanges.subscribe(val => {
                        this.options.formState.label = val;
                    });
                },
            },
        },
    ];

    submit(): void {
        console.log(this.model);
    }
}

const TEMPLATE_OPTIONS: VcdFormlyTemplateOptions = {
    label: 'Input',
    placeholder: 'Placeholder',
    onEnterClicked: (field: FormlyFieldConfig) => {
        console.log('Enter clicked: ', field.formControl.value);
    },
    onEscapeClicked: (field: FormlyFieldConfig) => {
        console.log('Esc clicked: ', field.formControl.value);
    },
};

function customMaxLengthValidatorFunction(control: FormControl): ValidationErrors {
    return control && control.value && control.value.length < 5 ? null : { ['maxLengthError']: true };
}
