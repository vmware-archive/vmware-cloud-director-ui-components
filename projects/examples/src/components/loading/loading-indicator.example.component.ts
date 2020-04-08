/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';

/**
 * Press the button to start/stop the loading indicator.
 */
@Component({
    selector: 'vcd-cc-loading-indicator-example',
    templateUrl: './loading-indicator.example.component.html',
})
export class LoadingIndicatorExampleComponent {
    isLoading = false;
}
