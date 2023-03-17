/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { DOCUMENT } from '@angular/common';
import {
    ContentChild,
    Directive,
    ElementRef,
    HostListener,
    Inject,
    Optional,
    Renderer2,
    SkipSelf,
} from '@angular/core';
import { ClrDropdown, ClrDropdownMenu } from '@clr/angular';

const CONTENT_AREA_SELECTOR = '.content-area';
export const NO_SCROLLING_CLASSNAME = 'no-scrolling'; // Set by Clarity when a modal is opened
// Extra space on the right and left of drop down menus to shift them left or right and prevent any clipping
const MENU_BUFFER_SPACE = 150;

/**
 * Directive for ClrDropDown which repositions the drop-down menu dynamically based on the available space.
 *
 * If there is not enough space to show the whole drop-down menu, then leave the default position which is `bottom` and
 * users have to scroll down to access it.
 *
 * @example
 * ```
 * <clr-dropdown vcdDropdown>
 *     <button class="btn btn-link vm-power-link" clrDropdownTrigger>
 *         {{ 'vm.actions' | translate }}
 *         <clr-icon shape="caret down"></clr-icon>
 *         </button>
 *     <clr-dropdown-menu *clrIfOpen>
 *         <label class="dropdown-header">Dropdown header</label>
 *         <button type="button" clrDropdownItem>Action 1</button>
 *         <button type="button" clrDropdownItem>Action 2</button>
 *         <div class="dropdown-divider"></div>
 *         <button type="button" clrDropdownItem>Link 1</button>
 *         <button type="button" clrDropdownItem>Link 2</button>
 *     </clr-dropdown-menu>
 * </clr-dropdown>
 * ```
 */
/**
 * This component is marked as dynamic to suppress the '"strictMetadataEmit": true' error being reported on DI of Document
 */
/** @dynamic */
@Directive({
    selector: 'clr-dropdown[vcdDynamicDropdown]',
})
export class DynamicDropdownPositionDirective {
    private contentAreaElement: HTMLElement | null;
    private dropdownTriggerElement: HTMLElement;
    private dropdownMenuElement: HTMLElement;
    private dropdownTriggerRect: DOMRect;
    private dropdownMenuRect: DOMRect;
    // Drop downs should be position absolutely to the window when they are in modal
    private isInsideModal = false;

    @ContentChild(ClrDropdownMenu, { static: false })
    set dropdownMenu(dropdown: ClrDropdownMenu) {
        if (dropdown) {
            this.dropdownTriggerElement = this.elRef.nativeElement;
            this.dropdownMenuElement = this.dropdownTriggerElement.querySelector('clr-dropdown-menu');
            if (this.dropdownMenuElement) {
                // Recalculate the dropdown position on open
                this.dropdownTriggerRect = this.dropdownTriggerElement.getBoundingClientRect();
                this.dropdownMenuRect = this.dropdownMenuElement.getBoundingClientRect();
                this.isInsideModal = this.document.body.classList.contains(NO_SCROLLING_CLASSNAME);
                this.contentAreaElement = this.isInsideModal
                    ? null
                    : (this.document.body.querySelector(CONTENT_AREA_SELECTOR) as HTMLElement);
                this.resetPosition(this.dropdownMenuElement, this.positionTop, this.positionLeft);
            }
            try {
                // Internal API
                (dropdown as any).popoverInstance.removeScrollEventListeners();
            } catch (e) {
                console.error('Clarity has changed ClrDropdownMenu internal API. Please fix me!');
                throw new Error('Clarity has changed ClrDropdownMenu internal API. Please fix me!');
            }
        }
    }

    constructor(
        private elRef: ElementRef,
        private renderer: Renderer2,
        @Inject(DOCUMENT) private document: Document,
        private dropDownBtn: ClrDropdown,
        @Optional() @SkipSelf() private parentDropdown: DynamicDropdownPositionDirective
    ) {}

