/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockTranslationService, TranslationService } from '@vcd/i18n';
import { AngularWidgetObjectFinder, BaseWidgetObject, ClrDatagridWidgetObject, TestElement } from '../utils';
import { timeout } from '../utils/test/test-utils';
import { SharingTab } from './tabs/sharing-modal-tab.component';
import { SharingModalResult, SharingSelectAllToggle } from './sharing-modal.component';
import { VcdSharingModalModule } from './sharing-modal.module';
import { SharingModalTabComponent, VcdSharingModalError } from './tabs/sharing-modal-tab.component';

interface HasVcdSharingModal {
    finder: AngularWidgetObjectFinder<TestHostComponent>;
    widget: VcdDropdownWidgetObject<TestElement>;
}

class VcdDropdownWidgetObject<T> extends BaseWidgetObject<T> {
    static tagName = `vcd-sharing-modal`;

    getComboboxInput = this.factory.css('clr-combobox input');

    openComboboxButton = this.factory.css('clr-combobox .clr-combobox-trigger');

    getModalHeader = this.factory.css('.modal-title');

    getModalBody = this.factory.css('.modal-body');

    getTabHeaders = this.factory.css('.nav-item');

    getSubmitButton = this.factory.css('.submit');

    getAddButton = this.factory.css('.add');

    getActiveTab = this.factory.css('vcd-sharing-modal-tab');

    getSelectAllBox = this.factory.css('.rectangle');

    getErrorLabel = this.factory.css('.search-error');

    getSearchWarning = this.factory.css('.search-warning');

    getSelectToogleByText = (text: string) =>
        this.el.get({ cssSelector: 'label', text }).parents('div').get('clr-checkbox-wrapper input');

    getRightsOptionsByText = (text: string) => this.el.get({ cssSelector: 'label', text }).parents('div').get('option');

    getComboboxDropdownRows = () => this.el.parents('body').get('clr-option');

    getTabByHeader = (title: string) => this.el.get({ cssSelector: '.nav-item button', text: title });

    getCurrentShareDatagrid = () => this.el.findWidget<ClrDatagridWidgetObject<T>>(ClrDatagridWidgetObject);

