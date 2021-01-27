/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockTranslationService, TranslationService } from '@vcd/i18n';
import { SharingTab } from '.';
import { AngularWidgetObjectFinder, BaseWidgetObject, ClrDatagridWidgetObject, TestElement } from '../utils';
import { timeout } from '../utils/test/test-utils';
import { SharingModalResult, SharingSelectAllToggle } from './sharing-modal.component';
import { VcdSharingModalModule } from './sharing-modal.module';
import { SharingModalTabComponent } from './tabs/sharing-modal-tab.component';

interface HasVcdSharingModal {
    finder: AngularWidgetObjectFinder<TestHostComponent>;
    widget: VcdDropdownWidgetObject<TestElement>;
}

class VcdDropdownWidgetObject<T> extends BaseWidgetObject<T> {
    static tagName = `vcd-sharing-modal`;

    getComboboxInput = this.locatorForCssSelectors('clr-combobox input');

    openComboboxButton = this.locatorForCssSelectors('clr-combobox .clr-combobox-trigger');

    getModalHeader = this.locatorForCssSelectors('.modal-title');

    getModalBody = this.locatorForCssSelectors('.modal-body');

    getTabHeaders = this.locatorForCssSelectors('.nav-item');

    getSubmitButton = this.locatorForCssSelectors('.submit');

    getAddButton = this.locatorForCssSelectors('.add-btn');

    getActiveTab = this.locatorForCssSelectors('vcd-sharing-modal-tab');

    getSelectAllBox = this.locatorForCssSelectors('.rectangle');

    getSelectToogleByText = (text: string) =>
        this.locatorDriver.getByText('label', text).parents('div').get('clr-checkbox-wrapper input').unwrap();

    getRightsOptionsByText = (text: string) =>
        this.locatorDriver.getByText('label', text).parents('div').get('option').unwrap();

    getComboboxDropdownRows = () => this.locatorDriver.parents('body').get('clr-option').unwrap();

    getTabByHeader = (title: string) => this.locatorDriver.getByText('.nav-item button', title).unwrap();

    getCurrentShareDatagrid = () => this.locatorDriver.findWidget(ClrDatagridWidgetObject);

    getDeleteButtonInDatagridCell = (row: number) => {
        return this.locatorDriver
            .get(`clr-dg-row:nth-of-type(${row + 1})`)
            .get(`clr-dg-cell:nth-of-type(1)`)
            .get('button')
            .unwrap();
    };
}

