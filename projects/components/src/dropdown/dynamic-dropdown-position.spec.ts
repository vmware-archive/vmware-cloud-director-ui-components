/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ElementRef, Query, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClarityModule, ClrDropdown } from '@clr/angular';
import { DynamicDropdownPositionDirective, NO_SCROLLING_CLASSNAME } from './dynamic-dropdown-position.directive';

enum Dropdowns {
    DEFAULT = 'defaultDropdown',
    RIGHT_CLIPPED = 'rightClippedDropdown',
    BOTTOM_CLIPPED = 'bottomClippedDropdown',
}

interface HasFixtureAndDropdownHelper {
    fixture: ComponentFixture<TestHostComponent>;
    helper: TestHostComponent;
}

describe('DynamicDropdownPositionDirective', () => {
    beforeEach(async function (this: HasFixtureAndDropdownHelper): Promise<void> {
        await TestBed.configureTestingModule({
            imports: [ClarityModule],
            declarations: [DynamicDropdownPositionDirective, TestHostComponent],
        }).compileComponents();
        this.fixture = TestBed.createComponent(TestHostComponent);
        this.fixture.detectChanges();
        this.helper = this.fixture.componentInstance;
    });

    it('opens the dropdown towards bottom by default when there is enough space', function (this: HasFixtureAndDropdownHelper): void {
        this.helper.openDropdown(Dropdowns.DEFAULT);
        this.fixture.detectChanges();
        expect(this.helper.isDropdownGoingToBeClippedAtBottom(Dropdowns.DEFAULT)).toBe(false);
        expect(this.helper.isDropdownOpenAtBottom(Dropdowns.DEFAULT)).toBe(true);
    });

    it(
        'shifts the dropdown position to top of the dropdown trigger when it is going to get clipped at the ' +
            'bottom',
        function (this: HasFixtureAndDropdownHelper): void {
            this.helper.openDropdown(Dropdowns.BOTTOM_CLIPPED);
            this.fixture.detectChanges();
            expect(this.helper.isDropdownGoingToBeClippedAtBottom(Dropdowns.BOTTOM_CLIPPED)).toBe(true);
            expect(this.helper.isDropdownOpenAtBottom(Dropdowns.BOTTOM_CLIPPED)).toBe(false);
            expect(this.helper.isDropdownOpenOnTop(Dropdowns.BOTTOM_CLIPPED)).toBe(true);
        }
    );

    it(
        'shifts the dropdown position towards the left when it is going to get clipped on the' + ' right side',
        function (this: HasFixtureAndDropdownHelper): void {
            this.helper.openDropdown(Dropdowns.RIGHT_CLIPPED);
            this.fixture.detectChanges();
            expect(this.helper.isDropdownGoingToBeClippedOnRight(Dropdowns.RIGHT_CLIPPED)).toBe(true);
            expect(this.helper.isDropdownOpenToLeft(Dropdowns.RIGHT_CLIPPED)).toBe(true);
        }
    );

    it('does not shift when inside modals', function (this: HasFixtureAndDropdownHelper): void {
        spyOn(document.body.classList, 'contains').withArgs(NO_SCROLLING_CLASSNAME).and.returnValue(true);
        spyOnProperty(window, 'innerHeight').and.returnValue(1024); // necessary to keep test results consistent across headed and headless runs

        this.helper.openDropdown(Dropdowns.DEFAULT);
        this.fixture.detectChanges();
        expect(this.helper.isDropdownPositionShifted(Dropdowns.DEFAULT)).toBe(false);

        this.helper.openDropdown(Dropdowns.BOTTOM_CLIPPED);
        this.fixture.detectChanges();
        expect(this.helper.isDropdownPositionShifted(Dropdowns.BOTTOM_CLIPPED)).toBe(false);

        this.helper.openDropdown(Dropdowns.RIGHT_CLIPPED);
        this.fixture.detectChanges();
        expect(this.helper.isDropdownPositionShifted(Dropdowns.RIGHT_CLIPPED)).toBe(false);
    });
});

