/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { DataExporterExampleComponent } from './data-exporter.example.component';

import { Documentation } from '@vcd/ui-doc-lib';
import { DataExporterComponent } from '@vcd/ui-components';
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
        },
    ],
});

@NgModule({
    imports: [DataExporterExampleModule],
})
export class DataExporterExamplesModule {}
