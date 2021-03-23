/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { I18nModule } from '@vcd/i18n';
import { DrawerComponent } from './drawer/drawer.component';
import { QuickSearchComponent } from './quick-search.component';

@NgModule({
    imports: [CommonModule, ClarityModule, FormsModule, ReactiveFormsModule, I18nModule],
    declarations: [QuickSearchComponent, DrawerComponent],
    exports: [QuickSearchComponent],
})
export class QuickSearchModule {}
