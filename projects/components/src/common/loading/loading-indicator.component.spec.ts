/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { WidgetFinder } from '../../utils/test/widget-object';
import { LoadingIndicatorComponent } from './loading-indicator.component';
import { VcdLoadingIndicatorModule } from './loading-indicator.module';

@Component({
    template: `
        <vcd-loading-indicator #loading [isLoading]="loadingVal" [size]="size"></vcd-loading-indicator>
    `,
})
class TestErrorComponent {
    loadingVal = false;
    size = 'md';
    @ViewChild('loading') loadingIndicator: LoadingIndicatorComponent;
}

interface HasFinderAndLoading {
    finder: WidgetFinder<TestErrorComponent>;
}

describe('LoadingIndicatorReporterComponent', () => {
    beforeEach(async function(this: HasFinderAndLoading): Promise<void> {
        await TestBed.configureTestingModule({
            imports: [VcdLoadingIndicatorModule],
            declarations: [TestErrorComponent],
        }).compileComponents();

        this.finder = new WidgetFinder(TestErrorComponent);
        this.finder.detectChanges();
    });

    it('can display an error when shown', function(this: HasFinderAndLoading): void {
        expect(this.finder.hostComponent.loadingIndicator.isLoading).toBeFalsy();
        this.finder.hostComponent.loadingVal = true;
        this.finder.detectChanges();
        expect(this.finder.hostComponent.loadingIndicator.isLoading).toBeTruthy();
        expect(this.finder.hostComponent.loadingIndicator.size).toEqual('md');
        this.finder.hostComponent.size = 'lg';
        this.finder.detectChanges();
        expect(this.finder.hostComponent.loadingIndicator.size).toEqual('lg');
        this.finder.hostComponent.size = 'not a size';
        this.finder.detectChanges();
        expect(this.finder.hostComponent.loadingIndicator.size).toEqual('md');
    });
});
