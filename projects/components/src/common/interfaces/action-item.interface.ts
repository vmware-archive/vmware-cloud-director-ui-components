/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

/**
 * List of different type of action buckets
 */
import { Observable } from 'rxjs';

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
 * Data required for displaying an action item in a menu. Additional data like the type of action and visibility is part of separate
 * interfaces {@link StaticActionItem} and {@link ContextualActionItem}
 * T is the type of custom data passed to action handler
 * R is the type of selected entity on which the action will be performed
 */
export interface BaseActionItem<R, T> {
    /**
     * The i18n key or a translated string for contents of a action button. This is also added as the data-ui attribute on a action button
     * HTML element so that it can be used as a CSS selector
     */
    textKey?: string;
    /**
     * The css class the button should have.
     *
     * Must be unique among all added actions within an action list
     */
    class?: string;
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
 * Created this separate type to enforce the type of Static actions availability to not be a call back method. This is because, call back
 * with selected entities is only supported for Contextual actions as the call backs receive selected entities and static actions visibility
 * is not dependent on selected entities
 */
interface StaticActionItem<R, T> extends BaseActionItem<R, T> {
    /**
     * Used for determining where in the action menu this action gets displayed
     */
    actionType: ActionType.STATIC_FEATURED | ActionType.STATIC;
    /**
     * Condition whether or not the action is available. It is an observable if it relies on response from asynchronous requests
     */
    availability?: Observable<boolean>;
}

/**
 * Created this separate type for contextual actions because, we want to enforce the type of Static actions availability to not be a call back method.
 * Refer to {@link #StaticActionItem}
 */
interface ContextualActionItem<R, T> extends BaseActionItem<R, T> {
    /**
     * Used for determining where in the action menu this action gets displayed
     */
    actionType?: ActionType.CONTEXTUAL_FEATURED | ActionType.CONTEXTUAL;
    /**
     * Condition whether or not the action is available. Call back with selected entities when visibility depends on entities selected.
     * It is an observable if it relies on some other condition like a response from asynchronous requests
     */
    availability?: Observable<boolean> | ((selectedEntities: R[]) => boolean);
}

/**
 * Lets the caller pass both static and contextual actions as part of a single array
 */
export type ActionItem<R, T> = StaticActionItem<R, T> | ContextualActionItem<R, T>;

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

/**
 * This is created separately from {@link ContextualActionInlineDisplayConfig} because, featured count is only required
 * when contextual actions are displayed as a dropdown
 */
export interface ContextualActionDropdownDisplayConfig {
    /**
     * To display actions in a dropdown
     */
    styling: ActionStyling.DROPDOWN;
    /**
     * If the title should be the button label, icon, or both
     * Defaults to {@link TextIcon.TEXT} when unset
     */
    buttonContents?: TextIcon;
}

/**
 * This along with {@link ContextualActionDropdownDisplayConfig} is one of the types of
 * {@link ActionDisplayConfig.contextual}
 */
export interface ContextualActionInlineDisplayConfig {
    /**
     * How many buttons should display on the featured section.
     *
     * Used when you want to set a limit on the number of featured buttons shown.
     *
     * If featuredCount is not set, it will default to all featured actions.
     */
    featuredCount?: number;
    /**
     * To display actions in a inline horizontal ribbon
     */
    styling: ActionStyling.INLINE;
    /**
     * If the title should be the button label, icon, or both
     * Defaults to {@link TextIcon.TEXT} when unset
     */
    buttonContents?: TextIcon;
}

/**
 * Display configuration of actions that are displayed in a action menu
 */
export interface ActionDisplayConfig {
    /**
     * How the contextual actions list shows up on the screen
     * If this is not specified, this defaults to { featuredCount: 0, styling: ActionStyling.INLINE, buttonContents: TextIcon.TEXT}
     */
    contextual?: ContextualActionDropdownDisplayConfig | ContextualActionInlineDisplayConfig;

    /**
     * How the static actions list shows up on the screen
     * This defaults to ActionStyling.INLINE
     */
    staticActionStyling?: ActionStyling;
}
