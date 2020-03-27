/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { DataExporterModule } from './data-exporter/data-exporter.module';
import { DatagridModule } from './datagrid/datagrid.module';
import { ShowClippedTextDirectiveModule } from './lib/directives/show-clipped-text.directive.module';

@NgModule({
    imports: [DataExporterModule, DatagridModule, ShowClippedTextDirectiveModule],
    exports: [DataExporterModule, DatagridModule, ShowClippedTextDirectiveModule],
})
export class ComponentsModule {}
