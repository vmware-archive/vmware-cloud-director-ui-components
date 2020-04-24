/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { VcdFormModule } from '@vcd/ui-components';
import { FormInputExampleComponent } from './form-input.example.component';

@NgModule({
    declarations: [FormInputExampleComponent],
    imports: [VcdFormModule, ReactiveFormsModule],
    exports: [FormInputExampleComponent],
    entryComponents: [FormInputExampleComponent],
})
export class FormInputExampleModule {}
