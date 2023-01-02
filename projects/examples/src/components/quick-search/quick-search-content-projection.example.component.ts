/*!
 * Copyright 2020 VMware, Inc.
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
} from '@vcd/ui-components';

@Component({
    selector: 'vcd-quick-search-content-projection-example',
    styleUrls: ['./quick-search-content-projection.example.component.scss'],
    templateUrl: './quick-search-content-projection.example.component.html',
    providers: [QuickSearchRegistrarService],
})
export class QuickSearchContentProjectionExampleComponent implements OnInit {
    formGroup = this.fb.group({
        topSection: [false],
        bottomSection: [true],
    });

    spotlightOpen: boolean;

    styling = CheckBoxStyling;

    constructor(private fb: FormBuilder, private searchRegistrar: QuickSearchRegistrarService) {}

    ngOnInit(): void {
        this.searchRegistrar.register(new SimpleSearchProvider());
    }
}

export class SimpleSearchProvider extends QuickSearchProviderDefaults {
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
