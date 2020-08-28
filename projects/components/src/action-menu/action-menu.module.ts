/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { I18nModule } from '@vcd/i18n';
import { DropdownModule } from '../dropdown/dropdown.module';
import { ShowClippedTextDirectiveModule } from '../lib/directives/show-clipped-text.directive.module';
import { ActionMenuComponent } from './action-menu.component';
import { EntityActionExtensionComponentsDirective } from './extension-actions/extension-action-menu.directive';

@NgModule({
    imports: [ClarityModule, CommonModule, I18nModule, DropdownModule, ShowClippedTextDirectiveModule],
    declarations: [ActionMenuComponent, EntityActionExtensionComponentsDirective],
    providers: [],
    exports: [ActionMenuComponent, EntityActionExtensionComponentsDirective],
})
export class VcdActionMenuModule {}
