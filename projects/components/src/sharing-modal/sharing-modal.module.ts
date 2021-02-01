/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { I18nModule } from '@vcd/i18n';
import { VcdErrorBannerModule } from '../common/error';
import { VcdDatagridModule } from '../datagrid';
import { VcdComponentRendererOutletModule } from '../datagrid/directives/component-renderer-outlet.module';
import { DropdownModule } from '../dropdown';
import { RightsDropdownRendererComponent } from './renderers/rights-dropdown-renderer';
import { VcdSelectAllToggleComponent } from './select-all-checkbox/select-all-toggle.component';
import { SharingModalComponent } from './sharing-modal.component';
import { SharingModalTabComponent } from './tabs/sharing-modal-tab.component';
import { UsersGroupsOrgsSharingModalDirective } from './users-groups-orgs-sharing-modal.directive';

@NgModule({
    declarations: [
        SharingModalComponent,
        SharingModalTabComponent,
        UsersGroupsOrgsSharingModalDirective,
        VcdSelectAllToggleComponent,
        RightsDropdownRendererComponent,
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
    exports: [SharingModalComponent, SharingModalTabComponent, UsersGroupsOrgsSharingModalDirective],
})
export class VcdSharingModalModule {}