describe('SharingModalComponent', () => {
    beforeEach(async function (this: HasVcdSharingModal): Promise<void> {
        await TestBed.configureTestingModule({
            imports: [VcdSharingModalModule, BrowserAnimationsModule],
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
        // @ts-ignore
        this.widget = this.finder.find(VcdDropdownWidgetObject);
    });

    describe('@Input() isOpened', () => {
        it('closes the sharing modal when set to close', function (this: HasVcdSharingModal): void {
            expect(this.widget.getModalBody().length()).toEqual(1);
            this.finder.hostComponent.opened = false;
            this.finder.detectChanges();
            expect(this.widget.getModalBody().length()).toEqual(0);
        });
    });

    describe('@Input() title', () => {
        it('sets the title of the modal', function (this: HasVcdSharingModal): void {
            this.finder.hostComponent.title = 'This is a title';
            this.finder.detectChanges();
            expect(this.widget.getModalHeader().text()).toEqual('This is a title');
        });
    });

    describe('@Input() tabs', () => {
        it('creates one tab per config item', function (this: HasVcdSharingModal): void {
            this.finder.hostComponent.tabs = [
                {
                    id: 'user',
                    title: 'Users',
                    rightsOptions: ['read'],
                    currentlySharedWith: [],
                    makeSearch: (criteria: string) =>
                        Promise.resolve({
                            totalCount: 1,
                            items: [],
                        }),
                    selectAllText: 'All users selected',
                },
                {
                    id: 'groups',
                    title: 'Groups',
                    rightsOptions: ['read'],
                    currentlySharedWith: [],
                    makeSearch: (criteria: string) =>
                        Promise.resolve({
                            totalCount: 1,
                            items: [],
                        }),
                    selectAllText: 'All groups selected',
                },
            ];
            this.finder.detectChanges();
            expect(
                this.widget
                    .getTabHeaders()
                    .toArray()
                    .map((el) => el.text())
            ).toEqual(['Users', 'Groups']);
        });

        it('shows currently shared with in the tab', function (this: HasVcdSharingModal): void {
            this.finder.hostComponent.tabs = [
                {
                    id: 'user',
                    title: 'Users',
                    rightsOptions: ['read'],
                    currentlySharedWith: [
                        {
                            name: 'ryan',
                            href: 'ryan',
                            accessRight: 'read',
                        },
                    ],
                    makeSearch: (criteria: string) =>
                        Promise.resolve({
                            totalCount: 1,
                            items: [],
                        }),
                    selectAllText: 'All users selected',
                },
            ];
            this.finder.detectChanges();
            this.widget.getTabByHeader('Users').click();
            expect(this.widget.getCurrentShareDatagrid().getRows().length()).toEqual(1);
            expect(this.widget.getCurrentShareDatagrid().getCell(0, 1).text()).toEqual('ryan');
        });

        it('allows the user to search for entities', async function (this: HasVcdSharingModal): Promise<void> {
            this.finder.hostComponent.tabs = [
                {
                    id: 'user',
                    title: 'Users',
                    rightsOptions: ['read'],
                    currentlySharedWith: [],
                    makeSearch: (criteria: string) =>
                        Promise.resolve({
                            totalCount: 1,
                            items: [
                                {
                                    name: 'ryan',
                                    href: 'ryan',
                                },
                            ],
                        }),
                    selectAllText: 'All users selected',
                },
            ];
            this.finder.detectChanges();
            this.widget.getTabByHeader('Users').click();
            await timeout(0);
            this.widget.openComboboxButton().click();
            await timeout(0);
            this.finder.detectChanges();
            expect(
                this.widget
                    .getComboboxDropdownRows()
                    .toArray()
                    .map((el) => el.text())
            ).toEqual(['ryan']);
            this.widget.openComboboxButton().click();
        });
    });

    describe('@Input() selectAllCheckboxes', () => {
        it('disables a tab when select all is checked', function (this: HasVcdSharingModal): void {
            this.finder.hostComponent.tabs = [
                {
                    id: 'user',
                    title: 'Users',
                    rightsOptions: ['read'],
                    currentlySharedWith: [],
                    makeSearch: (criteria: string) =>
                        Promise.resolve({
                            totalCount: 1,
                            items: [
                                {
                                    name: 'ryan',
                                    href: 'ryan',
                                },
                            ],
                        }),
                    selectAllText: 'All users selected',
                },
            ];
            this.finder.hostComponent.checkboxes = [
                {
                    tabIds: ['user'],
                    description: 'Select all users',
                },
            ];
            this.finder.detectChanges();
            this.widget.getSelectToogleByText('Select all users').click();
            this.widget.getTabByHeader('Users').click();
            expect(this.widget.getSelectAllBox()).toBeDefined();
        });

        it('fins the smallest subset of rights', function (this: HasVcdSharingModal): void {
            this.finder.hostComponent.tabs = [
                {
                    id: 'user',
                    title: 'Users',
                    rightsOptions: ['read'],
                    currentlySharedWith: [],
                    makeSearch: (criteria: string) =>
                        Promise.resolve({
                            totalCount: 1,
                            items: [
                                {
                                    name: 'ryan',
                                    href: 'ryan',
                                },
                            ],
                        }),
                    selectAllText: 'All users selected',
                },
                {
                    id: 'user2',
                    title: 'Users',
                    rightsOptions: ['read', 'write'],
                    currentlySharedWith: [],
                    makeSearch: (criteria: string) =>
                        Promise.resolve({
                            totalCount: 1,
                            items: [
                                {
                                    name: 'ryan',
                                    href: 'ryan',
                                },
                            ],
                        }),
                    selectAllText: 'All users selected',
                },
            ];
            this.finder.hostComponent.checkboxes = [
                {
                    tabIds: ['user2', 'user'],
                    description: 'Select all users',
                },
            ];
            this.finder.detectChanges();
            this.widget.getSelectToogleByText('Select all users').click();
            expect(
                this.widget
                    .getRightsOptionsByText('Select all users')
                    .toArray()
                    .map((el) => el.text())
            ).toEqual(['read']);
        });
    });

    describe('@Output() formSubmitted', () => {
        it('can select all for some tabs', async function (this: HasVcdSharingModal): Promise<void> {
            this.finder.hostComponent.tabs = [
                {
                    id: 'user',
                    title: 'Users',
                    rightsOptions: ['read'],
                    currentlySharedWith: [],
                    makeSearch: (criteria: string) =>
                        Promise.resolve({
                            totalCount: 1,
                            items: [
                                {
                                    name: 'ryan',
                                    href: 'ryan',
                                },
                            ],
                        }),
                    selectAllText: 'All users selected',
                },
                {
                    id: 'user2',
                    title: 'Users',
                    rightsOptions: ['read', 'write'],
                    currentlySharedWith: [],
                    makeSearch: (criteria: string) =>
                        Promise.resolve({
                            totalCount: 1,
                            items: [
                                {
                                    name: 'ryan',
                                    href: 'ryan',
                                },
                            ],
                        }),
                    selectAllText: 'All users selected',
                },
            ];
            this.finder.hostComponent.checkboxes = [
                {
                    tabIds: ['user2', 'user'],
                    description: 'Select all users',
                },
            ];
            this.finder.detectChanges();
            this.widget.getSelectToogleByText('Select all users').click();
            const spy = spyOn(this.finder.hostComponent, 'output');
            this.widget.getSubmitButton().click();
            await timeout(0);
            expect(spy.calls.mostRecent().args[0]).toEqual(
                new Map([
                    ['user', { selectAllRights: 'read' }],
                    ['user2', { selectAllRights: 'read' }],
                ])
            );
        });

        it('can add users with the combobox', async function (this: HasVcdSharingModal): Promise<void> {
            this.finder.hostComponent.tabs = [
                {
                    id: 'user',
                    title: 'Users',
                    rightsOptions: ['read'],
                    currentlySharedWith: [],
                    makeSearch: (criteria: string) =>
                        Promise.resolve({
                            totalCount: 1,
                            items: [
                                {
                                    name: 'ryan',
                                    href: 'ryan',
                                },
                            ],
                        }),
                    selectAllText: 'All users selected',
                },
            ];
            this.finder.detectChanges();
            this.widget.getTabByHeader('Users').click();
            await timeout(0);
            this.widget.openComboboxButton().click();
            await timeout(0);
            this.finder.detectChanges();
            this.widget.getComboboxDropdownRows().toArray()[0].click();
            await timeout(0);
            this.finder.detectChanges();
            this.widget.getAddButton().click();
            const spy = spyOn(this.finder.hostComponent, 'output');
            this.widget.openComboboxButton().click();
            this.widget.getSubmitButton().click();
            await timeout(0);
            expect(spy.calls.mostRecent().args[0]).toEqual(
                new Map([['user', { selectedItems: [{ name: 'ryan', href: 'ryan', accessRight: 'read' }] }]])
            );
        });

        it('can remove users from the datagrid', async function (this: HasVcdSharingModal): Promise<void> {
            this.finder.hostComponent.tabs = [
                {
                    id: 'user',
                    title: 'Users',
                    rightsOptions: ['read', 'write'],
                    currentlySharedWith: [
                        {
                            name: 'ryan',
                            href: 'ryan',
                            accessRight: 'read',
                        },
                    ],
                    makeSearch: (criteria: string) =>
                        Promise.resolve({
                            totalCount: 1,
                            items: [
                                {
                                    name: 'ryan',
                                    href: 'ryan',
                                },
                            ],
                        }),
                    selectAllText: 'All users selected',
                },
            ];
            this.finder.detectChanges();
            this.widget.getTabByHeader('Users').click();
            await timeout(0);
            this.finder.detectChanges();
            this.widget.getDeleteButtonInDatagridCell(0).click();
            this.finder.detectChanges();
            const spy = spyOn(this.finder.hostComponent, 'output');
            this.widget.getSubmitButton().click();
            await timeout(0);
            expect(spy.calls.mostRecent().args[0]).toEqual(new Map([['user', { selectedItems: [] }]]));
        });

        it('can change users rights from the datagrid', async function (this: HasVcdSharingModal): Promise<void> {
            this.finder.hostComponent.tabs = [
                {
                    id: 'user',
                    title: 'Users',
                    rightsOptions: ['read', 'write'],
                    currentlySharedWith: [
                        {
                            name: 'ryan',
                            href: 'ryan',
                            accessRight: 'read',
                        },
                    ],
                    makeSearch: (criteria: string) =>
                        Promise.resolve({
                            totalCount: 1,
                            items: [
                                {
                                    name: 'ryan',
                                    href: 'ryan',
                                },
                            ],
                        }),
                    selectAllText: 'All users selected',
                },
            ];
            this.finder.detectChanges();
            this.widget.getTabByHeader('Users').click();
            await timeout(0);
            this.finder.detectChanges();
            (this.widget.getActiveTab().getComponentInstance() as SharingModalTabComponent).updateEntityRights(
                {
                    name: 'ryan',
                    href: 'ryan',
                    accessRight: 'read',
                },
                'write'
            );
            this.finder.detectChanges();
            const spy = spyOn(this.finder.hostComponent, 'output');
            this.widget.getSubmitButton().click();
            await timeout(0);
            expect(spy.calls.mostRecent().args[0]).toEqual(
                new Map([['user', { selectedItems: [{ name: 'ryan', href: 'ryan', accessRight: 'write' }] }]])
            );
        });
    });
});

@Component({
    selector: 'vcd-sharing-modal-test',
    template: ` <vcd-sharing-modal
        [title]="title"
        [tabs]="tabs"
        [selectAllToggles]="checkboxes"
        [isOpened]="opened"
        (formSubmitted)="output($event)"
    ></vcd-sharing-modal>`,
})
export class TestHostComponent {
    constructor() {}

    opened = true;

    title: string;

    tabs: SharingTab[];

    checkboxes: SharingSelectAllToggle[];

    output(event: SharingModalResult): void {}
}
