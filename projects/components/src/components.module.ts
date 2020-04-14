/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { ActivityReporterModule } from './common/activity-reporter/activity-reporter.module';
import { ErrorBannerModule } from './common/error/error-banner.module';
import { LoadingIndicatorModule } from './common/loading/loading-indicator.module';
import { DataExporterModule } from './data-exporter/data-exporter.module';
import { DatagridModule } from './datagrid/datagrid.module';
import { FormModule } from './form/form.module';
import { ShowClippedTextDirectiveModule } from './lib/directives/show-clipped-text.directive.module';

@NgModule({
    imports: [
        DataExporterModule,
        DatagridModule,
        ShowClippedTextDirectiveModule,
        ErrorBannerModule,
        LoadingIndicatorModule,
        ActivityReporterModule,
        FormModule,
    ],
    exports: [
        DataExporterModule,
        DatagridModule,
        ShowClippedTextDirectiveModule,
        ErrorBannerModule,
        LoadingIndicatorModule,
        ActivityReporterModule,
        FormModule,
    ],
})
export class ComponentsModule {}
