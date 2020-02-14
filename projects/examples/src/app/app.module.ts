/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { InjectionToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';

import localeFr from '@angular/common/locales/fr';
import localeEs from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { AppRoutingModule } from './app-routing.module';
import { CompodocSchema, DocLibModule } from '@vcd/ui-doc-lib';

import { AppComponent } from './app.component';
import { CliptextExamplesModule } from '../components/cliptext/cliptext.examples.module';
import { DataExporterExamplesModule } from '../components/data-exporter/data-exporter.examples.module';

import componentsDocumentationJson from '../../gen/components-doc/documentation.json';
import examplesDocumentationJson from '../../gen/examples-doc/documentation.json';
import { DatagridExamplesModule } from '../components/datagrid/datagrid.examples.module';
import { StackBlitzInfo } from '../../../doc-lib/src/stack-blitz-writer.service';
import { I18nModule, TranslationService } from '@vcd/i18n';
import { DatagridModule } from 'projects/components/src/datagrid';
import { DataExporterModule } from 'projects/components/src/public-api';
import { CliptextModule } from 'projects/components/src/cliptext';

registerLocaleData(localeFr, 'fr');
registerLocaleData(localeEs, 'es');

const ASSET_URL = new InjectionToken('ASSETS');

/**
 * The following 2 constants are declared for AOT compilation purpose. Otherwise, the compilation would silently fail and
 * the doc jsons are given as null to the DocLibModule.
 * NOTE: The following two has to be exported otherwise the AoT compiler won't see it.
 */
export const docJson1: CompodocSchema = componentsDocumentationJson;
export const docJson2: CompodocSchema = examplesDocumentationJson;
export const sbInfo: StackBlitzInfo = {
    templateId: 'vcd-ui-cc-starter-clarity-v8-yhe4yg',
    projectName: 'VMware Cloud Director UI Components',
    moduleFinder(componentName: string): string {
        return componentName.replace('ExampleComponent', 'ExampleModule');
    },
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        HttpClientModule,
        I18nModule.forChild(ASSET_URL, true),
        BrowserModule,
        AppRoutingModule,
        DocLibModule,
        ClarityModule,
        BrowserAnimationsModule,
        DocLibModule.forRoot([docJson1, docJson2], sbInfo),
        CliptextExamplesModule,
        FormsModule,
        DatagridExamplesModule,
        DataExporterExamplesModule,
        DatagridModule,
        DataExporterModule,
        CliptextModule,
    ],
    providers: [
        {
            provide: ASSET_URL,
            useFactory: () => 'assets/translations',
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(translationService: TranslationService) {
        translationService.registerTranslations();
    }
}
