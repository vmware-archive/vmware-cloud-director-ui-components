/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
    SpotlightSearchProvider,
    SpotlightSearchResult,
    SpotlightSearchResultType,
    SpotlightSearchService,
} from '@vcd/ui-components';
import Mousetrap from 'mousetrap';

@Component({
    selector: 'vcd-spotlight-example',
    templateUrl: './spotlight-search-example.component.html',
})
export class SpotlightSearchExampleComponent implements OnInit, OnDestroy {
    formGroup: FormGroup;
    kbdShortcut = 'mod+f';
    spotlightOpen: boolean;
    private registrationId: string;
    private readonly mousetrap: MousetrapInstance;

    constructor(
        private fb: FormBuilder,
        private actionsSearchProvider: ActionsSearchProvider,
        private spotlightSearchService: SpotlightSearchService
    ) {
        // Create an instance of mouse trap within the constructor so that any bount shortcut event handler
        // would be executed within the angular zone
        this.mousetrap = new Mousetrap();
        // For this example we'd like mouse trap to always run
        this.mousetrap.stopCallback = () => {
            return false;
        };

        this.formGroup = this.fb.group({
            ['placeholder']: [''],
        });
    }

    ngOnInit(): void {
        this.mousetrap.bind(this.kbdShortcut, () => {
            this.spotlightOpen = true;
            return false;
        });

        this.actionsSearchProvider.register();

        // Register LazyLoadedActionsSearchProvider and ensure they go first in the list
        this.registrationId = this.spotlightSearchService.registerProvider(
            new LazyLoadedActionsSearchProvider(),
            'Lazy Loaded Actions',
            0
        );
    }

    ngOnDestroy(): void {
        this.mousetrap.reset();
        this.spotlightSearchService.unregisterProvider(this.registrationId);
        this.actionsSearchProvider.unregister();
    }
}

const actions: string[] = ['copy', 'paste', 'move', 'dummy'];

function buildFilter(criteria: string): (item: SpotlightSearchResult) => boolean {
    criteria = criteria ? criteria.toLowerCase() : '';
    return (item: SpotlightSearchResult) => criteria && item.displayText.toLowerCase().includes(criteria);
}

@Injectable()
export class ActionsSearchProvider implements SpotlightSearchProvider {
    private actions: SpotlightSearchResult[];
    private registrationId: string;

    constructor(private spotlightSearchService: SpotlightSearchService) {
        // Build actions
        this.actions = actions.map(action => {
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

    search(criteria: string): SpotlightSearchResult[] {
        return this.actions.filter(buildFilter(criteria));
    }

    register(): void {
        this.registrationId = this.spotlightSearchService.registerProvider(this, 'Actions');
    }

    unregister(): void {
        this.spotlightSearchService.unregisterProvider(this.registrationId);
    }
}

export class LazyLoadedActionsSearchProvider implements SpotlightSearchProvider {
    private actions: SpotlightSearchResult[] = actions.map(action => {
        return {
            displayText: `Lazy loaded ${action}`,
            handler: () => {
                alert(`Action handler for lazy loaded '${action}' is called`);
            },
        };
    });

    search(criteria: string): SpotlightSearchResultType {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.actions.filter(buildFilter(criteria))), 2000);
        });
    }
}
