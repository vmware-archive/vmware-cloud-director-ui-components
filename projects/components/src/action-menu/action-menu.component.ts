/*!
 * Copyright 2020-2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, EventEmitter, Input, OnDestroy, Output, TrackByFunction } from '@angular/core';
import { isObservable, Observable, Subscription } from 'rxjs';
import {
    ActionDisplayConfig,
    ActionItem,
    ActionStyling,
    ActionType,
    BaseActionItem,
    TextIcon,
} from '../common/interfaces';
import { CommonUtil } from '../utils';

/**
 * To add default values to configs if they are not provided by the caller in the input config
 */
export function getDefaultActionDisplayConfig(cfg: ActionDisplayConfig = {}): ActionDisplayConfig {
    const defaults = {
        contextual: {
            styling: ActionStyling.INLINE,
            buttonContents: TextIcon.TEXT,
        },
        staticActionStyling: ActionStyling.INLINE,
    };
    return {
        contextual: { ...defaults.contextual, ...cfg.contextual },
        staticActionStyling: cfg.staticActionStyling || defaults.staticActionStyling,
    };
}

/**
 * Key of an action item object that is intended to be used only by this component and the {@link DropdownComponent}. This property is used
 * to store the last emitted value from availability observable of an action item.
 */
export const lastAvailabilityValue = Symbol();

/**
 * We internally convert the callbacks to booleans to avoid calling the callbacks all the time from template. However, we don't want to
 * allow callers to assign boolean variables to availability as there is no way to know when those variables can get updated from outside.
 */
interface ActionItemInternal<R, T> extends BaseActionItem<R, T> {
    /**
     * Used for determining where in the action menu this action gets displayed
     */
    actionType?: ActionType;
    /**
     * Condition whether or not the action is available.
     */
    availability?: Observable<boolean> | boolean;
    /**
     * Stores the last emitted value from availability observable of an action item. Used to show or hide that action item.
     */
    [lastAvailabilityValue]?: boolean;
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
export class ActionMenuComponent<R, T> implements OnDestroy {
    /**
     * To access the private key lastAvailabilityValue from the template
     */
    lastAvailabilityValue = lastAvailabilityValue;
    /**
     * Stores all the subscriptions of availability observables. Used for un-subscribing from subscriptions that are not needed
     */
    lastAvailabilitySubscriptions: Subscription[] = [];
    /**
     * Emits when the actions have been updated.
     * Then one can get the actual actions from {@link staticActions} and {@link contextualActions} property.
     */
    @Output() actionsUpdate: EventEmitter<void> = new EventEmitter();

    /**
     * List of actions containing both static and contextual that are given by the calling component
     */
    @Input() set actions(actions: ActionItem<R, T>[]) {
        actions = actions || [];
        // Shallow equal does the job for most of the cases and currently saves a lot of calculations
        if (this.isShallowEqual(actions, this._originalActions)) {
            return;
        }
        this._originalActions = actions;
        this.refreshActions(actions);
    }

    /**
     * Original actions as provided to this component without any modifications
     */
    private _originalActions: ActionItem<R, T>[] = [];

    /**
     * Access modifier is public in order to access this property in unit tests
     */
    _actions: ActionItemInternal<R, T>[] = [];

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
     * Copy of actions passed with their availability call backs. This is because, when the selected entities get updated, we need to use
     * those CBs to calculate the availability again
     */
    private actionsWithAvailabilityCb: ActionItem<R, T>[] = [];

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
    staticFeaturedActions: ActionItemInternal<R, T>[];

    /**
     * Actions that depend on selected entities and belong to main menu list. The returned list length is less than or
     * equal to the configured featured count in {@link actionDisplayConfig}
     */
    contextualFeaturedActions: ActionItemInternal<R, T>[] = [];

    /**
     * All the actions that depend on selected entities
     */
    contextualActions: ActionItemInternal<R, T>[] = [];

    /**
     * List containing all the static actions. It has static featured actions in the beginning of the list followed by
     * non-featured static actions as children of grouped action called 'vcd.cc.action.menu.all.actions'
     */
    staticDropdownActions: ActionItemInternal<R, T>[] | object;

    /**
     * List of only the actions that are marked as {@link ActionType.STATIC}
     */
    staticActions: ActionItemInternal<R, T>[];

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
     * Used for deciding if the availability has to be passed through an Async pipe in the template
     */
    isObservable = isObservable;