    private get positionTop(): number {
        const dropdownTriggerRect = this.dropdownTriggerRect;
        const dropdownTriggerHeight = dropdownTriggerRect.bottom - dropdownTriggerRect.top;
        const dropdownMenuRect = this.dropdownMenuRect;
        const dropdownMenuHeight = dropdownMenuRect.bottom - dropdownMenuRect.top;

        // When the dropdown is inside a modal and it's being clipped, its position is determined based on the window
        if (this.isInsideModal && dropdownMenuRect.bottom > window.innerHeight) {
            return -(dropdownMenuHeight + dropdownTriggerHeight + 1);
        }
        if (!this.contentAreaElement) {
            return 0;
        }
        const contentAreaRect = this.contentAreaElement.getBoundingClientRect();
        // When not in a modal, the position is relative to the `.content-area` element

        const enoughSpaceAtTheBottom = dropdownMenuRect.height <= contentAreaRect.bottom - dropdownTriggerRect.bottom;
        const enoughSpaceAtTheTop = dropdownMenuRect.height <= dropdownTriggerRect.top - contentAreaRect.top;

        if (!enoughSpaceAtTheBottom && !enoughSpaceAtTheTop) {
            // If there is not ennough space at the top and bottom, keep the dropdown at the middle of the screen
            return -(window.innerHeight / 2);
        }

        if (enoughSpaceAtTheBottom) {
            // Don't shift to the top if it's not being clipped at the bottom
            return 0;
        }
        if (dropdownTriggerRect.top - dropdownMenuRect.height >= contentAreaRect.top) {
            // If the dropdown trigger is a dropdown item instead of a button, we shift it up by less number of pixels to avoid space
            // between dropdown trigger and the dropdown menu
            const isFirstDropdownTrigger = !!this.dropdownTriggerElement.querySelector('button.first-dropdown-toggle');
            return isFirstDropdownTrigger ? -(dropdownTriggerHeight + dropdownMenuHeight) : -dropdownMenuHeight;
        }
        if (enoughSpaceAtTheTop) {
            // If the menu can get clipped by moving it to the top, push it down
            return -(dropdownMenuRect.bottom - contentAreaRect.bottom);
        }
        // Don't shift by default
        return 0;
    }

    private get positionLeft(): number {
        const triggerBtn = this.elRef.nativeElement.querySelector('[clrdropdowntrigger]');

        let triggerComputedStyles = null;
        if (triggerBtn) {
            triggerComputedStyles = window.getComputedStyle(triggerBtn);
        }
        if (this.isInsideModal || !this.contentAreaElement) {
            return 0;
        }
        const contentAreaRect = this.contentAreaElement.getBoundingClientRect();
        const dropdownMenuRect = this.dropdownMenuRect;
        const dropdownTriggerRect = this.dropdownTriggerRect;
        // If the dropdown is getting clipped on the left and there is enough place on the right, shift the dropdown to right
        if (
            dropdownMenuRect.left + MENU_BUFFER_SPACE <= contentAreaRect.left &&
            dropdownTriggerRect.right + dropdownMenuRect.width <= contentAreaRect.right
        ) {
            const marginRight = triggerComputedStyles ? parseInt(triggerComputedStyles.marginRight, 10) : 0;
            return dropdownTriggerRect.width - marginRight;
        }
        // If the dropdown is getting clipped on the right and there is enough place on the left, shift the dropdown to left
        if (
            dropdownMenuRect.right + MENU_BUFFER_SPACE >= contentAreaRect.right &&
            dropdownTriggerRect.left - dropdownMenuRect.width >= contentAreaRect.left
        ) {
            const marginLeft = triggerComputedStyles ? parseInt(triggerComputedStyles.marginLeft, 10) : 0;
            // If the dropdown being clipped is at the 2nd level, we want to shift it furthur left such that it would
            // not over lap and cover the 1st level of dropdown underneath it
            if (this.parentDropdown) {
                const parentDropdownMenuRect = this.parentDropdown.dropdownMenuElement.getBoundingClientRect();
                const parentDropdownWidth = parentDropdownMenuRect.right - parentDropdownMenuRect.left;
                return -(parentDropdownWidth + dropdownMenuRect.width + marginLeft);
            }
            return -(dropdownMenuRect.width + marginLeft);
        }
        // if the dropdown is clipped at the bottom and if it is also being clipped at the top and pushed down, shift it to right
        if (
            dropdownMenuRect.bottom > contentAreaRect.bottom &&
            dropdownTriggerRect.top - dropdownMenuRect.height < contentAreaRect.top
        ) {
            const marginRight = triggerComputedStyles ? parseInt(triggerComputedStyles.marginRight, 10) : 0;
            return dropdownTriggerRect.width - marginRight;
        }
        // Don't shift by default
        return 0;
    }

    /**
     * Reposition the dropdown element by setting top and left position.
     *
     * Note: The dropdown is position absolute by setting position, top and left properties AND then is position
     * relatively to itself by setting transform: translateX/Y property.
     */
    private resetPosition(element: HTMLElement, top: number, left: number): void {
        this.renderer.setStyle(element, 'top', `${top}px`);
        this.renderer.setStyle(element, 'left', `${left}px`);
    }

    /**
     * On window resize, close the dropdown when it is open, otherwise we need to recalculate again its position
     * and reposition it, which may not be a good user experience.
     */
    @HostListener('window:resize')
    onWindowResize(): void {
        this.dropDownBtn.toggleService.open = false;
    }
}
