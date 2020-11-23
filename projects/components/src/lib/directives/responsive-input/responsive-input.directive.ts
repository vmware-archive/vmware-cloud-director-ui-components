/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { AfterViewInit, Directive, ElementRef, HostBinding } from '@angular/core';

/**
 * Adds Clarity grid classes to form controls so that labels and inputs are on separate lines and to control the label width
 * for large screens.
 *
 * Centralizes CSS classes to be used to enforce a common look and feel throughout the application
 */
@Directive({
    selector: '.clr-form-control[vcdResponsiveInput]',
})
export class ResponsiveInputDirective implements AfterViewInit {
    @HostBinding('class.clr-row') public clrGridRow = true;
    constructor(private el: ElementRef<HTMLElement>) {}

    ngAfterViewInit(): void {
        this.applyClasses('label', '2');
        this.applyClasses('container', '10');
    }

    private applyClasses(className: 'label' | 'container', mdSize: '2' | '10'): void {
        const el = this.el.nativeElement.querySelector(`:scope > .clr-control-${className}`);
        if (el) {
            el.classList.add('clr-col-12', `clr-col-md-${mdSize}`);
        }
    }
}
