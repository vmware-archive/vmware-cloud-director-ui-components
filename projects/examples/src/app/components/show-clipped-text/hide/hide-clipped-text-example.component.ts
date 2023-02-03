/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';

@Component({
    selector: 'vcd-hide-clipped-text-example',
    templateUrl: './hide-clipped-text-example.component.html',
    styleUrls: ['./hide-clipped-text-example.component.scss'],
})
export class HideClippedTextPositioningExampleComponent {
    public isClippedContainerVisible: boolean = true;

    toggleContainer(): void {
        this.isClippedContainerVisible = !this.isClippedContainerVisible;
    }
}
