/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormModule } from '@vcd/ui-components';
import { FormInputExampleComponent } from './form-input.example.component';

@NgModule({
    declarations: [FormInputExampleComponent],
    imports: [FormModule, ReactiveFormsModule],
    exports: [FormInputExampleComponent],
    entryComponents: [FormInputExampleComponent],
})
export class FormInputExampleModule {}
