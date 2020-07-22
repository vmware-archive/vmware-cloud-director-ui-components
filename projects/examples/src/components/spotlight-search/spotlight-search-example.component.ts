/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { ChangeDetectorRef, Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
    SpotlightSearchProvider,
    SpotlightSearchResult,
    SpotlightSearchResultType,
    SpotlightSearchService,
} from '@vcd/ui-components';
import mousetrap from 'mousetrap';

const mousetrapModifierKeys: string[] = ['shift', 'ctrl', 'alt', 'meta', 'mod', 'option', 'command'];

@Component({
    selector: 'vcd-spotlight-example',
    templateUrl: './spotlight-search-example.component.html',
})
export class SpotlightSearchExampleComponent implements OnInit, OnDestroy {
    formGroup: FormGroup;
    kbdShortcut = 'mod+f';
    spotlightOpen: boolean;
    private registrationId: string;

    constructor(
        private fb: FormBuilder,
        private actionsSearchProvider: ActionsSearchProvider,
        private spotlightSearchService: SpotlightSearchService,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        this.formGroup = this.fb.group({
            ['placeholder']: [''],
        });

        // Register LazyLoadedActionsSearchProvider and ensure they go first in the list
        this.registrationId = this.spotlightSearchService.registerProvider(
            new LazyLoadedActionsSearchProvider(),
            'Lazy Loaded Actions',
            0
        );
    }

    private resetMousetrap: () => void = () => {};

    ngOnInit(): void {
        mousetrap.bind(this.kbdShortcut, () => {
            this.spotlightOpen = true;
            // Since this happens outside angular zone we need to notify angular manually
            // otherwise the user should wait for any operation that will trigger angular change detection (angular zone event)
            this.changeDetectorRef.detectChanges();
            return false;
        });

        const originalStopCallback = mousetrap.prototype.stopCallback;
        this.resetMousetrap = () => {
            mousetrap.unbind(this.kbdShortcut);
            mousetrap.prototype.stopCallback = originalStopCallback;
        };

        if (mousetrapModifierKeys.some(key => this.kbdShortcut.includes(key))) {
            mousetrap.prototype.stopCallback = () => {
                return false;
            };
        }
    }

    ngOnDestroy(): void {
        this.resetMousetrap();
        this.spotlightSearchService.unregisterProvider(this.registrationId);
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

    constructor(private spotlightSearchService: SpotlightSearchService) {
        // Auto register upon creation
        this.spotlightSearchService.registerProvider(this, 'Actions');

        // Build actions
        this.actions = actions.map(action => {
            return {
                displayText: action,
                handler: () => {
                    alert(`Action handler for '${action}' is called`);
                },
            };
        });
    }

    search(criteria: string): SpotlightSearchResult[] {
        return this.actions.filter(buildFilter(criteria));
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
