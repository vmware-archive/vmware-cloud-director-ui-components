/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { I18nModule } from '@vcd/i18n';
import { ComponentRendererOutletDirective } from './component-renderer-outlet.directive';

@NgModule({
    declarations: [ComponentRendererOutletDirective],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, ClarityModule, I18nModule],
    exports: [ComponentRendererOutletDirective],
})
export class VcdComponentRendererOutletModule {}
