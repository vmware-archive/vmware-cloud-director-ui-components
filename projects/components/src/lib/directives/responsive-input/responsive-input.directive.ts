/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { AfterViewChecked, Directive, ElementRef, HostBinding } from '@angular/core';

type colSize = string;

/**
 * Adds Clarity grid classes to form controls so that labels and inputs are on separate lines and to control the label width
 * for large screens.
 *
 * Centralizes CSS classes to be used to enforce a common look and feel throughout the application
 */
@Directive({
    selector: '.clr-form-control[vcdResponsiveInput]',
})
export class ResponsiveInputDirective implements AfterViewChecked {
    @HostBinding('class.clr-row') public clrGridRow = true;
    constructor(private el: ElementRef<HTMLElement>) {}
    private elementWidth = 0;

    ngAfterViewChecked(): void {
        const newElementWidth = this.el.nativeElement.offsetWidth;
        if (newElementWidth !== this.elementWidth) {
            this.elementWidth = newElementWidth;
            const [labelWidth, containerWidth]: colSize[] = this.elementWidth < 768 ? ['4', '8'] : ['2', '10'];
            this.applyClasses('label', labelWidth);
            this.applyClasses('container', containerWidth);
        }
    }

    private applyClasses(className: 'label' | 'container', mdSize: colSize): void {
        const el = this.el.nativeElement.querySelector(`:scope > .clr-control-${className}`);
        if (el) {
            el.classList.add('clr-col-12');
            const removeList: string[] = [];
            el.classList.forEach((css: string) => {
                if (css.includes('clr-col-md-')) {
                    removeList.push(css);
                }
            });
            el.classList.remove(...removeList);
            el.classList.add(`clr-col-md-${mdSize}`);
        }
    }
}
