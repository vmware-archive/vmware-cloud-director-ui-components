/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { CliptextModule } from '@vcd/ui-components';
import { CliptextDynamicInlineExampleComponent } from './cliptext-dynamic-inline.example.component';

@NgModule({
    declarations: [CliptextDynamicInlineExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, CliptextModule],
    exports: [CliptextDynamicInlineExampleComponent],
    entryComponents: [CliptextDynamicInlineExampleComponent],
})
export class CliptextDynamicInlineExampleModule {}
