/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { TranslationService } from '@vcd/i18n';
import { isObservable } from 'rxjs';
import { last, take, takeLast } from 'rxjs/operators';
import { ActionItem } from '../common/interfaces';
import {
    QuickSearchProvider,
    QuickSearchProviderDefaults,
    QuickSearchResultItem,
    QuickSearchResults,
} from '../quick-search';
import { CommonUtil } from '../utils';

export const DEFAULT_ACTION_SEARCH_SECTION_HEADER_PREFIX = 'vcd.cc.action.provider.section.title';

export class ActionSearchProvider<R, T> extends QuickSearchProviderDefaults implements QuickSearchProvider {
    set actions(actions: ActionItem<R, T>[]) {
        this._actions = actions;
        this.flatListOfAvailableActions = null;
    }
    set selectedEntities(entities: R[]) {
        this._selectedEntities = entities;
        this.flatListOfAvailableActions = null;
    }

    constructor(private ts: TranslationService, shouldDebounceInput = false) {
        super(shouldDebounceInput);
    }

    private flatListOfAvailableActions: ActionItem<R, T>[];

    /**
     * Initialized by the calling component and is used for searching of the search criteria entered in {@link QuickSearchComponent}
     */
    private _actions: ActionItem<R, T>[] = [];

    /**
     * Used in {@link isActionDisabled} to calculate disabled state of actions  and also in action handler
     */
    private _selectedEntities: R[] = [];

    private resolveIsReadyToSearch: (value?: null) => void;
    private isReadyToSearchPromise: Promise<null> = this.readyToSearchPromiseFactory();
    private shouldWait = false;

    /**
     * Pause searching for actions. For example, Call this method when searching for actions has to be paused until
     * some data has to be fetched asynchronously
     */
    pause(): void {
        this.shouldWait = true;
    }

    /**
     * Resume searching for actions. To unpause searching for actions functionality that might have been paused earlier
     * using pause method above
     */
    unPause(): void {
        this.shouldWait = false;
        this.resolveIsReadyToSearch();
        this.isReadyToSearchPromise = this.readyToSearchPromiseFactory();
    }

    private readyToSearchPromiseFactory(): Promise<null> {
        return new Promise<null>((resolve, reject) => {
            this.resolveIsReadyToSearch = resolve;
        });
    }

    /**
     * Searches through nested actions and finds all the actions that match with entered search text on the
     * {@link QuickSearchComponent}
     */
    async search(criteria: string): Promise<QuickSearchResults> {
        if (this.shouldWait) {
            await this.isReadyToSearchPromise;
        }

        if (!criteria) {
            return { items: [] };
        }

        if (this.flatListOfAvailableActions == null) {
            this.flatListOfAvailableActions = await this.getFlatListOfAvailableActions(this._actions);
        }
        return { items: this.getActions(criteria.toLowerCase()) };
    }

    private getActions(searchCriteria: string): QuickSearchResultItem[] {
        return this.flatListOfAvailableActions
            .filter((action) => action.textKey?.toLowerCase().includes(searchCriteria))
            .map((action) => ({
                displayText: action.textKey,
                handler: () => action.handler(this._selectedEntities, action.handlerData),
            }));
    }

    private async getFlatListOfAvailableActions(actions: ActionItem<R, T>[]): Promise<ActionItem<R, T>[]> {
        let flatActionList = [];
        for (const currentAction of actions) {
            if (currentAction?.children) {
                if (currentAction.children.length > 0) {
                    flatActionList = flatActionList.concat(
                        await this.getFlatListOfAvailableActions(currentAction.children)
                    );
                }
                continue;
            }
            if (await this.isActionAvailable(currentAction)) {
                const textKey =
                    currentAction.isTranslatable === false
                        ? currentAction.textKey
                        : this.ts.translate(currentAction.textKey);
                flatActionList.push({ ...currentAction, textKey });
            }
        }
        return flatActionList;
    }

    private async isActionAvailable(action: ActionItem<R, T>): Promise<boolean> {
        if (action.isSeparator) {
            return false;
        }
        let actionAvailability;
        if (action.availability == null) {
            actionAvailability = true;
        } else if (typeof action.availability === 'boolean') {
            actionAvailability = action.availability;
        } else if (isObservable(action.availability)) {
            actionAvailability = await action.availability.pipe(take(1)).toPromise();
        } else {
            actionAvailability = action.availability(this._selectedEntities);
        }
        return actionAvailability && !this.isActionDisabled(action);
    }

    private isActionDisabled(action: ActionItem<R, T>): boolean {
        return CommonUtil.isFunction(action.disabled) ? action.disabled(this._selectedEntities) : action.disabled;
    }
}
