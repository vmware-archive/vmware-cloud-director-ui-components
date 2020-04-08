/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SpinnerActivityReporterWidgetObject } from '../../utils/test/activity-reporter/spinner-activity-reporter.wo';
import { WidgetFinder } from '../../utils/test/widget-object';
import { ActivityReporterModule } from './activity-reporter.module';
import { SpinnerActivityReporterComponent } from './spinner-activity-reporter.component';

@Component({
    template: `
        <vcd-cc-spinner-activity-reporter #activityReporter></vcd-cc-spinner-activity-reporter>
    `,
})
class TestSpinnerComponent {
    @ViewChild('activityReporter', { static: true }) activityReporter: SpinnerActivityReporterComponent;
}

interface HasFinderAndSpinner {
    finder: WidgetFinder<TestSpinnerComponent>;
    // The Widget Object for the underlying Clarity grid
    spinner: SpinnerActivityReporterWidgetObject;
    // The promise that's passed to the activity reporter.
    promise: Promise<string>;
    // The function that will reject the promise.
    reject: (error: string) => void;
    // The function that will resolve the promise.
    resolve: (response: string) => void;
}

describe('SpinnerActivityReporterComponent', () => {
    beforeEach(async function(this: HasFinderAndSpinner): Promise<void> {
        await TestBed.configureTestingModule({
            imports: [ActivityReporterModule],
            declarations: [TestSpinnerComponent],
        }).compileComponents();

        this.finder = new WidgetFinder(TestSpinnerComponent);
        this.spinner = this.finder.find(SpinnerActivityReporterWidgetObject);
        this.promise = new Promise((promiseResolve, promiseReject) => {
            this.resolve = stuff => promiseResolve(stuff);
            this.reject = stuff => promiseReject(stuff);
        });
        this.finder.detectChanges();
    });

    it('displays the spinner while the promise is pending', function(this: HasFinderAndSpinner): Promise<string> {
        const promise = this.spinner.component.monitorActivity(this.promise);
        this.finder.detectChanges();
        expect(this.spinner.isSpinnerSpinning()).toBeTruthy();
        this.resolve('wow!');
        return promise;
    });

    it('removes the activity reporter from the screen after the promise resolves', function(this: HasFinderAndSpinner): Promise<
        void
    > {
        const promise = this.spinner.component.monitorActivity(this.promise).then(() => {
            this.finder.detectChanges();
            expect(this.spinner.running).toBeFalsy();
            expect(this.spinner.isSpinnerSpinning()).toBeFalsy();
        });

        this.finder.detectChanges();
        this.resolve('wow!');
        return promise;
    });

    it('displays an error on the screen if the promise is rejected', function(this: HasFinderAndSpinner): Promise<
        void
    > {
        const promise = this.spinner.component.monitorActivity(this.promise).then(() => {
            expect(this.spinner.running).toBeFalsy();
            expect(this.spinner.errorText).toEqual('Woah there!');
        });
        this.finder.detectChanges();
        this.reject('Woah there!');
        return promise;
    });
});
