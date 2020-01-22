/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { DataExporterModule } from './data-exporter/data-exporter.module';
import { DatagridModule } from './datagrid/datagrid.module';
import { CliptextModule } from './cliptext/cliptext.module';

@NgModule({
    imports: [DataExporterModule, DatagridModule, CliptextModule],
    exports: [DataExporterModule, DatagridModule, CliptextModule],
})
export class ComponentsModule {}
