/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { I18nModule } from '@vcd/i18n';
import { ShowClippedTextDirectiveModule } from '../lib/directives/show-clipped-text.directive.module';
import { DropdownComponent } from './dropdown.component';

@NgModule({
    declarations: [DropdownComponent],
    imports: [CommonModule, ReactiveFormsModule, ClarityModule, I18nModule, ShowClippedTextDirectiveModule],
    exports: [DropdownComponent],
})
export class DropdownModule {}
