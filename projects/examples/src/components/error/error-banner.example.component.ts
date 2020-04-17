/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';

/**
 * Press the button to show/hide the error banner.
 */
@Component({
    selector: 'vcd-error-banner-example',
    templateUrl: './error-banner.example.component.html',
})
export class ErrorBannerExampleComponent {
    showError = false;
}
