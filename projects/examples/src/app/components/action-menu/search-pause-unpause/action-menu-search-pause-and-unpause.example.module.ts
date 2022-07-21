/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { QuickSearchModule, VcdActionMenuModule } from '@vcd/ui-components';
import { ActionMenuSearchPauseUnpauseExampleComponent } from './action-menu-search-pause-and-unpause.example.component';

@NgModule({
    declarations: [ActionMenuSearchPauseUnpauseExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, VcdActionMenuModule, QuickSearchModule],
    exports: [ActionMenuSearchPauseUnpauseExampleComponent],
})
export class ActionMenuSearchPauseAndUnpauseExampleModule {}
