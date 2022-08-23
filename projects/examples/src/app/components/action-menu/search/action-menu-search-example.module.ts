/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { QuickSearchModule, VcdActionMenuModule } from '@vcd/ui-components';
import { ActionMenuSearchExampleComponent } from './action-menu-search-example.component';

@NgModule({
    declarations: [ActionMenuSearchExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, VcdActionMenuModule, QuickSearchModule],
    exports: [ActionMenuSearchExampleComponent],
})
export class ActionMenuSearchExampleModule {}
