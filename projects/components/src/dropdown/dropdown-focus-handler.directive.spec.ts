/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MockTranslationService, TranslationService } from '@vcd/i18n';
import { ActionItem, TextIcon } from '../common/interfaces';
import { AngularWidgetObjectFinder } from '../utils/test/widget-object/angular/angular-widget-finder';
import { TestElement } from '../utils/test/widget-object/angular/angular-widget-object-element';
import { DropdownFocusHandlerDirective, MenuItem } from './dropdown-focus-handler.directive';
import { DropdownComponent } from './dropdown.component';
import {
    NESTED_DROPDOWN_TOGGLE_CLASS_NAME,
    PRIMARY_DROPDOWN_TOGGLE_CLASS_NAME,
    VcdDropdownWidgetObject,
} from './dropdown.component.spec';
import { DropdownModule } from './dropdown.module';

interface HasVcdDropdown {
    finder: AngularWidgetObjectFinder<TestHostComponent>;
    dropdownComponent: DropdownComponent;
    dropdownWidget: VcdDropdownWidgetObject<TestElement>;
}

describe('DropdownFocusHandlerDirective', () => {
    beforeEach(async function (this: HasVcdDropdown): Promise<void> {
        await TestBed.configureTestingModule({
            imports: [DropdownModule],
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
        this.dropdownWidget = this.finder.find<VcdDropdownWidgetObject<TestElement>>(VcdDropdownWidgetObject);
        this.dropdownComponent = this.dropdownWidget
            .getDropdown(PRIMARY_DROPDOWN_TOGGLE_CLASS_NAME)
            .getComponentInstance();
        this.dropdownWidget.getDropdownToggleButton(PRIMARY_DROPDOWN_TOGGLE_CLASS_NAME).click();
    });

    it('links each of the menu items to their neighbors above and below', function (this: HasVcdDropdown): void {
        const middleMenuItem = this.finder.hostComponent.focusHandlerDirective.menuItems[1];
        expect(middleMenuItem.up.element.innerText).toEqual(this.finder.hostComponent.items[0].textKey);
        expect(middleMenuItem.down.element.innerText).toEqual(this.finder.hostComponent.items[2].textKey);
    });

    it('links a nested dropdown trigger to its children on the right', function (this: HasVcdDropdown): void {
        this.dropdownWidget.getDropdownToggleButton(NESTED_DROPDOWN_TOGGLE_CLASS_NAME).mouseOver();
        const nestedDropdownTrigger = this.finder.hostComponent.focusHandlerDirective.menuItems[3];
        const nestedMenuItemOnRight: MenuItem = nestedDropdownTrigger.right;
        expect(nestedMenuItemOnRight.element.innerText).toEqual('Nested Action 1');
    });
});

@Component({
    template: ` <vcd-dropdown vcdDropdownFocusHandler [items]="items"></vcd-dropdown> `,
})
class TestHostComponent {
    @ViewChild(DropdownFocusHandlerDirective) focusHandlerDirective: DropdownFocusHandlerDirective;

    public items: ActionItem<unknown, unknown>[] = [
        {
            textKey: 'Action 1',
            isTranslatable: false,
        },
        {
            textKey: 'Action 2',
            isTranslatable: false,
        },
        {
            textKey: 'Action 3',
            isTranslatable: false,
        },
        {
            textKey: 'Nested Action',
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

    public buttonContents = TextIcon;
}
