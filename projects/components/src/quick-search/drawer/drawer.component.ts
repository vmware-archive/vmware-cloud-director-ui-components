/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
import { Component, Input } from '@angular/core';

const CLARITY_HEADER_HEIGHT = 60;

@Component({
    selector: 'vcd-drawer-component',
    templateUrl: './drawer.component.html',
    styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent {
    @Input() topOffset: number = 0;
    @Input() headerHeight: number = CLARITY_HEADER_HEIGHT;

    get containerHeight(): string {
        return 'calc(100vh - ' + (this.topOffset + this.headerHeight) + 'px)';
    }
}
