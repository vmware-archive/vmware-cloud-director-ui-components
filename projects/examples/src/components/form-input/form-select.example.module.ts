/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { VcdFormModule } from '@vcd/ui-components';
import { FormSelectDisabledOptionsExampleComponent } from './form-select-disabled-options.example.component';
import { FormSelectExampleComponent } from './form-select.example.component';
import { FormSelectValidationExampleComponent } from './form-select-validation.example.component';

@NgModule({
    declarations: [
        FormSelectExampleComponent,
        FormSelectDisabledOptionsExampleComponent,
        FormSelectValidationExampleComponent,
    ],
    imports: [VcdFormModule, ReactiveFormsModule],
    exports: [FormSelectExampleComponent],
})
export class FormSelectExampleModule {}
