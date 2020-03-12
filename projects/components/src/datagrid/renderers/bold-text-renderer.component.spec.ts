/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { WidgetFinder } from '../../utils/test/widget-object';
import { BoldTextRendererWidgetObject } from './bold-text-renderer.wo';
import { BoldTextRendererComponent, BoldTextRenderer } from './bold-text-renderer.component';

@Component({
    template: `
        <vcd-bold-text-renderer [config]="config"></vcd-bold-text-renderer>
    `,
})
class TestBoldComponent {
    config = { text: 'stuff' };
}

interface HasFinderAndBoldText {
    finder: WidgetFinder<TestBoldComponent>;
    // The Widget Object for the underlying Clarity grid
    boldText: BoldTextRendererWidgetObject;
}

describe('BannerActivityReporterComponent', () => {
    beforeEach(async function(this: HasFinderAndBoldText): Promise<void> {
        await TestBed.configureTestingModule({
            declarations: [BoldTextRendererComponent, TestBoldComponent],
        }).compileComponents();

        this.finder = new WidgetFinder(TestBoldComponent);
        this.boldText = this.finder.find(BoldTextRendererWidgetObject);
        this.finder.detectChanges();
    });

    describe('BoldTextRenderer factory function', () => {
        it('simplifies the creation of filters', () => {
            const newFilter = BoldTextRenderer(() => 'hello!');
            expect(newFilter.config('record').text).toEqual('hello!');
        });
    });

    describe('@Input() config', () => {
        it('can display bold text', function(this: HasFinderAndBoldText): void {
            this.finder.hostComponent.config = { text: 'hello!' };
            this.finder.detectChanges();
            expect(this.boldText.text).toEqual('hello!');
        });
    });
});
