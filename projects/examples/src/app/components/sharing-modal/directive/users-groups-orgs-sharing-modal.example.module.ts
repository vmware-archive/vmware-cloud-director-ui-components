/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VcdComponentsModule } from '@vcd/ui-components';
import {
    SharingModalRendererComponent,
    UsersGroupsOrgsSharingModalExampleComponent,
} from './users-groups-orgs-sharing-modal.example';

@NgModule({
    declarations: [UsersGroupsOrgsSharingModalExampleComponent, SharingModalRendererComponent],
    imports: [CommonModule, VcdComponentsModule],
    exports: [UsersGroupsOrgsSharingModalExampleComponent],
    entryComponents: [UsersGroupsOrgsSharingModalExampleComponent],
})
export class UsersGroupsOrgsSharingModalExampleModule {}
