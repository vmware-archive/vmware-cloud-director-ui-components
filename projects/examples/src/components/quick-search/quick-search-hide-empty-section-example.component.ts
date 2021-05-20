/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
    CheckBoxStyling,
    QuickSearchProviderDefaults,
    QuickSearchRegistrarService,
    QuickSearchResultItem,
    QuickSearchResultsType,
    SubscriptionTracker,
} from '@vcd/ui-components';
import Mousetrap from 'mousetrap';

@Component({
    selector: 'vcd-quick-search-hide-empty-section-example',
    templateUrl: './quick-search-hide-empty-section-example.component.html',
    providers: [QuickSearchRegistrarService, SubscriptionTracker],
})
export class QuickSearchHideEmptySectionExampleComponent implements OnInit, OnDestroy {
    CheckBoxStyling = CheckBoxStyling;

    formGroup: FormGroup;
    kbdShortcut = 'mod+f';
    spotlightOpen: boolean;

    private actionsSearchProvider = new ActionsSearchProvider();

    private readonly mousetrap: MousetrapInstance;

    constructor(
        private fb: FormBuilder,
        private searchRegistrar: QuickSearchRegistrarService,
        private subscriptionTracker: SubscriptionTracker
    ) {
        // Create an instance of mouse trap within the constructor so that any bount shortcut event handler
        // would be executed within the angular zone
        this.mousetrap = new Mousetrap();
        // For this example we'd like mouse trap to always run
        this.mousetrap.stopCallback = () => {
            return false;
        };

        this.formGroup = this.fb.group({
            ['hideEmptySections']: [false],
        });
    }

    ngOnInit(): void {
        this.mousetrap.bind(this.kbdShortcut, () => {
            this.spotlightOpen = true;
            return false;
        });

        this.searchRegistrar.register(this.actionsSearchProvider);
    }

    ngOnDestroy(): void {
        this.mousetrap.reset();
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
