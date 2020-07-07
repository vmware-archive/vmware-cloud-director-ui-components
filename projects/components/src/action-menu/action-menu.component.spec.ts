/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockTranslationService, TranslationService } from '@vcd/i18n';
import { ActionDisplayConfig, ActionItem, ActionStyling, ActionType, TextIcon } from '../common/interfaces';
import { ActionMenuComponent } from './action-menu.component';
import { VcdActionMenuModule } from './action-menu.module';

describe('ActionMenuComponent', () => {
    let fixture: ComponentFixture<TestHostComponent<Record>>;
    let testHostComponent: TestHostComponent<Record>;

    beforeEach(async () => {
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

        fixture = TestBed.createComponent(TestHostComponent);
        testHostComponent = fixture.componentInstance;

        fixture.detectChanges();
    });

    describe('set actions', () => {
        it('marks the actions with no actionType as ActionType.CONTEXTUAL', () => {
            testHostComponent.actions = getNewArray(ACTIONS_WITH_NO_ACTION_TYPES);
            fixture.detectChanges();
            testHostComponent.actionMenuComp.actions.forEach(action => {
                expect(action.actionType).toEqual(ActionType.CONTEXTUAL);
            });
        });
    });
    describe('set actionDisplayConfig', () => {
        it('sets display config options to default values when no input is given', () => {
            const actionDisplayConfig = testHostComponent.actionMenuComp.actionDisplayConfig;
            expect(actionDisplayConfig.contextual.featuredCount).toEqual(0);
            expect(actionDisplayConfig.contextual.styling).toEqual(ActionStyling.INLINE);
            expect(actionDisplayConfig.contextual.buttonContents).toEqual(TextIcon.TEXT);
            expect(actionDisplayConfig.staticActionStyling).toEqual(ActionStyling.INLINE);
        });
        it('sets display config options to given values when a input is given', () => {
            testHostComponent.actionDisplayConfig = getNewObj(ACTION_DISPLAY_CONFIG);
            fixture.detectChanges();
            const actionDisplayConfig = testHostComponent.actionMenuComp.actionDisplayConfig;
            expect(actionDisplayConfig.contextual.featuredCount).toEqual(2);
            expect(actionDisplayConfig.contextual.styling).toEqual(ActionStyling.DROPDOWN);
            expect(actionDisplayConfig.contextual.buttonContents).toEqual(TextIcon.ICON);
            expect(actionDisplayConfig.staticActionStyling).toEqual(ActionStyling.DROPDOWN);
        });
        it(
            'sets shouldShowIcon to true, shouldShowText to false and shouldShowTooltip to true when buttonContents ' +
                'is set to icon',
            () => {
                testHostComponent.actionDisplayConfig = getNewObj(ACTION_DISPLAY_CONFIG);
                fixture.detectChanges();
                expect(testHostComponent.actionMenuComp.shouldShowIcon).toBeTruthy();
                expect(testHostComponent.actionMenuComp.shouldShowText).toBeFalsy();
                expect(testHostComponent.actionMenuComp.shouldShowTooltip).toBeTruthy();
            }
        );
    });
    it('get staticActions returns only the actions that are marked as static', () => {
        testHostComponent.actions = getNewArray(STATIC_ACTIONS).concat(getNewArray(CONTEXTUAL_FEATURED_ACTIONS));
        fixture.detectChanges();
        testHostComponent.actionMenuComp.staticActions.forEach(action => {
            expect(action.actionType).toEqual(ActionType.STATIC);
        });
    });
    it('get staticFeaturedActions returns only the actions that are marked as static_featured', () => {
        testHostComponent.actions = getNewArray(STATIC_FEATURED_ACTIONS).concat(
            getNewArray(CONTEXTUAL_FEATURED_ACTIONS)
        );
        fixture.detectChanges();
        testHostComponent.actionMenuComp.staticFeaturedActions.forEach(action => {
            expect(action.actionType).toEqual(ActionType.STATIC_FEATURED);
        });
    });
    describe('getContextualFeaturedActions', () => {
        beforeEach(() => {
            testHostComponent.actions = getNewArray(CONTEXTUAL_FEATURED_ACTIONS).concat(
                getNewArray(STATIC_FEATURED_ACTIONS)
            );
        });
        it('returns only actions that are both available and also marked as contextual_featured', () => {
            testHostComponent.actionDisplayConfig = getNewObj(ACTION_DISPLAY_CONFIG);
            fixture.detectChanges();
            const availableContextualFeaturedActions = testHostComponent.actionMenuComp.contextualFeaturedActions;
            expect(CONTEXTUAL_FEATURED_ACTIONS.length).toEqual(3);
            expect(availableContextualFeaturedActions.length).toEqual(2);
            availableContextualFeaturedActions.forEach(action => {
                expect(action.actionType).toEqual(ActionType.CONTEXTUAL_FEATURED);
            });
        });
        it('does not return an action list with more items than featuredCount', () => {
            const ACTION_DISPLAY_CONFIG_WITH_ONE_FEATURED = {
                contextual: { ...ACTION_DISPLAY_CONFIG.contextual },
                staticActionStyling: ACTION_DISPLAY_CONFIG.staticActionStyling,
            };
            ACTION_DISPLAY_CONFIG_WITH_ONE_FEATURED.contextual.featuredCount = 1;
            testHostComponent.actionDisplayConfig = ACTION_DISPLAY_CONFIG_WITH_ONE_FEATURED;
            fixture.detectChanges();
            const availableContextualFeaturedActions = testHostComponent.actionMenuComp.contextualFeaturedActions;
            expect(CONTEXTUAL_FEATURED_ACTIONS.length).toEqual(3);
            expect(availableContextualFeaturedActions.length).toEqual(1);
        });
    });
    describe('getAvailableActions', () => {
        it('returns actions that are either available or disabled', () => {
            const availableActions = testHostComponent.actionMenuComp.getAvailableActions([
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
                },
            ]);
            expect(availableActions.length).toEqual(2);
        });
    });
    describe('getContextualActions', () => {
        beforeEach(() => {
            testHostComponent.actionDisplayConfig = getNewObj(ACTION_DISPLAY_CONFIG);
            jasmine.addMatchers({
                toBeContextualOrContextualFeaturedAction: () => ({
                    compare: actual => {
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
        it('returns only actions that are both available, contextual and contextual_featured', () => {
            testHostComponent.actions = getNewArray(CONTEXTUAL_ACTIONS)
                .concat(getNewArray(CONTEXTUAL_FEATURED_ACTIONS))
                .concat(getNewArray(STATIC_FEATURED_ACTIONS));
            fixture.detectChanges();
            const availableActions = testHostComponent.actionMenuComp.contextualActions;
            const availableContextualActions = testHostComponent.actionMenuComp.getAvailableActions(
                getNewArray(CONTEXTUAL_ACTIONS).concat(getNewArray(CONTEXTUAL_FEATURED_ACTIONS))
            );
            expect(availableActions.length).toEqual(availableContextualActions.length);
            availableActions.forEach(action => {
                (expect(action.actionType) as any).toBeContextualOrContextualFeaturedAction();
            });
        });
    });
    describe('runActionHandler', () => {
        it('calls the action handler by passing both the selectedEntities and handlerData as its arguments', () => {
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
            testHostComponent.actionMenuComp.selectedEntities = selectedEntities;
            const spy = spyOn(action, 'handler').and.returnValue(null);
            testHostComponent.actionMenuComp.runActionHandler(action);
            expect(spy).toHaveBeenCalledWith(selectedEntities, handlerData);
        });
    });
    describe('isActionDisabled', () => {
        it('returns the output of disabled, if its a function or just disabled if its a boolean', () => {
            const action = {
                textKey: 'action',
                handler: () => {},
                disabled: () => true,
            };
            expect(testHostComponent.actionMenuComp.isActionDisabled(action)).toBeTruthy();
            // @ts-ignore
            action.disabled = false;
            expect(testHostComponent.actionMenuComp.isActionDisabled(action)).toBeFalsy();
        });
    });
    describe('getFlattenedActionList', () => {
        it('returns nested featured actions by adding them to a flattened list', () => {
            const flatList = (testHostComponent.actionMenuComp as any).getFlattenedActionList(
                getNewArray(NESTED_ACTIONS),
                ActionType.CONTEXTUAL_FEATURED
            );
            expect(flatList.length).toEqual(4);
            flatList.forEach(action => {
                expect(action.actionType).toEqual(ActionType.CONTEXTUAL_FEATURED);
            });
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
    template: `
        <vcd-action-menu [actions]="actions" [actionDisplayConfig]="actionDisplayConfig"> </vcd-action-menu>
    `,
})
class TestHostComponent<R extends Record> {
    @ViewChild(ActionMenuComponent, { static: true }) actionMenuComp: ActionMenuComponent<R, HandlerData>;

    actionDisplayConfig: ActionDisplayConfig;

    actions: ActionItem<R, HandlerData>[] = [];
}

const getNewArray = (arr: Array<any>) => [...arr];
const getNewObj = (obj: object) => ({ ...obj });

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
    },
];

const STATIC_ACTIONS = [
    {
        textKey: 'static',
        handler: () => {
            return Promise.resolve('Static');
        },
        availability: () => true,
        actionType: ActionType.STATIC,
    },
];

const STATIC_FEATURED_ACTIONS: any[] = [
    {
        textKey: 'static.featured',
        handler: () => {
            return Promise.resolve('Static featured');
        },
        availability: () => true,
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
