/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { WidgetObject } from '../../utils/test/widget-object';
import { BoldTextRendererComponent } from './bold-text-renderer.component';

/**
 * Widget Object for the bold text renderer.
 */
export class BoldTextRendererWidgetObject extends WidgetObject<BoldTextRendererComponent> {
    static tagName = 'vcd-bold-text-renderer';

    get text(): string {
        return this.findElement('strong').nativeElement.textContent;
    }
}
