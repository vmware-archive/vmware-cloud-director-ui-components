/*!
 * Copyright 2020 VMware, Inc.
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
} from '@vcd/ui-components';
import Mousetrap from 'mousetrap';

@Component({
    selector: 'vcd-quick-search-content-projection-example',
    styleUrls: ['./quick-search-content-projection.example.component.scss'],
    templateUrl: './quick-search-content-projection.example.component.html',
    providers: [QuickSearchRegistrarService],
})
export class QuickSearchContentProjectionExampleComponent implements OnInit, OnDestroy {
    formGroup: FormGroup;
    kbdShortcut = 'mod+f';
    spotlightOpen: boolean;
    styling = CheckBoxStyling;

    private readonly mousetrap: MousetrapInstance;
    constructor(private fb: FormBuilder, private searchRegistrar: QuickSearchRegistrarService) {
        // Create an instance of mouse trap within the constructor so that any bount shortcut event handler
        // would be executed within the angular zone
        this.mousetrap = new Mousetrap();
        // For this example we'd like mouse trap to always run
        this.mousetrap.stopCallback = () => {
            return false;
        };

        this.formGroup = this.fb.group({
            ['topSection']: [false],
            ['bottomSection']: [true],
        });
    }

    ngOnInit(): void {
        this.mousetrap.bind(this.kbdShortcut, () => {
            this.spotlightOpen = true;
            return false;
        });
        this.searchRegistrar.register(new SimpleSearchProvider());
    }

    ngOnDestroy(): void {
        this.mousetrap.reset();
    }
}

export class SimpleSearchProvider extends QuickSearchProviderDefaults {
    sectionName = 'Section with lots of actions';

    private actions: QuickSearchResultItem[];

    constructor() {
        super();
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
