/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MockTranslationService, TranslationService } from '@vcd/i18n';
import { ActionItem } from '../common/interfaces';
import { TestElement } from '../utils';
import { AngularWidgetObjectFinder } from '../utils/test/widget-object/angular/angular-widget-finder';
import { BaseWidgetObject } from '../utils/test/widget-object/widget-object';
import { DropdownComponent, NESTED_MENU_HIDE_DELAY } from './dropdown.component';
import { DropdownModule } from './dropdown.module';

export class VcdDropdownWidgetObject<T> extends BaseWidgetObject<T> {
    static tagName = `vcd-dropdown`;

    getDropdownToggleButton(dropdownToggleBtnClassName: string): T {
        return this.el.get(`.${dropdownToggleBtnClassName}`).unwrap();
    }

    getDropdown(dropdownToggleBtnClassName: string): T {
        const dropdownToggle = this.el.get(`.${dropdownToggleBtnClassName}`);
        const toggleParentDropdown = dropdownToggle.parents(VcdDropdownWidgetObject.tagName);
        return toggleParentDropdown.unwrap();
    }
}

interface HasVcdDropdown {
    finder: AngularWidgetObjectFinder<TestHostComponent>;
    dropdownComponent: DropdownComponent;
    dropdownWidget: VcdDropdownWidgetObject<TestElement>;
}

export const PRIMARY_DROPDOWN_TOGGLE_CLASS_NAME = 'first-dropdown-toggle';
export const NESTED_DROPDOWN_TOGGLE_CLASS_NAME = 'nested-dropdown-toggle';