    getDeleteButtonInDatagridCell = (row: number) => {
        return this.el
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.widget = this.finder.find(VcdDropdownWidgetObject);
    });

    describe('@Input() isOpened', () => {
        it('closes the sharing modal when set to close', function (this: HasVcdSharingModal): void {
            expect(this.widget.getModalBody().unwrap().length()).toEqual(1);
            this.finder.hostComponent.opened = false;
            this.finder.detectChanges();
            expect(this.widget.getModalBody().unwrap().length()).toEqual(0);
        });
    });

    describe('@Input() title', () => {
        it('sets the title of the modal', function (this: HasVcdSharingModal): void {
            this.finder.hostComponent.title = 'This is a title';
            this.finder.detectChanges();
            expect(this.widget.getModalHeader().unwrap().text()).toEqual('This is a title');
        });
    });

    describe('@Input() tabs', () => {
        it('creates one tab per config item', function (this: HasVcdSharingModal): void {
            this.finder.hostComponent.tabs = [
                {
                    id: 'user',
                    title: 'Users',
                    rightsOptions: [
                        {
                            display: 'read',
                            value: 'read',
                        },
                    ],
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
                    rightsOptions: [
                        {
                            display: 'read',
                            value: 'read',
                        },
                    ],
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
                    .unwrap()
                    .toArray()
                    .map((el) => el.text())
            ).toEqual(['Users', 'Groups']);
        });

        it('shows currently shared with in the tab', async function (this: HasVcdSharingModal): Promise<void> {
            this.finder.hostComponent.tabs = [
                {
                    id: 'user',
                    title: 'Users',
                    rightsOptions: [
                        {
                            display: 'read',
                            value: 'read',
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
            this.finder.hostComponent.formValue = {
                user: {
                    selectedItems: [
                        {
                            name: 'ryan',
                            id: 'ryan',
                            accessRight: {
                                display: 'read',
                                value: 'read',
                            },
                        },
                    ],
                },
            };
            this.finder.detectChanges();
            this.widget.getTabByHeader('Users').click();
            await timeout(0);
            this.finder.detectChanges();
            expect(this.widget.getCurrentShareDatagrid().getRows().unwrap().length()).toEqual(1);
            expect(this.widget.getCurrentShareDatagrid().getCell(0, 1).unwrap().text()).toEqual('ryan');
        });

        it('allows the user to search for entities', async function (this: HasVcdSharingModal): Promise<void> {
            this.finder.hostComponent.tabs = [
                {
                    id: 'user',
                    title: 'Users',
                    rightsOptions: [
                        {
                            display: 'read',
                            value: 'read',
                        },
                    ],
                    makeSearch: (criteria: string) =>
                        Promise.resolve({
                            totalCount: 1,
                            items: [
                                {
                                    name: 'ryan',
                                    id: 'ryan',
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
            await timeout(401);
            this.finder.detectChanges();
            expect(
                this.widget
                    .getComboboxDropdownRows()
                    .unwrap()
                    .toArray()
                    .map((el) => el.text())
            ).toEqual(['ryan']);
            this.widget.openComboboxButton().click();
        });

        it('displays an error if thrown while searching', async function (this: HasVcdSharingModal): Promise<void> {
            this.finder.hostComponent.tabs = [
                {
                    id: 'user',
                    title: 'Users',
                    rightsOptions: [
                        {
                            display: 'read',
                            value: 'read',
                        },
                    ],
                    makeSearch: (criteria: string) => Promise.reject(new VcdSharingModalError('BAD')),
                    selectAllText: 'All users selected',
                },
            ];
            this.finder.detectChanges();
            this.widget.getTabByHeader('Users').click();
            await timeout(0);
            this.widget.openComboboxButton().click();
            await timeout(401);
            this.finder.detectChanges();
            expect(this.widget.getErrorLabel().unwrap().text()).toEqual('BAD');
            this.widget.openComboboxButton().click();
        });

        it('shows a warning at the bottom about missing results', async function (this: HasVcdSharingModal): Promise<void> {
            this.finder.hostComponent.tabs = [
                {
                    id: 'user',
                    title: 'Users',
                    rightsOptions: [
                        {
                            display: 'read',
                            value: 'read',
                        },
                    ],
                    makeSearch: (criteria: string) =>
                        Promise.resolve({
                            totalCount: 15,
                            items: [
                                {
                                    name: 'ryan',
                                    id: 'ryan',
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
            await timeout(401);
            this.finder.detectChanges();
            expect(this.widget.getSearchWarning().unwrap().text()).toEqual(
                new MockTranslationService().translate('vcd.cc.sharing-results-warning', [1, 15])
            );
            this.widget.openComboboxButton().click();
        });
    });

    describe('@Input() selectAllCheckboxes', () => {
        it('disables a tab when select all is checked', function (this: HasVcdSharingModal): void {
            this.finder.hostComponent.tabs = [
                {
                    id: 'user',
                    title: 'Users',
                    rightsOptions: [
                        {
                            display: 'read',
                            value: 'read',
                        },
                    ],
                    makeSearch: (criteria: string) =>
                        Promise.resolve({
                            totalCount: 1,
                            items: [
                                {
                                    name: 'ryan',
                                    id: 'ryan',
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
                    rightsOptions: [
                        {
                            display: 'read',
                            value: 'read',
                        },
                    ],
                    makeSearch: (criteria: string) =>
                        Promise.resolve({
                            totalCount: 1,
                            items: [
                                {
                                    name: 'ryan',
                                    id: 'ryan',
                                },
                            ],
                        }),
                    selectAllText: 'All users selected',
                },
                {
                    id: 'user2',
                    title: 'Users',
                    rightsOptions: [
                        {
                            display: 'read',
                            value: 'read',
                        },
                        {
                            display: 'write',
                            value: 'write',
                        },
                    ],
                    makeSearch: (criteria: string) =>
                        Promise.resolve({
                            totalCount: 1,
                            items: [
                                {
                                    name: 'ryan',
                                    id: 'ryan',
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
                    .unwrap()
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
                    rightsOptions: [
                        {
                            display: 'read',
                            value: 'read',
                        },
                    ],
                    makeSearch: (criteria: string) =>
                        Promise.resolve({
                            totalCount: 1,
                            items: [
                                {
                                    name: 'ryan',
                                    id: 'ryan',
                                },
                            ],
                        }),
                    selectAllText: 'All users selected',
                },
                {
                    id: 'user2',
                    title: 'Users',
                    rightsOptions: [
                        {
                            display: 'read',
                            value: 'read',
                        },
                        {
                            display: 'write',
                            value: 'write',
                        },
                    ],
                    makeSearch: (criteria: string) =>
                        Promise.resolve({
                            totalCount: 1,
                            items: [
                                {
                                    name: 'ryan',
                                    id: 'ryan',
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
            expect(spy.calls.mostRecent().args[0]).toEqual({
                user: { selectAllRights: 'read', selectedItems: undefined },
                user2: { selectAllRights: 'read', selectedItems: undefined },
            });
        });

        it('can add users with the combobox', async function (this: HasVcdSharingModal): Promise<void> {
            this.finder.hostComponent.tabs = [
                {
                    id: 'user',
                    title: 'Users',
                    rightsOptions: [
                        {
                            display: 'read',
                            value: 'read',
                        },
                    ],
                    makeSearch: (criteria: string) =>
                        Promise.resolve({
                            totalCount: 1,
                            items: [
                                {
                                    name: 'ryan',
                                    id: 'ryan',
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
            await timeout(401);
            this.finder.detectChanges();
            this.widget.getComboboxDropdownRows().unwrap().toArray()[0].click();
            await timeout(0);
            this.finder.detectChanges();
            this.widget.getAddButton().click();
            const spy = spyOn(this.finder.hostComponent, 'output');
            this.widget.openComboboxButton().click();
            this.widget.getSubmitButton().click();
            await timeout(0);
            expect(spy.calls.mostRecent().args[0]).toEqual({
                user: {
                    selectedItems: [
                        {
                            name: 'ryan',
                            id: 'ryan',
                            accessRight: {
                                display: 'read',
                                value: 'read',
                            },
                        },
                    ],
                },
            });
        });

        it('can remove users from the datagrid', async function (this: HasVcdSharingModal): Promise<void> {
            this.finder.hostComponent.tabs = [
                {
                    id: 'user',
                    title: 'Users',
                    rightsOptions: [
                        {
                            display: 'read',
                            value: 'read',
                        },
                        {
                            display: 'write',
                            value: 'write',
                        },
                    ],
                    makeSearch: (criteria: string) =>
                        Promise.resolve({
                            totalCount: 1,
                            items: [
                                {
                                    name: 'ryan',
                                    id: 'ryan',
                                },
                            ],
                        }),
                    selectAllText: 'All users selected',
                },
            ];
            this.finder.hostComponent.formValue = {
                user: {
                    selectedItems: [
                        {
                            name: 'ryan',
                            id: 'ryan',
                            accessRight: {
                                display: 'read',
                                value: 'read',
                            },
                        },
                    ],
                },
            };
            this.finder.detectChanges();
            this.widget.getTabByHeader('Users').click();
            await timeout(0);
            this.finder.detectChanges();
            this.widget.getDeleteButtonInDatagridCell(0).click();
            this.finder.detectChanges();
            const spy = spyOn(this.finder.hostComponent, 'output');
            this.widget.getSubmitButton().click();
            await timeout(0);
            expect(spy.calls.mostRecent().args[0]).toEqual({ user: { selectedItems: [] } });
        });

        it('can change users rights from the datagrid', async function (this: HasVcdSharingModal): Promise<void> {
            this.finder.hostComponent.tabs = [
                {
                    id: 'user',
                    title: 'Users',
                    rightsOptions: [
                        {
                            display: 'read',
                            value: 'read',
                        },
                        {
                            display: 'write',
                            value: 'write',
                        },
                    ],
                    makeSearch: (criteria: string) =>
                        Promise.resolve({
                            totalCount: 1,
                            items: [
                                {
                                    name: 'ryan',
                                    id: 'ryan',
                                },
                            ],
                        }),
                    selectAllText: 'All users selected',
                },
            ];
            this.finder.hostComponent.formValue = {
                user: {
                    selectedItems: [
                        {
                            name: 'ryan',
                            id: 'ryan',
                            accessRight: {
                                display: 'read',
                                value: 'read',
                            },
                        },
                    ],
                },
            };
            this.finder.detectChanges();
            this.widget.getTabByHeader('Users').click();
            await timeout(0);
            this.finder.detectChanges();
            (
                this.widget.getActiveTab().unwrap().getComponentInstance() as SharingModalTabComponent<any>
            ).updateEntityRights(
                {
                    name: 'ryan',
                    id: 'ryan',
                    accessRight: {
                        display: 'read',
                        value: 'read',
                    },
                },
                'write'
            );
            this.finder.detectChanges();
            const spy = spyOn(this.finder.hostComponent, 'output');
            this.widget.getSubmitButton().click();
            await timeout(0);
            expect(spy.calls.mostRecent().args[0]).toEqual({
                user: {
                    selectedItems: [
                        {
                            name: 'ryan',
                            id: 'ryan',
                            accessRight: {
                                display: 'write',
                                value: 'write',
                            },
                        },
                    ],
                },
            });
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
        [formValue]="formValue"
        (formValueChange)="output($event)"
    ></vcd-sharing-modal>`,
})
export class TestHostComponent {
    opened = true;

    title: string;

    tabs: SharingTab<any>[] = [];

    checkboxes: SharingSelectAllToggle[];

    formValue: SharingModalResult = {};

    output(event: SharingModalResult): void {
        // Do nothing
    }
}
