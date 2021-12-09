/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { VcdComponentsModule } from '@vcd/ui-components';
import { HideClippedTextPositioningExampleComponent } from './hide-clipped-text-example.component';

@NgModule({
    declarations: [HideClippedTextPositioningExampleComponent],
    imports: [CommonModule, VcdComponentsModule, ClarityModule],
    exports: [HideClippedTextPositioningExampleComponent],
    entryComponents: [HideClippedTextPositioningExampleComponent],
})
export class HideClippedTextPositioningExampleModule {}
