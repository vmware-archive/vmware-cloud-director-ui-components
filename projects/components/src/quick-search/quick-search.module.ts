/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { I18nModule } from '@vcd/i18n';
import { QuickSearchComponent } from './quick-search.component';

@NgModule({
    imports: [CommonModule, ClarityModule, FormsModule, ReactiveFormsModule, I18nModule],
    declarations: [QuickSearchComponent],
    exports: [QuickSearchComponent],
})
export class QuickSearchModule {}