@Component({
    template: `
        <div #dropdownContainer class="content-area">
            <div>
                <clr-dropdown vcdDynamicDropdown #defaultDropdown>
                    <button class="btn btn-link first-dropdown-toggle" clrDropdownTrigger>Dropdown 1</button>
                    <clr-dropdown-menu *clrIfOpen #defaultDropdownMenu>
                        <button type="button" clrDropdownItem>Action 1</button>
                        <button type="button" clrDropdownItem>Action 2</button>
                        <button type="button" clrDropdownItem>Link 1</button>
                        <button type="button" clrDropdownItem>Link 2</button>
                    </clr-dropdown-menu>
                </clr-dropdown>
            </div>

            <div class="top-right">
                <clr-dropdown vcdDynamicDropdown #rightClippedDropdown>
                    <button class="btn btn-link first-dropdown-toggle" clrDropdownTrigger>Dropdown 2</button>
                    <clr-dropdown-menu [clrPosition]="'top-right'" *clrIfOpen #rightClippedDropdownMenu>
                        <button type="button" clrDropdownItem>Action 1</button>
                        <button type="button" clrDropdownItem>Action 2</button>
                        <button type="button" clrDropdownItem>Link 1</button>
                        <button type="button" clrDropdownItem>Link 2</button>
                    </clr-dropdown-menu>
                </clr-dropdown>
            </div>

            <div class="bottom-left">
                <clr-dropdown vcdDynamicDropdown #bottomClippedDropdown>
                    <button class="btn btn-link first-dropdown-toggle" clrDropdownTrigger>Dropdown 3</button>
                    <clr-dropdown-menu *clrIfOpen #bottomClippedDropdownMenu>
                        <button type="button" clrDropdownItem>Action 1</button>
                        <button type="button" clrDropdownItem>Action 2</button>
                        <button type="button" clrDropdownItem>Link 1</button>
                        <button type="button" clrDropdownItem>Link 2</button>
                    </clr-dropdown-menu>
                </clr-dropdown>
            </div>
        </div>
    `,
    styles: [
        `
            .content-area {
                border: 2px solid black;
                height: 420px;
                width: 420px;
                position: relative;
            }

            .top-right {
                position: relative;
                left: 300px;
                top: 0;
            }

            .bottom-left {
                position: relative;
                left: 0;
                top: 300px;
            }
        `,
    ],
})
class TestHostComponent {
    @ViewChild('defaultDropdown') defaultDropdown: ClrDropdown;
    @ViewChild('defaultDropdown', { read: DynamicDropdownPositionDirective })
    defaultDirective: DynamicDropdownPositionDirective;
    @ViewChild('defaultDropdownMenu', { read: ElementRef }) defaultDropdownElementRef: ElementRef;

    @ViewChild('rightClippedDropdown') rightClippedDropdown: ClrDropdown;
    @ViewChild('rightClippedDropdown', { read: DynamicDropdownPositionDirective })
    rightClippedDirective: DynamicDropdownPositionDirective;
    @ViewChild('rightClippedDropdownMenu', { read: ElementRef }) rightClippedDropdownElementRef: ElementRef;

    @ViewChild('bottomClippedDropdown') bottomClippedDropdown: ClrDropdown;
    @ViewChild('bottomClippedDropdown', { read: DynamicDropdownPositionDirective })
    bottomClippedDirective: DynamicDropdownPositionDirective;
    @ViewChild('bottomClippedDropdownMenu', { read: ElementRef }) bottomClippedDropdownElementRef: ElementRef;

    @ViewChild('dropdownContainer') dropdownContainer: ElementRef;

    openDropdown(dropdown: Dropdowns): void {
        switch (dropdown) {
            case Dropdowns.DEFAULT:
                this.defaultDropdown.toggleService.open = true;
                break;
            case Dropdowns.BOTTOM_CLIPPED:
                this.bottomClippedDropdown.toggleService.open = true;
                break;
            case Dropdowns.RIGHT_CLIPPED:
                this.rightClippedDropdown.toggleService.open = true;
                break;
        }
    }

