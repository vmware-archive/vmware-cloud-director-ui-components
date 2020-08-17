/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { DOCUMENT } from '@angular/common';
import {
    AfterContentInit,
    AfterViewChecked,
    ContentChild,
    Directive,
    ElementRef,
    HostListener,
    Inject,
    OnDestroy,
    Renderer2,
} from '@angular/core';
import { ClrDropdown, ClrDropdownMenu } from '@clr/angular';
import { SubscriptionTracker } from '../common/subscription';

const CONTENT_AREA_SELECTOR = '.content-area';
const NO_SCROLLING_CLASSNAME = 'no-scrolling'; // Set by Clarity when a modal is opened

/**
 * Directive for ClrDropDown which repositions the drop-down menu dynamically based on the available space.
 *
 * If there is not enough space to show the whole drop-down menu, then leave the default position which is `bottom` and
 * users have to scroll down to access it.
 *
 * @usageNotes
 *
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
export class DynamicDropdownPositionDirective implements AfterViewChecked, AfterContentInit, OnDestroy {
    private contentAreaHTMLElement: HTMLDivElement;
    private subscriptionTracker = new SubscriptionTracker(this);

    // Drop downs should be position absolutely to the window when they are in modal and
    // absolutely to the `.content-area` element when are not in modal.
    private isInsideModal = false;

    // Recalculate position flag. Position is calculated one time only when the drop down is opened.
    private recalculatePosition = true;

    @ContentChild(ClrDropdownMenu, { static: false })
    set dropdownMenu(dropdown: ClrDropdownMenu) {
        if (dropdown) {
            try {
                // Internal API
                (dropdown as any).popoverInstance.removeScrollEventListeners();
            } catch (e) {
                console.warn('Clarity has changed ClrDropdownMenu internal API. Please fix me!');
            }
        }
    }

    constructor(
        private elRef: ElementRef,
        private renderer: Renderer2,
        @Inject(DOCUMENT) private document: Document,
        private dropDownBtn: ClrDropdown
    ) {
        // Recalculate the dropdown position on open
        this.subscriptionTracker.subscribe(
            // this.dropDownBtn.ifOpenService.openChange,
            this.dropDownBtn.toggleService.openChange,
            (isOpened: boolean) => {
                this.recalculatePosition = isOpened;
            }
        );
    }

    ngAfterContentInit(): void {
        this.isInsideModal = this.document.body.classList.contains(NO_SCROLLING_CLASSNAME);
        if (!this.isInsideModal) {
            this.contentAreaHTMLElement = this.document.body.querySelector(CONTENT_AREA_SELECTOR) as HTMLDivElement;
        }
    }

    ngAfterViewChecked(): void {
        const dropdown = this.elRef.nativeElement;
        const dropdownMenu = dropdown.querySelector('clr-dropdown-menu');

        if (dropdownMenu && this.recalculatePosition) {
            const dropdownRect = dropdown.getBoundingClientRect();
            const dropdownHeight = dropdownRect.bottom - dropdownRect.top;
            const dropdownMenuRect = dropdownMenu.getBoundingClientRect();
            const menuHeight = dropdownMenuRect.bottom - dropdownMenuRect.top;

            // When the dropdown is inside a modal, it position is determined based on the window, otherwise
            // the position is relative to the `.contenat-area` element
            if (this.isInsideModal) {
                if (dropdownMenuRect.bottom > window.innerHeight) {
                    // Move the dropdown menu to the top of the dropdown
                    this.setPosition(dropdownMenu, -(menuHeight + dropdownHeight + 1));
                }
            } else if (this.contentAreaHTMLElement) {
                const contentAreaRect = this.contentAreaHTMLElement.getBoundingClientRect();
                const triggerBtn = this.elRef.nativeElement.querySelector('[clrdropdowntrigger]');
                let triggerComputedStyles = null;

                if (triggerBtn) {
                    triggerComputedStyles = window.getComputedStyle(triggerBtn);
                }

                if (dropdownMenuRect.bottom <= contentAreaRect.bottom) {
                    // Position Bottom
                    this.setPosition(dropdownMenu);
                } else if (dropdownRect.top - dropdownMenuRect.height >= contentAreaRect.top) {
                    // Position Top
                    this.setPosition(dropdownMenu, -(menuHeight + dropdownHeight));
                } else if (menuHeight <= contentAreaRect.height) {
                    // Menu may/may not fit in the content area
                    if (dropdownRect.right + dropdownMenuRect.width <= contentAreaRect.right) {
                        // Position on the right
                        const marginRight = triggerComputedStyles ? parseInt(triggerComputedStyles.marginRight, 10) : 0;
                        this.setPosition(
                            dropdownMenu,
                            -(dropdownMenuRect.bottom - contentAreaRect.bottom),
                            dropdownRect.width - marginRight
                        );
                    } else if (dropdownRect.left - dropdownMenuRect.width >= contentAreaRect.left) {
                        // Position on the left
                        const marginLeft = triggerComputedStyles ? parseInt(triggerComputedStyles.marginLeft, 10) : 0;
                        this.setPosition(
                            dropdownMenu,
                            -(dropdownMenuRect.bottom - contentAreaRect.bottom),
                            -(dropdownMenuRect.width + marginLeft)
                        );
                    } else {
                        // Leave it below where it is by default
                        this.setPosition(dropdownMenu);
                    }
                } else if (menuHeight > contentAreaRect.height) {
                    // Menu not fit in the content area height

                    const marginRight = triggerComputedStyles ? parseInt(triggerComputedStyles.marginRight, 10) : 0;
                    this.setPosition(
                        dropdownMenu,
                        -(dropdownMenuRect.top - contentAreaRect.top),
                        dropdownRect.width - marginRight
                    );
                }
            }

            this.recalculatePosition = false;
        }
    }

    /**
     * Reposition the dropdown element by setting top and left position.
     *
     * Note: The dropdown is position absolute by setting position, top and left properties AND then is position
     * relatively to itself by setting transform: translateX/Y property.
     */
    private setPosition(element: HTMLElement, top: number = 0, left: number = 0): void {
        this.renderer.setStyle(element, 'top', `${top}px`);
        this.renderer.setStyle(element, 'left', `${left}px`);
    }

    ngOnDestroy(): void {}

    /**
     * On window resize, close the dropdown when it is open, otherwise we need to recalculate again its position
     * and reposition it, which may not be a good user experience.
     */
    @HostListener('window:resize')
    onWindowResize(): void {
        this.dropDownBtn.toggleService.open = false;
    }
}
