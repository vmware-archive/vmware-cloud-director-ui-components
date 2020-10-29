/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { VcdActionMenuModule } from '@vcd/ui-components';
import { ActionMenuContextualActionsExampleComponent } from './action-menu-contextual-actions-example.component';

@NgModule({
    declarations: [ActionMenuContextualActionsExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, VcdActionMenuModule],
    exports: [ActionMenuContextualActionsExampleComponent],
    entryComponents: [ActionMenuContextualActionsExampleComponent],
})
export class ActionMenuContextualActionsExampleModule {}
