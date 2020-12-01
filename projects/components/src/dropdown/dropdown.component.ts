/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    Optional,
    Output,
    Provider,
    QueryList,
    Renderer2,
    Self,
    SkipSelf,
    TrackByFunction,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { ClrDropdown, ClrDropdownMenu, ClrDropdownTrigger } from '@clr/angular';
import { ActionItem, TextIcon } from '../common/interfaces';
import { CliptextConfig, TooltipSize } from '../lib/directives';
import { CommonUtil } from '../utils';
import { DropdownFocusHandlerService } from './dropdown-focus-handler.service';

const NESTED_DROPDOWN_TRIGGER_SELECTOR = 'clr-dropdown clr-dropdown > button';
const DROPDOWN_ITEM_SELECTOR = 'clr-dropdown-menu > button';
export const NESTED_MENU_HIDE_DELAY = 400;

export function dropdownFocusHandlerServiceFactory(
    renderer: Renderer2,
    existing: DropdownFocusHandlerService
): DropdownFocusHandlerService {
    return existing || new DropdownFocusHandlerService(renderer);
}

export const DROPDOWN_FOCUS_HANDLER_PROVIDER: Provider = {
    provide: DropdownFocusHandlerService,
    useFactory: dropdownFocusHandlerServiceFactory,
    deps: [Renderer2, [new Optional(), new SkipSelf(), DropdownFocusHandlerService]],
};

/**
 * Component used for displaying nested drop downs
 */
@Component({
    selector: 'vcd-dropdown',
    templateUrl: 'dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    providers: [DROPDOWN_FOCUS_HANDLER_PROVIDER],
})
export class DropdownComponent implements AfterViewInit {
    private _dropdownItemContents: TextIcon = TextIcon.TEXT;

    private _items: ActionItem<unknown, unknown>[];

    /**
     * Decides what goes into the action buttons
     * @param textIcon An enum that describes the possible ways to display the button title
     */
    @Input() set dropdownItemContents(textIcon: TextIcon) {
        this._dropdownItemContents = textIcon;
        this.shouldShowIcon = (TextIcon.ICON & textIcon) === TextIcon.ICON;
        this.shouldShowText = (TextIcon.TEXT & textIcon) === TextIcon.TEXT;
        this.shouldShowTooltip = textIcon === TextIcon.ICON;
    }
    get dropdownItemContents(): TextIcon {
        return this._dropdownItemContents;
    }
    /**
     * Nested list of dropdown objects
     */
    @Input() set items(items: ActionItem<unknown, unknown>[]) {
        this._items = this.flattenNestedItemsWithSingleChild(items);
    }
    get items(): ActionItem<unknown, unknown>[] {
        return this._items;
    }

    @Output() dropdownMenuUpdated = new EventEmitter<{ menu: HTMLElement }>();

    constructor(
        @Optional() @SkipSelf() private parentVcdDropdown: DropdownComponent,
        private focusHandler: DropdownFocusHandlerService
    ) {}

    @ViewChild(ClrDropdownMenu)
    set clrDropdownMenu(val: ClrDropdownMenu) {
        this._clrDropdownMenu = val;
        if (!val) {
            return;
        }
        // Disable Claritys focus handling logic
        this._clrDropdownMenu.items.reset([]);
        this._clrDropdownMenu.items.notifyOnChanges();
    }
    private _clrDropdownMenu: ClrDropdownMenu;

    @ViewChild(ClrDropdownTrigger, { read: ElementRef, static: true })
    set dropdownTriggerEl(val: ElementRef<HTMLElement>) {
        this._dropdownTriggerEl = val ? val.nativeElement : null;
    }
    _dropdownTriggerEl: HTMLElement;

    @ViewChild(ClrDropdownMenu, { read: ElementRef, static: false })
    set clrDropdownMenuEl(val: ElementRef<HTMLElement>) {
        if (!val) {
            this.dropdownMenuUpdated.emit(null);
            return;
        }
        this._clrDropdownMenuEl = val.nativeElement;
        this.dropdownMenuUpdated.emit({
            menu: this._clrDropdownMenuEl,
        });
    }
    _clrDropdownMenuEl: HTMLElement;
    /**
     * If a icon should be displayed inside contextual buttons
     */
    shouldShowIcon: boolean = (TextIcon.ICON & this.dropdownItemContents) === TextIcon.ICON;

    /**
     * If a text should be displayed inside contextual buttons
     */
    shouldShowText: boolean = (TextIcon.TEXT & this.dropdownItemContents) === TextIcon.TEXT;

