/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { ActivityReporter } from './activity-reporter';

interface HasPromiseAndReporter {
    // The data about the promise for {@link ActivityReporter.monitorEdit}.
    promise: Promise<string>;
    // The function that will reject the promise.
    reject: (error: string) => void;
    // The function that will resolve the promise.
    resolve: (resolved: string) => void;
    // Spys on {@link ActivityReporter.start}
    startSpy: jasmine.Spy;
    // Spys on {@link ActivityReporter.reporterError}
    reportErrorSpy: jasmine.Spy;
    // Spys on {@link ActivityReporter.reporterSuccess}
    reportSuccessSpy: jasmine.Spy;
    // The activity reporter used for testing.
    reporter: ActivityReporter;
}

describe('ActivityReporter', () => {
    beforeEach(function(this: HasPromiseAndReporter): void {
        this.promise = new Promise<string>((promiseResolve, promiseReject) => {
            this.resolve = stuff => promiseResolve(stuff);
            this.reject = stuff => promiseReject(stuff);
        });

        this.reporter = new SimpleReporter();
        this.startSpy = spyOn(this.reporter, 'startActivity');
        this.reportErrorSpy = spyOn(this.reporter, 'reportError');
        this.reportSuccessSpy = spyOn(this.reporter, 'reportSuccess');
    });

    class SimpleReporter extends ActivityReporter {
        reportError(errorText: string): void {}

        reportSuccess(successMessage?: string): void {}

        startActivity(): void {}
    }

    describe('monitorActivity', () => {
        it('reports success when the promise is resolved', function(this: HasPromiseAndReporter): Promise<void> {
            const getPromise = this.reporter.monitorActivity(this.promise);
            expect(this.startSpy).toHaveBeenCalledTimes(1);

            const toReturn = getPromise.then(result => {
                expect(this.reportSuccessSpy).toHaveBeenCalledTimes(1);
            });

            this.resolve('wow!');

            return toReturn;
        });

        it('reports error when the promise is rejected', function(this: HasPromiseAndReporter): Promise<void> {
            const getPromise = this.reporter.monitorActivity(this.promise);
            expect(this.startSpy).toHaveBeenCalledTimes(1);
            const toReturn = getPromise.then(result => {
                expect(this.reportErrorSpy).toHaveBeenCalledWith('bad!');
            });
            this.reject('bad!');
            return toReturn;
        });
    });
});
