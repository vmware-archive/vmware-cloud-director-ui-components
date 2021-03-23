/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { VcdActionMenuModule } from '@vcd/ui-components';
import { ActionMenuStaticActionsExampleComponent } from './action-menu-static-actions-example.component';

@NgModule({
    declarations: [ActionMenuStaticActionsExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, VcdActionMenuModule],
    exports: [ActionMenuStaticActionsExampleComponent],
    entryComponents: [ActionMenuStaticActionsExampleComponent],
})
export class ActionMenuStaticActionsExampleModule {}
