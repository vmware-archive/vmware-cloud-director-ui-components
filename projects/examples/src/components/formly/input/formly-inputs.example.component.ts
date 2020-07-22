/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { FormlyFormOptions } from '@ngx-formly/core';
import { Bytes, Unit, VcdFormlyFieldConfig, VcdFormlyInputTypes } from '@vcd/ui-components';

enum UiFields {
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
        [UiFields.vcdFormlyInput]: null,
        [UiFields.vcdFormlySelect]: null,
        [UiFields.vcdNumberWithUnitInput]: null,
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
            key: UiFields.vcdFormlyInput,
            type: VcdFormlyInputTypes.input,
            templateOptions: {
                label: 'Input',
            },
        },
        {
            key: UiFields.vcdFormlySelect,
            type: VcdFormlyInputTypes.select,
            templateOptions: {
                label: 'Select input',
                options: [],
            },
            expressionProperties: {
                'templateOptions.options': (model, formState) => formState.selectOptions,
            },
        },
        {
            key: UiFields.vcdNumberWithUnitInput,
            type: VcdFormlyInputTypes.number_with_unit_input,
            templateOptions: {
                label: 'Number with unit input',
                inputValueUnit: (Bytes.MB as unknown) as Unit,
                unitOptions: (Bytes.types as unknown) as Unit[],
            },
        },
    ];
}
