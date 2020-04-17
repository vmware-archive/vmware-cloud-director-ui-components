/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { BannerActivityReporterComponent } from '../../../common/activity-reporter';
import { WidgetObject } from '../widget-object';

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
