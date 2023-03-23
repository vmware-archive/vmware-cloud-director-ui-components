/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
    CheckBoxStyling,
    QuickSearchProviderDefaults,
    QuickSearchRegistrarService,
    QuickSearchResultItem,
    QuickSearchResultsType,
    SubscriptionTracker,
} from '@vcd/ui-components';

@Component({
    selector: 'vcd-quick-search-hide-empty-section-example',
    templateUrl: './quick-search-hide-empty-section-example.component.html',
    providers: [QuickSearchRegistrarService, SubscriptionTracker],
})
export class QuickSearchHideEmptySectionExampleComponent implements OnInit {
    CheckBoxStyling = CheckBoxStyling;

    formGroup = this.fb.group({
        hideEmptySections: [false],
    });

    spotlightOpen: boolean;

    private actionsSearchProvider = new ActionsSearchProvider();

    constructor(private fb: FormBuilder, private searchRegistrar: QuickSearchRegistrarService) {}

    ngOnInit(): void {
        this.searchRegistrar.register(this.actionsSearchProvider);
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
