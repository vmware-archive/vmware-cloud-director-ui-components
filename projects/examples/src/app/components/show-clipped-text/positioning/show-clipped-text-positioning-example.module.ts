/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowClippedTextPositioningExampleComponent } from './show-clipped-text-positioning-example.component';
import { ComponentsModule } from '@vcd/ui-components';

@NgModule({
    declarations: [ShowClippedTextPositioningExampleComponent],
    imports: [CommonModule, ComponentsModule],
    exports: [ShowClippedTextPositioningExampleComponent],
    entryComponents: [ShowClippedTextPositioningExampleComponent],
})
export class ShowClippedTextPositioningExampleModule {}
