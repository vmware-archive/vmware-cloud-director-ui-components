/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { TranslationService } from '@vcd/i18n';
import { ActionItem } from '../common/interfaces/index';
import { SpotlightSearchProvider, SpotlightSearchResult, SpotlightSearchService } from '../spotlight-search/index';
import { CommonUtil } from '../utils/index';

const ACTION_PROVIDER_SECTION_TITLE_KEY = 'vcd.cc.action.provider.section.title';

export class ActionSearchProvider<R, T> implements SpotlightSearchProvider {
    private flatListOfAvailableActions: ActionItem<R, T>[] = [];

    /**
     * Initialized by the calling component and is used for searching of the search criteria entered in {@link SpotlightSearchComponent}
     */
    private _actions: ActionItem<R, T>[] = [];
    set actions(actions: ActionItem<R, T>[]) {
        this._actions = actions;
        this.updateFlatListOfAvailableActions();
    }
    get actions(): ActionItem<R, T>[] {
        return this._actions;
    }

    /**
     * Used in {@link isActionDisabled} to calculate disabled state of actions
     */
    private _selectedEntities: R[] = [];
    set selectedEntities(entities: R[]) {
        this._selectedEntities = entities;
        this.updateFlatListOfAvailableActions();
    }
    get selectedEntities(): R[] {
        return this._selectedEntities;
    }

    private _actionProviderName: string;
    /**
     * To display in the title of the action search results section as Actions: <actionProviderName>
     */
    set actionProviderName(val: string) {
        if (!val || (val && val === this._actionProviderName)) {
            return;
        }
        this._actionProviderName = val;
        this.register();
    }
    get actionProviderName(): string {
        return this._actionProviderName;
    }

    private spotlightSearchProviderRegistrationId: string;

    constructor(private spotlightSearchService: SpotlightSearchService, private ts: TranslationService) {}

    /**
     * Searches through nested actions and finds all the actions that match with entered search text on the
     * {@link SpotlightSearchComponent}
     */
    search(criteria: string): SpotlightSearchResult[] {
        if (!criteria) {
            return [];
        }

        return this.findActions(criteria.toLowerCase()).map(action => ({
            displayText: action.isTranslatable === false ? action.textKey : this.ts.translate(action.textKey),
            handler: () => action.handler(this.selectedEntities, action.handlerData),
        }));
    }

    /**
     * Registers the actions with {@link SpotlightSearchService}. Called by {@link ActionMenuComponent}
     */
    register(): void {
        if (this.spotlightSearchProviderRegistrationId) {
            this.spotlightSearchService.unregisterProvider(this.spotlightSearchProviderRegistrationId);
        }
        this.spotlightSearchProviderRegistrationId = this.spotlightSearchService.registerProvider(
            this,
            this.ts.translate(ACTION_PROVIDER_SECTION_TITLE_KEY, [
                { actionProviderName: this.actionProviderName || '' },
            ])
        );
    }

    /**
     * Un registers the actions with {@link SpotlightSearchService}. Called by {@link ActionMenuComponent}
     */
    unregister(): void {
        this.spotlightSearchService.unregisterProvider(this.spotlightSearchProviderRegistrationId);
    }

    private findActions(searchCriteria: string): ActionItem<R, T>[] {
        return this.flatListOfAvailableActions.filter(action => action.textKey.toLowerCase().includes(searchCriteria));
    }

    private updateFlatListOfAvailableActions(): void {
        this.flatListOfAvailableActions = this.getFlatListOfAvailableActions(this.actions);
    }

    private getFlatListOfAvailableActions(actions: ActionItem<R, T>[]): ActionItem<R, T>[] {
        return actions
            .reduce((flatActionList, currentAction) => {
                if (currentAction?.children?.length) {
                    flatActionList = flatActionList.concat(this.getFlatListOfAvailableActions(currentAction.children));
                } else {
                    flatActionList.push(currentAction);
                }
                return flatActionList;
            }, [])
            .filter(action => !this.isActionDisabled(action));
    }

    private isActionDisabled(action: ActionItem<R, T>): boolean {
        return CommonUtil.isFunction(action.disabled) ? action.disabled(this.selectedEntities) : action.disabled;
    }
}
