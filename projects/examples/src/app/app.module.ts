/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataExporterModule } from '@vmw/vcd-ui-components';
import { DocLibModule } from '@vmw/vcd-ui-doc-lib';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CsvExporterService } from '../../../components/src/data-exporter/csv-exporter.service';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        DataExporterModule,
        DocLibModule,
        ClarityModule,
        BrowserAnimationsModule,
    ],
    providers: [CsvExporterService],
    bootstrap: [AppComponent],
})
export class AppModule {}
