/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { VcdFormModule } from '@vcd/ui-components';
import { FormSelectDisabledExampleComponent } from './form-select-disabled.example.component';
import { FormSelectExampleComponent } from './form-select.example.component';

@NgModule({
    declarations: [FormSelectExampleComponent, FormSelectDisabledExampleComponent],
    imports: [VcdFormModule, ReactiveFormsModule],
    exports: [FormSelectExampleComponent],
    entryComponents: [FormSelectExampleComponent],
})
export class FormSelectExampleModule {}
