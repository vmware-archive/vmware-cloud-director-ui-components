/*!
 * Copyright 2020-2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, EventEmitter, Input, Output, TrackByFunction } from '@angular/core';
import { ActionDisplayConfig, ActionItem, ActionStyling, ActionType, TextIcon } from '../common/interfaces';
import { CommonUtil } from '../utils';

/**
 * To add default values to configs if they are not provided by the caller in the input config
 */
export function getDefaultActionDisplayConfig(cfg: ActionDisplayConfig = {}): ActionDisplayConfig {
    const defaults = {
        contextual: {
            featuredCount: 0,
            styling: ActionStyling.INLINE,
            buttonContents: TextIcon.TEXT,
        },
        staticActionStyling: ActionStyling.INLINE,
    };
    return { ...defaults, ...cfg };
}

/**
 * Renders actions in screens containing grids, cards and details container screens
 * R is the type of selected entity on which the action will be performed
 * T is the type of custom data passed to action handler methods
 */
@Component({
    selector: 'vcd-action-menu',
    templateUrl: './action-menu.component.html',
    styleUrls: ['./action-menu.component.scss'],
})
export class ActionMenuComponent<R, T> {
    /**
     * Emits when the actions have been updated.
     * Then one can get the actual actions from {@link staticActions} and {@link contextualActions} property.
     */
    @Output() actionsUpdate: EventEmitter<void> = new EventEmitter();

    /**
     * List of actions containing both static and contextual that are given by the calling component
     */
    @Input() set actions(actions: ActionItem<R, T>[]) {
        this.refreshActions(actions);
    }
    private _actions: ActionItem<R, T>[] = [];
    get actions(): ActionItem<R, T>[] {
        return this._actions;
    }

    /**
     * Used by the {@link EntityActionExtensionComponentsDirective} to provide the extension actions from plugins after
     * they are created asynchronously
     * @param val List of extension actions
     */
    set extensionEntityActions(val: ActionItem<unknown, unknown>[]) {
        this._extensionEntityActions = val;
    }
    private _extensionEntityActions: ActionItem<unknown, unknown>[];

    private _actionDisplayConfig: ActionDisplayConfig = getDefaultActionDisplayConfig();
    /**
     * Display configuration of both static and contextual actions
     * If null or undefined is passed, default config {@link _actionDisplayConfig} is used
     */
    @Input() set actionDisplayConfig(config: ActionDisplayConfig) {
        this._actionDisplayConfig = getDefaultActionDisplayConfig(config || {});
        const buttonContents = this.actionDisplayConfig.contextual.buttonContents;
        this.shouldShowIcon = (TextIcon.ICON & buttonContents) === TextIcon.ICON;
        this.shouldShowText = (TextIcon.TEXT & buttonContents) === TextIcon.TEXT;
        this.shouldShowTooltip = buttonContents === TextIcon.ICON;
        this.updateActionListsAndDisplayFlags();
    }
    get actionDisplayConfig(): ActionDisplayConfig {
        return this._actionDisplayConfig;
    }

    /**
     * When there are no nested actions and if all of the contextual actions are marked to be featured, there is no need to show
     * the contextual actions dropdown in the inline actions container
     */
    shouldDisplayContextualActionsDropdownInline = false;

    /**
     * Text Content of the action menu dropdown trigger button. Used when {@link #actionDisplayConfig} styling is
     * {@link ActionStyling.DROPDOWN}
     */
    @Input() dropdownTriggerBtnText: string = null;

    /**
     * Text Content of the action menu dropdown trigger button inside the .inline-actions-container
     */
    inlineDropdownTriggerBtnText = 'vcd.cc.action.menu.actions';

    /**
     * Icon of the action menu dropdown trigger button. Used when {@link #actionDisplayConfig} styling is
     * {@link ActionStyling.DROPDOWN}
     */
    @Input() dropdownTriggerBtnIcon: string = null;

    /**
     * Used for disabling the menu bar or menu dropdown
     */
    @Input() disabled: boolean;

