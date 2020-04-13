/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormModule } from '@vcd/ui-components';
import { FormSelectExampleComponent } from './form-select.example.component';

@NgModule({
    declarations: [FormSelectExampleComponent],
    imports: [FormModule, ReactiveFormsModule],
    exports: [FormSelectExampleComponent],
    entryComponents: [FormSelectExampleComponent],
})
export class FormSelectExampleModule {}
