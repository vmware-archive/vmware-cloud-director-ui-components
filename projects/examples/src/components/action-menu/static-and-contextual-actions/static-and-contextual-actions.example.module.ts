/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { VcdActionMenuModule } from '@vcd/ui-components';
import { StaticAndContextualActionsExampleComponent } from './static-and-contextual-actions.example.component';

@NgModule({
    declarations: [StaticAndContextualActionsExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, VcdActionMenuModule],
    exports: [StaticAndContextualActionsExampleComponent],
    entryComponents: [StaticAndContextualActionsExampleComponent],
})
export class StaticAndContextualActionsExampleModule {}