    getDropdownPosition(dropdown: Dropdowns): { top: number; right: number; bottom: number; left: number } {
        const directives = {
            [Dropdowns.DEFAULT]: this.defaultDirective,
            [Dropdowns.BOTTOM_CLIPPED]: this.bottomClippedDirective,
            [Dropdowns.RIGHT_CLIPPED]: this.rightClippedDirective,
        };
        const directive = directives[dropdown] as DynamicDropdownPositionDirective;
        const { top, right, bottom, left } = (directive as any).dropdownMenuElement.getBoundingClientRect();
        return { top, right, left, bottom };
    }

    get containerPosition(): { top: number; right: number; bottom: number; left: number } {
        const { top, right, bottom, left } = this.dropdownContainer.nativeElement.getBoundingClientRect();
        return { top, right, left, bottom };
    }

    getDropdownTriggerPosition(dropdown: Dropdowns): { top: number; right: number; bottom: number; left: number } {
        const directives = {
            [Dropdowns.DEFAULT]: this.defaultDirective,
            [Dropdowns.BOTTOM_CLIPPED]: this.bottomClippedDirective,
            [Dropdowns.RIGHT_CLIPPED]: this.rightClippedDirective,
        };
        const directive = directives[dropdown];
        const { top, right, bottom, left } = (directive as any).dropdownTriggerElement.getBoundingClientRect();
        return { top, right, left, bottom };
    }

    isDropdownGoingToBeClippedAtBottom(dropdown: Dropdowns): boolean {
        const dropdownPosition = this.getDropdownPosition(dropdown);
        const dropdownHeight = dropdownPosition.bottom - dropdownPosition.top;
        const dropdownTriggerPosition = this.getDropdownTriggerPosition(dropdown);
        const availableSpace = this.containerPosition.bottom - dropdownTriggerPosition.bottom;
        return availableSpace < dropdownHeight;
    }

    isDropdownGoingToBeClippedOnRight(dropdown: Dropdowns): boolean {
        const dropdownPosition = this.getDropdownPosition(dropdown);
        const dropdownWidth = dropdownPosition.right - dropdownPosition.left;
        const dropdownTriggerPosition = this.getDropdownTriggerPosition(dropdown);
        const availableWidth = this.containerPosition.right - dropdownTriggerPosition.right;
        return availableWidth < dropdownWidth;
    }

    isDropdownOpenToLeft(dropdown: Dropdowns): boolean {
        const dropdownTriggerPosition = this.getDropdownTriggerPosition(dropdown);
        const dropdownPosition = this.getDropdownPosition(dropdown);
        return dropdownTriggerPosition.left > dropdownPosition.left;
    }

    isDropdownOpenAtBottom(dropdown: Dropdowns): boolean {
        const dropdownTriggerPosition = this.getDropdownTriggerPosition(dropdown);
        const dropdownPosition = this.getDropdownPosition(dropdown);
        return dropdownTriggerPosition.bottom < dropdownPosition.top;
    }

    isDropdownOpenOnTop(dropdown: Dropdowns): boolean {
        const dropdownTriggerPosition = this.getDropdownTriggerPosition(dropdown);
        const dropdownPosition = this.getDropdownPosition(dropdown);
        return dropdownTriggerPosition.top > dropdownPosition.top;
    }

    isDropdownPositionShifted(dropdown: Dropdowns) {
        const elementRefs = {
            [Dropdowns.DEFAULT]: this.defaultDropdownElementRef,
            [Dropdowns.BOTTOM_CLIPPED]: this.bottomClippedDropdownElementRef,
            [Dropdowns.RIGHT_CLIPPED]: this.rightClippedDropdownElementRef,
        };
        const { nativeElement } = elementRefs[dropdown];
        const computedStyleMap = nativeElement.computedStyleMap();
        const isTopShifted = computedStyleMap.get('top').value > 0;
        const isLeftShifted = computedStyleMap.get('left').value > 0;
        return isTopShifted || isLeftShifted;
    }
}
