/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { ConfigOption, FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { SelectOption } from '../../common/interfaces/select-option';
import { Unit } from '../../utils/unit/unit';
import { FormlyInputComponent } from './inputs/input/formly-input.component';
import { FormlyNumberWithUnitInputComponent } from './inputs/number-with-unit-input/formly-number-with-unit-input.component';
import { FormlySelectComponent } from './inputs/select/formly-select.component';

/**
 * Options that are specific to Vcd form components. These are passed as inputs or outputs in the HTML templates.
 */
export interface VcdFormlyTemplateOptions extends FormlyTemplateOptions {
    options?: SelectOption[] | Observable<SelectOption[]>;
    inputValueUnit?: Unit;
    unlimitedValue?: number;
    showUnlimitedOption?: boolean;
    unitOptions?: Unit[];
    isReadOnly?: boolean;
    hint?: string;
    hintPosition?: string;
    errorLabels?: string[];
    onEnterClicked?: (field: FormlyFieldConfig) => any;
    onEscapeClicked?: (field: FormlyFieldConfig) => any;
}

/**
 * Configuration of {@link FormlyForm.fields} that is specific to Vcd.
 */
export interface VcdFormlyFieldConfig extends FormlyFieldConfig {
    /**
     * {@link VCD_FORMLY_INPUT_TYPES}
     */
    type?: VCD_FORMLY_INPUT_TYPES;
    /**
     * {@link VcdFormlyTemplateOptions}
     */
    templateOptions?: VcdFormlyTemplateOptions;
    /**
     * {@link FormlyForm.fields}
     */
    fieldGroup?: VcdFormlyFieldConfig[];
}

/**
 * Different of Vcd form inputs that are configurable through Formly
 */
export enum VCD_FORMLY_INPUT_TYPES {
    /**
     * Used for identifying {@link FormlyInputComponent} type
     */
    input = 'input',
    /**
     * Used for identifying {@link FormlySelectComponent} type
     */
    select = 'select',
    /**
     * Used for identifying {@link FormlyNumberWithUnitInputComponent} type
     */
    number_with_unit_input = 'number_with_unit_input',
}

/**
 * For configuring the FormlyModule with Vcd specific Formly components and wrappers
 */
export const VCD_FORMLY_CONFIG: ConfigOption = {
    types: [
        {
            name: VCD_FORMLY_INPUT_TYPES.input,
            component: FormlyInputComponent,
        },
        {
            name: VCD_FORMLY_INPUT_TYPES.select,
            component: FormlySelectComponent,
        },
        {
            name: VCD_FORMLY_INPUT_TYPES.number_with_unit_input,
            component: FormlyNumberWithUnitInputComponent,
        },
    ],
};
