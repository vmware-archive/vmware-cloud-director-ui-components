/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    ActiveQuickSearchFilter,
    QuickSearchFilter,
    QuickSearchProviderDefaults,
    QuickSearchRegistrarService,
    QuickSearchResultItem,
    QuickSearchResultsType,
} from '@vcd/ui-components';

@Component({
    selector: 'vcd-quick-search-sync-async-example',
    styleUrls: ['./quick-search-filters.example.component.scss'],
    templateUrl: './quick-search-filters.example.component.html',
    providers: [QuickSearchRegistrarService],
})
export class QuickSearchFiltersExampleComponent implements OnInit {
    spotlightOpen: boolean;

    filters: QuickSearchFilter[] = [
        {
            id: 'type',
            options: [
                { display: 'actions1', key: 'actions1' },
                { display: 'actions2', key: 'actions2' },
                { display: 'actions3', key: 'actions3' },
                { display: 'actions4', key: 'actions4' },
            ],
            dropdownText: 'test',
            bubbleI18nKey: 'hello',
        },
        {
            id: 'is',
            options: [
                { display: 'real', key: 'real' },
                { display: 'fake', key: 'fake' },
            ],
            dropdownText: 'test',
            bubbleI18nKey: 'hello',
        },
    ];

    private actionsSearchProvider = new ActionsSearchProvider('actions1');
    private actionsSearchProvider2 = new ActionsSearchProvider('actions2');
    private actionsSearchProvider3 = new ActionsSearchProvider('actions3');
    private actionsSearchProvider4 = new ActionsSearchProvider('actions4');

    constructor(private searchRegistrar: QuickSearchRegistrarService) {}

    ngOnInit(): void {
        this.searchRegistrar.register(this.actionsSearchProvider);
        this.searchRegistrar.register(this.actionsSearchProvider2);
        this.searchRegistrar.register(this.actionsSearchProvider3);
        this.searchRegistrar.register(this.actionsSearchProvider4);
    }
}

const actions: string[] = ['copy', 'paste', 'move', 'dummy', 'other-dummy'];

function buildFilter(criteria: string, filters: ActiveQuickSearchFilter[]): (item: QuickSearchResultItem) => boolean {
    criteria = criteria ? criteria.toLowerCase() : '';
    const isFilter = filters.find((filter) => filter.id === 'is');
    return (item: QuickSearchResultItem) =>
        item.displayText.toLowerCase().includes(criteria) &&
        (!isFilter ||
            (isFilter.value === 'fake' ? item.displayText.includes('dummy') : !item.displayText.includes('dummy')));
}

export class ActionsSearchProvider extends QuickSearchProviderDefaults {
    sectionName = 'Actions';

    order = -1;

    private actions: QuickSearchResultItem[];

    constructor(public id: string, public shouldDebounceInput = false) {
        super(shouldDebounceInput);

        // Build actions
        this.actions = actions.map((action) => {
            return {
                displayText: action,
                handler: () => {
                    alert(`Action handler for '${action}' is called`);
                },
            };
        });
        const otherAction = 'other';
        this.actions.push({
            displayText: otherAction,
            handler: () => {
                alert(`Action handler for '${otherAction}' is called`);
            },
        });
    }

    search(criteria: string, filters: ActiveQuickSearchFilter[]): QuickSearchResultsType {
        const items = this.actions.filter(buildFilter(criteria, filters));
        return {
            items,
        };
    }

    canHandleFilter(filter: ActiveQuickSearchFilter): boolean {
        return super.canHandleFilter(filter) || filter.id === 'is';
    }
}
