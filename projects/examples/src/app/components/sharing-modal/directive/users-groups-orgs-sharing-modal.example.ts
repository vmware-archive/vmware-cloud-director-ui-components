/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Input } from '@angular/core';
import { ComponentRenderer, Entity, PredefinedSharingTab, SearchResult } from '@vcd/ui-components';

@Component({
    selector: 'vcd-users-groups-sharing-modal-example',
    templateUrl: './users-groups-orgs-sharing-modal.example.html',
    styleUrls: ['./users-groups-orgs-sharing-modal.example.scss'],
})
export class UsersGroupsOrgsSharingModalExampleComponent {
    constructor() {}

    opened = false;

    title = 'Sharing Modal Example';

    usersTab: PredefinedSharingTab = {
        rightsOptions: ['Read Only', 'Write Only', 'All Access'],
        currentlySharedWith: [
            {
                name: 'Ryan',
                href: 'ryan',
                accessRight: 'Owner',
            },
        ],
        entityRenderer: SharingModalRendererComponent,
        makeSearch(criteria: string): Promise<SearchResult> {
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

    groupsTab: PredefinedSharingTab = {
        rightsOptions: ['Read Only', 'Write Only', 'All Access'],
        currentlySharedWith: [
            {
                name: 'Group1',
                href: 'group1',
                accessRight: 'Read Only',
            },
        ],
        entityRenderer: SharingModalRendererComponent,
        makeSearch(criteria: string): Promise<SearchResult> {
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

    orgsTab: PredefinedSharingTab = {
        rightsOptions: ['Read Only'],
        currentlySharedWith: [
            {
                name: 'Org 1',
                href: 'org1',
                accessRight: 'Read Only',
            },
        ],
        entityRenderer: SharingModalRendererComponent,
        makeSearch(criteria: string): Promise<SearchResult> {
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
export class SharingModalRendererComponent implements ComponentRenderer<Entity> {
    @Input() config: Entity;
}
