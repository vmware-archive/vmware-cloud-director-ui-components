/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

export const ALTERNATIVE_TEXT = 'alt';

/**
 * Adds the 'alt' attribute to the injected svg in clr-icon elements.
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'cds-icon',
})
export class AlternativeTextDirective implements AfterViewInit {
    @Input() vcdAlternativeText: string = '';

    constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

    ngAfterViewInit(): void {
        const svgElement = this.el.nativeElement.querySelector('svg');
        if (svgElement && !svgElement.getAttribute(ALTERNATIVE_TEXT)) {
            this.renderer.setAttribute(svgElement, ALTERNATIVE_TEXT, this.vcdAlternativeText);
        }
    }
}
