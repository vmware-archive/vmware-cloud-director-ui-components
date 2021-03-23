/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Input } from '@angular/core';
import { ComponentRenderer, HasId, PredefinedSharingTab, SearchResult, SharingModalResult } from '@vcd/ui-components';

interface MyEntity {
    name: string;
    id: string;
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
        makeSearch(criteria: string): Promise<SearchResult<MyEntity>> {
            return Promise.resolve({
                items: [
                    {
                        name: 'Matt',
                        id: 'matt',
                    },
                    {
                        name: 'Hannah',
                        id: 'hannah',
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
        makeSearch(criteria: string): Promise<SearchResult<MyEntity>> {
            return Promise.resolve({
                items: [
                    {
                        name: 'Group 2',
                        id: 'group2',
                    },
                    {
                        name: 'Group 3',
                        id: 'group3',
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
        makeSearch(criteria: string): Promise<SearchResult<MyEntity>> {
            return Promise.resolve({
                items: [
                    {
                        name: 'Org 2',
                        id: 'org2',
                    },
                    {
                        name: 'Org 3',
                        id: 'org3',
                    },
                ],
                totalCount: 5,
            });
        },
    };

    value: SharingModalResult = {
        users: {
            selectedItems: [
                {
                    name: 'Hannah',
                    id: 'hannah',
                    accessRight: {
                        display: 'Read Only',
                        value: 'read_only',
                    },
                },
                {
                    name: 'Ryan',
                    id: 'ryan',
                    accessRight: {
                        display: 'Owner',
                        value: 'owner',
                    },
                },
            ],
        },
        groups: {
            selectedItems: [
                {
                    name: 'Hannah',
                    id: 'hannah',
                    accessRight: {
                        display: 'Read Only',
                        value: 'read_only',
                    },
                },
            ],
        },
        organizations: {
            selectAllRights: 'read_only',
        },
    };

    log(event): void {
        console.log(event);
    }
}
