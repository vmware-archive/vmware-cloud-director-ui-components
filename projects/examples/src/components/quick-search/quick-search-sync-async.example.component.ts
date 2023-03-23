/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
    QuickSearchProviderDefaults,
    QuickSearchRegistrarService,
    QuickSearchResultItem,
    QuickSearchResultsType,
} from '@vcd/ui-components';

@Component({
    selector: 'vcd-quick-search-sync-async-example',
    styleUrls: ['./quick-search-sync-async.example.component.scss'],
    templateUrl: './quick-search-sync-async.example.component.html',
    providers: [QuickSearchRegistrarService],
})
export class QuickSearchSyncAsyncExampleComponent implements OnInit {
    formGroup = this.fb.group({
        placeholder: [''],
    });

    spotlightOpen = false;

    private lazyLoadedProvider = new LazyLoadedActionsSearchProvider();
    private actionsSearchProvider = new ActionsSearchProvider();

    constructor(private fb: FormBuilder, private searchRegistrar: QuickSearchRegistrarService) {}

    ngOnInit(): void {
        this.searchRegistrar.register(this.actionsSearchProvider);
        this.searchRegistrar.register(new PagedActionsSearchProvider());

        // Register LazyLoadedActionsSearchProvider and ensure they go first in the list
        this.lazyLoadedProvider.order = 0;
        this.searchRegistrar.register(this.lazyLoadedProvider);
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

    constructor(public shouldDebounceInput = false) {
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

export class LazyLoadedActionsSearchProvider extends QuickSearchProviderDefaults {
    sectionName = 'Lazy Loaded Actions';

    order = -1;

    constructor(public shouldDebounceInput = false) {
        super(shouldDebounceInput);
    }

    private actions: QuickSearchResultItem[] = actions.map((action) => {
        return {
            displayText: `Lazy loaded ${action}`,
            handler: () => {
                alert(`Action handler for lazy loaded '${action}' is called`);
            },
        };
    });

    search(criteria: string): QuickSearchResultsType {
        return new Promise((resolve) => {
            setTimeout(() => resolve({ items: this.actions.filter(buildFilter(criteria)) }), 2000);
        });
    }
}

export class PagedActionsSearchProvider extends QuickSearchProviderDefaults {
    sectionName = 'Section with lots of actions';

    private actions: QuickSearchResultItem[];

    constructor(public shouldDebounceInput = false) {
        super(shouldDebounceInput);
        // Build actions
        this.actions = [...Array(200)].map((_, i) => {
            const action = `Action - ${i + 1}`;
            return {
                displayText: action,
                handler: () => {
                    alert(`Action handler for '${action}' is called`);
                },
            };
        });
    }

    search(criteria: string): QuickSearchResultsType {
        criteria = criteria ? criteria.toLowerCase() : '';
        const items = this.actions.filter((action) => action.displayText.toLowerCase().includes(criteria));
        const pageSize = 15;
        return {
            items: items.slice(0, pageSize),
            page: 1,
            pageSize,
            total: items.length,
        };
    }
}
