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
    QuickSearchService,
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
                { display: 'Provider1', key: 'provider1' },
                { display: 'Provider2', key: 'provider2' },
                { display: 'Provider3', key: 'provider3' },
                { display: 'Provider4', key: 'provider4' },
            ],
            dropdownText: 'Provider Filter',
            bubbleI18nKey: 'provider.filter.identifier',
        },
        {
            id: 'result-filter',
            options: [
                { display: 'Real', key: 'real' },
                { display: 'Fake', key: 'fake' },
            ],
            dropdownText: 'Result Filter',
            bubbleI18nKey: 'result.filter.identifier',
        },
    ];

    private actionsSearchProvider;
    private actionsSearchProvider2;
    private actionsSearchProvider3;
    private actionsSearchProvider4;

    constructor(private searchRegistrar: QuickSearchRegistrarService, private searchService: QuickSearchService) {
        this.actionsSearchProvider = new ActionsSearchProvider('provider1');
        this.actionsSearchProvider.sectionName = 'Actions from Provider 1';
        this.actionsSearchProvider2 = new ActionsSearchProvider('provider2');
        this.actionsSearchProvider2.sectionName = 'Actions from Provider 2';
        this.actionsSearchProvider3 = new ActionsSearchProvider('provider3');
        this.actionsSearchProvider3.sectionName = 'Actions from Provider 3';
        this.actionsSearchProvider4 = new ActionsSearchProvider('provider4');
        this.actionsSearchProvider4.sectionName = 'Actions from Provider 4';
    }

    ngOnInit(): void {
        this.filters.forEach((filter) => this.searchService.registerFilter(filter));
        this.searchRegistrar.register(this.actionsSearchProvider);
        this.searchRegistrar.register(this.actionsSearchProvider2);
        this.searchRegistrar.register(this.actionsSearchProvider3);
        this.searchRegistrar.register(this.actionsSearchProvider4);
    }
}

const actions: string[] = ['copy', 'paste', 'move', 'dummy', 'other-dummy'];

function buildFilter(criteria: string, filters: ActiveQuickSearchFilter[]): (item: QuickSearchResultItem) => boolean {
    criteria = criteria ? criteria.toLowerCase() : '';
    const dummyFilter = filters.find((filter) => filter.id === 'result-filter' && filter.value === 'fake');
    const realFilter = filters.find((filter) => filter.id === 'result-filter' && filter.value === 'real');
    // console.log("===>", filters, dummyFilter, realFilter);
    return (item: QuickSearchResultItem) =>
        item.displayText.toLowerCase().includes(criteria) &&
        ((!dummyFilter && !realFilter) ||
            (dummyFilter && item.displayText.includes('dummy')) ||
            (realFilter && !item.displayText.includes('dummy')));
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
        return super.canHandleFilter(filter) || filter.id === 'result-filter';
    }
}
