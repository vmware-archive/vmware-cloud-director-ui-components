/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '@vcd/ui-components';
import { ShowClippedTextPositioningExampleComponent } from './show-clipped-text-positioning-example.component';

@NgModule({
    declarations: [ShowClippedTextPositioningExampleComponent],
    imports: [CommonModule, ComponentsModule],
    exports: [ShowClippedTextPositioningExampleComponent],
    entryComponents: [ShowClippedTextPositioningExampleComponent],
})
export class ShowClippedTextPositioningExampleModule {}
