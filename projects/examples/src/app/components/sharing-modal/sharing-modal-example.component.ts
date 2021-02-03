/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Input, OnInit } from '@angular/core';
import { LazyString } from '@vcd/i18n';
import {
    ComponentRenderer,
    HasHref,
    SharingModalResult,
    SharingSelectAllToggle,
    SharingTab,
    VcdSharingModalError,
} from '@vcd/ui-components';
import { BehaviorSubject } from 'rxjs';

interface MyEntity {
    name: string;
    href: string;
}

@Component({
    selector: 'vcd-sharing-modal-example',
    templateUrl: './sharing-modal-example.component.html',
    styleUrls: ['./sharing-modal-example.component.scss'],
})
export class SharingModalExampleComponent implements OnInit {
    constructor() {}

    opened = false;

    title: LazyString = 'Sharing Modal Example';

    tabs: SharingTab<MyEntity>[] = [
        {
            id: 'user',
            title: 'Users',
            rightsOptions: [
                {
                    display: 'Read Only',
                    value: 'read_only',
                },
                {
                    display: 'Write Only',
                    value: 'write_only',
                },
                {
                    display: 'All Access',
                    value: 'all_access',
                },
            ],
            makeSearch: (criteria: string) =>
                Promise.resolve({
                    totalCount: 15,
                    items: [
                        {
                            name: 'Bob',
                            href: String(Math.random()),
                        },
                    ],
                }),
            entityRenderer: SharingModalRendererComponent,
            comboboxPlaceholder: new BehaviorSubject('Select users to share with'),
            selectAllText: new BehaviorSubject('Currently Sharing with All Users'),
        },
        {
            id: 'group',
            title: 'Groups',
            // customRenderer: (record) => `${record.name} ${record.id}`,
            rightsOptions: [
                {
                    display: 'Read Only',
                    value: 'read_only',
                },
                {
                    display: 'Write Only',
                    value: 'write_only',
                },
                {
                    display: 'All Access',
                    value: 'all_access',
                },
            ],
            makeSearch: (criteria: string) => {
                return Promise.reject(new VcdSharingModalError('Could not complete this search'));
            },
            comboboxPlaceholder: 'Select groups to share with',
            selectAllText: 'Currently Sharing with All Groups',
        },
        {
            id: 'org',
            title: 'Orgs',
            // customRenderer: (record) => `${record.name} ${record.id}`,
            rightsOptions: [
                {
                    display: 'Read Only',
                    value: 'read_only',
                },
                {
                    display: 'Write Only',
                    value: 'write_only',
                },
                {
                    display: 'All Access',
                    value: 'all_access',
                },
            ],
            makeSearch: (criteria: string) =>
                Promise.resolve({
                    totalCount: 15,
                    items: [
                        {
                            name: 'Bob',
                            href: String(Math.random()),
                        },
                    ],
                }),
            comboboxPlaceholder: 'Select organizations to share with',
            selectAllText: 'Currently Sharing with All Orgs',
        },
    ];

    checkboxes: SharingSelectAllToggle[] = [
        {
            description: 'Select All Users and Groups',
            tabIds: ['user', 'group'],
        },
        {
            description: 'Select All Orgs',
            tabIds: ['org'],
        },
    ];

    value: SharingModalResult = {
        user: {
            selectedItems: [
                {
                    name: 'Hannah',
                    href: 'hannah',
                    accessRight: {
                        display: 'Read Only',
                        value: 'read_only',
                    },
                },
                {
                    name: 'Ryan',
                    href: 'ryan',
                    accessRight: {
                        display: 'Owner',
                        value: 'owner',
                    },
                },
            ],
        },
        group: {
            selectedItems: [
                {
                    name: 'Hannah',
                    href: 'hannah',
                    accessRight: {
                        display: 'Read Only',
                        value: 'read_only',
                    },
                },
            ],
        },
        org: {
            selectAllRights: 'read_only',
        },
    };

    ngOnInit(): void {}

    log(event): void {
        console.log(event);
    }
}

@Component({
    selector: 'vcd-datagrid-detail-pane-sub-example',
    template: ` {{ config.name }} ({{ config.href }}) `,
})
export class SharingModalRendererComponent implements ComponentRenderer<HasHref<MyEntity>> {
    @Input() config: HasHref<MyEntity>;
}
