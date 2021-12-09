/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { fireTipTransitionEndForTests, ShowClippedTextDirective, TooltipPosition } from './show-clipped-text.directive';
import {
    ShowClippedTextDirectiveTestHelper,
    ShowClippedTextDirectiveTestHostComponent,
} from './show-clipped-text.directive.test-helper';

/** The this parameter passed to the each test */
interface Test {
    clippedTextHelper: ShowClippedTextDirectiveTestHelper;
    fixture: ComponentFixture<ShowClippedTextDirectiveTestHostComponent>;
}

describe('ShowClippedTextDirective', () => {
    beforeEach(async function (this: Test): Promise<void> {
        await TestBed.configureTestingModule({
            declarations: [ShowClippedTextDirective, ShowClippedTextDirectiveTestHostComponent],
        }).compileComponents();
        this.fixture = TestBed.createComponent(ShowClippedTextDirectiveTestHostComponent);
        this.fixture.detectChanges();
        this.clippedTextHelper = new ShowClippedTextDirectiveTestHelper(this.fixture);
    });

    describe('singletonTooltip', () => {
        it('creates a single tooltip even when there are multiple directives', function (this: Test): void {
            expect(this.clippedTextHelper.tooltipCount).toBe(1);
        });

        it('deletes the singleton tooltip after all instances are removed', function (this: Test): void {
            this.clippedTextHelper.destroy();
            expect(this.clippedTextHelper.tooltipCount).toBe(0);
        });
    });

    describe('showing tooltip', () => {
        it('displays the tooltip if the element is clipped', function (this: Test): void {
            const helper = this.clippedTextHelper;
            helper.moveMouseOverHost();
            expect(helper.isTooltipVisible).toBe(true, 'Tooltip should have been visible since element is clipped');
        });
        it('does not display the tooltip if the element is not clipped', function (this: Test): void {
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
        it('hides the tooltip after a timeout', fakeAsync(function (this: Test): void {
            const helper = this.clippedTextHelper;
            helper.moveMouseOverHost();
            helper.moveMouseOffHost();
            tick(helper.hideDelay);
            expect(helper.isTooltipVisible).toBe(false);
        }));

        it('does not hide the tooltip if the mouse quickly goes to the tooltip', fakeAsync(function (this: Test): void {
            const helper = this.clippedTextHelper;
            helper.width = '10px';
            helper.moveMouseOverHost();
            helper.moveMouseOffHost();
            tick(helper.hideDelay - 1);
            helper.moveMouseOverTooltip();
            expect(helper.isTooltipVisible).toBe(true);
        }));

        it('hides the tooltip if the mouse moves away from the tooltip', fakeAsync(function (this: Test): void {
            const helper = this.clippedTextHelper;
            helper.disabled = false;
            helper.width = '10px';
            helper.moveMouseOverHost();
            helper.moveMouseOffHost();
            tick(helper.hideDelay / 2);
            helper.moveMouseOverTooltip();
            helper.moveMouseOffTooltip();
            tick(helper.hideDelay * 2);
            expect(helper.isTooltipVisible).toBe(false);
        }));

        it('does not hide tooltip if the mouse quickly returns to host element', fakeAsync(function (this: Test): void {
            const helper = this.clippedTextHelper;
            helper.width = '10px';
            helper.moveMouseOverHost();
            helper.moveMouseOffHost();
            tick(1);
            helper.moveMouseOverHost();
            expect(helper.isTooltipVisible).toBe(true);
        }));

        it('changes visibility to hidden after the tooltip fades out', fakeAsync(function (this: Test): void {
            const helper = this.clippedTextHelper;
            helper.width = '10px';
            helper.moveMouseOverHost();
            // To avoid waiting a whole second
            helper.componentInstance.directive.mouseoutDelay = 1;
            helper.moveMouseOffHost();
            tick(2);
            // Transition end is not called when the window is not focused, so need to add this.
            fireTipTransitionEndForTests(new Event('transitionend'));
            expect(helper.tooltipVisibility).toBe('hidden', 'CSS visibility should have been set to hidden');
        }));

        it('hide the tooltip after the component is destroyed', fakeAsync(function (this: Test): void {
            const helper = this.clippedTextHelper;
            helper.width = '10px';
            helper.moveMouseOverSecondHost();
            expect(helper.isTooltipVisible).toBe(true, 'tooltip should be visible');
            helper.componentInstance.showSecondHost = false;
            this.fixture.detectChanges();
            tick(1);
            expect(helper.isTooltipVisible).toBe(false, 'tooltip should not be visible');
        }));

        it('does not hide the tooltip if the active component is destroyed', fakeAsync(function (this: Test): void {
            const helper = this.clippedTextHelper;
            helper.width = '10px';
            helper.moveMouseOverHost();
            expect(helper.isTooltipVisible).toBe(true, 'tooltip should be visible');
            helper.componentInstance.showSecondHost = false;
            this.fixture.detectChanges();
            tick(1);
            expect(helper.isTooltipVisible).toBe(true, 'tooltip should be visible');
        }));
    });

    describe('disabling the tooltip', () => {
        it('wont show a tooltip when disabled', function (this: Test): void {
            const helper = this.clippedTextHelper;
            helper.disabled = true;
            helper.moveMouseOverHost();
            expect(helper.isTooltipVisible).toBeFalsy();
            helper.disabled = false;
        });

        it('can be modified dynamically', fakeAsync(function (this: Test): void {
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

    describe('@Input vcdShowClippedText (tooltipSize)', () => {
        it('displays tooltip with the given default size of 200px', fakeAsync(function (this: Test): void {
            const helper = this.clippedTextHelper;
            helper.hostText = 'Something that is longer than the default width so tooltip reaches its max width';
            helper.width = '10px';
            tick(0);
            helper.moveMouseOverHost();
            expect(helper.tooltipSize).toBe(200);
        }));
    });

    describe('Dynamic position', () => {
        it('displays tooltip on bottom-right when host is in top-left quadrant', function (this: Test): void {
            const helper = this.clippedTextHelper;
            helper.width = '10px';
            helper.hostPosition = TooltipPosition.tl;
            helper.moveMouseOverHost();
            expect(helper.tooltipPosition).toBe(TooltipPosition.br);
        });

        it('displays tooltip on bottom-left when host is in top-right quadrant', function (this: Test): void {
            const helper = this.clippedTextHelper;
            helper.width = '10px';
            helper.hostPosition = TooltipPosition.tr;
            helper.moveMouseOverHost();
            expect(helper.tooltipPosition).toBe(TooltipPosition.bl);
        });

        it('displays tooltip on top-right when host is in bottom-left quadrant', function (this: Test): void {
            const helper = this.clippedTextHelper;
            helper.width = '10px';
            helper.hostPosition = TooltipPosition.bl;
            helper.moveMouseOverHost();
            expect(helper.tooltipPosition).toBe(TooltipPosition.tr);
        });

        it('displays tooltip on top-left when host is in bottom-right quadrant', function (this: Test): void {
            const helper = this.clippedTextHelper;
            helper.width = '10px';
            helper.hostPosition = TooltipPosition.br;
            helper.moveMouseOverHost();
            expect(helper.tooltipPosition).toBe(TooltipPosition.tl);
        });
    });
});
