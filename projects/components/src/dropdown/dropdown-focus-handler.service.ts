/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Injectable, OnDestroy, Renderer2 } from '@angular/core';
import { Direction, MenuItem } from './dropdown-focus-handler.directive';

/**
 * Provided at the injector level of root {@link DropdownComponent}. The same service object is used for all the nested menus along
 * with the root menu. This is responsible for listening to arrow key presses within the root dropdown menu container and updating the
 * focused item on the DOM across all the nested and root menus.
 */
@Injectable()
export class DropdownFocusHandlerService implements OnDestroy {
    currentFocusedItem: MenuItem;
    unlistenFuncs: (() => void)[] = [];

    constructor(private renderer: Renderer2) {}

    ngOnDestroy(): void {
        this.unlistenFuncs.forEach((unlisten) => unlisten());
    }

    /**
     * Moves the focus to HTML element in the given direction and returns true if the focus is moved and false otherwise
     */
    moveFocus(direction: Direction): boolean {
        let moved;
        switch (direction) {
            case Direction.DOWN:
                moved = this.moveFocusTo(this.currentFocusedItem.down);
                break;
            case Direction.LEFT:
                moved = this.moveFocusTo(this.currentFocusedItem.left);
                break;
            case Direction.UP:
                moved = this.moveFocusTo(this.currentFocusedItem.up);
                break;
            case Direction.RIGHT:
                moved = this.moveFocusTo(this.currentFocusedItem.right);
                break;
        }
        return moved;
    }

    /**
     * Calls the HTML focus method on the HTML element passed and removed focus on currently focused element.
     * Returns true if the focus is moved and false otherwise.
     */
    moveFocusTo(item: MenuItem): boolean {
        let moved = false;
        if (!item) {
            return moved;
        }
        if (this.currentFocusedItem) {
            // Sometimes, when navigating to a nested menu using right arrow, the nested menu trigger gets focused multiple times
            if (Object.is(this.currentFocusedItem.element, item.element)) {
                return moved;
            }
            this.currentFocusedItem.element.blur();
        }
        item.element.focus();
        this.currentFocusedItem = item;
        moved = true;
        return moved;
    }

    /**
     * Attaches arrow key event listeners to the root menu container in all direction except right. This is because, when a right arrow is
     * pressed, Clarity opens the nested dropdown menu and the logic inside {@link DropdownFocusHandlerDirective.ngAfterViewInit}
     * automatically moves the focus to first item in the menu on the right side
     */
    listenToArrowKeys(menuContainer: HTMLElement): void {
        // The following listeners return false when the focus is moved for the key pressed, in order to prevent the default behavior of
        // that key. For example, to prevent scrolling of page underneath the dropdown when up and down arrow keys are pressed.
        this.unlistenFuncs.push(
            this.renderer.listen(menuContainer, 'keydown.arrowdown', (event: Event) => {
                event.stopPropagation();
                return !this.moveFocus(Direction.DOWN);
            })
        );
        this.unlistenFuncs.push(
            this.renderer.listen(menuContainer, 'keydown.arrowup', (event: Event) => {
                event.stopPropagation();
                return !this.moveFocus(Direction.UP);
            })
        );
        this.unlistenFuncs.push(
            this.renderer.listen(menuContainer, 'keydown.arrowleft', (event: Event) => {
                if (!this.currentFocusedItem.left) {
                    return true;
                }
                // Close the nested menu before moving focus to left side
                this.currentFocusedItem.left.closeMenu();
                event.stopPropagation();
                return !this.moveFocus(Direction.LEFT);
            })
        );
    }

    /**
     * Whenever escape is pressed on dropdown item, the menu has to be closed and the focus has to be moved to parent menu if any... Just
     * like when left arrow key is pressed
     */
    escapePressed(): void {
        if (!this.currentFocusedItem.left) {
            return;
        }
        // Close the nested menu before moving focus to left side
        this.currentFocusedItem.left.closeMenu();
        this.moveFocus(Direction.LEFT);
    }
}
