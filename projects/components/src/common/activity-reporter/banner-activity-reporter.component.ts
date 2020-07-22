/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Inject, Input } from '@angular/core';
import { TranslationService } from '@vcd/i18n';
import { LazyString } from '@vcd/i18n';
import { ActivityPromiseResolver } from './activity-promise-resolver';
import { ActivityReporter } from './activity-reporter';

/**
 * Shows a banner to the user to represent the state of an activity.
 */
@Component({
    selector: 'vcd-banner-activity-reporter',
    templateUrl: './banner-activity-reporter.component.html',
})
export class BannerActivityReporterComponent extends ActivityReporter {
    running = false;
    errorText: string;
    successMessage: string;

    /**
     * The translated message that is displayed to the user while loading.
     */
    @Input()
    loadingMessage: LazyString = this.translationService.translateAsync('vcd.cc.loading');

    constructor(
        private translationService: TranslationService,
        @Inject(ActivityPromiseResolver) promiseResolver: ActivityPromiseResolver<any>
    ) {
        super(promiseResolver);
    }

    /**
     * Begins to show the banner with a loading indicator.
     */
    startActivity(): void {
        this.running = true;
        this.successMessage = null;
        this.errorText = null;
    }

    /**
     * Shows the given {@param errorText} to the user.
     */
    reportError(errorText: string): void {
        this.errorText = errorText;
        this.running = false;
    }

    /**
     * Shows the given {@param successMessage} to the user.
     */
    reportSuccess(successMessage: string): void {
        if (successMessage) {
            this.successMessage = successMessage;
        }
        this.running = false;
    }

    /**
     * Closes the error message if displayed.
     */
    onErrorClosed(): void {
        this.errorText = null;
    }

    /**
     * Closes the success message if displayed.
     */
    onSuccessClosed(): void {
        this.successMessage = null;
    }

    /*
     * Reset the banner activity state manually.
     *
     * Call it when banner should be reset to its default state.
     */
    reset(): void {
        this.running = false;
        this.errorText = null;
        this.successMessage = null;
    }
}
