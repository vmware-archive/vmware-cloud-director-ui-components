/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ShowClippedTextDirective, tip, TooltipPosition } from './show-clipped-text.directive';
import {
    ShowClippedTextDirectiveTestHelper,
    ShowClippedTextDirectiveTestHostComponent,
} from './show-clipped-text.directive.test-helper';

/** The this parameter passed to the each test */
interface Test {
    clippedTextHelper: ShowClippedTextDirectiveTestHelper;
    fixture: ComponentFixture<ShowClippedTextDirectiveTestHostComponent>;
}

/**
 * Helper to create a promise from a setTimeout so we can await for it
 * @param ms How long to wait before resolving
 */
function timeout(ms = 0): Promise<number> {
    // See https://github.com/microsoft/tslint-microsoft-contrib/issues/355
    // tslint:disable-next-line no-string-based-set-timeout
    return new Promise(resolve => window.setTimeout(resolve, ms));
}

describe('ShowClippedTextDirective', () => {
    beforeEach(async function(this: Test): Promise<void> {
        await TestBed.configureTestingModule({
            declarations: [ShowClippedTextDirective, ShowClippedTextDirectiveTestHostComponent],
        }).compileComponents();
        this.fixture = TestBed.createComponent(ShowClippedTextDirectiveTestHostComponent);
        this.fixture.detectChanges();
        this.clippedTextHelper = new ShowClippedTextDirectiveTestHelper(this.fixture);
    });

    describe('singletonTooltip', () => {
        it('creates a single tooltip even when there are multiple directives', function(this: Test): void {
            expect(this.clippedTextHelper.tooltipCount).toBe(1);
        });

        it('deletes the singleton tooltip after all instances are removed', function(this: Test): void {
            this.clippedTextHelper.destroy();
            expect(this.clippedTextHelper.tooltipCount).toBe(0);
        });
    });

    describe('showing tooltip', () => {
        it('displays the tooltip if the element is clipped', function(this: Test): void {
            const helper = this.clippedTextHelper;
            helper.moveMouseOverHost();
            expect(helper.isTooltipVisible).toBe(true, 'Tooltip should have been visible since element is clipped');
        });
        it('does not display the tooltip if the element is not clipped', function(this: Test): void {
            const helper = this.clippedTextHelper;
            helper.width = '1000px';
            helper.moveMouseOverHost();
            expect(helper.isTooltipVisible).toBe(
                false,
                'Tooltip should not have been visible since element is not clipped'
            );
        });
    });

    describe('hiding the tooltip', () => {
        it('hides the tooltip after a timeout', fakeAsync(function(this: Test): void {
            const helper = this.clippedTextHelper;
            helper.moveMouseOverHost();
            helper.moveMouseOffHost();
            tick(helper.hideDelay);
            expect(helper.isTooltipVisible).toBe(false);
        }));

        it('does not hide the tooltip if the mouse quickly goes to the tooltip', fakeAsync(function(this: Test): void {
            const helper = this.clippedTextHelper;
            helper.width = '10px';
            helper.moveMouseOverHost();
            helper.moveMouseOffHost();
            tick(helper.hideDelay - 1);
            helper.moveMouseOverTooltip();
            expect(helper.isTooltipVisible).toBe(true);
        }));

        it('hides the tooltip if the mouse moves away from the tooltip', fakeAsync(function(this: Test): void {
            const helper = this.clippedTextHelper;
            helper.disabled = false;
            helper.componentInstance.directive.mouseoutDelay = 2; // TODO: make setter
            helper.width = '10px';
            helper.moveMouseOverHost();
            helper.moveMouseOffHost();
            tick(1);
            helper.moveMouseOverTooltip();
            helper.moveMouseOffTooltip();
            tick(10);
            expect(helper.isTooltipVisible).toBe(false);
        }));

        it('does not hide tooltip if the mouse quickly returns to host element', fakeAsync(function(this: Test): void {
            const helper = this.clippedTextHelper;
            helper.width = '10px';
            helper.moveMouseOverHost();
            helper.moveMouseOffHost();
            tick(1);
            helper.moveMouseOverHost();
            expect(helper.isTooltipVisible).toBe(true);
        }));

        it('changes visibility to hidden after the tooltip fades out', fakeAsync(function(this: Test): void {
            const helper = this.clippedTextHelper;
            helper.width = '10px';
            helper.moveMouseOverHost();
            // To avoid waiting a whole second
            helper.componentInstance.directive.mouseoutDelay = 1;
            helper.transitionTime = '1ms';
            helper.moveMouseOffHost();
            tick(50);
            // Transition end is not called when the window is not focused, so need to add this.
            tip.onTransitionEnd(new Event('transitionend'));
            expect(helper.tooltipVisibility).toBe('hidden', 'CSS visibility should have been set to hidden');
        }));
    });

    describe('disabling the tooltip', () => {
        it('wont show a tooltip when disabled', function(this: Test): void {
            const helper = this.clippedTextHelper;
            helper.disabled = true;
            helper.moveMouseOverHost();
            expect(helper.isTooltipVisible).toBeFalsy();
            helper.disabled = false;
        });

        it('can be modified dynamically', fakeAsync(function(this: Test): void {
            const helper = this.clippedTextHelper;
            helper.disabled = true;
            helper.moveMouseOverHost();
            expect(helper.isTooltipVisible).toBeFalsy();
            helper.disabled = false;
            helper.moveMouseOverHost();
            expect(helper.isTooltipVisible).toBeTruthy();
            helper.moveMouseOffHost();
            tick(helper.hideDelay);
        }));
    });

    describe('tracking host changes while mouse is hovering', () => {
        it('updates the tooltip if text content changes ', async function(this: Test): Promise<void> {
            const helper = this.clippedTextHelper;
            helper.width = '10px';
            helper.moveMouseOverHost();
            const longText = 'a different text inside of it that still causes clipping';
            helper.hostText = longText;
            // Required for the text mutation event to be fired
            await timeout();
            expect(helper.tooltipText).toBe(longText, 'Text in tooltip did not update correctly');
        });

        it('removes the tooltip if text is no longer clipped', async function(this: Test): Promise<void> {
            const helper = this.clippedTextHelper;
            helper.width = '10px';
            helper.moveMouseOverHost();
            // To avoid waiting a whole second
            helper.componentInstance.directive.mouseoutDelay = 1;
            helper.width = '1000px';
            helper.hostText = 'a';
            // Required for the text mutation event to be fired and for the mouse delay to pass
            await timeout(2);
            expect(helper.isTooltipVisible).toBe(false, 'Test should no longer be clipped');
        });
    });

    describe('@Input vcdShowClippedText (tooltipSize)', () => {
        it('displays tooltip with the given default size of 200px', fakeAsync(function(this: Test): void {
            const helper = this.clippedTextHelper;
            helper.hostText = 'Something that is longer than the default width so tooltip reaches its max width';
            helper.width = '10px';
            tick(0);
            helper.moveMouseOverHost();
            expect(helper.tooltipSize).toBe(200);
        }));
    });

    describe('Dynamic position', () => {
        it('displays tooltip on bottom-right when host is in top-left quadrant', function(this: Test): void {
            const helper = this.clippedTextHelper;
            helper.width = '10px';
            helper.hostPosition = TooltipPosition.tl;
            helper.moveMouseOverHost();
            expect(helper.tooltipPosition).toBe(TooltipPosition.br);
        });

        it('displays tooltip on bottom-left when host is in top-right quadrant', function(this: Test): void {
            const helper = this.clippedTextHelper;
            helper.width = '10px';
            helper.hostPosition = TooltipPosition.tr;
            helper.moveMouseOverHost();
            expect(helper.tooltipPosition).toBe(TooltipPosition.bl);
        });

        it('displays tooltip on top-right when host is in bottom-left quadrant', function(this: Test): void {
            const helper = this.clippedTextHelper;
            helper.width = '10px';
            helper.hostPosition = TooltipPosition.bl;
            helper.moveMouseOverHost();
            expect(helper.tooltipPosition).toBe(TooltipPosition.tr);
        });

        it('displays tooltip on top-left when host is in bottom-right quadrant', function(this: Test): void {
            const helper = this.clippedTextHelper;
            helper.width = '10px';
            helper.hostPosition = TooltipPosition.br;
            helper.moveMouseOverHost();
            expect(helper.tooltipPosition).toBe(TooltipPosition.tl);
        });
    });
});
