/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { ShowClippedTextDirective, TooltipPosition } from './show-clipped-text.directive';

/**
 * Used to remove DOM specific code from the jasmine tests while testing this directive
 */
export class ShowClippedTextDirectiveTestHelper {
    constructor(private fixture: ComponentFixture<ShowClippedTextDirectiveTestHostComponent>) {}

    public componentInstance = this.fixture.componentInstance;

    public hideDelay = this.componentInstance.directive.mouseoutDelay;

    private host: HTMLElement = this.componentInstance.div.nativeElement;

    private secondHost: HTMLElement = this.componentInstance.div2.nativeElement;

    set width(width: string) {
        this.host.style.width = width;
    }

    set hostPosition(quadrant: TooltipPosition) {
        this.host.style.position = 'absolute';
        const defaults = { top: '', left: '', bottom: '', right: '' };
        if (quadrant === TooltipPosition.tl) {
            Object.assign(defaults, { top: '0', left: '0' });
        } else if (quadrant === TooltipPosition.tr) {
            Object.assign(defaults, { top: '0', right: '0' });
        } else if (quadrant === TooltipPosition.bl) {
            Object.assign(defaults, { bottom: '0', left: '0' });
        } else if (quadrant === TooltipPosition.br) {
            Object.assign(defaults, { bottom: '0', right: '0' });
        }

        Object.assign(this.host.style, defaults);
    }

    set disabled(disabled: boolean) {
        this.componentInstance.disabled = disabled;
        this.fixture.detectChanges();
    }

    set hostText(text: string) {
        this.componentInstance.text = text;
        this.fixture.detectChanges();
    }

    get tooltipSize(): number {
        return this.tooltipContent.offsetWidth;
    }

    moveMouseOverHost(): void {
        this.host.dispatchEvent(new MouseEvent('mouseenter'));
    }

    moveMouseOverSecondHost(): void {
        this.secondHost.dispatchEvent(new MouseEvent('mouseenter'));
    }

    moveMouseOverTooltip(): void {
        this.tooltip.dispatchEvent(new MouseEvent('mouseenter'));
    }

    moveMouseOffHost(): void {
        this.host.dispatchEvent(new MouseEvent('mouseleave'));
    }

    moveMouseOffTooltip(): void {
        this.tooltip.dispatchEvent(new MouseEvent('mouseleave'));
    }

    get isTooltipVisible(): boolean {
        return !!this.tooltip && (this.tooltip.style.opacity === '1' || this.tooltip.style.opacity === '');
    }

    get tooltipText(): string {
        return this.tooltipContent.innerText;
    }

    get tooltipPosition(): TooltipPosition {
        const classes = this.tooltipContent.classList;
        for (const className of Array.from(classes)) {
            for (const key of Object.keys(TooltipPosition)) {
                if (TooltipPosition[key] === className) {
                    return TooltipPosition[key] as TooltipPosition;
                }
            }
        }
        return null;
    }

    public get tooltipCount(): number {
        return document.querySelectorAll('.tooltip.vcd-show-clipped-text').length;
    }

    public get tooltipVisibility(): string {
        return this.tooltipContent.style.visibility;
    }

    public destroy(): void {
        this.fixture.destroy();
    }

    private get tooltipContent(): HTMLElement {
        return this.tooltip.querySelector('.tooltip-content');
    }

    private get tooltip(): HTMLElement {
        return document.querySelector('.tooltip.vcd-show-clipped-text');
    }
}

@Component({
    template: `
        <div [vcdShowClippedText]="{ disabled: disabled }" style="width: 20px" #div>{{ text }}</div>
        <div [vcdShowClippedText]="{ disabled: disabled }" style="width: 20px" #div2>{{ text2 }}</div>
    `,
})
export class ShowClippedTextDirectiveTestHostComponent {
    @ViewChild(ShowClippedTextDirective, { static: false }) directive!: ShowClippedTextDirective;
    @ViewChild('div', { static: false }) div!: ElementRef;
    @ViewChild('div2', { static: false }) div2!: ElementRef;

    public text = 'texting';
    public text2 = 'texting too';
    public disabled = false;
}
