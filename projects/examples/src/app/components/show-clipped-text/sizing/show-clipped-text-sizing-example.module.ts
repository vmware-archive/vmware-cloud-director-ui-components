/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShowClippedTextSizingExampleComponent } from './show-clipped-text-sizing-example.component';
import { ComponentsModule } from '@vcd/ui-components';

@NgModule({
    declarations: [ShowClippedTextSizingExampleComponent],
    imports: [CommonModule, FormsModule, ComponentsModule],
    exports: [ShowClippedTextSizingExampleComponent],
    entryComponents: [ShowClippedTextSizingExampleComponent],
})
export class ShowClippedTextSizingExampleModule {}
