/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { AfterViewInit, Directive, Host, OnDestroy, Optional, Renderer2, SkipSelf } from '@angular/core';
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
    /**
     * The HTML element of this dropdown menu item
     */
    element: HTMLElement;
    /**
     * Neighboring menu items in all the 4 directions
     */
    up?: MenuItem;
    down?: MenuItem;
    left?: MenuItem;
    right?: MenuItem;
    /**
     * Call back to close the menu for which this menu item can be a trigger. called from {@link DropdownFocusHandlerService}
     */
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
        @Optional() @SkipSelf() private parentVcdDropdown: DropdownComponent,
        @Optional() @SkipSelf() private parentFocusHandler: DropdownFocusHandlerDirective<T>,
        @Host() private hostVcdDropdown: DropdownComponent,
        private focusHandlerService: DropdownFocusHandlerService,
        private renderer: Renderer2
    ) {}

    /**
     * List of focusable menu items with their neighbors in 4 directions.
     */
    menuItems: MenuItem[];
    /**
     * The menu item which can toggle this menu. This can be the root dropdown trigger or nested menu trigger
     */
    private menuTrigger: MenuItem;
    private dropdownTriggerEl: HTMLElement;
    private clrDropdownMenuEl: HTMLElement;
    private isRootDropdown = !this.parentVcdDropdown;
    private timeoutId: number;
    private subscriptionTracker = new SubscriptionTracker(this);
    private unlistenRightArrowKeyPress: (...argArray: any[]) => any;

    /**
     * After a dropdown menu is opened, it creates {@link MenuItem} for each of the menu items along with their trigger menu item and links
     * them. It also then moves the focus to first item in the opened menu list.
     */
    ngAfterViewInit(): void {
        this.dropdownTriggerEl = this.hostVcdDropdown._dropdownTriggerEl;
        this.listenToRightArrowKeyPressOnNestedTrigger();

        this.subscriptionTracker.subscribe(this.hostVcdDropdown.dropdownMenuUpdated, (dropdown) => {
            if (!dropdown) {
                this.reset();
                return;
            }
            this.clrDropdownMenuEl = dropdown.menu;
            // We have to wait till the dropdown is opened for getting the menus trigger because, in case of a nested menu, the trigger is
            // obtained from parent menus menuItems and they are not initialized even if we wait till the ngAfterViewInit hook
            this.menuTrigger = this.isRootDropdown ? this.rootMenuTrigger : this.nestedMenuTrigger;
            this.registerRootMenuContainer();
            this.linkMenuItems();
            this.moveFocusToFirstItem();
        });
    }

    /**
     * Sometimes when the right arrow key is pressed on a nested menu trigger, the event is propagating to sibling nested menu triggers and
     * the event handlers attached to the menu triggers by clarity to toggle the menus are being invoked. Because of this, pressing right
     * arrow on a nested menu is opening other sibling menus as well
     */
    private listenToRightArrowKeyPressOnNestedTrigger(): void {
        if (this.isRootDropdown) {
            return;
        }
        this.unlistenRightArrowKeyPress = this.renderer.listen(
            this.dropdownTriggerEl,
            'keydown.arrowright',
            (event: Event) => event.stopPropagation()
        );
    }

    private reset(): void {
        if (this.isRootDropdown) {
            this.focusHandlerService.unlistenFuncs.forEach((unlisten) => unlisten());
        }
        this.menuTrigger = null;
        this.menuItems = null;
    }

    ngOnDestroy(): void {
        if (this.unlistenRightArrowKeyPress) {
            this.unlistenRightArrowKeyPress();
        }
    }

    private registerRootMenuContainer(): void {
        if (this.isRootDropdown) {
            const rootMenuContainer = this.clrDropdownMenuEl;
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
        const menuChildren: Element[] = Array.from(this.clrDropdownMenuEl.children);
        this.menuItems = menuChildren.map((child) => ({
            element: (child.matches('button') ? child : child.querySelector('clr-dropdown > button')) as HTMLElement,
            left: this.menuTrigger,
        }));
        this.linkVertical();
        // Lint to menu trigger
        if (this.isRootDropdown) {
            this.menuTrigger.down = this.menuItems[0];
        } else {
            // If there is a parent dropdown, We have to link these menu items to their trigger in the parent dropdown
            this.menuTrigger.right = this.menuItems[0];
        }
    }

    private get rootMenuTrigger(): MenuItem {
        return {
            element: this.dropdownTriggerEl,
            closeMenu: (event: Event) => {
                this.hostVcdDropdown.clrDropdown.toggleService.open = false;
            },
        };
    }

    private get nestedMenuTrigger(): MenuItem {
        const menuTrigger = this.parentFocusHandler.menuItems.find((item) => {
            return Object.is(item.element.innerText, this.dropdownTriggerEl.innerText);
        });
        menuTrigger.closeMenu = (event: Event) => {
            this.hostVcdDropdown.clrDropdown.toggleService.open = false;
        };
        return menuTrigger;
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
