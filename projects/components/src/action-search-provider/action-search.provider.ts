/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { TranslationService } from '@vcd/i18n';
import { ActionItem } from '../common/interfaces';
import { SpotlightSearchProvider, SpotlightSearchResult } from '../spotlight-search';
import { CommonUtil } from '../utils';

export const DEFAULT_ACTION_SEARCH_SECTION_HEADER_PREFIX = 'vcd.cc.action.provider.section.title';

export class ActionSearchProvider<R, T> implements SpotlightSearchProvider {
    private flatListOfAvailableActions: ActionItem<R, T>[];

    /**
     * Initialized by the calling component and is used for searching of the search criteria entered in {@link SpotlightSearchComponent}
     */
    private _actions: ActionItem<R, T>[] = [];
    set actions(actions: ActionItem<R, T>[]) {
        this._actions = actions;
        this.flatListOfAvailableActions = null;
    }

    /**
     * Used in {@link isActionDisabled} to calculate disabled state of actions  and also in action handler
     */
    private _selectedEntities: R[] = [];
    set selectedEntities(entities: R[]) {
        this._selectedEntities = entities;
        this.flatListOfAvailableActions = null;
    }

    constructor(private ts: TranslationService) {}

    /**
     * Searches through nested actions and finds all the actions that match with entered search text on the
     * {@link SpotlightSearchComponent}
     */
    search(criteria: string): SpotlightSearchResult[] {
        if (!criteria) {
            return [];
        }

        if (this.flatListOfAvailableActions == null) {
            this.flatListOfAvailableActions = this.getFlatListOfAvailableActions(this._actions);
        }

        return this.getActions(criteria.toLowerCase());
    }

    private getActions(searchCriteria: string): SpotlightSearchResult[] {
        return this.flatListOfAvailableActions
            .filter(action => action.textKey.toLowerCase().includes(searchCriteria))
            .map(action => ({
                displayText: action.textKey,
                handler: () => action.handler(this._selectedEntities, action.handlerData),
            }));
    }

    private getFlatListOfAvailableActions(actions: ActionItem<R, T>[]): ActionItem<R, T>[] {
        return actions
            .reduce((flatActionList, currentAction) => {
                if (currentAction?.children?.length) {
                    flatActionList = flatActionList.concat(this.getFlatListOfAvailableActions(currentAction.children));
                } else if (this.isActionAvailable(currentAction)) {
                    const textKey = currentAction.isTranslatable === false ? currentAction.textKey :
                        this.ts.translate(currentAction.textKey);
                    flatActionList.push({ ...currentAction, textKey });
                }
                return flatActionList;
            }, []);
    }

    private isActionAvailable(action: ActionItem<R, T>): boolean {
        return (!action.availability || action.availability(this._selectedEntities)) && !this.isActionDisabled(action);
    }

    private isActionDisabled(action: ActionItem<R, T>): boolean {
        return CommonUtil.isFunction(action.disabled) ? action.disabled(this._selectedEntities) : action.disabled;
    }
}
