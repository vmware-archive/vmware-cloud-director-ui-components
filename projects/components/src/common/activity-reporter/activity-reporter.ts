/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

type Response = string | undefined;

/**
 * Expresses the contract between a activity status and the UI displaying a loading message, reporting
 * success or errors
 * Currently, only one concurrent activity is supported.
 *
 * This classs should be abstract, but becuase mixins currently cannot use abstract classes, we chose
 * to make this class concrete.
 */
export class ActivityReporter {
    /**
     * Override this method to provide custom error reporting behavior.
     *
     * N.B. this should not be called from outside a subclass of {@link ActivityReporter}
     *
     *  @param errorText The text to display in the error alert.
     */
    reportError(errorText: string): void {}

    /**
     * Override this method to provide custom success reporting behavior.
     *
     * N.B. this should not be called from outside a subclass of {@link ActivityReporter}
     *
     * @param successMessage A message to display to the user.
     */
    reportSuccess(successMessage?: string): void {}

    /*
     * Override this method to provide custom error activity starting behavior.
     *
     * N.B. this should not be called from outside a subclass of {@link ActivityReporter}
     */
    startActivity(): void {}

    /**
     * Monitors an activity passed as a Promise
     * @param activityResolutionPromise Observable of the task representation
     * don't need a special finish indicator because other parts of the UI get updated
     */
    monitorActivity(activityResolutionPromise: Promise<Response>): Promise<Response> {
        this.startActivity();
        return activityResolutionPromise
            .then(activityResolution => {
                this.reportSuccess(activityResolution);
                return activityResolution;
            })
            .catch(error => {
                this.reportError(error);
                return error;
            });
    }
}
