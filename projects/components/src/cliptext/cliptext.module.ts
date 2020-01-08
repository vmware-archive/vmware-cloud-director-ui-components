/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CliptextComponent } from './cliptext.component';
import { ClarityModule } from '@clr/angular';

@NgModule({
    declarations: [CliptextComponent],
    exports: [CliptextComponent],
    imports: [CommonModule, ClarityModule],
})
export class CliptextModule {}
