/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    QuickSearchProvider,
    QuickSearchRegistrarService,
    QuickSearchResult,
    QuickSearchResultType,
} from '@vcd/ui-components';
import Mousetrap from 'mousetrap';

@Component({
    selector: 'vcd-quick-search-no-title-example',
    templateUrl: './quick-search-no-title.example.component.html',
    providers: [QuickSearchRegistrarService],
})
export class QuickSearchNoTitleExampleComponent implements OnInit, OnDestroy {
    kbdShortcut = 'mod+f';
    quickSearchOpen: boolean;
    private readonly mousetrap: MousetrapInstance;

    constructor(private quickSearchRegistrar: QuickSearchRegistrarService) {
        // Create an instance of mouse trap within the constructor so that any bound shortcut event handler
        // will be executed within the angular zone
        this.mousetrap = new Mousetrap();
    }

    ngOnInit(): void {
        this.mousetrap.bind(this.kbdShortcut, () => {
            this.quickSearchOpen = true;
            return false;
        });

        this.quickSearchRegistrar.register(new ActionsSearchProvider());
    }

    ngOnDestroy(): void {
        this.mousetrap.reset();
    }
}

export class ActionsSearchProvider implements QuickSearchProvider {
    order = -1;

    sectionName: '';

    private actions: QuickSearchResult[];

    constructor() {
        // Build actions
        this.actions = [...Array(200)].map((_, i) => {
            const action = `action - ${i + 1}`;
            return {
                displayText: action,
                handler: () => {
                    alert(`Action handler for '${action}' is called`);
                },
            };
        });
    }

    search(criteria: string): QuickSearchResultType {
        criteria = criteria ? criteria.toLowerCase() : '';
        return this.actions.filter((action) => action.displayText.toLowerCase().includes(criteria));
    }
}
