/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslationService } from '@vcd/i18n';
import { ActionItem, ActionSearchProvider, QuickSearchService } from '@vcd/ui-components';

interface Record {
    value: string;
    paused: boolean;
}

interface HandlerData {
    foo: string;
    bar: string;
}

@Component({
    selector: 'vcd-action-menu-search-pause-unpause-example',
    templateUrl: 'action-menu-search-pause-and-unpause.example.component.html',
})
export class ActionMenuSearchPauseUnpauseExampleComponent<R extends Record, T extends HandlerData>
    implements OnInit, OnDestroy {
    constructor(private spotlightSearchService: QuickSearchService, private translationService: TranslationService) {}
    kbdShortcut = 'mod+.';
    spotlightOpen: boolean;

    actions: ActionItem<R, T>[] = [
        {
            textKey: 'Contextual 1',
            availability: (rec: R[]) => rec.length === 1,
            handler: () => console.log('Contextual 1'),
            isTranslatable: false,
        },
        {
            textKey: 'power.actions',
            children: [
                {
                    textKey: 'Start',
                    handler: (rec: R[]) => {
                        console.log('Starting ' + rec[0].value);
                        rec[0].paused = false;
                        this.selectedEntities = rec;
                    },
                    availability: (rec: R[]) => rec.length === 1 && rec[0].paused,
                    isTranslatable: false,
                    class: 'start',
                },
                {
                    textKey: 'Stop',
                    handler: (rec: R[]) => {
                        console.log('Stopping ' + (rec as R[])[0].value);
                        rec[0].paused = true;
                        this.selectedEntities = rec;
                    },
                    availability: (rec: R[]) => rec.length === 1 && !rec[0].paused,
                    isTranslatable: false,
                    class: 'stop',
                },
            ],
        },
        {
            textKey: 'grouped.actions',
            children: [
                {
                    textKey: 'Contextual featured',
                    handler: () => console.log('Contextual featured'),
                    isTranslatable: false,
                },
                {
                    textKey: 'Contextual 2',
                    handler: () => console.log('Contextual action 2'),
                    isTranslatable: false,
                },
                {
                    textKey: 'grouped.actions.with.single.child',
                    children: [
                        {
                            textKey: 'Single child',
                            handler: () => null,
                            availability: () => true,
                            isTranslatable: false,
                        },
                    ],
                },
            ],
        },
    ];

    selectedEntities: Record[] = [{ value: 'Selected entity', paused: false }] as R[];

    actionSearchProvider = new ActionSearchProvider(this.translationService);

    openActionSearch(): void {
        this.actionSearchProvider.pause();
        this.actionSearchProvider.actions = null;
        this.spotlightOpen = true;
        setTimeout(() => {
            this.actionSearchProvider.actions = [
                {
                    textKey: 'Contextual 1',
                    availability: (rec: R[]) => rec.length === 1,
                    handler: () => console.log('Contextual 1'),
                    isTranslatable: false,
                },
                {
                    textKey: 'power.actions',
                    children: [
                        {
                            textKey: 'Start',
                            handler: (rec: R[]) => {
                                console.log('Starting ' + rec[0].value);
                                rec[0].paused = false;
                                this.selectedEntities = rec;
                            },
                            availability: (rec: R[]) => rec.length === 1 && rec[0].paused,
                            isTranslatable: false,
                            class: 'start',
                        },
                        {
                            textKey: 'Stop',
                            handler: (rec: R[]) => {
                                console.log('Stopping ' + (rec as R[])[0].value);
                                rec[0].paused = true;
                                this.selectedEntities = rec;
                            },
                            availability: (rec: R[]) => rec.length === 1 && !rec[0].paused,
                            isTranslatable: false,
                            class: 'stop',
                        },
                    ],
                },
                {
                    textKey: 'grouped.actions',
                    children: [
                        {
                            textKey: 'Contextual featured',
                            handler: () => console.log('Contextual featured'),
                            isTranslatable: false,
                        },
                        {
                            textKey: 'Contextual 2',
                            handler: () => console.log('Contextual action 2'),
                            isTranslatable: false,
                        },
                        {
                            textKey: 'grouped.actions.with.single.child',
                            children: [
                                {
                                    textKey: 'Single child',
                                    handler: () => null,
                                    availability: () => true,
                                    isTranslatable: false,
                                },
                            ],
                        },
                    ],
                },
            ];
            this.actionSearchProvider.unPause();
        }, 5000);
    }

    ngOnInit(): void {
        this.actionSearchProvider.actions = this.actions;
        this.actionSearchProvider.selectedEntities = this.selectedEntities;
        this.spotlightSearchService.registerProvider(this.actionSearchProvider);
    }

    ngOnDestroy(): void {
        this.spotlightSearchService.unregisterProvider(this.actionSearchProvider);
    }
}
