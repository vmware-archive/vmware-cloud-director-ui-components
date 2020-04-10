/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MockTranslationService, TranslationService } from '@vcd/i18n';
import { BannerActivityReporterWidgetObject } from '../../utils/test/activity-reporter/banner-activity-reporter.wo';
import { WidgetFinder } from '../../utils/test/widget-object';
import { ActivityReporterModule } from './activity-reporter.module';
import { BannerActivityReporterComponent } from './banner-activity-reporter.component';

@Component({
    template: `
        <vcd-temp-banner-activity-reporter [loadingMessage]="loadingMessage"></vcd-temp-banner-activity-reporter>
    `,
})
class TestBannerComponent {
    @ViewChild(BannerActivityReporterComponent, { static: true }) activityReporter: BannerActivityReporterComponent;
    loadingMessage: string;
}

interface HasFinderAndBanner {
    finder: WidgetFinder<TestBannerComponent>;
    // The Widget Object for the underlying Clarity grid
    banner: BannerActivityReporterWidgetObject;
    // The promise that's passed to the activity reporter.
    promise: Promise<string>;
    // The function that will reject the promise.
    reject: (error: string) => void;
    // The function that will resolve the promise.
    resolve: (response: string) => void;
}

describe('BannerActivityReporterComponent', () => {
    beforeEach(async function(this: HasFinderAndBanner): Promise<void> {
        await TestBed.configureTestingModule({
            imports: [ActivityReporterModule],
            declarations: [TestBannerComponent],
            providers: [
                {
                    provide: TranslationService,
                    useValue: new MockTranslationService(),
                },
            ],
        }).compileComponents();

        this.finder = new WidgetFinder(TestBannerComponent);
        this.banner = this.finder.find(BannerActivityReporterWidgetObject);
        this.promise = new Promise((promiseResolve, promiseReject) => {
            this.resolve = stuff => promiseResolve(stuff);
            this.reject = stuff => promiseReject(stuff);
        });
        this.finder.detectChanges();
    });

    it('displays a custom message while the promise is pending', function(this: HasFinderAndBanner): Promise<string> {
        this.finder.hostComponent.loadingMessage = 'loader';
        const promise = this.banner.component.monitorActivity(this.promise);
        this.finder.detectChanges();
        expect(this.banner.running).toBeTruthy();
        expect(this.banner.loadingText).toEqual('loader'); // Because of mock translation service
        this.resolve('winning!');
        return promise;
    });

    it('removes the activity reporter from the screen after the promise resolves', function(this: HasFinderAndBanner): Promise<
        void
    > {
        const promise = this.banner.component.monitorActivity(this.promise).then(() => {
            expect(this.banner.running).toBeFalsy();
            expect(this.banner.sucessText).toEqual('winning!');
            this.banner.component.onSuccessClosed();
            expect(this.banner.sucessText).toEqual(null);
        });

        this.finder.detectChanges();
        expect(this.banner.running).toBeTruthy();
        this.resolve('winning!');
        return promise;
    });

    it('displays an error on the screen if the promise is rejected', function(this: HasFinderAndBanner): Promise<void> {
        const promise = this.banner.component.monitorActivity(this.promise).then(() => {
            expect(this.banner.running).toBeFalsy();
            expect(this.banner.errorText).toEqual('Bad!');
            this.banner.component.onErrorClosed();
            expect(this.banner.errorText).toEqual(null);
        });

        // On call pending
        this.finder.detectChanges();
        expect(this.banner.running).toBeTruthy();

        this.reject('Bad!');
        return promise;
    });

    it('clears all content when reset', function(this: HasFinderAndBanner): Promise<string> {
        const promise = this.banner.component.monitorActivity(this.promise);
        this.finder.detectChanges();
        expect(this.banner.running).toBeTruthy();
        this.banner.component.reset();
        expect(this.banner.running).toBeFalsy();
        this.resolve('winning!');
        return promise;
    });
});
