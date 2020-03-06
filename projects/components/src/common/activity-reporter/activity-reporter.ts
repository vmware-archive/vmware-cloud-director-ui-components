/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

type Response = string | undefined;

/**
 * Expresses the contract between a activity status and the UI displaying a loading message, reporting
 * success or errors
 * Currently, only one concurrent activity is supported.
 */
export abstract class ActivityReporter {
    /**
     * Indicates the operation completed with an error
     *
     *  @param errorText The text to display in the error alert.
     */
    abstract reportError(errorText: string): void;

    /**
     * Indicates the operation completed successfully
     *
     * @param successMessage A message to display to the user.
     */
    abstract reportSuccess(successMessage?: string): void;

    /*
     * Indicates an operation has started and the UI should show an activity indicator
     */
    abstract startActivity(): void;

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
