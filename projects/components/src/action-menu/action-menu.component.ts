/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Input } from '@angular/core';
import { ActionDisplayConfig, ActionItem, ActionStyling, ActionType, TextIcon } from '../common/interfaces';

/**
 * Renders actions in screens containing grids, cards and details container
 * R is the type of selected entity on which the action will be performed
 * T is the type of custom data passed to action handler
 */
@Component({
    selector: 'vcd-action-menu',
    templateUrl: './action-menu.component.html',
    styleUrls: ['./action-menu.component.scss'],
})
export class ActionMenuComponent<R, T> {
    @Input() entityUrn: string;

    /**
     * Content of the action menu dropdown trigger button. Used when {@link #actionDisplayConfig} styling is
     * {@link ActionStyling.DROPDOWN}
     */
    @Input() btnText: string = null;

    /**
     * Used for disabling the menu bar or menu dropdown
     */
    @Input() disabled: boolean;

    /**
     * List of selected entities required for contextual actions
     */
    @Input() selectedEntities: R[];

    /**
     * How the static actions get displayed
     */
    @Input() staticActionStyling: ActionStyling = ActionStyling.INLINE;

    /**
     * List of actions that will be given by the calling component
     */
    private _actions: ActionItem<R, T>[] = [];
    @Input() set actions(actions: ActionItem<R, T>[]) {
        this._actions = actions.map(action => {
            if (!action.actionType) {
                action.actionType = ActionType.CONTEXTUAL;
            }
            return action;
        });
    }
    get actions(): ActionItem<R, T>[] {
        return this._actions;
    }

    private _actionDisplayConfig: ActionDisplayConfig = {
        contextual: {
            featuredCount: 0,
            styling: ActionStyling.INLINE,
            buttonContents: TextIcon.TEXT,
        },
        staticActionStyling: ActionStyling.INLINE,
    };
    /**
     * Display configuration of static and contextual actions
     * If null or undefined is passed, default config {@link _actionDisplayConfig} is used
     */
    @Input() set actionDisplayConfig(config: ActionDisplayConfig) {
        config = !config ? this._actionDisplayConfig : config;
        Object.keys(config).forEach(key => {
            this._actionDisplayConfig[key] = config[key] || this._actionDisplayConfig[key];
        });
        const buttonContents = this.actionDisplayConfig.contextual.buttonContents;
        this.shouldShowIcon = (TextIcon.ICON & buttonContents) === TextIcon.ICON;
        this.shouldShowText = (TextIcon.TEXT & buttonContents) === TextIcon.TEXT;
        this.shouldShowTooltip = buttonContents === TextIcon.ICON;
    }
    get actionDisplayConfig(): ActionDisplayConfig {
        return this._actionDisplayConfig;
    }

    /**
     * If a icon should be displayed inside contextual buttons
     */
    shouldShowIcon: boolean;

    /**
     * If a text should be displayed inside contextual buttons
     */
    shouldShowText: boolean;

    /**
     * If the contextual buttons with icons should have a tooltip
     */
    shouldShowTooltip: boolean;

    /**
     * Returns actions that are either available or disabled
     */
    getAvailableActions(actions: ActionItem<R, T>[], selection?: R[]): ActionItem<R, T>[] {
        return actions.filter(
            action => !action.availability || action.availability(selection) || this.isActionDisabled(action)
        );
    }

    /**
     * List of only the actions that are marked as {@link ActionType.STATIC}
     */
    get staticActions(): ActionItem<R, T>[] {
        const staticActions = this.actions.filter(action => action.actionType === ActionType.STATIC);
        return this.getAvailableActions(staticActions);
    }

    /**
     * List of only the actions that are marked as {@link ActionType.STATIC_FEATURED}
     */
    get staticFeaturedActions(): ActionItem<R, T>[] {
        const staticActions = this.actions.filter(action => action.actionType === ActionType.STATIC_FEATURED);
        return this.getAvailableActions(staticActions);
    }

    private getFlattenedActionList(actions: ActionItem<R, T>[], actionType: ActionType): ActionItem<R, T>[] {
        let featuredActions: ActionItem<R, T>[] = [];
        actions.forEach(action => {
            if (action.children && action.children.length) {
                featuredActions = featuredActions.concat(this.getFlattenedActionList(action.children, actionType));
            } else if (action.actionType === actionType) {
                featuredActions.push(action);
            }
        });
        return featuredActions;
    }

    /**
     * Actions that depend on selected entities and belong to main menu list. The returned list length is less than the
     * configured featured count in {@link actionDisplayConfig}
     * @param selection The selected entities based on which the actions availability is calculated
     */
    getContextualFeaturedActions(selection: R[]): ActionItem<R, T>[] {
        const flattenedFeaturedActionList = this.getFlattenedActionList(this.actions, ActionType.CONTEXTUAL_FEATURED);
        const availableFeaturedActions = this.getAvailableActions(flattenedFeaturedActionList, selection);
        return this.actionDisplayConfig.contextual.featuredCount
            ? availableFeaturedActions.slice(0, this.actionDisplayConfig.contextual.featuredCount)
            : availableFeaturedActions;
    }

    /**
     * Actions that depend on selected entities but belong to sub menu
     * @param selection The selected entities based on which the actions availability is calculated
     */
    getContextualActions(selection?: R[]): ActionItem<R, T>[] {
        const contextualActions = this.actions.filter(
            action => action.actionType !== ActionType.STATIC_FEATURED && action.actionType !== ActionType.STATIC
        );
        return this.getAvailableActions(contextualActions, selection);
    }

    /**
     * Execute the {@link ActionItem.handler} function by passing it {@link #selectedEntities} and
     * {@link ActionItem.handlerData} as arguments
     */
    runActionHandler(action: ActionItem<R, T>): void {
        action.handler(this.selectedEntities, action.handlerData);
    }

    /**
     * To disable a displayed action
     */
    isActionDisabled(action: ActionItem<R, T>): boolean {
        return typeof action.disabled === 'function' ? action.disabled(this.selectedEntities) : action.disabled;
    }

    /**
     * To show/hide the contextual actions bucket
     */
    get shouldShowContextualActions(): boolean {
        return !!(this.selectedEntities && this.selectedEntities.length);
    }
}
