/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { WidgetFinder } from '../../utils/test/widget-object';
import { ErrorBannerComponent } from './error-banner.component';
import { VcdErrorBannerModule } from './error-banner.module';

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
});
