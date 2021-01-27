/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Input, OnInit } from '@angular/core';
import { LazyString } from '@vcd/i18n';
import { ComponentRenderer, Entity, SharingSelectAllToggle, SharingTab } from '@vcd/ui-components';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'vcd-sharing-modal-example',
    templateUrl: './sharing-modal-example.component.html',
    styleUrls: ['./sharing-modal-example.component.scss'],
})
export class SharingModalExampleComponent implements OnInit {
    constructor() {}

    opened = false;

    title: LazyString = 'Sharing Modal Example';

    tabs: SharingTab[] = [
        {
            id: 'user',
            title: 'Users',
            rightsOptions: ['Read Only', 'Write Access', 'All-Access'],
            currentlySharedWith: [
                {
                    name: 'Hannah',
                    href: 'hannah',
                    accessRight: 'Read Only',
                },
                {
                    name: 'Ryan',
                    href: 'ryan',
                    accessRight: 'Owner',
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
            id: 'groups',
            title: 'Groups',
            // customRenderer: (record) => `${record.name} ${record.id}`,
            rightsOptions: ['Read Only', 'Write Access', 'All-Access'],
            currentlySharedWith: [
                {
                    name: 'Hannah',
                    href: 'hannah',
                    accessRight: 'Read Only',
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
            comboboxPlaceholder: 'Select groups to share with',
            selectAllText: 'Currently Sharing with All Groups',
        },
        {
            id: 'org',
            title: 'Orgs',
            // customRenderer: (record) => `${record.name} ${record.id}`,
            rightsOptions: ['Read Only', 'Write Access', 'All-Access'],
            currentlySharedWith: [
                {
                    name: 'Hannah',
                    href: 'hannah',
                    accessRight: 'Read Only',
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
            tabIds: ['user', 'groups'],
        },
        {
            description: 'Select All Orgs',
            tabIds: ['org'],
        },
    ];

    ngOnInit(): void {}

    log(event): void {
        console.log(event);
    }
}

@Component({
    selector: 'vcd-datagrid-detail-pane-sub-example',
    template: ` {{ config.name }} ({{ config.href }}) `,
})
export class SharingModalRendererComponent implements ComponentRenderer<Entity> {
    @Input() config: Entity;
}
