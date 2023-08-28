/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipSize, VcdComponentsModule } from '@vcd/ui-components';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';

@Component({
    standalone: true,
    selector: 'vcd-focusing-clipped-text-example',
    templateUrl: 'focusing-clipped-text-example.component.html',
    styleUrls: ['focusing-clipped-text-example.component.scss'],
    imports: [CommonModule, VcdComponentsModule, ClarityModule, FormsModule],
})
export class FocusingClippedTextExampleComponent {
    protected readonly TooltipSize = TooltipSize;
}
