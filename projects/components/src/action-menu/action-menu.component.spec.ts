/*!
 * Copyright 2020-2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MockTranslationService, TranslationService } from '@vcd/i18n';
import {
    ActionDisplayConfig,
    ActionItem,
    ActionStyling,
    ActionType,
    ContextualActionInlineDisplayConfig,
    TextIcon,
} from '../common/interfaces';
import { BaseWidgetObject } from '../utils/test/widget-object/widget-object';
import { AngularWidgetObjectFinder } from '../utils/test/widget-object/angular/angular-widget-finder';
import { ActionMenuComponent, getDefaultActionDisplayConfig } from './action-menu.component';
import { VcdActionMenuModule } from './action-menu.module';
import createSpy = jasmine.createSpy;

interface HasFinderAndActionMenu {
    finder: AngularWidgetObjectFinder<TestHostComponent<Record>>;
    actionMenu: ActionMenuComponent<Record, HandlerData>;
}

export class ActionMenuWidgetObject<T> extends BaseWidgetObject<T> {
    static tagName = 'vcd-action-menu';
}

describe('ActionMenuComponent', () => {
    beforeEach(async function (this: HasFinderAndActionMenu): Promise<void> {
        await TestBed.configureTestingModule({
            imports: [VcdActionMenuModule],
            providers: [
                {
                    provide: TranslationService,
                    useValue: new MockTranslationService(),
                },
            ],
            declarations: [TestHostComponent],
        }).compileComponents();

        this.finder = new AngularWidgetObjectFinder(TestHostComponent);
        this.finder.detectChanges();
        this.actionMenu = this.finder.find(ActionMenuWidgetObject).self().getComponentInstance();
    });

    describe('set actions', () => {
        it('marks the actions with no actionType as ActionType.CONTEXTUAL', function (this: HasFinderAndActionMenu): void {
            this.actionMenu.actions = [...ACTIONS_WITH_NO_ACTION_TYPES];
            this.finder.detectChanges();
            this.actionMenu._actions.forEach((action) => {
                expect(action.actionType).toEqual(ActionType.CONTEXTUAL);
            });
        });
        it(
            'when a list with no nested actions and no CONTEXTUAL_FEATURED actions is set, it marks the actions with no actionType' +
                'as ActionType.CONTEXTUAL_FEATURED',
            function (this: HasFinderAndActionMenu): void {
                this.actionMenu.actions = [...FLAT_LIST_OF_ACTIONS_WITH_NO_ACTION_TYPE];
                this.finder.detectChanges();
                this.actionMenu._actions.forEach((action) => {
                    expect(action.actionType).toEqual(ActionType.CONTEXTUAL_FEATURED);
                });
            }
        );
    });
    describe('set actionDisplayConfig', () => {
        it('sets display config options to given values when a input is given', function (this: HasFinderAndActionMenu): void {
            this.actionMenu.actionDisplayConfig = { ...ACTION_DISPLAY_CONFIG };
            this.finder.detectChanges();
            const actionDisplayConfig = this.actionMenu.actionDisplayConfig;
            expect((actionDisplayConfig.contextual as ContextualActionInlineDisplayConfig).featuredCount).toEqual(2);
            expect(actionDisplayConfig.contextual.styling).toEqual(ActionStyling.DROPDOWN);
            expect(actionDisplayConfig.contextual.buttonContents).toEqual(TextIcon.ICON);
            expect(actionDisplayConfig.staticActionStyling).toEqual(ActionStyling.DROPDOWN);
        });
        it(
            'sets shouldShowIcon to true, shouldShowText to false and shouldShowTooltip to true when buttonContents ' +
                'is set to icon',
            function (this: HasFinderAndActionMenu): void {
                this.actionMenu.actionDisplayConfig = { ...ACTION_DISPLAY_CONFIG };
                this.finder.detectChanges();
                expect(this.actionMenu.shouldShowIcon).toBeTruthy();
                expect(this.actionMenu.shouldShowText).toBeFalsy();
                expect(this.actionMenu.shouldShowTooltip).toBeTruthy();
            }
        );
        it(
            'setting the actionDisplayConfig of an instance of ActionMenuComponent, does not modify the defaults for subsequent ' +
                'instantiations',
            function (this: HasFinderAndActionMenu): void {
                const configInput: ActionDisplayConfig = {
                    staticActionStyling: ActionStyling.DROPDOWN,
                };

                const instanceOne = new ActionMenuComponent();
                instanceOne.actionDisplayConfig = configInput;
                expect(instanceOne.actionDisplayConfig.staticActionStyling).toEqual(configInput.staticActionStyling);

                const instanceTwo = new ActionMenuComponent();
                expect(instanceTwo.actionDisplayConfig.staticActionStyling).toEqual(
                    getDefaultActionDisplayConfig().staticActionStyling
                );
            }
        );
        it('default value of buttonContents is TEXT when it is not set', function (this: HasFinderAndActionMenu) {
            this.actionMenu.actionDisplayConfig = {
                contextual: {
                    styling: ActionStyling.INLINE,
                },
            };
            this.finder.detectChanges();
            expect(this.actionMenu.actionDisplayConfig.contextual.buttonContents).toEqual(TextIcon.TEXT);
        });
    });
    it('get staticActions returns only the actions that are marked as static', function (this: HasFinderAndActionMenu): void {
        this.actionMenu.actions = [...STATIC_ACTIONS].concat([...CONTEXTUAL_FEATURED_ACTIONS]);
        this.finder.detectChanges();
        this.actionMenu.staticActions.forEach((action) => {
            expect(action.actionType).toEqual(ActionType.STATIC);
        });
    });
    it('get staticFeaturedActions returns only the actions that are marked as' + ' static_featured', function (
        this: HasFinderAndActionMenu
    ): void {
        this.actionMenu.actions = [...STATIC_FEATURED_ACTIONS].concat([...CONTEXTUAL_FEATURED_ACTIONS]);
        this.finder.detectChanges();
        this.actionMenu.staticFeaturedActions.forEach((action) => {
            expect(action.actionType).toEqual(ActionType.STATIC_FEATURED);
        });
    });
    describe('getContextualFeaturedActions', () => {
        beforeEach(function (this: HasFinderAndActionMenu): void {
            this.actionMenu.actions = [...CONTEXTUAL_FEATURED_ACTIONS].concat([...STATIC_FEATURED_ACTIONS]);
            this.actionMenu.selectedEntities = [
                {
                    value: 'foo',
                    paused: false,
                },
            ];
        });
        it('returns only actions that are both available and also marked as' + ' contextual_featured', function (
            this: HasFinderAndActionMenu
        ): void {
            this.actionMenu.actionDisplayConfig = { ...ACTION_DISPLAY_CONFIG };
            this.finder.detectChanges();
            const availableContextualFeaturedActions = this.actionMenu.contextualFeaturedActions;
            expect(CONTEXTUAL_FEATURED_ACTIONS.length).toEqual(3);
            expect(availableContextualFeaturedActions.length).toEqual(2);
            availableContextualFeaturedActions.forEach((action) => {
                expect(action.actionType).toEqual(ActionType.CONTEXTUAL_FEATURED);
            });
        });
        it('does not return an action list with more items than featuredCount', function (this: HasFinderAndActionMenu): void {
            this.actionMenu.actionDisplayConfig = {
                contextual: {
                    featuredCount: 1,
                    styling: ActionStyling.INLINE,
                },
                staticActionStyling: ACTION_DISPLAY_CONFIG.staticActionStyling,
            };
            this.finder.detectChanges();
            const availableContextualFeaturedActions = this.actionMenu.contextualFeaturedActions;
            expect(CONTEXTUAL_FEATURED_ACTIONS.length).toEqual(3);
            expect(availableContextualFeaturedActions.length).toEqual(1);
        });
        it('returns empty array if there are no selectedEntities', function (this: HasFinderAndActionMenu): void {
            this.actionMenu.selectedEntities = null;
            expect(this.actionMenu.contextualFeaturedActions.length).toEqual(0);
        });
    });
    describe('getContextualActions', () => {
        beforeEach(function (this: HasFinderAndActionMenu): void {
            this.actionMenu.actionDisplayConfig = { ...ACTION_DISPLAY_CONFIG };
            jasmine.addMatchers({
                toBeContextualOrContextualFeaturedAction: () => ({
                    compare: (actual) => {
                        return actual === ActionType.CONTEXTUAL || actual === ActionType.CONTEXTUAL_FEATURED
                            ? {
                                  pass: true,
                                  message: '',
                              }
                            : {
                                  pass: false,
                                  message: `${actual} is not either contextual or contextual_featured`,
                              };
                    },
                }),
            });
        });
        it('returns empty array if there are no selectedEntities', function (this: HasFinderAndActionMenu): void {
            this.actionMenu.actions = [...CONTEXTUAL_ACTIONS];
            this.actionMenu.selectedEntities = null;
            expect(this.actionMenu.contextualActions.length).toEqual(0);
        });
        it('returns only actions that are either contextual or contextual_featured', function (this: HasFinderAndActionMenu): void {
            this.actionMenu.actions = [...CONTEXTUAL_ACTIONS]
                .concat([...CONTEXTUAL_FEATURED_ACTIONS])
                .concat([...STATIC_FEATURED_ACTIONS]);
            this.actionMenu.selectedEntities = [
                {
                    value: 'foo',
                    paused: false,
                },
            ];
            this.finder.detectChanges();
            this.actionMenu.contextualActions.forEach((action) => {
                (expect(action.actionType) as any).toBeContextualOrContextualFeaturedAction();
            });
        });
    });
    describe('runActionHandler', () => {
        it(
            'calls the action handler by passing both the selectedEntities and handlerData as its' + ' arguments',
            function (this: HasFinderAndActionMenu): void {
                const handlerData = { foo: 'foo', bar: 'bar' };
                const selectedEntities = [
                    {
                        value: 'foo',
                        paused: false,
                    },
                ];
                const action = {
                    textKey: 'action',
                    handler: (rec: any[], data: Blah) => {
                        return Promise.resolve(JSON.stringify(data));
                    },
                    handlerData,
                    availability: () => true,
                };
                this.actionMenu.actions = [action];
                this.actionMenu.selectedEntities = selectedEntities;
                const spy = spyOn(action, 'handler').and.returnValue(null);
                this.actionMenu.runActionHandler(action);
                expect(spy).toHaveBeenCalledWith(selectedEntities, handlerData);
            }
        );
    });
    describe('isActionDisabled', () => {
        it('returns the output of disabled, if its a function or just disabled if its a ' + 'boolean', function (
            this: HasFinderAndActionMenu
        ): void {
            const action: ActionItem<Record, HandlerData> = {
                textKey: 'action',
                handler: () => {},
                disabled: () => true,
            };
            expect(this.actionMenu.isActionDisabled(action)).toBeTruthy();
            action.disabled = false;
            expect(this.actionMenu.isActionDisabled(action)).toBeFalsy();

            const action2 = {
                textKey: 'action',
                handler: () => {},
                disabled: true,
            };
            expect(this.actionMenu.isActionDisabled(action2)).toBeTruthy();
        });
    });
    describe('getFlattenedActionList', () => {
        it('returns nested featured actions by adding them to a flattened list', function (this: HasFinderAndActionMenu): void {
            const flatList = (this.actionMenu as any).getFlattenedActionList(
                [...NESTED_ACTIONS],
                ActionType.CONTEXTUAL_FEATURED
            );
            expect(flatList.length).toEqual(4);
            flatList.forEach((action) => {
                expect(action.actionType).toEqual(ActionType.CONTEXTUAL_FEATURED);
            });
        });
    });

    describe('actionsUpdate', () => {
        describe('with regards to actions input', () => {
            it('emits event when actions input is provided with non empty array', function (this: HasFinderAndActionMenu): void {
                const spy = createSpy('actionsUpdate');
                this.actionMenu.actionsUpdate.subscribe(spy);
                this.actionMenu.actions = [...CONTEXTUAL_ACTIONS];
                this.finder.detectChanges();
                expect(spy).toHaveBeenCalledTimes(1);
            });

            it('does not emit event when actions input is provided with an empty array', function (this: HasFinderAndActionMenu): void {
                const spy = createSpy('actionsUpdate');
                this.actionMenu.actionsUpdate.subscribe(spy);
                this.actionMenu.actions = [];
                this.finder.detectChanges();
                expect(spy).toHaveBeenCalledTimes(0);
            });

            it('does not emit twice when actions input has changed with the same array', function (this: HasFinderAndActionMenu): void {
                const actions = [...CONTEXTUAL_ACTIONS];
                const spy = createSpy('actionsUpdate');
                this.actionMenu.actionsUpdate.subscribe(spy);
                this.actionMenu.actions = actions;
                this.finder.detectChanges();
                this.actionMenu.actions = actions;
                this.finder.detectChanges();
                expect(spy).toHaveBeenCalledTimes(1);
            });

            it('does not emit event when actions input is null which is handled as an empty array', function (this: HasFinderAndActionMenu): void {
                const spy = createSpy('actionsUpdate');
                this.actionMenu.actionsUpdate.subscribe(spy);
                this.actionMenu.actions = [];
                this.finder.detectChanges();
                this.actionMenu.actions = null;
                this.finder.detectChanges();
                expect(spy).toHaveBeenCalledTimes(0);
            });

            it('does not emit twice when actions input has changed with an array containing same item references', function (this: HasFinderAndActionMenu): void {
                const spy = createSpy('actionsUpdate');
                this.actionMenu.actionsUpdate.subscribe(spy);
                this.actionMenu.actions = [...CONTEXTUAL_ACTIONS];
                this.finder.detectChanges();
                this.actionMenu.actions = [...CONTEXTUAL_ACTIONS];
                this.finder.detectChanges();
                expect(spy).toHaveBeenCalledTimes(1);
            });

            it('emits event when actions input has changed with an array containing same items but different references', function (this: HasFinderAndActionMenu): void {
                const action = CONTEXTUAL_ACTIONS[0];
                const spy = createSpy('actionsUpdate');
                this.actionMenu.actionsUpdate.subscribe(spy);
                this.actionMenu.actions = [action];
                this.finder.detectChanges();
                this.actionMenu.actions = [{ ...action }];
                this.finder.detectChanges();
                expect(spy).toHaveBeenCalledTimes(2);
            });
        });

        describe('with regards to selectedEntities input', () => {
            it('emits event when selectedEntities input is provided with non empty array', function (this: HasFinderAndActionMenu): void {
                const spy = createSpy('actionsUpdate');
                this.actionMenu.actionsUpdate.subscribe(spy);
                this.actionMenu.selectedEntities = [{ value: 'foo', paused: false }];
                this.finder.detectChanges();
                expect(spy).toHaveBeenCalledTimes(1);
            });

            it('does not emit event when selectedEntities input is provided with an empty array', function (this: HasFinderAndActionMenu): void {
                const spy = createSpy('actionsUpdate');
                this.actionMenu.actionsUpdate.subscribe(spy);
                this.actionMenu.selectedEntities = [];
                this.finder.detectChanges();
                expect(spy).toHaveBeenCalledTimes(0);
            });

            it('does not emit twice when selectedEntities input has changed with the same array', function (this: HasFinderAndActionMenu): void {
                const selectedEntities = [{ value: 'foo', paused: false }];
                const spy = createSpy('actionsUpdate');
                this.actionMenu.actionsUpdate.subscribe(spy);
                this.actionMenu.selectedEntities = selectedEntities;
                this.finder.detectChanges();
                this.actionMenu.selectedEntities = selectedEntities;
                this.finder.detectChanges();
                expect(spy).toHaveBeenCalledTimes(1);
            });

            it('does not emit twice when selectedEntities input has changed with an array containing same item references', function (this: HasFinderAndActionMenu): void {
                const selectedEntity = { value: 'foo', paused: false };
                const spy = createSpy('actionsUpdate');
                this.actionMenu.actionsUpdate.subscribe(spy);
                this.actionMenu.selectedEntities = [selectedEntity];
                this.finder.detectChanges();
                this.actionMenu.selectedEntities = [selectedEntity];
                this.finder.detectChanges();
                expect(spy).toHaveBeenCalledTimes(1);
            });

            it('emits event when selectedEntities input has changed with an array containing same items but different references', function (this: HasFinderAndActionMenu): void {
                const selectedEntity = { value: 'foo', paused: false };
                const spy = createSpy('actionsUpdate');
                this.actionMenu.actionsUpdate.subscribe(spy);
                this.actionMenu.selectedEntities = [selectedEntity];
                this.finder.detectChanges();
                this.actionMenu.selectedEntities = [{ ...selectedEntity }];
                this.finder.detectChanges();
                expect(spy).toHaveBeenCalledTimes(2);
            });
        });
    });

    describe('updateDisplayedActions', () => {
        it('will update the available actions list', function (this: HasFinderAndActionMenu): void {
            let isActionAvailable = false;
            this.actionMenu.actions = [
                {
                    textKey: 'Some action',
                    availability: () => isActionAvailable,
                    actionType: ActionType.CONTEXTUAL_FEATURED,
                },
            ];
            this.actionMenu.selectedEntities = [{ value: '', paused: true }];
            expect(this.actionMenu.contextualFeaturedActions.length).toEqual(0);
            isActionAvailable = true;
            this.actionMenu.updateDisplayedActions();
            expect(this.actionMenu.contextualFeaturedActions.length).toEqual(1);
        });
    });

    describe('set selectedEntities', () => {
        it('accepts single item as input', function (this: HasFinderAndActionMenu): void {
            const singleItem = {
                value: 'foo',
                paused: false,
            };
            this.actionMenu.selectedEntities = singleItem;
            expect(this.actionMenu.getSelectedEntities()).toEqual([singleItem]);
        });
        it('accepts array as input', function (this: HasFinderAndActionMenu): void {
            const arrayOfItems = [
                {
                    value: 'foo',
                    paused: false,
                },
                {
                    value: 'blah',
                    paused: true,
                },
            ];
            this.actionMenu.selectedEntities = arrayOfItems;
            expect(this.actionMenu.getSelectedEntities()).toBe(arrayOfItems);
        });
        it('when null is passed as input, displayed actions are not updated', function (this: HasFinderAndActionMenu): void {
            const spy = spyOn(this.actionMenu, 'updateDisplayedActions').and.callThrough();

            this.actionMenu.selectedEntities = null;
            expect(spy).not.toHaveBeenCalled();

            this.actionMenu.selectedEntities = {
                value: 'foo',
                paused: false,
            };
            expect(spy).toHaveBeenCalled();
        });
    });
});

interface Record {
    value: string;
    paused: boolean;
}

interface Blah {
    foo: string;
    bar: string;
}

type HandlerData = Record[] | Blah;

@Component({
    template: ` <vcd-action-menu></vcd-action-menu> `,
})
class TestHostComponent<R extends Record> {}

const ACTION_DISPLAY_CONFIG = {
    contextual: {
        featuredCount: 2,
        styling: ActionStyling.DROPDOWN,
        buttonContents: TextIcon.ICON,
    },
    staticActionStyling: ActionStyling.DROPDOWN,
};

const ACTIONS_WITH_NO_ACTION_TYPES = [
    {
        textKey: 'action.1',
        handler: () => {},
        availability: () => false,
        disabled: () => true,
    },
    {
        textKey: 'action.2',
        handler: () => {},
        availability: () => true,
        children: [
            {
                textKey: 'children.action.1',
                handler: () => {},
            },
        ],
    },
];

const STATIC_ACTIONS = [
    {
        textKey: 'static',
        handler: () => {
            return Promise.resolve('Static');
        },
        actionType: ActionType.STATIC,
    },
];

const STATIC_FEATURED_ACTIONS: any[] = [
    {
        textKey: 'static.featured',
        handler: () => {
            return Promise.resolve('Static featured');
        },
        actionType: ActionType.STATIC_FEATURED,
    },
];

const NON_AVAILABLE_CONTEXTUAL_FEATURED_ACTIONS: any[] = [
    {
        textKey: 'contextual.featured.1',
        handler: (rec: any[]) => {
            return Promise.resolve(JSON.stringify(rec[0]));
        },
        availability: () => false,
        actionType: ActionType.CONTEXTUAL_FEATURED,
    },
];

const CONTEXTUAL_FEATURED_ACTIONS: any[] = [
    ...NON_AVAILABLE_CONTEXTUAL_FEATURED_ACTIONS,
    {
        textKey: 'contextual.featured.2',
        handler: (rec: any[], data: Blah) => {
            return Promise.resolve(JSON.stringify(data));
        },
        handlerData: { foo: 'foo', bar: 'bar' },
        availability: () => true,
        actionType: ActionType.CONTEXTUAL_FEATURED,
    },
    {
        textKey: 'contextual.featured.3',
        handler: (rec: any[]) => {
            return Promise.resolve(JSON.stringify(rec[0]));
        },
        availability: () => true,
        actionType: ActionType.CONTEXTUAL_FEATURED,
    },
];

const NESTED_ACTIONS: any[] = [
    {
        textKey: 'action.featured.1',
        actionType: ActionType.CONTEXTUAL_FEATURED,
    },
    {
        textKey: 'action.static_featured',
        actionType: ActionType.STATIC_FEATURED,
    },
    {
        textKey: 'action.with.children',
        children: [
            {
                textKey: 'action.featured.2',
                actionType: ActionType.CONTEXTUAL_FEATURED,
            },
            {
                textKey: 'action.featured.3',
                actionType: ActionType.CONTEXTUAL_FEATURED,
            },
        ],
    },
    {
        textKey: 'action.featured.4',
        actionType: ActionType.CONTEXTUAL_FEATURED,
    },
];

const CONTEXTUAL_ACTIONS = [
    {
        textKey: 'contextual.1',
        handler: () => {},
        availability: () => false,
    },
    {
        textKey: 'contextual.2',
        handler: () => {},
        availability: () => true,
    },
];

const FLAT_LIST_OF_ACTIONS_WITH_NO_ACTION_TYPE = [
    {
        textKey: 'Contextual 1',
        handler: () => {},
    },
    {
        textKey: 'Contextual 2',
        handler: () => {},
    },
];
