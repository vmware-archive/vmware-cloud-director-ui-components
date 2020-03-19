/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { WidgetObject } from '../widget-object';
import { BannerActivityReporterComponent } from '../../../common/activity-reporter';

export class BannerActivityReporterWidgetObject extends WidgetObject<BannerActivityReporterComponent> {
    static tagName = 'vcd-banner-activity-reporter';

    get running(): boolean {
        return this.component.running;
    }

    get errorText(): string {
        return this.component.errorText;
    }

    get sucessText(): string {
        return this.component.successMessage;
    }

    get loadingText(): string {
        return this.findElement('clr-alert').nativeElement.textContent;
    }
}