    /**
     * The list of entities selected on which contextualActions are performed. As they are also used for calculating the
     * availability of actions, action lists are updated
     */
    @Input() set selectedEntities(val: R[]) {
        this._selectedEntities = val;
        this.updateActionListsAndDisplayFlags();
    }
    private _selectedEntities: R[] = [];
    get selectedEntities(): R[] {
        return this._selectedEntities;
    }

    /**
     * The direction with respect to the root dropdown trigger button in which the root drop down should open
     * {@link DropdownComponent.dropdownPosition}
     */
    @Input() dropdownPosition: string;

    /**
     * The direction in which the nested drop downs open. {@link DropdownComponent.nestedDropdownPosition}
     */
    @Input() nestedDropdownPosition = 'right-top';

    /**
     * If a icon should be displayed inside contextual buttons
     */
    shouldShowIcon: boolean = (TextIcon.ICON & this.actionDisplayConfig.contextual.buttonContents) === TextIcon.ICON;

    /**
     * If a text should be displayed inside contextual buttons
     */
    shouldShowText: boolean = (TextIcon.TEXT & this.actionDisplayConfig.contextual.buttonContents) === TextIcon.TEXT;

    /**
     * If the contextual buttons with icons should have a tooltip
     */
    shouldShowTooltip: boolean = this.actionDisplayConfig.contextual.buttonContents === TextIcon.ICON;

    /**
     * Used in the html template
     */
    actionStyling = ActionStyling;

    /**
     * List of actions that are marked as {@link ActionType.STATIC_FEATURED} only
     */
    staticFeaturedActions: ActionItem<R, T>[];

    /**
     * Actions that depend on selected entities and belong to main menu list. The returned list length is less than or
     * equal to the configured featured count in {@link actionDisplayConfig}
     */
    contextualFeaturedActions: ActionItem<R, T>[];

    /**
     * All the actions that depend on selected entities
     */
    contextualActions: ActionItem<R, T>[];

    /**
     * List containing all the static actions. It has static featured actions in the beginning of the list followed by
     * non-featured static actions as children of grouped action called 'vcd.cc.action.menu.all.actions'
     */
    staticDropdownActions: ActionItem<R, T>[] | object;

    /**
     * List of only the actions that are marked as {@link ActionType.STATIC}
     */
    staticActions: ActionItem<R, T>[];

    /**
     * To show or hide the container elements containing inline and also dropdown actions
     */
    shouldDisplayActionsInline: boolean;

    /**
     * To show or hide {@link ActionType.CONTEXTUAL} and {@link ActionType.CONTEXTUAL_FEATURED} actions in inline
     * action container
     */
    shouldDisplayContextualActionsInline: boolean;

    /**
     * To show or hide {@link ActionType.STATIC_FEATURED} actions in inline action container
     */
    shouldDisplayStaticFeaturedActionsInline: boolean;

    /**
     * To show or hide {@link ActionType.STATIC} actions in inline action container
     */
    shouldDisplayStaticActionsInline: boolean;

    /**
     * To show or hide {@link ActionType.STATIC_FEATURED} and {@link ActionType.STATIC} actions in a dropdown
     */
    shouldDisplayStaticAndStaticFeaturedActionsDropdown: boolean;

    /**
     * To show or hide {@link ActionType.CONTEXTUAL} and {@link ActionType.CONTEXTUAL_FEATURED} actions in a dropdown
     */
    shouldDisplayContextualActionsDropdown: boolean;

    /**
     * Returns the actions to be shown
     */
    getAvailableActions(actions: ActionItem<R, T>[]): ActionItem<R, T>[] {
        return actions
            .filter((action) => this.isActionAvailable(action) && (!action.children || action.children.length !== 0))
            .map((action) => {
                const actionCopy = { ...action, children: action.children ? [...action.children] : null };
                if (actionCopy.children) {
                    actionCopy.children = this.getAvailableActions(actionCopy.children);
                }
                return actionCopy;
            });
    }

