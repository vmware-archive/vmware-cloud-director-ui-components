/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Injectable } from '@angular/core';
import { TranslationService } from '@vcd/i18n';
import { ActionItem } from '../common/interfaces';
import { SpotlightSearchProvider, SpotlightSearchResult, SpotlightSearchService } from '../spotlight-search';

const ACTION_PROVIDER_SECTION_TITLE_KEY = 'vcd.cc.action.provider.section.title';

@Injectable()
export class ActionSearchProvider<R, T> implements SpotlightSearchProvider {
    /**
     * Initialized by the {@link ActionMenuComponent.actions} and is used for displaying actions on the {@link SpotlightSearchComponent}
     */
    actions: ActionItem<R, T>[];
    /**
     * Used in {@link isActionDisabled} to calculate disabled state of actions
     */
    selectedEntities: R[];

    private _actionProviderName: string;
    /**
     * Set by the {@link ActionMenuComponent.actionProviderName} to display in the title of the action search results section as
     * Actions: <actionProviderName>
     */
    set actionProviderName(val: string) {
        if (!val || (val && val === this._actionProviderName)) {
            return;
        }
        this._actionProviderName = val;
        this.register();
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

        return this.findSearchCriteriaInNestedActions(criteria.toLowerCase()).map(action => ({
            displayText: action.isTranslatable === false ? action.textKey : this.ts.translate(action.textKey),
            handler: action.handler,
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
                {
                    actionProviderName: this._actionProviderName || '',
                },
            ])
        );
    }

    /**
     * Un registers the actions with {@link SpotlightSearchService}. Called by {@link ActionMenuComponent}
     */
    unregister(): void {
        this.spotlightSearchService.unregisterProvider(this.spotlightSearchProviderRegistrationId);
    }

    private findSearchCriteriaInNestedActions(
        criteria: string,
        actions: ActionItem<R, T>[] = this.actions,
        matchingResults: ActionItem<R, T>[] = []
    ): ActionItem<R, T>[] {
        const nonDisabledActions = actions.filter(action => !this.isActionDisabled(action));
        nonDisabledActions.forEach(action => {
            if (action.children && action.children.length) {
                this.findSearchCriteriaInNestedActions(criteria, action.children, matchingResults);
            } else if (action.textKey.toLowerCase().includes(criteria)) {
                matchingResults.push(action);
            }
        });
        return matchingResults;
    }

    private isActionDisabled(action: ActionItem<R, T>): boolean {
        return typeof action.disabled === 'function' ? action.disabled(this.selectedEntities) : action.disabled;
    }
}
