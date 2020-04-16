/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@vcd/i18n';
import { FormModule } from '@vcd/ui-components';
import { NumberWithUnitFormInputExampleComponent } from './number-with-unit-form-input.example.component';

@NgModule({
    declarations: [NumberWithUnitFormInputExampleComponent],
    imports: [FormModule, ReactiveFormsModule, I18nModule],
    exports: [NumberWithUnitFormInputExampleComponent],
    entryComponents: [NumberWithUnitFormInputExampleComponent],
})
export class NumberWithUnitFormInputExampleModule {}
