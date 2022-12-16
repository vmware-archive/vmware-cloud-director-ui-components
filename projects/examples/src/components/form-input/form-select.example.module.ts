/*!
 * Copyright 2022 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { VcdFormModule } from '@vcd/ui-components';
import { FormSelectDisabledOptionsExampleComponent } from './form-select-disabled-options.example.component';
import { FormSelectExampleComponent } from './form-select.example.component';
import { FormSelectValidationExampleComponent } from './form-select-validation.example.component';
import { FormSelectDisabledExampleComponent } from './form-select-disabled.example.component';

@NgModule({
    declarations: [
        FormSelectExampleComponent,
        FormSelectDisabledExampleComponent,
        FormSelectDisabledOptionsExampleComponent,
        FormSelectValidationExampleComponent,
    ],
    imports: [VcdFormModule, ReactiveFormsModule],
    exports: [FormSelectExampleComponent],
})
export class FormSelectExampleModule {}
