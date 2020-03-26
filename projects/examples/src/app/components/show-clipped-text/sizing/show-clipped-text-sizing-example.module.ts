/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '@vcd/ui-components';
import { ShowClippedTextSizingExampleComponent } from './show-clipped-text-sizing-example.component';

@NgModule({
    declarations: [ShowClippedTextSizingExampleComponent],
    imports: [CommonModule, FormsModule, ComponentsModule],
    exports: [ShowClippedTextSizingExampleComponent],
    entryComponents: [ShowClippedTextSizingExampleComponent],
})
export class ShowClippedTextSizingExampleModule {}
