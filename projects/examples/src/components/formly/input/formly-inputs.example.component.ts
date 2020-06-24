/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Unit, VCD_FORMLY_INPUT_TYPES, VcdFormlyFieldConfig } from '@vcd/ui-components';
import { Bytes } from '../../../../../components/src/utils';

enum UI_FIELDS {
    vcdFormlyInput = 'vcdFormlyInput',
    vcdFormlySelect = 'vcdFormlySelect',
    vcdNumberWithUnitInput = 'vcdNumberWithUnitInput',
}

@Component({
    template: `
        <div class="clr-form-horizontal">
            <formly-form [model]="model" [fields]="fields" [options]="options"></formly-form>
            <button class="btn-primary btn-sm" (click)="submit()">Log the form values</button>
        </div>
    `,
})
export class FormlyInputsExampleComponent {
    model: any = {
        [UI_FIELDS.vcdFormlyInput]: null,
        [UI_FIELDS.vcdFormlySelect]: null,
        [UI_FIELDS.vcdNumberWithUnitInput]: null,
    };

    options: FormlyFormOptions = {
        formState: {
            inputHintPosition: 'top-left',
            selectOptions: [
                { value: '', display: '' },
                { value: 1, display: 'One', isTranslatable: false },
                { value: 2, display: 'required', isTranslatable: true },
            ],
        },
    };

    fields: VcdFormlyFieldConfig[] = [
        {
            key: UI_FIELDS.vcdFormlyInput,
            type: VCD_FORMLY_INPUT_TYPES.input,
            templateOptions: {
                label: 'Hint position',
                placeholder: 'Enter position of the hint',
                required: true,
                showAsterisk: '',
                onEnterClicked: (field: FormlyFieldConfig) => {
                    console.log('Enter clicked: ', field.formControl.value);
                },
                onEscapeClicked: (field: FormlyFieldConfig) => {
                    console.log('Esc clicked: ', field.formControl.value);
                },
                hint: 'Position of the hint can be changed by typing the direction(eg: top-left) into the input field',
            },
            expressionProperties: {
                'templateOptions.hintPosition': 'formState.inputHintPosition',
            },
            hooks: {
                onInit: (field?: FormlyFieldConfig) => {
                    field.formControl.valueChanges.subscribe(val => {
                        if (val === 'top-right') {
                            this.options.formState.inputHintPosition = val;
                        }
                    });
                },
            },
        },
        {
            key: UI_FIELDS.vcdFormlySelect,
            type: VCD_FORMLY_INPUT_TYPES.select,
            templateOptions: {
                label: 'Select input',
                required: true,
                showAsterisk: true,
                errorLabels: ['error_label1'],
                options: [],
            },
            expressionProperties: {
                'templateOptions.options': (model, formState) => formState.selectOptions,
            },
        },
        {
            key: UI_FIELDS.vcdNumberWithUnitInput,
            type: VCD_FORMLY_INPUT_TYPES.number_with_unit_input,
            templateOptions: {
                label: 'Number with unit input',
                required: true,
                showAsterisk: true,
                inputValueUnit: (Bytes.MB as unknown) as Unit,
                unitOptions: (Bytes.types as unknown) as Unit[],
            },
        },
    ];

    submit(): void {
        console.log(this.model);
    }
}
