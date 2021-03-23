/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { WidgetFinder } from '../../utils/test/widget-object';
import { ErrorBannerComponent } from './error-banner.component';
import { VcdErrorBannerModule } from './error-banner.module';
import { ErrorBannerWidgetObject } from './error-banner.wo';

@Component({
    template: `
        <vcd-error-banner #banner [errorMessage]="message"></vcd-error-banner>
    `,
})
class TestErrorComponent {
    message: string;
    @ViewChild('banner') errorBanner: ErrorBannerComponent;
}

interface HasFinderAndError {
    finder: WidgetFinder<TestErrorComponent>;
}

describe('ErrorBannerComponent', () => {
    beforeEach(async function(this: HasFinderAndError): Promise<void> {
        await TestBed.configureTestingModule({
            imports: [VcdErrorBannerModule],
            declarations: [TestErrorComponent],
        }).compileComponents();

        this.finder = new WidgetFinder(TestErrorComponent);
        this.finder.detectChanges();
    });

    it('can display an error when shown', function(this: HasFinderAndError): void {
        this.finder.hostComponent.message = 'Error!!';
        this.finder.detectChanges();
        expect(this.finder.hostComponent.errorBanner.closed).toBeFalsy();
        expect(this.finder.hostComponent.errorBanner.errorMessage).toEqual('Error!!');
        this.finder.hostComponent.errorBanner.onAlertClosedChange(true);
        expect(this.finder.hostComponent.errorBanner.errorMessage).toBeFalsy();
    });

    describe('ARIA role', () => {
        it('is `alert` for the default alertType `danger`', function(this: HasFinderAndError): void {
            const errorBannerWO = this.finder.find({ woConstructor: ErrorBannerWidgetObject });
            expect(errorBannerWO.ariaRole).toBe('alert');
        });

        it('is `status` for the alertType `warning`', function(this: HasFinderAndError): void {
            this.finder.hostComponent.errorBanner.alertType = 'warning';
            this.finder.detectChanges();
            const errorBannerWO = this.finder.find({ woConstructor: ErrorBannerWidgetObject });
            expect(errorBannerWO.ariaRole).toBe('status');
        });

        it('is `status` for the alertType `info`', function(this: HasFinderAndError): void {
            this.finder.hostComponent.errorBanner.alertType = 'info';
            this.finder.detectChanges();
            const errorBannerWO = this.finder.find({ woConstructor: ErrorBannerWidgetObject });
            expect(errorBannerWO.ariaRole).toBe('status');
        });
    });
});
