/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { VcdActionMenuModule } from '@vcd/ui-components';
import { ActionMenuHideDisableExampleComponent } from './action-menu-hide-disable-example.component';

@NgModule({
    declarations: [ActionMenuHideDisableExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, VcdActionMenuModule],
    exports: [ActionMenuHideDisableExampleComponent],
    entryComponents: [ActionMenuHideDisableExampleComponent],
})
export class ActionMenuHideDisableExampleModule {}
