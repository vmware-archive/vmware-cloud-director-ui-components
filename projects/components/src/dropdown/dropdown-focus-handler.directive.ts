/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { AfterViewInit, Directive, Host, OnDestroy, Optional, SkipSelf } from '@angular/core';
import { ClrPopoverToggleService } from '@clr/angular';
import { Subscription } from 'rxjs';
import { SubscriptionTracker } from '../common/subscription';
import { DropdownFocusHandlerService } from './dropdown-focus-handler.service';
import { DropdownComponent } from './dropdown.component';

const BUTTON_NODE_NAME = 'BUTTON';

/**
 * Arrow keys directions
 */
export enum Direction {
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right',
}

/**
 * Object wrapping the focusable HTML elements of dropdown menu with the neighbors in 4 directions of each menu item.
 */
export interface MenuItem {
    element: HTMLElement;
    up?: MenuItem;
    down?: MenuItem;
    left?: MenuItem;
    right?: MenuItem;
    closeMenu?: (event: Event) => void;
}

/**
 * Added on to vcd-dropdown component to vertically link menu items of the dropdown on which this directive is added. It also, then links
 * the vertically linked menu items horizontally to their menu trigger. It then uses the {@link DropdownFocusHandlerService} to move the
 * DOM focus between the menu items.
 *
 * @Example:
 * <vcd-dropdown
 *        vcdDropdownFocusHandler
 *        [items]="contextualActions"
 *        [onItemClickedCb]="runActionHandler.bind(this)"
 *        [isItemDisabledCb]="isActionDisabled.bind(this)"
 * ></vcd-dropdown>
 */
@Directive({
    selector: 'vcd-dropdown[vcdDropdownFocusHandler]',
})
export class DropdownFocusHandlerDirective<T> implements AfterViewInit, OnDestroy {
    constructor(
        @Optional() @SkipSelf() private parentVcdDropdown: DropdownComponent<T>,
        @Optional() @SkipSelf() private parentFocusHandler: DropdownFocusHandlerDirective<T>,
        @Host() private hostVcdDropdown: DropdownComponent<T>,
        private focusHandlerService: DropdownFocusHandlerService
    ) {}

    /**
     * List of focusable menu items with their neighbors in 4 directions.
     */
    menuItems: MenuItem[];

    private menuTrigger: MenuItem;
    private isRootDropdown = !this.parentVcdDropdown;
    private timeoutId: number;
    private subscriptionTracker = new SubscriptionTracker(this);

    /**
     * After a dropdown menu is opened, it creates {@link MenuItem} for each of the menu items along with their trigger menu item and links
     * them. It also then moves the focus to first item in the opened menu list.
     */
    ngAfterViewInit(): void {
        this.subscriptionTracker.subscribe(this.hostVcdDropdown.dropdownMenuUpdated, (updated) => {
            if (!updated) {
                return;
            }
            this.createMenuTrigger();
            this.linkMenuItems();
            this.registerRootMenuContainer();
            this.moveFocusToFirstItem();
        });
    }

    ngOnDestroy(): void {}

    private registerRootMenuContainer(): void {
        if (this.isRootDropdown) {
            const rootMenuContainer = this.hostVcdDropdown._clrDropdownMenuEl;
            this.focusHandlerService.listenToArrowKeys(rootMenuContainer);
        }
    }

    private moveFocusToFirstItem(): void {
        this.focusHandlerService.moveFocusTo(this.menuTrigger);
        // After the menu is opened, the ClrDropdownMenu wouldn't be attached to the DOM until the next change detection cycle.
        // So setTimeout is the only way to wait for the ClrDropdownMenu to be ready to move focus to first item.
        this.timeoutId = window.setTimeout(() => {
            if (this.parentVcdDropdown) {
                this.focusHandlerService.moveFocus(Direction.RIGHT);
            } else {
                this.focusHandlerService.moveFocus(Direction.DOWN);
            }
            window.clearTimeout(this.timeoutId);
        });
    }

    private linkMenuItems(): void {
        const menuChildren: Element[] = Array.from(this.hostVcdDropdown._clrDropdownMenuEl.children);
        this.menuItems = menuChildren.map((child) => ({
            element:
                child.nodeName === BUTTON_NODE_NAME
                    ? (child as HTMLElement)
                    : (child.querySelector('clr-dropdown > button') as HTMLElement),
        }));

        this.linkVertical();

        this.linkMenuToTrigger();
    }

    private createMenuTrigger(): void {
        const closeMenu = (event: Event) => {
            this.hostVcdDropdown.clrDropdown.toggleService.open = false;
        };
        if (this.isRootDropdown) {
            this.menuTrigger = {
                element: this.hostVcdDropdown._dropdownTriggerEl,
                closeMenu,
            };
            return;
        }
        this.menuTrigger = this.parentFocusHandler.menuItems.find((item) => {
            return Object.is(item.element.innerText, this.hostVcdDropdown._dropdownTriggerEl.innerText);
        });
        this.menuTrigger.closeMenu = closeMenu;
    }

    private linkMenuToTrigger(): void {
        if (this.isRootDropdown) {
            this.menuTrigger.down = this.menuItems[0];
            return;
        }
        // If there is a parent dropdown, We have to link these menu items to their trigger in the parent dropdown
        this.menuTrigger.right = this.menuItems[0];
        this.menuItems.forEach((item) => (item.left = this.menuTrigger));
    }

    private linkVertical(): void {
        this.menuItems.forEach((menuItem: MenuItem, index: number) => {
            if (index > 0) {
                menuItem.up = this.menuItems[index - 1];
            }
            if (index < this.menuItems.length - 1) {
                menuItem.down = this.menuItems[index + 1];
            }
        });
        if (this.menuItems.length > 1) {
            this.menuItems[0].up = this.menuItems[this.menuItems.length - 1];
            this.menuItems[this.menuItems.length - 1].down = this.menuItems[0];
        }
    }
}
