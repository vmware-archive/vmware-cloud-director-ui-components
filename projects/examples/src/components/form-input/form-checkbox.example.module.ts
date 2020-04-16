/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormModule } from '@vcd/ui-components';
import { FormCheckboxExampleComponent } from './form-checkbox.example.component';

@NgModule({
    declarations: [FormCheckboxExampleComponent],
    imports: [FormModule, ReactiveFormsModule],
    exports: [FormCheckboxExampleComponent],
    entryComponents: [FormCheckboxExampleComponent],
})
export class FormCheckboxExampleModule {}