    /**
     * The visibility of actions is dependent on their availability call back responses and in VCD application, some of the actions
     * availability call back response is dependent on closure variables. However, we don't call those call backs every time those closure
     * variables are updated, for example by asynchronous requests. This has a side effect of actions visibility not getting updated when
     * those closure variables are updated. So, this convenience method is to make it clear for the user that such side effect exists and
     * this method will re-trigger the availability call backs of actions
     */
    updateDisplayedActions(): void {
        this.refreshActions(this.actions);
    }

    private refreshActions(actions: ActionItem<R, T>[]): void {
        if (!actions) {
            return;
        }
        const hasNestedActions = actions.some((action) => action.children?.length > 0);
        const markUnmarkedActionsAsContextual =
            hasNestedActions ||
            this.getFlattenedActionList(actions, ActionType.CONTEXTUAL_FEATURED).some(
                (action) => action.actionType && action.actionType === ActionType.CONTEXTUAL_FEATURED
            );

        this._actions = actions.map((action) => {
            const actionCopy = { ...action, children: action.children ? [...action.children] : null };
            if (!actionCopy.actionType) {
                actionCopy.actionType = markUnmarkedActionsAsContextual
                    ? ActionType.CONTEXTUAL
                    : ActionType.CONTEXTUAL_FEATURED;
            }
            return actionCopy;
        });

        this.shouldDisplayContextualActionsDropdownInline =
            hasNestedActions || this._actions.some((action) => action.actionType === ActionType.CONTEXTUAL);

        this.updateActionListsAndDisplayFlags();
    }

    private updateActionListsAndDisplayFlags(): void {
        this.staticActions = this.getStaticActions();
        this.staticFeaturedActions = this.getStaticFeaturedActions();
        this.contextualFeaturedActions = this.getContextualFeaturedActions();
        this.contextualActions = this.getContextualActions();
        this.staticDropdownActions = this.getStaticDropdownActions();
        this.updateActionDisplayFlags();
    }

    private updateActionDisplayFlags(): void {
        this.shouldDisplayActionsInline = this.getShouldDisplayActionsInline();
        this.shouldDisplayContextualActionsInline = this.shouldDisplayContextualActions(this.actionStyling.INLINE);
        this.shouldDisplayStaticFeaturedActionsInline = this.shouldDisplayStaticFeaturedActions(
            this.actionStyling.INLINE
        );
        this.shouldDisplayStaticActionsInline = this.shouldDisplayStaticActions(this.actionStyling.INLINE);
        this.shouldDisplayStaticAndStaticFeaturedActionsDropdown =
            this.shouldDisplayStaticActions(this.actionStyling.DROPDOWN) ||
            this.shouldDisplayStaticFeaturedActions(this.actionStyling.DROPDOWN);
        this.shouldDisplayContextualActionsDropdown = this.shouldDisplayContextualActions(this.actionStyling.DROPDOWN);
        this.actionsUpdate.emit();
    }

    /**
     * An action whose availability is false but has the disabled state set to true is still shown on the screen in
     * disabled mode
     */
    private isActionAvailable(action: ActionItem<R, T>): boolean {
        return !action.availability || action.availability(this.selectedEntities) || this.isActionDisabled(action);
    }

    private getStaticFeaturedActions(): ActionItem<R, T>[] {
        const staticFeaturedActions = this.actions.filter((action) => action.actionType === ActionType.STATIC_FEATURED);
        return this.getAvailableActions(staticFeaturedActions);
    }

    private getContextualFeaturedActions(): ActionItem<R, T>[] {
        if (!this.selectedEntities?.length) {
            return [];
        }
        const flattenedFeaturedActionList = this.getFlattenedActionList(this.actions, ActionType.CONTEXTUAL_FEATURED);
        const availableFeaturedActions = this.getAvailableActions(flattenedFeaturedActionList);
        return this.actionDisplayConfig.contextual.featuredCount
            ? availableFeaturedActions.slice(0, this.actionDisplayConfig.contextual.featuredCount)
            : availableFeaturedActions;
    }

