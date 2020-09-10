/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@vcd/i18n';
import { VcdFormModule } from '@vcd/ui-components';
import { NumberWithUnitFormInputUnitlessExampleComponent } from './number-with-unit-form-input-unitless.example.component';

@NgModule({
    declarations: [NumberWithUnitFormInputUnitlessExampleComponent],
    imports: [CommonModule, VcdFormModule, ReactiveFormsModule, I18nModule],
    exports: [NumberWithUnitFormInputUnitlessExampleComponent],
    entryComponents: [NumberWithUnitFormInputUnitlessExampleComponent],
})
export class NumberWithUnitFormInputUnitlessExampleModule {}
