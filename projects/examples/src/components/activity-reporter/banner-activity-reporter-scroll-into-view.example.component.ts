/*!
 * Copyright 2023 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ViewChild } from '@angular/core';
import { ActivityReporter, BannerActivityReporterComponent } from '@vcd/ui-components';

/**
 * Scroll into view of the banner activity reporter
 */
@Component({
    selector: 'vcd-banner-activity-reporter-scroll-into-view-example',
    templateUrl: './banner-activity-reporter-scroll-into-view.example.component.html',
})
export class BannerActivityReporterScrollIntoViewExampleComponent {
    showBanner = false;
    resolve;
    reject;

    @ViewChild(BannerActivityReporterComponent, { static: true }) reporter: ActivityReporter;

    startActivity(): void {
        this.showBanner = true;
        this.reporter
            .monitorGet(
                new Promise((resolve, reject) => {
                    this.reject = reject;
                    this.resolve = resolve;
                })
            )
            .then((result) => {
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
