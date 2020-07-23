/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { TranslationService } from '@vcd/i18n';
import {
    ActionDisplayConfig,
    ActionItem,
    ActionSearchProvider,
    ActionStyling,
    ActionType,
    SpotlightSearchService,
    TextIcon,
} from '@vcd/ui-components';
import Mousetrap from 'mousetrap';

interface Record {
    value: string;
    paused: boolean;
}

interface HandlerData {
    foo: string;
    bar: string;
}

@Component({
    selector: 'vcd-action-menu-example',
    template: `
        <div>
            <button (click)="changeStaticActionStyling()" class="btn btn-primary">
                Display static actions
                {{ actionDisplayConfig.staticActionStyling === 'INLINE' ? 'dropdown' : 'inline' }}
            </button>
            <br />
            <vcd-action-menu
                [actions]="staticActions"
                [actionDisplayConfig]="actionDisplayConfig"
                [selectedEntities]="selectedEntities"
                [dropdownTriggerBtnText]="'vcd.cc.action.menu.actions'"
            >
            </vcd-action-menu>
        </div>

        <br />

        <div>
            <button (click)="changeContextualActionStyling()" class="btn btn-primary">
                Display contextual actions
                {{ actionDisplayConfig.contextual.styling === 'INLINE' ? 'dropdown' : 'inline' }}
            </button>
            <button (click)="toggleDropdownDisable()" class="btn btn-primary">
                {{ isDropdownDisabled ? 'Enable dropdown' : 'Disable dropdown' }}
            </button>
            <br /><br />
            <p>Press 'mod+.' on the keyboard to open quick search and search for contextual actions</p>
            <vcd-action-menu
                [actions]="contextualActions"
                [actionDisplayConfig]="actionDisplayConfig"
                [selectedEntities]="selectedEntities"
                [dropdownTriggerBtnText]="'vcd.cc.action.menu.actions'"
                [disabled]="isDropdownDisabled"
            >
            </vcd-action-menu>
        </div>

        <vcd-spotlight-search
            [(open)]="spotlightOpen"
            [placeholder]="'Search contextual actions'"
        ></vcd-spotlight-search>
    `,
})
export class ActionMenuExampleComponent<R extends Record, T extends HandlerData> implements OnInit, OnDestroy {
    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private spotlightSearchService: SpotlightSearchService,
        private translationService: TranslationService
    ) {}

    get staticActions(): ActionItem<R, T>[] {
        return this.actions.filter(
            action => action.actionType === ActionType.STATIC || action.actionType === ActionType.STATIC_FEATURED
        );
    }

    get contextualActions(): ActionItem<R, T>[] {
        return this.actions.filter(
            action => action.actionType !== ActionType.STATIC && action.actionType !== ActionType.STATIC_FEATURED
        );
    }
    kbdShortcut = 'mod+.';
    spotlightOpen: boolean;

    actions: ActionItem<R, T>[] = [
        {
            textKey: 'Static Featured 1',
            handler: () => console.log('Static Featured 1'),
            availability: () => true,
            actionType: ActionType.STATIC_FEATURED,
            isTranslatable: false,
        },
        {
            textKey: 'Static 1',
            handler: (rec: R[], data: T) => console.log('Static 1 with custom handler data: ', JSON.stringify(data)),
            handlerData: { foo: 'foo', bar: 'bar' } as T,
            availability: () => true,
            actionType: ActionType.STATIC,
            isTranslatable: false,
        },
        {
            textKey: 'Static 2',
            handler: () => console.log('Static 2'),
            availability: () => false,
            disabled: () => true,
            actionType: ActionType.STATIC,
            isTranslatable: false,
        },
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
                    },
                    availability: (rec: R[]) => rec.length === 1 && rec[0].paused,
                    actionType: ActionType.CONTEXTUAL_FEATURED,
                    isTranslatable: false,
                },
                {
                    textKey: 'Stop',
                    handler: (rec: R[]) => {
                        console.log('Stopping ' + (rec as R[])[0].value);
                        rec[0].paused = true;
                    },
                    availability: (rec: R[]) => rec.length === 1 && !rec[0].paused,
                    actionType: ActionType.CONTEXTUAL_FEATURED,
                    isTranslatable: false,
                },
            ],
        },
        {
            textKey: 'grouped.actions',
            children: [
                {
                    textKey: 'Contextual featured',
                    actionType: ActionType.CONTEXTUAL_FEATURED,
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

    isDropdownDisabled: boolean = false;

    actionDisplayConfig: ActionDisplayConfig = {
        contextual: {
            featuredCount: 3,
            styling: ActionStyling.DROPDOWN,
            buttonContents: TextIcon.TEXT,
        },
        staticActionStyling: ActionStyling.INLINE,
    };

    selectedEntities = [{ value: 'Selected entity', paused: false }] as R[];

    private actionProviderName = 'actionMenuExampleComponent';

    private actionSearchProvider = new ActionSearchProvider(this.spotlightSearchService, this.translationService);

    changeContextualActionStyling(): void {
        this.actionDisplayConfig = {
            ...this.actionDisplayConfig,
            contextual: {
                ...this.actionDisplayConfig.contextual,
                styling:
                    this.actionDisplayConfig.contextual.styling === ActionStyling.DROPDOWN
                        ? ActionStyling.INLINE
                        : ActionStyling.DROPDOWN,
            },
        };
    }

    changeStaticActionStyling(): void {
        this.actionDisplayConfig = {
            ...this.actionDisplayConfig,
            staticActionStyling:
                this.actionDisplayConfig.staticActionStyling === ActionStyling.INLINE
                    ? ActionStyling.DROPDOWN
                    : ActionStyling.INLINE,
        };
    }

    toggleDropdownDisable(): void {
        this.isDropdownDisabled = !this.isDropdownDisabled;
    }

    ngOnInit(): void {
        const mousetrap = new Mousetrap();
        const originalStopCallback = mousetrap.stopCallback;
        mousetrap.stopCallback = (e: ExtendedKeyboardEvent, element: Element, combo: string): boolean => {
            // If a modifier key is used then do not stop the callback from being called despite of the event origin
            // i.e. `ctrl+.` on input fields should not stop the callback,
            // while `.` should stop it and echo `.` in the input
            if (['command'].some(key => combo.includes(key))) {
                return false;
            }
            return originalStopCallback.call(mousetrap, e, element, combo);
        };

        mousetrap.bind(this.kbdShortcut, () => {
            this.spotlightOpen = true;
            return false;
        });
        // Register as action search provider
        this.actionSearchProvider.actions = this.contextualActions;
        this.actionSearchProvider.selectedEntities = this.selectedEntities;
        this.actionSearchProvider.actionProviderName = this.actionProviderName;
        this.actionSearchProvider.register();
    }

    ngOnDestroy(): void {
        this.actionSearchProvider.unregister();
    }
}
