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
    unlistenFuncs: ((...argArray: any[]) => any)[] = [];

    constructor(private renderer: Renderer2) {}

    ngOnDestroy(): void {
        this.unlistenFuncs.forEach((unlisten) => unlisten());
    }

    /**
     * Moves the focus to HTML element in the given direction
     */
    moveFocus(direction: Direction): void {
        switch (direction) {
            case Direction.DOWN:
                this.moveFocusTo(this.currentFocusedItem.down);
                break;
            case Direction.LEFT:
                this.moveFocusTo(this.currentFocusedItem.left);
                break;
            case Direction.UP:
                this.moveFocusTo(this.currentFocusedItem.up);
                break;
            case Direction.RIGHT:
                this.moveFocusTo(this.currentFocusedItem.right);
                break;
        }
    }

    /**
     * Calls the HTML focus method on the HTML element passed
     */
    moveFocusTo(item: MenuItem): void {
        if (!item) {
            return;
        }
        if (this.currentFocusedItem) {
            // Sometimes, when navigating to a nested menu using right arrow, the nested menu trigger gets focused multiple times
            if (Object.is(this.currentFocusedItem.element, item.element)) {
                return;
            }
            this.currentFocusedItem.element.blur();
        }
        item.element.focus();
        this.currentFocusedItem = item;
    }

    /**
     * Attaches arrow key event listeners to the root menu container in all direction except right. This is because, when a right arrow is
     * pressed, Clarity opens the nested dropdown menu and the logic inside {@link DropdownFocusHandlerDirective.ngAfterViewInit}
     * automatically moves the focus to first item in the menu on the right side
     */
    listenToArrowKeys(menuContainer: HTMLElement): void {
        this.unlistenFuncs.push(
            this.renderer.listen(menuContainer, 'keydown.arrowdown', (event: Event) => {
                this.moveFocus(Direction.DOWN);
                event.preventDefault();
                event.stopPropagation();
            })
        );
        this.unlistenFuncs.push(
            this.renderer.listen(menuContainer, 'keydown.arrowup', (event: Event) => {
                this.moveFocus(Direction.UP);
                event.preventDefault();
                event.stopPropagation();
            })
        );
        this.unlistenFuncs.push(
            this.renderer.listen(menuContainer, 'keydown.arrowleft', (event: Event) => {
                if (!this.currentFocusedItem.left) {
                    return;
                }
                // Close the nested menu before moving focus to left side
                this.currentFocusedItem.left.closeMenu(event);
                this.moveFocus(Direction.LEFT);
                event.preventDefault();
                event.stopPropagation();
            })
        );
    }
}
