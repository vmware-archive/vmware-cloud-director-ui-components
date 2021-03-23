/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { WidgetObject } from '../../utils/test/widget-object';
import { ErrorBannerComponent } from './error-banner.component';

/**
 * Testing Widget Object for {@link ErrorBannerComponent}
 */
export class ErrorBannerWidgetObject extends WidgetObject<ErrorBannerComponent> {
    static tagName = 'vcd-error-banner';

    /**
     * The ARIA role of the component.
     */
    get ariaRole(): string {
        return this.findElement('clr-alert').nativeElement.getAttribute('role');
    }
}
