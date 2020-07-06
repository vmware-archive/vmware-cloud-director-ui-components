/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { FormlyFormOptions } from '@ngx-formly/core';
import { Bytes, Unit, VCD_FORMLY_INPUT_TYPES, VcdFormlyFieldConfig } from '@vcd/ui-components';

enum UI_FIELDS {
    vcdFormlyInput = 'vcdFormlyInput',
    vcdFormlySelect = 'vcdFormlySelect',
    vcdNumberWithUnitInput = 'vcdNumberWithUnitInput',
}

@Component({
    template: `
        <div class="clr-form-horizontal">
            <formly-form [model]="model" [fields]="fields" [options]="options"></formly-form>
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
                label: 'Input',
            },
        },
        {
            key: UI_FIELDS.vcdFormlySelect,
            type: VCD_FORMLY_INPUT_TYPES.select,
            templateOptions: {
                label: 'Select input',
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
                inputValueUnit: (Bytes.MB as unknown) as Unit,
                unitOptions: (Bytes.types as unknown) as Unit[],
            },
        },
    ];
}
