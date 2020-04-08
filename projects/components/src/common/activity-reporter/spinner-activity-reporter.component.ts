/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { ActivityReporter } from './activity-reporter';

/**
 * Spinner activity reporter shows the spinner until an error or success message is returned.
 * An error message is displayed through the error banner.
 */
@Component({
    selector: 'vcd-cc-spinner-activity-reporter',
    templateUrl: './spinner-activity-reporter.component.html',
})
export class SpinnerActivityReporterComponent extends ActivityReporter {
    /**
     * When true show the spinner
     */
    public running = false;

    /**
     * When set show the error text
     */
    public errorText: string = null;

    constructor() {
        super();
    }

    /**
     * Begins to show the loading indicator to the user.
     */
    startActivity(): void {
        this.running = true;
        this.errorText = null;
    }

    /**
     * Hides the loading indicator and shows an error message.
     */
    reportError(errorText: string): void {
        this.errorText = errorText;
        this.running = false;
    }

    /**
     * Hides the loading indicator.
     */
    reportSuccess(): void {
        this.running = false;
    }
}