describe('DropdownComponent', () => {
    describe('shouldRenderAsSeparator', () => {
        beforeEach(function (this: HasVcdDropdown): void {
            this.dropdownComponent = new DropdownComponent(null, null);
        });
        it('returns false when separator is the first item in the list', function (this: HasVcdDropdown): void {
            this.dropdownComponent.items = [
                {
                    isSeparator: true,
                },
                {
                    textKey: 'action.1',
                },
                {
                    isSeparator: true,
                },
                {
                    textKey: 'action.1',
                },
            ];
            expect(this.dropdownComponent.shouldRenderAsSeparator(0, this.dropdownComponent.items[0])).toEqual(false);
        });
        it(
            'returns true only when the current item is a separator and the next item is not' + ' a separator',
            function (this: HasVcdDropdown): void {
                const separatorItemIndices = {
                    one: 1,
                    three: 3,
                    four: 4,
                };
                this.dropdownComponent.items = [
                    {
                        textKey: 'action.1',
                    },
                    {
                        isSeparator: true,
                    },
                    {
                        textKey: 'action.1',
                    },
                    {
                        isSeparator: true,
                    },
                    {
                        isSeparator: true,
                    },
                    {
                        textKey: 'action.1',
                    },
                ];
                expect(this.dropdownComponent.shouldRenderAsSeparator(0, this.dropdownComponent.items[0])).toEqual(
                    false
                );
                expect(
                    this.dropdownComponent.shouldRenderAsSeparator(
                        separatorItemIndices.one,
                        this.dropdownComponent.items[separatorItemIndices.one]
                    )
                ).toEqual(true);
                expect(
                    this.dropdownComponent.shouldRenderAsSeparator(
                        separatorItemIndices.three,
                        this.dropdownComponent.items[separatorItemIndices.three]
                    )
                ).toEqual(false);
            }
        );
        it(
            'irrespective of number of adjacent separators, it returns false for all the separators that do not have a dropdown item ' +
                'next to them',
            function (this: HasVcdDropdown): void {
                const separatorItemIndices = {
                    one: 1,
                    two: 2,
                    three: 3,
                    four: 4,
                };
                this.dropdownComponent.items = [
                    {
                        textKey: 'action.1',
                    },
                    {
                        isSeparator: true,
                    },
                    {
                        isSeparator: true,
                    },
                    {
                        isSeparator: true,
                    },
                    {
                        isSeparator: true,
                    },
                    {
                        textKey: 'action.1',
                    },
                ];
                expect(
                    this.dropdownComponent.shouldRenderAsSeparator(
                        separatorItemIndices.one,
                        this.dropdownComponent.items[separatorItemIndices.one]
                    )
                ).toEqual(false);
                expect(
                    this.dropdownComponent.shouldRenderAsSeparator(
                        separatorItemIndices.two,
                        this.dropdownComponent.items[separatorItemIndices.two]
                    )
                ).toEqual(false);
                expect(
                    this.dropdownComponent.shouldRenderAsSeparator(
                        separatorItemIndices.three,
                        this.dropdownComponent.items[separatorItemIndices.three]
                    )
                ).toEqual(false);
                expect(
                    this.dropdownComponent.shouldRenderAsSeparator(
                        separatorItemIndices.four,
                        this.dropdownComponent.items[separatorItemIndices.four]
                    )
                ).toEqual(true);
            }
        );
        it('returns false when separator is the last item in the list', function (this: HasVcdDropdown): void {
            this.dropdownComponent.items = [
                {
                    textKey: 'action.1',
                },
                {
                    isSeparator: true,
                },
                {
                    textKey: 'action.1',
                },
                {
                    isSeparator: true,
                },
            ];
            const lastItemIndex = this.dropdownComponent.items.length - 1;
            expect(
                this.dropdownComponent.shouldRenderAsSeparator(
                    lastItemIndex,
                    this.dropdownComponent.items[lastItemIndex]
                )
            ).toEqual(false);
        });
    });
    describe('toggling,', () => {
        beforeEach(async function (this: HasVcdDropdown): Promise<void> {
            await TestBed.configureTestingModule({
                imports: [DropdownModule],
                providers: [
                    {
                        provide: TranslationService,
                        useClass: MockTranslationService,
                    },
                ],
                declarations: [TestHostComponent],
            }).compileComponents();

            this.finder = new AngularWidgetObjectFinder(TestHostComponent);
            this.finder.detectChanges();
            this.dropdownWidget = this.finder.find<VcdDropdownWidgetObject<TestElement>>(VcdDropdownWidgetObject);
            this.dropdownComponent = this.dropdownWidget
                .getDropdown(PRIMARY_DROPDOWN_TOGGLE_CLASS_NAME)
                .getComponentInstance();
        });

        it('toggles the primary dropdown menu when clicked', function (this: HasVcdDropdown): void {
            this.dropdownWidget.getDropdownToggleButton(PRIMARY_DROPDOWN_TOGGLE_CLASS_NAME).click();
            expect(this.dropdownComponent.clrDropdown.toggleService.open).toBeTruthy();
            this.dropdownWidget.getDropdownToggleButton(PRIMARY_DROPDOWN_TOGGLE_CLASS_NAME).click();
            expect(this.dropdownComponent.clrDropdown.toggleService.open).toBeFalsy();
        });

        it('does not open the primary dropdown menu when mouse is moved over', function (this: HasVcdDropdown): void {
            this.dropdownWidget.getDropdownToggleButton(PRIMARY_DROPDOWN_TOGGLE_CLASS_NAME).mouseOver();
            expect(this.dropdownComponent.clrDropdown.toggleService.open).toBeFalsy();
        });

        it('opens the nested dropdown menu when mouse is moved over', function (this: HasVcdDropdown): void {
            this.dropdownWidget.getDropdownToggleButton(PRIMARY_DROPDOWN_TOGGLE_CLASS_NAME).click();
            this.dropdownWidget.getDropdownToggleButton(NESTED_DROPDOWN_TOGGLE_CLASS_NAME).mouseOver();
            const nestedDropdownComponent = this.dropdownWidget
                .getDropdown(NESTED_DROPDOWN_TOGGLE_CLASS_NAME)
                .getComponentInstance() as DropdownComponent;
            expect(nestedDropdownComponent.clrDropdown.toggleService.open).toBeTruthy();
        });
        it('closes the nested dropdown when mouse is moved out of the nested dropdown' + 'trigger', async function (
            this: HasVcdDropdown
        ): Promise<void> {
            this.dropdownWidget.getDropdownToggleButton(PRIMARY_DROPDOWN_TOGGLE_CLASS_NAME).click();
            this.dropdownWidget.getDropdownToggleButton(NESTED_DROPDOWN_TOGGLE_CLASS_NAME).mouseOver();
            const nestedDropdownComponent = this.dropdownWidget
                .getDropdown(NESTED_DROPDOWN_TOGGLE_CLASS_NAME)
                .getComponentInstance() as DropdownComponent;
            expect(nestedDropdownComponent.clrDropdown.toggleService.open).toBeTruthy();
            this.dropdownWidget.getDropdownToggleButton(NESTED_DROPDOWN_TOGGLE_CLASS_NAME).mouseOut();
            await new Promise((resolve) => window.setTimeout(resolve, NESTED_MENU_HIDE_DELAY));
            expect(nestedDropdownComponent.clrDropdown.toggleService.open).toBeFalsy();
        });
    });
});

@Component({
    template: `
        <vcd-dropdown
            vcdDropdownFocusHandler
            [items]="items"
            [dropdownTriggerBtnTxt]="'Dropdown'"
            [dropdownTriggerButtonClassName]="primaryDropdownClassName"
        ></vcd-dropdown>
    `,
})
export class TestHostComponent {
    items: ActionItem<any, any>[] = [
        {
            textKey: 'Nested Actions',
            isTranslatable: false,
            class: NESTED_DROPDOWN_TOGGLE_CLASS_NAME,
            children: [
                {
                    textKey: 'Nested Action 1',
                    isTranslatable: false,
                },
                {
                    textKey: 'Nested Action 2',
                    isTranslatable: false,
                },
            ],
        },
    ];

    primaryDropdownClassName = PRIMARY_DROPDOWN_TOGGLE_CLASS_NAME;
}
