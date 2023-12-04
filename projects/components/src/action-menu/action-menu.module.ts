/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { I18nModule } from '@vcd/i18n';
import { DropdownModule } from '../dropdown/dropdown.module';
import { IconsModule } from '../icons';
import { ShowClippedTextDirectiveModule } from '../lib/directives/show-clipped-text.directive.module';
import { ActionMenuComponent } from './action-menu.component';

@NgModule({
    imports: [ClarityModule, CommonModule, I18nModule, DropdownModule, ShowClippedTextDirectiveModule, IconsModule],
    declarations: [ActionMenuComponent],
    providers: [],
    exports: [ActionMenuComponent],
})
export class VcdActionMenuModule {}
