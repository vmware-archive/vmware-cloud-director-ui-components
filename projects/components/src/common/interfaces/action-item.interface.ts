/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

/**
 * List of different type of action buckets
 */
export enum ActionType {
    /**
     * Global actions that are displayed always irrespective of the context. These display as the first set of actions
     */
    STATIC_FEATURED = 'STATIC_FEATURED',
    /**
     * Actions that are visible when an entity is selected. These display in the main menu section
     */
    CONTEXTUAL_FEATURED = 'CONTEXTUAL_FEATURED',
    /**
     * Actions that are visible when an entity is selected. These display in a sub menu
     */
    CONTEXTUAL = 'CONTEXTUAL',
    /**
     * Actions that are not context dependent. These display after the above 3 buckets of actions
     */
    STATIC = 'STATIC',
}

/**
 * Type of {@link ActionItem.handler} function
 */
export type ActionHandlerType<R, T> = (selectedEntities?: R[], handlerData?: T) => Promise<string | undefined> | void;

/**
 * Data required for displaying an action item in a menu.
 * T is the type of custom data passed to action handler
 * R is the type of selected entity on which the action will be performed
 */
export interface ActionItem<R, T> {
    /**
     * The i18n key or a translated string for contents of a action button
     */
    textKey?: string;
    /**
     * The css class the button should have.
     *
     * Must be unique among all added actions within an action list
     */
    class?: string;
    /**
     * Condition whether or not the action is available.
     * @param records Single item in case of an operation on single record and multiple in case of an operation on batch
     * selection
     */
    availability?: (records?: R[], additionalData?: any) => boolean;
    /**
     * Indicates if an action that is available should be disabled. If true, a non available action is disabled.
     * If false, a non-available action is hidden
     */
    disabled?: ((records?: R[]) => boolean) | boolean;
    /**
     * The key that will be fired with the action.
     */
    action?: string;
    /**
     * The function to be executed when the button is clicked.
     *
     * Actions that require additional user input can collect it using handlerData which will be passed as an argument
     * to the handler call
     */
    handler?: ActionHandlerType<R, T>;
    /**
     * Custom data that will be passed when handler is called
     */
    handlerData?: any;
    /**
     * Used for determining where in the action menu this action gets displayed
     */
    actionType?: ActionType;
    /**
     * The Clarity icon of the contextual button that is displayed if the button is featured.
     */
    icon?: string;
    /**
     * List of actions that will be grouped under this action
     */
    children?: ActionItem<R, T>[];
    /**
     * To mark if the {@link #ActionItem.textKey} has to be translated or not
     */
    isTranslatable?: boolean;
    /**
     * To add separators between groups of actions
     */
    isSeparator?: boolean;
    /**
     * Busy state for the menu item. Used by extension actions of plugins
     */
    busy?: boolean;
}

/**
 * Configuration of actions that are not static/featured
 */
export interface ActionDisplayConfig {
    /**
     * How the contextual actions list shows up on the screen
     */
    contextual?: {
        /**
         * How many buttons should display on the featured section.
         *
         * Used when you want to set a limit on the number of featured buttons shown.
         *
         * If featuredCount is not set, it will default to all featured actions.
         */
        featuredCount: number;
        /**
         * How the featured actions should be displayed
         */
        styling: ActionStyling;
        /**
         * If the title should be the button label, icon, or both
         * Defaults to ICON if unset.
         */
        buttonContents: TextIcon;
    };

    /**
     * How the static actions list shows up on the screen
     */
    staticActionStyling?: ActionStyling;
}

/**
 * Display options for action menu
 */
export enum ActionStyling {
    INLINE = 'INLINE',
    DROPDOWN = 'DROPDOWN',
}

/**
 * An enum that describes the possible ways to display the button title.
 */
export enum TextIcon {
    ICON = 1 << 0,
    TEXT = 1 << 1,
    ICON_AND_TEXT = TextIcon.ICON | TextIcon.TEXT,
}
