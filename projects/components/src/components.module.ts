/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { DataExporterModule } from './data-exporter/data-exporter.module';
import { DatagridModule } from './datagrid/datagrid.module';
import { ShowClippedTextDirective } from './lib/directives/show-clipped-text.directive';

@NgModule({
    imports: [DataExporterModule, DatagridModule],
    exports: [DataExporterModule, DatagridModule, ShowClippedTextDirective],
    declarations: [ShowClippedTextDirective],
})
export class ComponentsModule {}