    /**
     * If the contextual buttons with icons should have a tooltip
     */
    shouldShowTooltip: boolean = this.dropdownItemContents === TextIcon.ICON;

    /**
     * Default configuration for vcdShowClippedText directive
     */
    clipTextConfig: CliptextConfig = {
        mouseoutDelay: 0,
        size: TooltipSize.md,
        disabled: false,
    };

    /**
     * Text Content of the button that opens the root dropdown when clicked
     */
    @Input() dropdownTriggerBtnTxt: string = 'vcd.cc.action.menu.other.actions';

    /**
     * Icon shown in the button that opens the root dropdown when clicked
     */
    @Input() dropdownTriggerBtnIcon: string = 'ellipsis-horizontal';

    /**
     * The {@link ngForTrackBy} method used for rendering of a dropdown actions or for rendering nested drop downs
     * NOTE: Without this, nested drop downs don't get rendered on the screen
     */
    @Input() trackByFunction: TrackByFunction<ActionItem<unknown, unknown>>;

    /**
     * The position the root dropdown with respect to root dropdown trigger button. Refer to {@link clrPosition} for it's values
     */
    @Input() dropdownPosition: string;

    /**
     * The position of all the nested dropdowns {@link clrPosition}. Default is 'bottom-left'
     */
    @Input() nestedDropdownPosition: string = 'right-top';

    /**
     * Argument for {@link ActionItem.handler} and {@link ActionItem.disabled} methods. Please refer to
     * {@link ActionMenuComponent.selectedEntities}
     */
    @Input() selectedEntities: unknown[];

    /**
     * Used for displaying different button contents in the root dropdown trigger button vs nested dropdown trigger button
     */
    @Input() isNestedDropdown = false;

    @Input() isDropdownDisabled: boolean;

    /**
     * Css class name added to the dropdown trigger buttons
     */
    @Input() dropdownTriggerButtonClassName: string;

    /**
     * To toggle open and close states when hovered over
     */
    @ViewChild(ClrDropdown) clrDropdown: ClrDropdown;

    /**
     * The button that opens this dropdown when clicked. Used for preventing the clarity frameworks click handler logic
     * from executing
     */
    @ViewChild(ClrDropdownTrigger) clrDropdownTrigger: ClrDropdownTrigger;

    /**
     * List of nested dropdown children that belong to this dropdown. Used to close when a different child in this menu list is
     * hovered over
     */
    @ViewChildren(DropdownComponent) vcdDropdownChildren: QueryList<DropdownComponent>;

    private hideTimeout: number;

    private flattenNestedItemsWithSingleChild(items: ActionItem<unknown, unknown>[]): ActionItem<unknown, unknown>[] {
        items.forEach((item) => {
            // Flatten out the dropdowns with single children at each level of dropdown
            this.flattenItemsWithSingleChild(items);
            if (item.children) {
                // Repeat the same for other nested levels
                this.flattenNestedItemsWithSingleChild(item.children);
            }
        });
        return items;
    }

    private flattenItemsWithSingleChild(items: ActionItem<unknown, unknown>[]): void {
        const singleChildItemIndices: number[] = [];
        items.forEach((item, index) => {
            // Collect the indices of single child items
            if (item.children && item.children.length === 1) {
                singleChildItemIndices.push(index);
            }
        });
        singleChildItemIndices.forEach((singleChildItemIndex) => {
            // Delete them from the original list and add their children to the beginning of the current list
            const singleChildItem = items.splice(singleChildItemIndex, 1).pop();
            items.unshift(singleChildItem.children[0]);
        });
    }

    /**
     * Nested menus are toggled using the mouseover and mouseout events instead of mouse clicks. So the claritys
     * click handler which conflicts with that is prevented from executing
     */
    ngAfterViewInit(): void {
        if (this.parentVcdDropdown) {
            this.clrDropdownTrigger.onDropdownTriggerClick = (event: Event) => {
                event.stopPropagation();
            };
        }
    }

    /**
     * To check in the HTML, if a dropdown item of separator type should be used to add a separator item in the dropdown
     * This is required because,
     * 1. As each item decides its own availability, some groups may become empty and we collapse separators before them
     * 2. A separator is not required if it is the first item in the dropdown list
     * @param index Position of the dropdown item in the dropdown list
     * @param currentItem The current item in the list that is being iterated over
     */
    shouldRenderAsSeparator(index: number, currentItem: ActionItem<unknown, unknown>): boolean {
        const nextItem = this.items[index + 1];
        return index > 0 && currentItem.isSeparator && !!nextItem && !nextItem.isSeparator;
    }

