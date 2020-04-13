/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { I18nModule } from '@vcd/i18n';
import { FormInputComponent } from './form-input/form-input.component';
import { FormSelectComponent } from './form-select/form-select.component';

const declarations = [FormInputComponent, FormSelectComponent];

@NgModule({
    imports: [ClarityModule, FormsModule, ReactiveFormsModule, CommonModule, I18nModule],
    declarations,
    exports: [...declarations],
})
export class FormModule {}
