/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { DebugElement } from '@angular/core';
import { SpinnerActivityReporterComponent } from '../../../common/activity-reporter';
import { WidgetObject } from '../widget-object';

export class SpinnerActivityReporterWidgetObject extends WidgetObject<SpinnerActivityReporterComponent> {
    static tagName = 'vcd-spinner-activity-reporter';

    get running(): boolean {
        return this.component.running;
    }

    get errorText(): string {
        return this.component.errorText;
    }

    /**
     * Gives the spinner for this element
     */
    private getSpinner(): DebugElement {
        const element = this.findElement('.spinner');

        if (!element) {
            throw new Error('Could not find the spinner element.');
        }
        return element;
    }

    public isSpinnerSpinning(): boolean {
        try {
            return !!this.getSpinner();
        } catch (error) {
            return false;
        }
    }
}