    /**
     * Handles the mouseover events on this dropdown's children that are of {@link #DROPDOWN_ITEM_SELECTOR} and
     * {@link #NESTED_DROPDOWN_TRIGGER_SELECTOR} type. When mouse is hovered on a child of type...
     * - DROPDOWN_ITEM_SELECTOR: Any open children of dropdown type have to be closed. This is because, user will always not mouse out of
     * a nested dropdown host(<vcd-dropdown>) to trigger the close event. He can move the mouse from nested dropdown's item to this
     * dropdown's item directly
     * - NESTED_DROPDOWN_TRIGGER_SELECTOR: Any open children of parent dropdown have to be closed and this dropdown has to be opened. We ask
     * the parent to close its children because, the mouse over events are not propagated upwards when hovered over a child of nested
     * dropdown type
     */
    @HostListener('mouseover', ['$event'])
    onMouseOver(event: Event): void {
        event.stopPropagation();
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
        }
        const target = event.target as Element;
        if (target.matches(DROPDOWN_ITEM_SELECTOR)) {
            this.closeOpenVcdDropdownChildren();
        }
        if (target.matches(NESTED_DROPDOWN_TRIGGER_SELECTOR)) {
            if (this.parentVcdDropdown) {
                this.parentVcdDropdown.closeOpenVcdDropdownChildren();
            }
            this.clrDropdown.toggleService.open = true;
        }
    }

    /**
     * Handles the mouseout events on this dropdown's children that are of {@link #NESTED_DROPDOWN_TRIGGER_SELECTOR} type
     */
    @HostListener('mouseout', ['$event'])
    onMouseOut(event: Event): void {
        event.stopPropagation();
        const target = event.target as Element;
        if (target.matches(NESTED_DROPDOWN_TRIGGER_SELECTOR)) {
            this.hideTimeout = window.setTimeout(
                () => (this.clrDropdown.toggleService.open = false),
                NESTED_MENU_HIDE_DELAY
            );
        }
    }

    private closeOpenVcdDropdownChildren(): void {
        this.vcdDropdownChildren
            .filter((vcdDropdown) => vcdDropdown.clrDropdown.toggleService.open)
            .forEach((vcdDropdown) => (vcdDropdown.clrDropdown.toggleService.open = false));
    }

    /**
     * When space or enter key is pressed on the focused dropdown menu item, it has to be clicked
     * @param event Space or Enter key press event
     */
    onDropdownItemActivated(event: Event): void {
        event.stopPropagation();
        // We need to dispatch a click event instead of just calling the click handler because, Clarity listens to a
        // click event to close the menu after an item is activated
        event.target.dispatchEvent(new Event('click'));
    }

    /**
     * When space or enter is pressed on a nested trigger, the nested menu has to be opened. So, we trigger a mouseover event which opens
     * the nested menu
     * @param event Space or Enter key press event
     */
    onDropdownTriggerActivated(event: Event): void {
        // For the root dropdown, it is already being handled by Clarity
        if (!this.parentVcdDropdown) {
            return;
        }
        event.stopPropagation();
        event.target.dispatchEvent(
            new MouseEvent('mouseover', {
                view: window,
                bubbles: true,
                cancelable: true,
            })
        );
    }

    /**
     * We use [clrDisabled] instead of [disabled] to show that a dropdown item is disabled. However, it doesn't prevent the item from
     * getting activated when it is clicked. So, we make sure the action is not disabled before clicking it
     */
    onItemClicked(item: ActionItem<any, any>): void {
        if (this.isItemDisabled(item)) {
            return;
        }
        if (item.handler) {
            item.handler(this.selectedEntities, item.handlerData);
        }
    }

    /**
     * To visually disable a displayed action
     */
    isItemDisabled(item: ActionItem<any, any>): boolean {
        return (CommonUtil.isFunction(item.disabled) ? item.disabled(this.selectedEntities) : item.disabled) as boolean;
    }

    /**
     * When an esc key is pressed on a dropdown item, the behavior should be same as pressing left arrow key on the item. This is
     * being handled here instead of inside the {@link DropdownFocusHandlerService} because, the escape event is being absorned by
     * Claritys focus handling logic before it reaches the service.
     */
    onDropdownEscPressed(event: Event): void {
        event.stopPropagation();
        this.focusHandler.escapePressed();
    }
}
