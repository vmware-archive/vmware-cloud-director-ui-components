/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule, Optional } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { VcdApiClient } from '@vcd/angular-client';
import { I18nModule } from '@vcd/i18n';
import { VcdErrorBannerModule } from '../common/error';
import { VcdDatagridModule } from '../datagrid';
import { VcdComponentRendererOutletModule } from '../datagrid/directives/component-renderer-outlet.module';
import { DropdownModule } from '../dropdown';
import { RestQueryService } from '../utils/rest/rest-query-search.client';
import { RightsDropdownRendererComponent } from './renderers/rights-dropdown-renderer';
import { VcdSelectAllToggleComponent } from './select-all-checkbox/select-all-toggle.component';
import { SharingModalComponent } from './sharing-modal.component';
import { SharingModalTabComponent } from './tabs/sharing-modal-tab.component';
import {
    SharingModalGroupRenderComponent,
    SharingModalOrgRenderComponent,
    SharingModalUserRenderComponent,
    UsersGroupsOrgsSharingModalDirective,
} from './users-groups-orgs-sharing-modal.directive';

@NgModule({
    declarations: [
        SharingModalComponent,
        SharingModalTabComponent,
        UsersGroupsOrgsSharingModalDirective,
        VcdSelectAllToggleComponent,
        RightsDropdownRendererComponent,
        SharingModalUserRenderComponent,
        SharingModalGroupRenderComponent,
        SharingModalOrgRenderComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ClarityModule,
        I18nModule,
        DropdownModule,
        VcdDatagridModule,
        VcdComponentRendererOutletModule,
        VcdErrorBannerModule,
    ],
    entryComponents: [
        RightsDropdownRendererComponent,
        SharingModalUserRenderComponent,
        SharingModalGroupRenderComponent,
        SharingModalOrgRenderComponent,
    ],
    exports: [SharingModalComponent, UsersGroupsOrgsSharingModalDirective],
    providers: [RestQueryService],
})
export class VcdSharingModalModule {}
