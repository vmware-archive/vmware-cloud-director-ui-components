/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { WidgetObject } from '../utils/test/widget-object';
import { CliptextComponent } from './cliptext.component';

/**
 * Testing Object for {@link CliptextComponent}
 */
export class CliptextWidgetObject extends WidgetObject<CliptextComponent> {
    static tagName = 'vcd-cliptext';

    /**
     * Sends a mouseenter event for clr tooltip
     */
    mouseEnter(): void {
        this.findElement('.cliptext-container').triggerEventHandler('mouseenter', null);
        this.fixture.detectChanges();
    }

    /**
     * Sends a mouseleave event for clr tooltip
     */
    mouseLeave(): void {
        this.findElement('.cliptext-container').triggerEventHandler('mouseleave', null);
        this.fixture.detectChanges();
    }

    /**
     * Whether the tooltip is visible
     */
    get isShowingTooltip(): boolean {
        return Boolean(this.findElement('clr-tooltip-content'));
    }

    /**
     * The text content of the tooltip
     */
    get tooltipContent(): string {
        return this.getText('clr-tooltip-content');
    }
}
