/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

/**
 * Any entry in an entity action menu.
 */
import { Observable } from 'rxjs';

/**
 * This represents a menu item that can be clicked to perform an action on an entity (e.g. VM).
 */
export interface EntityActionExtensionMenuItem {
    /**
     * This is a unique URN identifying the action. This is so the component can be notified which action was requested.
     */
    urn: string;

    /**
     * This is the label for the menu item. It is not automatically translated.
     */
    text: string;

    /**
     * This is the enabled state for the menu item.
     */
    enabled: boolean;

    /**
     * This is the busy state for the menu item.
     */
    busy: boolean;
}

/**
 * This represents a sub-menu that contains other sub-menus or menu actions.
 */
export interface EntityActionExtensionSubmenu {
    /**
     * This is the label for the sub-menu. It is not automatically translated.
     */
    text: string;

    /**
     * This is an arbitrary, ordered list of EntityActionMenuItem.
     */
    children: EntityActionExtensionMenuItem[];
}

/**
 * This represents menu information for an entity action.
 */
export type EntityActionExtensionMenuEntry = EntityActionExtensionMenuItem | EntityActionExtensionSubmenu;

/**
 * Every component referenced by an entity action extension point must inherit from this.
 */
export abstract class EntityActionExtensionComponent {
    /**
     * This returns is an Observable that defines the menu entry for this component. This is actively bound -
     * the component is able to change it in order to have the menu change (for example, to change busy
     * or enabled states).
     */
    abstract getMenuEntry(entityUrn: string): Observable<EntityActionExtensionMenuEntry>;

    /**
     * This field is a method that is called if a menu item is clicked while enabled. It will be called with the menu
     * item's URN and the URN of the entity that the action is being called for (e.g. the URN of the VM being edited).
     * It must return a single-shot (e.g. of, fromPromise or .first) Observable on completion. This Observable returns
     * a single value, refreshRequested. If this is true, the entity being edited will be immediately refreshed.
     * @param menuItemUrn the URN of the clicked menu item
     * @param entityUrn The URN of the entity that the action is being called for
     */
    abstract performAction(menuItemUrn: string, entityUrn: string): Observable<{ refreshRequested: boolean }>;
}
