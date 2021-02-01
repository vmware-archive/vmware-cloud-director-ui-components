/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Input } from '@angular/core';
import { ComponentRenderer, HasHref, PredefinedSharingTab, SearchResult } from '@vcd/ui-components';

interface MyEntity {
    name: string;
    href: string;
}

@Component({
    selector: 'vcd-users-groups-sharing-modal-example',
    templateUrl: './users-groups-orgs-sharing-modal.example.html',
    styleUrls: ['./users-groups-orgs-sharing-modal.example.scss'],
})
export class UsersGroupsOrgsSharingModalExampleComponent {
    constructor() {}

    opened = false;

    title = 'Sharing Modal Example';

    usersTab: PredefinedSharingTab<MyEntity> = {
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
        currentlySharedWith: [
            {
                name: 'Ryan',
                href: 'ryan',
                accessRight: {
                    display: 'Owner',
                    value: 'owner',
                },
            },
        ],
        entityRenderer: SharingModalRendererComponent,
        makeSearch(criteria: string): Promise<SearchResult<MyEntity>> {
            return Promise.resolve({
                items: [
                    {
                        name: 'Matt',
                        href: 'matt',
                    },
                    {
                        name: 'Hannah',
                        href: 'hannah',
                    },
                ],
                totalCount: 5,
            });
        },
    };

    groupsTab: PredefinedSharingTab<MyEntity> = {
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
        currentlySharedWith: [
            {
                name: 'Group1',
                href: 'group1',
                accessRight: {
                    display: 'Read Only',
                    value: 'read_only',
                },
            },
        ],
        entityRenderer: SharingModalRendererComponent,
        makeSearch(criteria: string): Promise<SearchResult<MyEntity>> {
            return Promise.resolve({
                items: [
                    {
                        name: 'Group 2',
                        href: 'group2',
                    },
                    {
                        name: 'Group 3',
                        href: 'group3',
                    },
                ],
                totalCount: 5,
            });
        },
    };

    orgsTab: PredefinedSharingTab<MyEntity> = {
        rightsOptions: [
            {
                display: 'Read Only',
                value: 'read_only',
            },
        ],
        currentlySharedWith: [
            {
                name: 'Org 1',
                href: 'org1',
                accessRight: {
                    display: 'Read Only',
                    value: 'read_only',
                },
            },
        ],
        entityRenderer: SharingModalRendererComponent,
        makeSearch(criteria: string): Promise<SearchResult<MyEntity>> {
            return Promise.resolve({
                items: [
                    {
                        name: 'Org 2',
                        href: 'org2',
                    },
                    {
                        name: 'Org 3',
                        href: 'org3',
                    },
                ],
                totalCount: 5,
            });
        },
    };

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