    private getStaticActions(): ActionItem<R, T>[] {
        const staticActions = this.actions.filter((action) => action.actionType === ActionType.STATIC);
        return this.getAvailableActions(staticActions);
    }

    private getStaticDropdownActions(): ActionItem<R, T>[] | object {
        return this.staticFeaturedActions.concat([
            { textKey: 'vcd.cc.action.menu.other.actions', children: this.staticActions },
        ]);
    }

    private getContextualActions(): ActionItem<R, T>[] {
        if (!this.selectedEntities?.length) {
            return [];
        }
        const contextualActions = this.actions.filter(
            (action) =>
                !action.actionType ||
                (action.actionType !== ActionType.STATIC_FEATURED && action.actionType !== ActionType.STATIC)
        );
        const availableContextualActions = this.getAvailableActions(contextualActions);
        if (this._extensionEntityActions) {
            availableContextualActions.push(...this._extensionEntityActions);
        }
        return availableContextualActions;
    }

    /**
     * Extracts the nested actions that are marked as featured and returns them as part of a flat list
     */
    private getFlattenedActionList(actions: ActionItem<R, T>[], actionType: ActionType): ActionItem<R, T>[] {
        let featuredActions: ActionItem<R, T>[] = [];
        actions.forEach((action) => {
            if (action.children && action.children.length) {
                featuredActions = featuredActions.concat(this.getFlattenedActionList(action.children, actionType));
            } else if (action.actionType === actionType) {
                featuredActions.push({ ...action });
            }
        });
        return featuredActions;
    }

    /**
     * Action click handler
     */
    runActionHandler(action: ActionItem<R, T>): void {
        if (this.isActionDisabled(action)) {
            return;
        }
        if (action.handler) {
            action.handler(this.selectedEntities, action.handlerData);
        }
    }

    /**
     * To disable a displayed action
     */
    isActionDisabled(action: ActionItem<R, T>): boolean {
        return (CommonUtil.isFunction(action.disabled)
            ? action.disabled(this.selectedEntities)
            : action.disabled) as boolean;
    }

    /**
     * Used as {@link ngForTrackBy} input value when iterating over action lists {@link DropdownComponent.trackByFunction}
     * Without this method as input for ngForTrackBy, the dropdown gets rendered off screen
     */
    actionsTrackBy: TrackByFunction<ActionItem<R, T>> = (index: number, item: ActionItem<R, T>): string => {
        return item.textKey;
    };

    private getShouldDisplayActionsInline(): boolean {
        return (
            this.shouldDisplayStaticFeaturedActions(ActionStyling.INLINE) ||
            this.shouldDisplayStaticActions(ActionStyling.INLINE) ||
            this.shouldDisplayContextualActions(ActionStyling.INLINE)
        );
    }

    private shouldDisplayStaticFeaturedActions(style: ActionStyling): boolean {
        return (
            this.staticFeaturedActions &&
            this.staticFeaturedActions.length &&
            this.actionDisplayConfig.staticActionStyling === style
        );
    }

    private shouldDisplayStaticActions(style: ActionStyling): boolean {
        return (
            this.staticActions && this.staticActions.length && this.actionDisplayConfig.staticActionStyling === style
        );
    }

    private shouldDisplayContextualActions(style: ActionStyling): boolean {
        return (
            this.selectedEntities?.length &&
            this.contextualActions.length &&
            this.actionDisplayConfig.contextual.styling === style
        );
    }
}

/**
 * Without the deep copy, the changes made to any of the action children in one of the methods will persist in other methods
 */
export function getDeepCopyOfActionItems<R, T>(actions: ActionItem<R, T>[]): ActionItem<R, T>[] {
    return actions.map((action) => {
        if (action.children && action.children.length) {
            action.children = getDeepCopyOfActionItems(action.children);
        }
        return { ...action };
    });
}
