/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { VcdActionMenuModule, VcdComponentsModule } from '@vcd/ui-components';
import { ActionMenuExampleComponent } from './action-menu.example.component';

@NgModule({
    declarations: [ActionMenuExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, VcdActionMenuModule],
    exports: [ActionMenuExampleComponent],
    entryComponents: [ActionMenuExampleComponent],
})
export class ActionMenuExampleModule {}
