/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';

import localeFr from '@angular/common/locales/fr';
import localeEs from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { ComponentsModule } from '@vcd/ui-components';
import { CompodocSchema, DocLibModule, StackBlitzInfo } from '@vcd/ui-doc-lib';
import { I18nModule, TranslationService } from '@vcd/i18n';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import componentsDocumentationJson from '../../gen/components-doc.json';
import examplesDocumentationJson from '../../gen/examples-doc.json';
import { DatagridExamplesModule } from '../components/datagrid/datagrid.examples.module';
import { ShowClippedTextExamplesModule } from './components/show-clipped-text/show-clipped-text-examples.module';
import { DataExporterExamplesModule } from '../components/data-exporter/data-exporter.examples.module';
import { SubscriptionTrackerExamplesModule } from '../components/subscription/subscription-tracker.examples.module';

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
        ComponentsModule,
        FormsModule,
        DatagridExamplesModule,
        DataExporterExamplesModule,
        ShowClippedTextExamplesModule,
        SubscriptionTrackerExamplesModule,
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
