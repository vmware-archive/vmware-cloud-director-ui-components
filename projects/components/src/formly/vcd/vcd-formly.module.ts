/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlySelectModule } from '@ngx-formly/core/select';
import { I18nModule } from '@vcd/i18n';
import { VcdFormModule } from '../../form';
import { FormlyInputComponent } from './inputs/input/formly-input.component';
import { FormlyNumberWithUnitInputComponent } from './inputs/number-with-unit-input/formly-number-with-unit-input.component';
import { FormlySelectComponent } from './inputs/select/formly-select.component';
import { VCD_FORMLY_CONFIG } from './vcd-formly.config';

const VCD_FORMLY_INPUT_COMPONENTS = [FormlyInputComponent, FormlySelectComponent, FormlyNumberWithUnitInputComponent];

@NgModule({
    declarations: [...VCD_FORMLY_INPUT_COMPONENTS],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormlyModule.forChild(VCD_FORMLY_CONFIG),
        VcdFormModule,
        FormlySelectModule,
        I18nModule,
    ],
    exports: [],
})
export class VcdFormlyModule {}
