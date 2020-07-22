/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { ActivityPromiseResolver } from './activity-promise-resolver';

/**
 * Expresses the contract between a activity status and the UI displaying a loading message, reporting
 * success or errors
 * Currently, only one concurrent activity is supported.
 */
export abstract class ActivityReporter {
    /**
     * Creates this reporter with the performer that it will use to monitor events.
     */
    constructor(private promiseResolver: ActivityPromiseResolver<unknown>) {}
    /*
     * Override this method to provide custom error activity starting behavior.
     */
    abstract startActivity(): void;
    /**
     * Override this method to provide custom error reporting behavior.
     *
     *  @param errorText The text to display in the error alert.
     */
    abstract reportError(errorText: string): void;
    /**
     * Override this method to provide custom success reporting behavior.
     *
     * @param successMessage A message to display to the user.
     */
    abstract reportSuccess(successMessage: string): void;

    /**
     * Monitors a promise that returns an entity using {@link ActivityPromiseResolver.monitorActivity}.
     */
    async monitorGet<T>(activityResolutionPromise: Promise<T>): Promise<T> {
        this.startActivity();
        const performer = this.promiseResolver as ActivityPromiseResolver<T>;
        const response = await performer.resolveActivity(activityResolutionPromise);
        if (response.response.error) {
            this.reportError(response.response.error);
        } else {
            this.reportSuccess(response.response.success);
        }
        return response.object;
    }

    /**
     * Monitors a promise that returns many entities using {@link ActivityPromiseResolver.monitorActivities}.
     */
    async monitorGetAll<T>(activityResolutionPromises: Promise<T[]>): Promise<T[]> {
        this.startActivity();
        const performer = this.promiseResolver as ActivityPromiseResolver<T>;
        const response = await performer.resolveActivities(activityResolutionPromises);
        const returnValue = response.map(item => item.object);
        if (response.length) {
            for (const item of response) {
                if (item.response.error) {
                    this.reportError(item.response.error);
                    return returnValue;
                }
            }
            this.reportSuccess(response[0].response.success);
        }
        return returnValue;
    }

    /**
     * Monitors a promise that returns an entity and posts a successMessage using {@link ActivityPromiseResolver.monitorActivity}.
     */
    async monitorEdit<T>(activityResolutionPromise: Promise<T>, successMessage?: string): Promise<T> {
        this.startActivity();
        const performer = this.promiseResolver as ActivityPromiseResolver<T>;
        const response = await performer.resolveActivity(activityResolutionPromise, successMessage);
        if (response.response.error) {
            this.reportError(response.response.error);
        } else {
            this.reportSuccess(response.response.success);
        }
        return response.object;
    }
}
