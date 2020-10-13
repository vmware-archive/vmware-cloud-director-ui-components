/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, DebugElement } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockTranslationService, TranslationService } from '@vcd/i18n';
import { WidgetFinder, WidgetObject } from '../utils/test';
import { DropdownComponent, DropdownItem, NESTED_MENU_HIDE_DELAY } from './dropdown.component';
import { DropdownModule } from './dropdown.module';

interface HasVcdDropdown {
    finder: WidgetFinder<TestHostComponent>;
    dropdownComponent: DropdownComponent<any>;
    dropdownWidget: VcdDropdownWidgetObject;
}

const PRIMARY_DROPDOWN_CLASS_NAME = 'primary-dropdown';
const NESTED_DROPDOWN_CLASS_NAME = 'nested-dropdown-1';

class VcdDropdownWidgetObject extends WidgetObject<DropdownComponent<any>> {
    static tagName = `vcd-dropdown`;

    clickDropdown(className): void {
        this.click(`.${className}`);
    }

    mouseOver(className: string, parent: DebugElement = this.root): void {
        const nativeElement: HTMLBaseElement = parent.query(By.css(`.${className}`)).nativeElement;
        nativeElement.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        this.detectChanges();
    }

    mouseOut(className: string, parent: DebugElement = this.root): void {
        const nativeElement: HTMLBaseElement = parent.query(By.css(`.${className}`)).nativeElement;
        nativeElement.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
        this.detectChanges();
    }

    isDropdownOpen(className: string): boolean {
        const dropdownComponent = this.findElement(`.${className}`).componentInstance as DropdownComponent<any>;
        return dropdownComponent.clrDropdown.toggleService.open;
    }
}

describe('DropdownComponent', () => {
    describe('shouldRenderAsSeparator', () => {
        beforeEach(function (this: HasVcdDropdown): void {
            this.dropdownComponent = new DropdownComponent(null);
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
    describe('open and close drop downs,', () => {
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

            this.finder = new WidgetFinder(TestHostComponent);
            this.finder.detectChanges();
            this.dropdownWidget = this.finder.find(VcdDropdownWidgetObject);
            this.dropdownComponent = this.dropdownWidget.component;
        });

        it('clicking the primary dropdown toggles the primary dropdown menu', function (this: HasVcdDropdown): void {
            this.dropdownWidget.clickDropdown(PRIMARY_DROPDOWN_CLASS_NAME);
            expect(this.dropdownWidget.isDropdownOpen(PRIMARY_DROPDOWN_CLASS_NAME)).toEqual(true);
            this.dropdownWidget.clickDropdown(PRIMARY_DROPDOWN_CLASS_NAME);
            expect(this.dropdownWidget.isDropdownOpen(PRIMARY_DROPDOWN_CLASS_NAME)).toEqual(false);
        });

        it('moving the mouse over primary dropdown does not open it', function (this: HasVcdDropdown): void {
            this.dropdownWidget.mouseOver(PRIMARY_DROPDOWN_CLASS_NAME);
            expect(this.dropdownWidget.isDropdownOpen(PRIMARY_DROPDOWN_CLASS_NAME)).toEqual(false);
        });

        it('moving the mouse over nested dropdown opens it', function (this: HasVcdDropdown): void {
            this.dropdownWidget.clickDropdown(PRIMARY_DROPDOWN_CLASS_NAME);
            this.dropdownWidget.mouseOver(NESTED_DROPDOWN_CLASS_NAME);
            expect(this.dropdownWidget.isDropdownOpen(NESTED_DROPDOWN_CLASS_NAME)).toEqual(true);
        });
        it('moving the mouse out of a nested dropdown closes it', async function (this: HasVcdDropdown): Promise<void> {
            this.dropdownWidget.clickDropdown(PRIMARY_DROPDOWN_CLASS_NAME);
            this.dropdownWidget.mouseOver(NESTED_DROPDOWN_CLASS_NAME);
            expect(this.dropdownWidget.isDropdownOpen(NESTED_DROPDOWN_CLASS_NAME)).toEqual(true);
            this.dropdownWidget.mouseOut(NESTED_DROPDOWN_CLASS_NAME);
            await new Promise((resolve) => window.setTimeout(resolve, NESTED_MENU_HIDE_DELAY));
            expect(this.dropdownWidget.isDropdownOpen(NESTED_DROPDOWN_CLASS_NAME)).toEqual(false);
        });
    });
});

@Component({
    template: `
        <vcd-dropdown
            [items]="items"
            [dropdownTriggerBtnTxt]="'Dropdown'"
            [dropdownTriggerButtonClassName]="primaryDropdownClassName"
            [onItemClickedCb]="onItemClickedCb"
            [isItemDisabledCb]="isItemDisabledCb"
        ></vcd-dropdown>
    `,
})
export class TestHostComponent {
    items: DropdownItem<any>[] = [
        {
            textKey: 'Nested Actions',
            isTranslatable: false,
            class: NESTED_DROPDOWN_CLASS_NAME,
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

    primaryDropdownClassName = PRIMARY_DROPDOWN_CLASS_NAME;

    onItemClickedCb = (action) => null;

    isItemDisabledCb = (action) => false;
}
