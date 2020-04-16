/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { I18nModule } from '@vcd/i18n';
import { UnitFormatter } from '../utils/unit/unit-formatter';
import { FormCheckboxComponent } from './form-checkbox/form-checkbox.component';
import { FormInputComponent } from './form-input/form-input.component';
import { FormSelectComponent } from './form-select/form-select.component';
import {
    MinMaxValidator,
    NumberWithUnitFormInputComponent,
} from './number-with-unit-input/number-with-unit-form-input.component';

const declarations = [
    FormInputComponent,
    FormSelectComponent,
    FormCheckboxComponent,
    NumberWithUnitFormInputComponent,
    MinMaxValidator,
];

@NgModule({
    imports: [ClarityModule, FormsModule, ReactiveFormsModule, CommonModule, I18nModule],
    declarations,
    providers: [UnitFormatter],
    exports: [...declarations],
})
export class FormModule {}
