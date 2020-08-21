/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { VcdActionMenuModule } from '@vcd/ui-components';
import { ActionMenuWithSeparatorsExampleComponent } from './action-menu-with-separators.example.component';

@NgModule({
    declarations: [ActionMenuWithSeparatorsExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, VcdActionMenuModule],
    exports: [ActionMenuWithSeparatorsExampleComponent],
    entryComponents: [ActionMenuWithSeparatorsExampleComponent],
})
export class ActionMenuWithSeparatorsExampleModule {}
