/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'vcd-hide-clipped-text-example',
    templateUrl: './hide-clipped-text-example.component.html',
    styleUrls: ['./hide-clipped-text-example.component.scss'],
})
export class HideClippedTextPositioningExampleComponent implements OnInit {
    public isClippedContainerVisible: boolean = true;

    constructor() {}

    ngOnInit(): void {}

    toggleContainer(): void {
        this.isClippedContainerVisible = !this.isClippedContainerVisible;
    }
}