    /**
     * The list of entities selected on which contextualActions are performed. As they are also used for calculating the
     * availability of actions, action lists are updated when the input is updated
     * @param val Is an array in case of batch selection and is a single item for example in the case of data grids with single selection
     */
    @Input() set selectedEntities(val: R[] | R) {
        if (!Array.isArray(val)) {
            val = val ? [val] : [];
        }
        // Shallow equal does the job for most of the cases and currently saves a lot of calculations
        if (this.isShallowEqual(val, this._selectedEntities)) {
            return;
        }
        this._selectedEntities = val;
        this.updateDisplayedActions();
    }
    private _selectedEntities: R[] = [];

    /**
     * Returns the selected entities
     * Note: This is not a getter because its matching setter can accept an array or a single item but this method always returns an array.
     */
    getSelectedEntities(): R[] {
        return this._selectedEntities;
    }

    /**
     * The visibility of actions is dependent on their availability call back responses and in VCD application, some of the actions
     * availability call back response is dependent on closure variables. However, we don't call those call backs every time those closure
     * variables are updated, for example by asynchronous requests. This has a side effect of actions visibility not getting updated when
     * those closure variables are updated. So, this convenience method is to make it clear for the user that such side effect exists and
     * this method will re-trigger the availability call backs of actions
     */
    updateDisplayedActions(): void {
        this.clearLastAvailabilitySubs();
        this._actions = this.changeAvailabilityCallbacks(this.actionsWithAvailabilityCb);
        this.updateActionListsAndDisplayFlags();
    }

    private refreshActions(actions: ActionItem<R, T>[]): void {
        if (!actions) {
            return;
        }
        const hasNestedActions = actions.some((action) => action.children?.length > 0);
        const shouldMarkUnmarkedActionsAsContextual =
            hasNestedActions ||
            this.getFlattenedActionList(actions, ActionType.CONTEXTUAL_FEATURED).some(
                (action) => action.actionType && action.actionType === ActionType.CONTEXTUAL_FEATURED
            );
        this.actionsWithAvailabilityCb = this.markUnmarkedActions(actions, shouldMarkUnmarkedActionsAsContextual);
        this.shouldDisplayContextualActionsDropdownInline =
            hasNestedActions ||
            this.actionsWithAvailabilityCb.some((action) => action.actionType === ActionType.CONTEXTUAL);
        this.updateDisplayedActions();
    }

    private markUnmarkedActions(actions: ActionItem<R, T>[], shouldMarkUnmarkedActionsAsContextual: boolean) {
        return actions.map((action) => {
            const actionCopy = { ...action };
            if (!actionCopy.actionType) {
                actionCopy.actionType = shouldMarkUnmarkedActionsAsContextual
                    ? ActionType.CONTEXTUAL
                    : ActionType.CONTEXTUAL_FEATURED;
            }
            if (action.children) {
                action.children = this.markUnmarkedActions(action.children, shouldMarkUnmarkedActionsAsContextual);
            }
            return actionCopy;
        });
    }

    /**
     * Executes the availability call backs and updates them to booleans. Also, Subscribes to availability of actions that are observables
     * and adds a magic property called {@link lastAvailabilityValue} that stores the last emitted value from those observables.
     */
    private changeAvailabilityCallbacks(actions) {
        return actions.map((action) => {
            const actionCopy: ActionItemInternal<R, T> = { ...action };
            if (action.availability instanceof Observable) {
                this.lastAvailabilitySubscriptions.push(
                    action.availability.subscribe((value) => {
                        actionCopy[lastAvailabilityValue] = value;
                    })
                );
            } else {
                actionCopy.availability = this.isActionAvailable(action);
            }
            if (actionCopy.children) {
                actionCopy.children = this.changeAvailabilityCallbacks(action.children);
            }
            return actionCopy;
        });
    }

    private clearLastAvailabilitySubs() {
        this.lastAvailabilitySubscriptions.forEach((sub) => sub.unsubscribe());
        this.lastAvailabilitySubscriptions.length = 0;
    }

    private updateActionListsAndDisplayFlags(): void {
        this.staticActions = this.getStaticActions();
        this.staticFeaturedActions = this.getStaticFeaturedActions();
        this.contextualFeaturedActions = this.getContextualFeaturedActions();
        this.contextualActions = this.getContextualActions();
        this.staticDropdownActions = this.getStaticDropdownActions();
        this.updateActionDisplayFlags();
        // Emit an update that actions have been changed
        this.actionsUpdate.emit();
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
    }

