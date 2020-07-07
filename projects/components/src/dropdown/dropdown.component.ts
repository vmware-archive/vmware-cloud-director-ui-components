/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Input, TrackByFunction } from '@angular/core';

/**
 * Object representing an item of the dropdown
 */
interface DropdownItem<T extends DropdownItem<T>> {
    /**
     * The i18n key or a translated string for contents of a action button
     */
    textKey: string;
    /**
     * List of items that will be grouped under this item
     */
    children?: T[];
    /**
     * Condition whether or not the item is available.
     */
    availability?: (data?: any) => boolean;
    /**
     * The Clarity icon of the contextual button that is displayed if the button is featured.
     */
    icon?: string;
    /**
     * To mark if the {@link #ActionItem.textKey} does not require translation
     */
    isNotTranslatable?: boolean;
}

/**
 * Dumb component used for displaying nested drop downs
 */
@Component({
    selector: 'vcd-dropdown',
    templateUrl: 'dropdown.component.html',
})
export class DropdownComponent<T extends DropdownItem<T>> {
    /**
     * Nested list of dropdown objects
     */
    @Input() items: T[];

    /**
     * Content of the button that opens the root dropdown when clicked
     */
    @Input() dropdownTriggerBtnTxt: string;

    /**
     * The {@link ngForTrackBy} method used for rendering of a dropdown actions or for rendering nested drop downs
     * NOTE: Without this, nested drop downs don't get rendered on the screen
     */
    @Input() trackByFunction: TrackByFunction<T>;

    /**
     * The position the root dropdown. Refer to {@link clrPosition} for it's values
     */
    @Input() dropdownPosition: string = 'right-top';

    /**
     * The position of all the nested dropdowns {@link clrPosition}. Default is 'bottom-left'
     */
    @Input() nestedDropdownPosition: string;

    /**
     * Dropdown item click handler
     */
    @Input() onItemClickedCb: (item: T) => void;

    /**
     * Method to calculate disabled state of an item
     */
    @Input() isItemDisabledCb: (item: T) => boolean;

    /**
     * If a icon should be displayed inside contextual buttons
     */
    @Input() shouldShowIcon: boolean;

    /**
     * If a text should be displayed inside contextual buttons
     */
    @Input() shouldShowText: boolean;

    /**
     * If the contextual buttons with icons should have a tooltip
     */
    @Input() shouldShowTooltip: boolean;
}
