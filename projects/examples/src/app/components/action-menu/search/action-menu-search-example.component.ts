/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslationService } from '@vcd/i18n';
import {
    ActionDisplayConfig,
    ActionItem,
    ActionSearchProvider,
    ActionStyling,
    ActionType,
    DEFAULT_ACTION_SEARCH_SECTION_HEADER_PREFIX,
    QuickSearchService,
    TextIcon,
} from '@vcd/ui-components';

interface Record {
    value: string;
    paused: boolean;
}

interface HandlerData {
    foo: string;
    bar: string;
}

@Component({
    selector: 'vcd-action-search-example',
    templateUrl: 'action-menu-search-example.component.html',
    styleUrls: ['action-menu-search-example.component.scss'],
})
export class ActionMenuSearchExampleComponent implements OnInit, OnDestroy {
    constructor(private spotlightSearchService: QuickSearchService, private translationService: TranslationService) {}

    spotlightOpen = false;

    actions: ActionItem<Record, HandlerData>[] = [
        {
            textKey: 'Static Featured 1',
            handler: () => console.log('Static Featured 1'),
            actionType: ActionType.STATIC_FEATURED,
            isTranslatable: false,
        },
        {
            textKey: 'Static 1',
            handler: (rec: Record[], data: HandlerData) =>
                console.log('Static 1 with custom handler data: ', JSON.stringify(data)),
            handlerData: { foo: 'foo', bar: 'bar' },
            actionType: ActionType.STATIC,
            isTranslatable: false,
        },
        {
            textKey: 'Contextual 1',
            availability: (rec: Record[]) => rec.length === 1,
            handler: () => console.log('Contextual 1'),
            isTranslatable: false,
        },
        {
            textKey: 'Contextual featured',
            actionType: ActionType.CONTEXTUAL_FEATURED,
            handler: () => console.log('Contextual featured'),
            isTranslatable: false,
        },
        {
            textKey: 'power.actions',
            children: [
                {
                    textKey: 'Start',
                    handler: (rec: Record[]) => {
                        console.log('Starting ' + rec[0].value);
                        rec[0].paused = false;
                        this.selectedEntities = rec;
                    },
                    availability: (rec: Record[]) => rec.length === 1 && rec[0].paused,
                    actionType: ActionType.CONTEXTUAL_FEATURED,
                    isTranslatable: false,
                    class: 'start',
                },
                {
                    textKey: 'Stop',
                    handler: (rec: Record[]) => {
                        console.log('Stopping ' + (rec as Record[])[0].value);
                        rec[0].paused = true;
                        this.selectedEntities = rec;
                    },
                    availability: (rec: Record[]) => rec.length === 1 && !rec[0].paused,
                    actionType: ActionType.CONTEXTUAL_FEATURED,
                    isTranslatable: false,
                    class: 'stop',
                },
            ],
        },
        {
            textKey: 'No children action',
            actionType: ActionType.CONTEXTUAL,
            children: [],
        },
    ];

    actionDisplayConfig: ActionDisplayConfig = {
        contextual: {
            styling: ActionStyling.INLINE,
            buttonContents: TextIcon.TEXT,
        },
    };

    private _selectedEntities: Record[] = [{ value: 'Selected entity', paused: false }] as Record[];
    set selectedEntities(val: Record[]) {
        this._selectedEntities = [...val];
        this.actionSearchProvider.selectedEntities = val;
    }
    get selectedEntities(): Record[] {
        return this._selectedEntities;
    }

    private actionProviderName = 'actionMenuExampleComponent';

    actionSearchProvider = new ActionSearchProvider(this.translationService);

    ngOnInit(): void {
        this.actionSearchProvider.actions = this.actions;
        this.actionSearchProvider.selectedEntities = this.selectedEntities;
        this.actionSearchProvider.sectionName = this.translationService.translate(
            DEFAULT_ACTION_SEARCH_SECTION_HEADER_PREFIX,
            [{ actionProviderName: this.actionProviderName || '' }]
        );

        this.spotlightSearchService.registerProvider(this.actionSearchProvider);
    }

    ngOnDestroy(): void {
        this.spotlightSearchService.unregisterProvider(this.actionSearchProvider);
    }
}
