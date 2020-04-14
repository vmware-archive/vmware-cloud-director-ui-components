/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ViewChild } from '@angular/core';
import { ActivityReporter, SpinnerActivityReporterComponent } from '@vcd/ui-components';

/**
 * Press the button to show/hide the spinner activity reporter
 */
@Component({
    selector: 'vcd-temp-spinner-activity-reporter-example',
    templateUrl: './spinner-activity-reporter.example.component.html',
})
export class SpinnerActivityReporterExampleComponent {
    showSpinner = false;
    resolve;
    reject;

    @ViewChild(SpinnerActivityReporterComponent, { static: true }) reporter: ActivityReporter;

    startActivity(): void {
        this.showSpinner = true;
        this.reporter
            .monitorActivity(
                new Promise((resolve, reject) => {
                    this.reject = reject;
                    this.resolve = resolve;
                })
            )
            .then(result => {
                this.showSpinner = false;
                return result;
            });
    }

    throwError(): void {
        this.reject('Error!!');
    }

    reportSuccess(): void {
        this.resolve('done!');
    }
}
