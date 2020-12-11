/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { AfterViewChecked, Directive, ElementRef, HostBinding } from '@angular/core';

declare type ColSize = '2' | '4' | '8' | '10';

/**
 * Adds Clarity grid classes to form controls based on the host's width so that labels and inputs are on separate
 * lines and to control the label width for large screens.
 *
 * Centralizes CSS classes to be used to enforce a common look and feel throughout the application
 */
@Directive({
    selector: '.clr-form-control[vcdResponsiveInput]',
})
export class ResponsiveInputDirective implements AfterViewChecked {
    private elementWidth = 0;

    private breakPoint = 768;

    @HostBinding('class.clr-row') public clrGridRow = true;
    constructor(private el: ElementRef<HTMLElement>) {}

    ngAfterViewChecked(): void {
        if (this.elementWidth !== 0) {
            return;
        }
        const newElementWidth = this.el.nativeElement.offsetWidth;
        if (newElementWidth) {
            this.elementWidth = newElementWidth;
            const [labelWidth, containerWidth]: ColSize[] =
                this.elementWidth < this.breakPoint ? ['4', '8'] : ['2', '10'];
            this.applyClasses('label', labelWidth);
            this.applyClasses('container', containerWidth);
        }
    }

    private applyClasses(className: 'label' | 'container', mdSize: ColSize): void {
        const el = this.el.nativeElement.querySelector(`:scope > .clr-control-${className}`);
        if (el) {
            el.classList.remove('clr-col-12', 'clr-col-md-2', 'clr-col-md-4', 'clr-col-md-8', 'clr-col-md-10');
            el.classList.add('clr-col-12', `clr-col-md-${mdSize}`);
        }
    }
}