    /**
     * Used only for actions that don't have their availability as Observables.
     * An action whose availability is false but has the disabled state set to true is still shown on the screen in
     * disabled mode
     */
    private isActionAvailable(action: ActionItem<R, T> | ActionItemInternal<R, T>): boolean {
        let isActionAvailable = true;
        if (action.availability == null) {
            isActionAvailable = true;
        }
        if (typeof action.availability === 'boolean') {
            isActionAvailable = action.availability;
        }
        if (CommonUtil.isFunction(action.availability)) {
            isActionAvailable =
                this.getSelectedEntities().length > 0 && action.availability(this.getSelectedEntities());
        }
        return isActionAvailable || this.isActionDisabled(action);
    }

    private getStaticFeaturedActions(): ActionItemInternal<R, T>[] {
        return this._actions.filter((action) => action.actionType === ActionType.STATIC_FEATURED);
    }

    private getContextualFeaturedActions(): ActionItemInternal<R, T>[] {
        if (!this.getSelectedEntities().length) {
            return [];
        }
        const flattenedFeaturedActionList = this.getFlattenedActionList(this._actions, ActionType.CONTEXTUAL_FEATURED);
        const availableFeaturedActions = flattenedFeaturedActionList.filter(
            (action) => action[lastAvailabilityValue] || action.availability
        );
        const featuredCount =
            this.actionDisplayConfig.contextual.styling === ActionStyling.INLINE &&
            this.actionDisplayConfig.contextual.featuredCount;
        return featuredCount ? availableFeaturedActions.slice(0, featuredCount) : availableFeaturedActions;
    }

    private getStaticActions(): ActionItemInternal<R, T>[] {
        return this._actions.filter((action) => action.actionType === ActionType.STATIC);
    }

    private getStaticDropdownActions(): ActionItemInternal<R, T>[] | object {
        return this.staticFeaturedActions.concat([
            {
                textKey: 'vcd.cc.action.menu.other.actions',
                children: (this.staticActions as any) as ActionItem<R, T>[],
            },
        ]);
    }

    private getContextualActions(): ActionItemInternal<R, T>[] {
        if (!this.getSelectedEntities().length) {
            return [];
        }
        return this._actions.filter(
            (action) =>
                !action.actionType ||
                (action.actionType !== ActionType.STATIC_FEATURED && action.actionType !== ActionType.STATIC)
        );
    }

    /**
     * Extracts the nested actions that are marked as featured and returns them as part of a flat list
     */
    private getFlattenedActionList(
        actions: ActionItemInternal<R, T>[] | ActionItem<R, T>[],
        actionType: ActionType
    ): ActionItemInternal<R, T>[] {
        let featuredActions: ActionItemInternal<R, T>[] = [];
        actions.forEach((action) => {
            if (action.children && action.children.length) {
                featuredActions = featuredActions.concat(this.getFlattenedActionList(action.children, actionType));
            } else if (action.actionType === actionType) {
                featuredActions.push(action);
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
            action.handler(this.getSelectedEntities(), action.handlerData);
        }
    }

    /**
     * To disable a displayed action
     */
    isActionDisabled(action: ActionItem<R, T> | ActionItemInternal<R, T>): boolean {
        if (action.disabled == null) {
            return false;
        }
        if (CommonUtil.isFunction(action.disabled)) {
            return action.disabled(this.getSelectedEntities());
        }
        return action.disabled;
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
            this.getSelectedEntities().length &&
            this.contextualActions.length &&
            this.actionDisplayConfig.contextual.styling === style
        );
    }

    /**
     * Performance optimization function to do shallow comparison of two arrays.
     * @param arr1
     * @param arr2
     */
    private isShallowEqual(arr1: unknown[], arr2: unknown[]): boolean {
        if (arr1 === arr2) {
            return true;
        }
        if ((!arr1 && arr2) || (arr1 && !arr2)) {
            return false;
        }
        if (arr1.length !== arr2.length) {
            return false;
        }
        if (arr1.length === 0 && arr2.length === 0) {
            return true;
        }
        return arr1.every((item, index) => item === arr2[index]);
    }

    ngOnDestroy(): void {
        this.clearLastAvailabilitySubs();
    }
}
