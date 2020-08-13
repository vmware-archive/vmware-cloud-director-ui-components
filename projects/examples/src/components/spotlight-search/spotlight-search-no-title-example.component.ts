/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    SpotlightSearchProvider,
    SpotlightSearchResult,
    SpotlightSearchResultType,
    SpotlightSearchService,
} from '@vcd/ui-components';
import Mousetrap from 'mousetrap';

@Component({
    selector: 'vcd-spotlight-example',
    templateUrl: './spotlight-search-no-title-example.component.html',
})
export class SpotlightSearchNoTitleExampleComponent implements OnInit, OnDestroy {
    kbdShortcut = 'mod+f';
    spotlightOpen: boolean;
    private registrationId: string;
    private readonly mousetrap: MousetrapInstance;

    constructor(private spotlightSearchService: SpotlightSearchService) {
        // Create an instance of mouse trap within the constructor so that any bount shortcut event handler
        // would be executed within the angular zone
        this.mousetrap = new Mousetrap();
    }

    ngOnInit(): void {
        this.mousetrap.bind(this.kbdShortcut, () => {
            this.spotlightOpen = true;
            return false;
        });

        this.registrationId = this.spotlightSearchService.registerProvider(new ActionsSearchProvider(), '');
    }

    ngOnDestroy(): void {
        this.mousetrap.reset();
        this.spotlightSearchService.unregisterProvider(this.registrationId);
    }
}

export class ActionsSearchProvider implements SpotlightSearchProvider {
    private actions: SpotlightSearchResult[];

    constructor() {
        // Build actions
        this.actions = [...Array(200).keys()].map(i => {
            const action = `action - ${i + 1}`;
            return {
                displayText: action,
                handler: () => {
                    alert(`Action handler for '${action}' is called`);
                },
            };
        });
    }

    search(criteria: string): SpotlightSearchResultType {
        criteria = criteria ? criteria.toLowerCase() : '';
        return this.actions.filter(action => action.displayText.toLowerCase().includes(criteria));
    }
}
