/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { VcdActionMenuModule } from '@vcd/ui-components';
import { StaticActionsExampleComponent } from './static-actions.example.component';

@NgModule({
    declarations: [StaticActionsExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, VcdActionMenuModule],
    exports: [StaticActionsExampleComponent],
    entryComponents: [StaticActionsExampleComponent],
})
export class StaticActionsExampleModule {}
