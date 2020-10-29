/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { VcdActionMenuModule } from '@vcd/ui-components';
import { ActionMenuStaticAndContextualActionsExampleComponent } from './action-menu-static-and-contextual-actions-example.component';

@NgModule({
    declarations: [ActionMenuStaticAndContextualActionsExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, VcdActionMenuModule],
    exports: [ActionMenuStaticAndContextualActionsExampleComponent],
    entryComponents: [ActionMenuStaticAndContextualActionsExampleComponent],
})
export class ActionMenuStaticAndContextualActionsExampleModule {}
