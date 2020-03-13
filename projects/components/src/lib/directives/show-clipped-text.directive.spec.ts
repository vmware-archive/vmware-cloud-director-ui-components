/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowClippedTextDirective } from './show-clipped-text.directive';
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
        await timeout(this.clippedTextHelper.hideDelay * 2);
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
        it('hides the tooltip after a timeout', async function(this: Test): Promise<void> {
            const helper = this.clippedTextHelper;
            helper.moveMouseOverHost();
            helper.moveMouseOffHost();
            await timeout(helper.hideDelay);
            expect(helper.isTooltipVisible).toBe(false);
        });

        it('does not hide the tooltip if the mouse quickly goes to the tooltip', async function(this: Test): Promise<
            void
        > {
            const helper = this.clippedTextHelper;
            helper.width = '10px';
            helper.moveMouseOverHost();
            helper.moveMouseOffHost();
            await timeout(helper.hideDelay - 1);
            helper.moveMouseOverTooltip();
            expect(helper.isTooltipVisible).toBe(true);
        });

        it('hides the tooltip if the mouse moves away from the tooltip', async function(this: Test): Promise<void> {
            const helper = this.clippedTextHelper;
            helper.disabled = false;
            helper.componentInstance.directive.mouseoutDelay = 2; // TODO: make setter
            helper.width = '10px';
            helper.moveMouseOverHost();
            helper.moveMouseOffHost();
            await timeout(1);
            helper.moveMouseOverTooltip();
            helper.moveMouseOffTooltip();
            await timeout(10);
            expect(helper.isTooltipVisible).toBe(false);
        });

        it('does not hide tooltip if the mouse quickly returns to host element', async function(this: Test): Promise<
            void
        > {
            const helper = this.clippedTextHelper;
            helper.width = '10px';
            helper.moveMouseOverHost();
            helper.moveMouseOffHost();
            await timeout(1);
            helper.moveMouseOverHost();
            expect(helper.isTooltipVisible).toBe(true);
        });

        // TODO https://jira.eng.vmware.com/browse/VDUCC-116
        // it('changes visibility to hidden after the tooltip fades out', async function(this: Test): Promise<void> {
        //     const helper = this.clippedTextHelper;
        //     helper.width = '10px';
        //     helper.moveMouseOverHost();
        //     // To avoid waiting a whole second
        //     helper.componentInstance.directive.mouseoutDelay = 1;
        //     helper.transitionTime = '1ms';
        //     helper.moveMouseOffHost();
        //     // Required for the transition to end, trying to set it to the 1ms above does not work, 25ms works sometimes
        //     // 50 seems to work all the time
        //     // Potential for flakiness here ¯\_(ツ)_/¯
        //     await timeout(50);
        //     expect(helper.tooltipVisibility).toBe('hidden', 'CSS visibility should have been set to hidden');
        // });
    });

    describe('disabling the tooltip', () => {
        it('wont show a tooltip when disabled', function(this: Test): void {
            const helper = this.clippedTextHelper;
            helper.disabled = true;
            helper.moveMouseOverHost();
            expect(helper.isTooltipVisible).toBeFalsy();
            helper.disabled = false;
        });

        it('can be modified dynamically', async function(this: Test): Promise<void> {
            const helper = this.clippedTextHelper;
            helper.disabled = true;
            helper.moveMouseOverHost();
            expect(helper.isTooltipVisible).toBeFalsy();
            helper.disabled = false;
            helper.moveMouseOverHost();
            expect(helper.isTooltipVisible).toBeTruthy();
            helper.moveMouseOffHost();
            await timeout(helper.hideDelay);
        });
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
        it('displays tooltip with the given default size of 200px', async function(this: Test): Promise<void> {
            const helper = this.clippedTextHelper;
            helper.hostText = 'Something that is longer than the default width so tooltip reaches its max width';
            helper.width = '10px';
            await timeout(0);
            helper.moveMouseOverHost();
            expect(helper.tooltipSize).toBe(200);
        });
    });

    // TODO https://jira.eng.vmware.com/browse/VDUCC-116
    // describe('Dynamic position', () => {
    //     it('displays tooltip on bottom-right when host is in top-left quadrant', function(this: Test): void {
    //         const helper = this.clippedTextHelper;
    //         helper.width = '10px';
    //         helper.hostPosition = TooltipPosition.tl;
    //         helper.moveMouseOverHost();
    //         expect(helper.tooltipPosition).toBe(TooltipPosition.br);
    //     });
    //
    //     it('displays tooltip on bottom-left when host is in top-right quadrant', function(this: Test): void {
    //         const helper = this.clippedTextHelper;
    //         helper.width = '10px';
    //         helper.hostPosition = TooltipPosition.tr;
    //         helper.moveMouseOverHost();
    //         expect(helper.tooltipPosition).toBe(TooltipPosition.bl);
    //     });
    //
    //     it('displays tooltip on top-right when host is in bottom-left quadrant', function(this: Test): void {
    //         const helper = this.clippedTextHelper;
    //         helper.width = '10px';
    //         helper.hostPosition = TooltipPosition.bl;
    //         helper.moveMouseOverHost();
    //         expect(helper.tooltipPosition).toBe(TooltipPosition.tr);
    //     });
    //
    //     it('displays tooltip on top-left when host is in bottom-right quadrant', function(this: Test): void {
    //         const helper = this.clippedTextHelper;
    //         helper.width = '10px';
    //         helper.hostPosition = TooltipPosition.br;
    //         helper.moveMouseOverHost();
    //         expect(helper.tooltipPosition).toBe(TooltipPosition.tl);
    //     });
    // });
});
