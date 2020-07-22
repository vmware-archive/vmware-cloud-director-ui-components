/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { VcdActionMenuModule } from './action-menu/index';
import { VcdActivityReporterModule } from './common/activity-reporter/activity-reporter.module';
import { VcdErrorBannerModule } from './common/error/error-banner.module';
import { VcdLoadingIndicatorModule } from './common/loading/loading-indicator.module';
import { VcdDataExporterModule } from './data-exporter/data-exporter.module';
import { VcdDatagridModule } from './datagrid/datagrid.module';
import { DropdownModule } from './dropdown/dropdown.module';
import { VcdFormModule } from './form/form.module';
import { ShowClippedTextDirectiveModule } from './lib/directives/show-clipped-text.directive.module';
import { SpotlightSearchModule } from './spotlight-search/spotlight-search.module';

@NgModule({
    exports: [
        VcdDataExporterModule,
        VcdDatagridModule,
        ShowClippedTextDirectiveModule,
        VcdErrorBannerModule,
        VcdLoadingIndicatorModule,
        VcdActivityReporterModule,
        VcdFormModule,
        SpotlightSearchModule,
        VcdActionMenuModule,
        DropdownModule,
    ],
})
export class VcdComponentsModule {}
