/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';

import { DataExporterComponent } from '@vcd/ui-components';
import { Documentation } from '@vmw/ng-live-docs';
import { DataExporterExampleComponent } from './data-exporter.example.component';
import { DataExporterExampleModule } from './data-exporter.example.module';

Documentation.registerDocumentationEntry({
    component: DataExporterComponent,
    displayName: 'Data Exporter',
    urlSegment: 'dataExporter',
    examples: [
        {
            component: DataExporterExampleComponent,
            forComponent: null,
            title: 'Data Exporter example',
            urlSegment: 'data-exporter',
        },
    ],
});

@NgModule({
    imports: [DataExporterExampleModule],
})
export class DataExporterExamplesModule {}
