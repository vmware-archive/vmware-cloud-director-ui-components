/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { DataExporterExampleComponent } from './data-exporter.example.component';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { Documentation } from '@vcd/ui-doc-lib';
import { DataExporterComponent, ComponentsModule } from '@vcd/ui-components';

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
    declarations: [DataExporterExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, ComponentsModule],
    exports: [DataExporterExampleComponent],
    entryComponents: [DataExporterExampleComponent],
})
export class DataExporterExamplesModule {}
