/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule, Optional } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { I18nModule } from '@vcd/i18n';
import { VcdErrorBannerModule } from '../common/error/error-banner.module';
import { VcdDatagridModule } from '../datagrid/datagrid.module';
import { VcdComponentRendererOutletModule } from '../datagrid/directives/component-renderer-outlet.module';
import { DropdownModule } from '../dropdown/dropdown.module';
import { IconsModule } from '../icons';
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
        IconsModule,
        I18nModule,
        DropdownModule,
        VcdDatagridModule,
        VcdComponentRendererOutletModule,
        VcdErrorBannerModule,
    ],
    exports: [SharingModalComponent, UsersGroupsOrgsSharingModalDirective],
    providers: [RestQueryService],
})
export class VcdSharingModalModule {}
