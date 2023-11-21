/*!
 * Copyright 2020-2023 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { WidgetFinder } from '../../utils/test/widget-object';
import { ErrorBannerComponent } from './error-banner.component';
import { VcdErrorBannerModule } from './error-banner.module';
import { ErrorBannerWidgetObject } from './error-banner.wo';

@Component({
    template: ` <vcd-error-banner #banner [(errorMessage)]="message"></vcd-error-banner> `,
})
class TestErrorComponent {
    message: string;
    @ViewChild('banner') errorBanner: ErrorBannerComponent;
}

interface HasFinderAndError {
    finder: WidgetFinder<TestErrorComponent>;
    errorBannerWO: ErrorBannerWidgetObject;
}

describe('ErrorBannerComponent', () => {
    beforeEach(async function (this: HasFinderAndError): Promise<void> {
        await TestBed.configureTestingModule({
            imports: [VcdErrorBannerModule],
            declarations: [TestErrorComponent],
        }).compileComponents();

        this.finder = new WidgetFinder(TestErrorComponent);
        this.errorBannerWO = this.finder.find({ woConstructor: ErrorBannerWidgetObject });
        this.finder.detectChanges();
    });

    describe('general', () => {
        it('can display an error', function (this: HasFinderAndError): void {
            this.finder.hostComponent.message = 'Error!!';
            this.finder.detectChanges();
            expect(this.errorBannerWO.getDisplayedError()).toBe('Error!!');
        });

        it('hides the error when closed with the X button', function (this: HasFinderAndError): void {
            this.finder.hostComponent.message = 'Error!!';
            this.finder.detectChanges();
            this.errorBannerWO.close();
            this.finder.detectChanges();
            expect(this.errorBannerWO.getDisplayedError()).toBe('');
        });

        it('hides the error when closed with null', function (this: HasFinderAndError): void {
            this.finder.hostComponent.message = 'Error!!';
            this.finder.detectChanges();
            this.finder.hostComponent.message = null;
            this.finder.detectChanges();
            expect(this.errorBannerWO.getDisplayedError()).toBe('');
        });
    });

    describe('errorMessage two-way binding', () => {
        beforeEach(function (this: HasFinderAndError): void {
            this.finder.hostComponent.message = 'Error!!';
            this.finder.detectChanges();
        });

        it('sets the errorMessage to null when closed with the X button', function (this: HasFinderAndError): void {
            this.errorBannerWO.close();
            this.finder.detectChanges();
            expect(this.finder.hostComponent.message).toBe(null);
            expect(this.errorBannerWO.getDisplayedError()).toBe('');
        });

        it('does not reset the errorMessage when closed with null', function (this: HasFinderAndError): void {
            this.finder.hostComponent.message = null;
            this.finder.detectChanges();
            expect(this.finder.hostComponent.message).toBe(null);
            expect(this.errorBannerWO.getDisplayedError()).toBe('');
        });

        it('does not reset the errorMessage when closed with empty string', function (this: HasFinderAndError): void {
            this.finder.hostComponent.message = '';
            this.finder.detectChanges();
            expect(this.finder.hostComponent.message).toBe('');
            expect(this.errorBannerWO.getDisplayedError()).toBe('');
        });

        it('does not reset the errorMessage when closed with undefined', function (this: HasFinderAndError): void {
            this.finder.hostComponent.message = undefined;
            this.finder.detectChanges();
            expect(this.finder.hostComponent.message).toBe(undefined);
            expect(this.errorBannerWO.getDisplayedError()).toBe('');
        });
    });
    describe('ARIA role', () => {
        it('is `alert` for the default alertType `danger`', function (this: HasFinderAndError): void {
            expect(this.errorBannerWO.ariaRole).toBe('alert');
        });

        it('is `status` for the alertType `warning`', function (this: HasFinderAndError): void {
            this.finder.hostComponent.errorBanner.alertType = 'warning';
            this.finder.detectChanges();
            expect(this.errorBannerWO.ariaRole).toBe('status');
        });

        it('is `status` for the alertType `info`', function (this: HasFinderAndError): void {
            this.finder.hostComponent.errorBanner.alertType = 'info';
            this.finder.detectChanges();
            expect(this.errorBannerWO.ariaRole).toBe('status');
        });
    });
});
