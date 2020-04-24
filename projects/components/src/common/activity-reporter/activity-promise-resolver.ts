/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

/**
 * The response that was given with some resource.
 */
export interface ActivityResponse {
    /**
     * The error message, if any, from the activity.
     *
     * A response without an error is assumed to have succeeded.
     */
    error?: string;
    /**
     * The response message, if any, from the activity.
     */
    success?: string;
}

/**
 * A combination of some object and the response that gave that object.
 */
export interface ObjectAndResponse<T> {
    /**
     * The data that was returned from a given activity, if any.
     */
    object?: T;
    /**
     * The response that an activity returned.
     */
    response: ActivityResponse;
}

/**
 * A class that understands how to take a promise and turn it into some response message for display.
 * A client of this library will override {@link ActivityPromiseResolver} to process their specific type of promise.
 * This override will know how to generate a {@link ObjectAndResponse} from the type of promise it processes.
 *
 * @param T The type that is returned from a promise that this resolver processes.
 */
export class ActivityPromiseResolver<T> {
    /**
     * Takes a Promise and turns it to some activity status
     * @param activityResolutionPromise The activity that this resolver will generate a response from. It generates
     * either a sucesss or a failure condition.
     * @param successMessage The success message this method should return if the activity succeeds. If undefined is passed,
     * a succeeded promise will return an empty response parameter which is assumed to mean success.
     */
    resolveActivity(activityResolutionPromise: Promise<T>, successMessage?: string): Promise<ObjectAndResponse<T>> {
        return activityResolutionPromise
            .then(result => {
                return {
                    object: result,
                    response: { ...result, success: successMessage || result },
                };
            })
            .catch(error => {
                return { response: { error } };
            });
    }

    /**
     * Takes a Promise of many items and turns it to some activity status
     * @param activityResolutionPromise The activity that this resolver will generate a response from. It generates
     * either a sucesss or a failure condition. There are many entities contained in this response.
     * @param successMessage The success message this method should return if the activity succeeds. If undefined is passed,
     * a succeeded promise will return an empty response parameter which is assumed to mean success.
     */
    resolveActivities(
        activityResolutionPromises: Promise<T[]>,
        successMessage?: string
    ): Promise<(ObjectAndResponse<T>)[]> {
        return activityResolutionPromises
            .then(result => {
                return [
                    {
                        object: result[0],
                        response: { ...result, success: successMessage },
                    },
                ];
            })
            .catch(error => {
                return [{ response: { error } }];
            });
    }
}
