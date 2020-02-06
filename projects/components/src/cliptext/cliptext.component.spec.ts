/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { TestBed } from '@angular/core/testing';
import { CliptextModule } from './cliptext.module';
import { HasFinder, WidgetFinder } from '../utils/test/widget-object';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { CliptextWidgetObject } from './cliptext.wo';
import { Position } from './cliptext.component';

type TestHostFinder = HasFinder<TestHostComponent>;

type HasHtmlHostFinder = HasFinder<TestHtmlHostComponent>;
describe('ClipTextComponent', () => {
    describe('With text content', () => {
        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [CliptextModule, NoopAnimationsModule],
                declarations: [TestHostComponent],
            }).compileComponents();
        });

        beforeEach(function(this: TestHostFinder): void {
            this.finder = new WidgetFinder<TestHostComponent>(TestHostComponent);
        });

        it('displays a tooltip if the text is clipped', function(this: TestHostFinder): void {
            this.finder.hostComponent.text = 'Very long text that we know will be clipped';
            this.finder.detectChanges();
            const widget = this.finder.find(CliptextWidgetObject);
            widget.mouseEnter();
            expect(widget.isShowingTooltip).toBe(true);
        });

        it('does not display a tooltip if the text is not clipped', function(this: TestHostFinder): void {
            this.finder.hostComponent.text = 'a';
            this.finder.detectChanges();
            const widget = this.finder.find(CliptextWidgetObject);
            widget.mouseEnter();
            expect(widget.isShowingTooltip).toBe(false);
        });

        it('supports changing from having a tooltip to not having a tooltip', function(this: TestHostFinder): void {
            this.finder.hostComponent.text = 'Very long text that we know will be clipped';
            this.finder.detectChanges();
            const widget = this.finder.find(CliptextWidgetObject);
            widget.mouseEnter();
            expect(widget.isShowingTooltip).toBe(true, 'Expected tooltip to be showing for long text');

            widget.mouseLeave();
            this.finder.hostComponent.text = 'a';
            this.finder.detectChanges();
            widget.mouseEnter();
            expect(widget.isShowingTooltip).toBe(false, 'Expected tooltip not to be showing for short text');
        });

        it('supports dynamically changing text while displaying tooltip', function(this: TestHostFinder): void {
            const longText = 'Very long text that we know will be clipped';
            this.finder.hostComponent.text = longText;
            this.finder.detectChanges();
            const widget = this.finder.find(CliptextWidgetObject);
            widget.mouseEnter();
            expect(widget.tooltipContent).toBe(longText);
            expect(widget.isShowingTooltip).toBe(true, 'Expected tooltip to be showing for long text');

            widget.mouseLeave();
            const differentLongText = 'Very long different text that we know will be clipped';
            this.finder.hostComponent.text = differentLongText;
            widget.mouseEnter();
            expect(widget.tooltipContent).toBe(differentLongText);
        });
    });

    describe('@Input position', () => {
        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [CliptextModule, NoopAnimationsModule],
                declarations: [TestHostComponent],
            }).compileComponents();
        });

        beforeEach(function(this: TestHostFinder): void {
            this.finder = new WidgetFinder<TestHostComponent>(TestHostComponent);
        });

        it('defaults to top-right', function(this: TestHostFinder): void {
            const widget = this.finder.find(CliptextWidgetObject);
            this.finder.detectChanges();
            expect(widget.component.tooltipPosition).toBe('top-right');
        });

        it('supports TOP,BOTTOM,BEFORE,AFTER', function(this: TestHostFinder): void {
            const widget = this.finder.find(CliptextWidgetObject);
            const component = widget.component;
            component.position = Position.BOTTOM;
            this.finder.detectChanges();
            expect(widget.component.tooltipPosition).toBe('bottom-right');

            component.position = Position.TOP;
            this.finder.detectChanges();
            expect(widget.component.tooltipPosition).toBe('top-right');

            component.position = Position.BEFORE;
            this.finder.detectChanges();
            expect(widget.component.tooltipPosition).toBe('left');

            component.position = Position.AFTER;
            this.finder.detectChanges();
            expect(widget.component.tooltipPosition).toBe('right');

            component.position = undefined;
            this.finder.detectChanges();
            expect(widget.component.tooltipPosition).toBe('top-right');
        });
    });

    describe('with HTML content', () => {
        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [CliptextModule, NoopAnimationsModule],
                declarations: [TestHtmlHostComponent],
            }).compileComponents();
        });

        beforeEach(function(this: HasHtmlHostFinder): void {
            this.finder = new WidgetFinder(TestHtmlHostComponent);
            this.finder.detectChanges();
        });

        it('strips HTML of content that is displayed in tooltip', function(this: HasHtmlHostFinder): void {
            const widget = this.finder.find(CliptextWidgetObject);
            widget.mouseEnter();
            expect(widget.isShowingTooltip).toBe(true);
            expect(widget.tooltipContent).toBe('I am bad');
        });
    });
});

@Component({
    template: `
        <vcd-cliptext style="width: 3em">{{ text }}</vcd-cliptext>
    `,
    styles: [
        `vcd-cliptext ::ng-deep clr-tooltip {
            width: 200px
        }`
    ]
})
class TestHostComponent {
    text = '';
}

@Component({
    template: `
        <vcd-cliptext style="width: 3em">I am <b>bad</b></vcd-cliptext>
    `,
    styles: [
        `vcd-cliptext ::ng-deep clr-tooltip {
            width: 10px
        }`
    ]
})
class TestHtmlHostComponent {}
