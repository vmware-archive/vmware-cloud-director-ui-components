/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { VcdActionMenuModule } from '@vcd/ui-components';
import { ActionMenuDataUiExampleComponent } from './action-menu-data-ui-example.component';

@NgModule({
    declarations: [ActionMenuDataUiExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, VcdActionMenuModule],
    exports: [ActionMenuDataUiExampleComponent],
})
export class ActionMenuDataUiExampleModule {}
