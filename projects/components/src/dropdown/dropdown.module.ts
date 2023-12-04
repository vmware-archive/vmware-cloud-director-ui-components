/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { I18nModule } from '@vcd/i18n';
import { IconsModule } from '../icons';
import { ShowClippedTextDirectiveModule } from '../lib/directives/show-clipped-text.directive.module';
import { DropdownFocusHandlerDirective } from './dropdown.component';
import { DropdownComponent } from './dropdown.component';
import { DynamicDropdownPositionDirective } from './dynamic-dropdown-position.directive';

@NgModule({
    declarations: [DropdownComponent, DynamicDropdownPositionDirective, DropdownFocusHandlerDirective],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ClarityModule,
        I18nModule,
        ShowClippedTextDirectiveModule,
        IconsModule,
    ],
    exports: [DropdownComponent, DynamicDropdownPositionDirective, DropdownFocusHandlerDirective],
})
export class DropdownModule {}
