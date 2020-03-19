/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ViewChild } from '@angular/core';
import { BannerActivityReporterComponent, ActivityReporter } from '@vcd/ui-components';

/**
 * Press the button to show/hide the banner activity reporter
 */
@Component({
    selector: 'vcd-banner-activity-reporter-example',
    templateUrl: './banner-activity-reporter.example.component.html',
})
export class BannerActivityReporterExampleComponent {
    showBanner = false;
    resolve;
    reject;

    @ViewChild(BannerActivityReporterComponent, { static: true }) reporter: ActivityReporter;

    startActivity(): void {
        this.showBanner = true;
        this.reporter
            .monitorActivity(
                new Promise((resolve, reject) => {
                    this.reject = reject;
                    this.resolve = resolve;
                })
            )
            .then(result => {
                this.showBanner = false;
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
