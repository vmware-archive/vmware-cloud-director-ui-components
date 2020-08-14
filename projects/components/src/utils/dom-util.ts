/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { ElementRef } from '@angular/core';

export class DomUtil {
    /**
     * Scrolls view to a element so that the element becomes visible in the viewport.
     * If a css style selector is provided then the element to scroll is the html element
     * described by the css selector which parent is the provided element.
     * Id a css style selector is not provided then the element to scroll is the provided
     * element itself.
     *
     * @param elRef the view's element.
     * @param classSelector the css-style selector for the element to scroll to.
     */
    public static scrollToElement(elRef: ElementRef, classSelector?: string): void {
        if (!elRef || !elRef.nativeElement) {
            return;
        }
        const el: HTMLElement = elRef.nativeElement as HTMLElement;
        const elementToScroll = classSelector ? el.querySelector(classSelector) : el;

        if (elementToScroll) {
            elementToScroll.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }
}
