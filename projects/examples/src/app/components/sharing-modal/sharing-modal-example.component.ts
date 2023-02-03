/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Input, OnInit } from '@angular/core';
import { LazyString } from '@vcd/i18n';
import {
    ComponentRenderer,
    HasId,
    SharingModalResult,
    SharingSelectAllToggle,
    SharingTab,
    VcdSharingModalError,
} from '@vcd/ui-components';
import { BehaviorSubject } from 'rxjs';

interface MyEntity {
    name: string;
    id: string;
}

@Component({
    selector: 'vcd-sharing-modal-example',
    templateUrl: './sharing-modal-example.component.html',
    styleUrls: ['./sharing-modal-example.component.scss'],
})
export class SharingModalExampleComponent {
    opened = false;

    title: LazyString = 'Sharing Modal Example';

    tabs: SharingTab<MyEntity>[] = [
        {
            id: 'entity-a',
            title: 'Entity A',
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
                            id: String(Math.random()),
                        },
                    ],
                }),
            entityRenderer: SharingModalRendererComponent,
            comboboxPlaceholder: new BehaviorSubject('Select entities to share with'),
            selectAllText: new BehaviorSubject('Currently Sharing with All entities'),
        },
        {
            id: 'entity-b',
            title: 'Entity B',
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
    ];

    checkboxes: SharingSelectAllToggle[] = [
        {
            description: 'Select All Entites',
            tabIds: ['entity-a', 'entity-b'],
        },
    ];

    value: SharingModalResult = {
        'entity-a': {
            selectedItems: [
                {
                    name: 'An Entity',
                    id: 'an-entity',
                    accessRight: {
                        display: 'Read Only',
                        value: 'read_only',
                    },
                },
                {
                    name: 'Another Entity',
                    id: 'another-entity',
                    accessRight: {
                        display: 'Owner',
                        value: 'owner',
                    },
                },
            ],
        },
        'entity-b': {
            selectedItems: [
                {
                    name: 'Some Entity',
                    id: 'some-entity',
                    accessRight: {
                        display: 'Read Only',
                        value: 'read_only',
                    },
                },
            ],
        },
    };

    log(event): void {
        console.log(event);
    }
}

@Component({
    selector: 'vcd-datagrid-detail-pane-sub-example',
    template: ` {{ config.name }} ({{ config.id }}) `,
})
export class SharingModalRendererComponent implements ComponentRenderer<HasId<MyEntity>> {
    @Input() config: HasId<MyEntity>;
}
