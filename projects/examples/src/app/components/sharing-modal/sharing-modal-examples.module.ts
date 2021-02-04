/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharingModalComponent } from '@vcd/ui-components';
import { Documentation } from '@vmw/ng-live-docs';
import { UsersGroupsOrgsSharingModalExampleComponent } from './directive/users-groups-orgs-sharing-modal.example';
import { UsersGroupsOrgsSharingModalExampleModule } from './directive/users-groups-orgs-sharing-modal.example.module';
import { SharingModalExampleComponent } from './sharing-modal-example.component';
import { SharingModalExampleModule } from './sharing-modal-example.module';

Documentation.registerDocumentationEntry({
    component: SharingModalComponent,
    displayName: 'Sharing Modal',
    urlSegment: 'sharingModal',
    examples: [
        {
            component: SharingModalExampleComponent,
            forComponent: null,
            title: 'Basic Sharing Modal',
            urlSegment: 'basic-sharing-modal-component-example',
        },
        {
            component: UsersGroupsOrgsSharingModalExampleComponent,
            forComponent: null,
            title: 'Users/Groups/Orgs Sharing Modal',
            urlSegment: 'vcd-users-groups-sharing-modal-example',
        },
    ],
});
@NgModule({
    imports: [CommonModule, SharingModalExampleModule, UsersGroupsOrgsSharingModalExampleModule],
})
export class SharingModalExamplesModule {}
