/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, OnInit } from '@angular/core';
import {
    QuickSearchProviderDefaults,
    QuickSearchRegistrarService,
    QuickSearchResultItem,
    QuickSearchResultsType,
} from '@vcd/ui-components';

@Component({
    selector: 'vcd-quick-search-sync-async-example',
    styleUrls: ['./quick-search-nested-providers.example.component.scss'],
    templateUrl: './quick-search-nested-providers.example.component.html',
    providers: [QuickSearchRegistrarService],
})
export class QuickSearchNestedProvidersExampleComponent implements OnInit {
    spotlightOpen: boolean;

    private actionsSearchProvider = new ActionsSearchProvider('actions1', false, 'home');
    private actionsSearchProvider2 = new ActionsSearchProvider('actions2', false, 'organization');
    private actionsSearchProvider3 = new ActionsSearchProvider('actions3', false);
    private actionsSearchProvider4 = new ActionsSearchProvider('actions4', false, 'clipboard');

    constructor(private searchRegistrar: QuickSearchRegistrarService) {}

    ngOnInit(): void {
        this.searchRegistrar.register({
            children: [this.actionsSearchProvider, this.actionsSearchProvider2],
            sectionName: 'Section 2',
            order: 2,
        });
        this.searchRegistrar.register({
            children: [this.actionsSearchProvider3],
            sectionName: 'Section 1',
            order: 1,
        });
        this.searchRegistrar.register(this.actionsSearchProvider4);
    }
}

const actions: string[] = ['copy', 'paste', 'move', 'dummy'];

function buildFilter(criteria: string): (item: QuickSearchResultItem) => boolean {
    criteria = criteria ? criteria.toLowerCase() : '';
    return (item: QuickSearchResultItem) => criteria && item.displayText.toLowerCase().includes(criteria);
}

export class ActionsSearchProvider extends QuickSearchProviderDefaults {
    sectionName = 'Actions';

    order = -1;

    private actions: QuickSearchResultItem[];

    constructor(public id: string, public shouldDebounceInput = false, public icon?: string) {
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

    search(criteria: string): QuickSearchResultsType {
        const items = this.actions.filter(buildFilter(criteria));
        return {
            items,
        };
    }
}
