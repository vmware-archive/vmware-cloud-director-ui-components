/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { I18nModule, TranslationService } from '@vcd/i18n';
import { ActivityPromiseResolver, VcdComponentsModule } from '@vcd/ui-components';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { CompodocSchema, NgLiveDocsModule, StackBlitzInfo } from '@vmw/ng-live-docs';
import componentsDocumentationJson from '../../gen/components-doc.json';
import examplesDocumentationJson from '../../gen/examples-doc.json';
import { ActivityReporterExamplesModule } from '../components/activity-reporter/activity-reporter.examples.module';
import { DataExporterExamplesModule } from '../components/data-exporter/data-exporter.examples.module';
import { DatagridExamplesModule } from '../components/datagrid/datagrid.examples.module';
import { ErrorBannerExamplesModule } from '../components/error/error-banner.examples.module';
import { FormInputComponentsExamplesModule } from '../components/form-input/form-input-components.examples.module';
import { LoadingIndicatorExamplesModule } from '../components/loading/loading-indicator.examples.module';
import { SubscriptionTrackerExamplesModule } from '../components/subscription/subscription-tracker.examples.module';
import { ShowClippedTextExamplesModule } from './components/show-clipped-text/show-clipped-text-examples.module';
import { HomeComponent } from './home/home.component';

registerLocaleData(localeFr, 'fr');
registerLocaleData(localeEs, 'es');

const ASSET_URL = 'ASSETS';

export function moduleFinder(componentName: string): string {
    return componentName.replace('ExampleComponent', 'ExampleModule');
}
/**
 * The following 2 constants are declared for AOT compilation purpose. Otherwise, the compilation would silently fail and
 * the doc jsons are given as null to the NgLiveDocsModule.
 * NOTE: The following two has to be exported otherwise the AoT compiler won't see it.
 */
export const docJson1: CompodocSchema = componentsDocumentationJson;
export const docJson2: CompodocSchema = examplesDocumentationJson;
export const sbInfo: StackBlitzInfo = {
    templateId: 'vcd-ui-cc-starter-template',
    projectName: 'VMware Cloud Director UI Components',
    moduleFinder,
};

@NgModule({
    declarations: [AppComponent, HomeComponent],
    imports: [
        HttpClientModule,
        I18nModule.forChild(ASSET_URL, true),
        BrowserModule,
        AppRoutingModule,
        ClarityModule,
        BrowserAnimationsModule,
        NgLiveDocsModule.forRoot([docJson1, docJson2], sbInfo, 'compodoc'),
        VcdComponentsModule,
        FormsModule,
        DatagridExamplesModule,
        DataExporterExamplesModule,
        ShowClippedTextExamplesModule,
        SubscriptionTrackerExamplesModule,
        LoadingIndicatorExamplesModule,
        ErrorBannerExamplesModule,
        ActivityReporterExamplesModule,
        FormInputComponentsExamplesModule,
    ],
    entryComponents: [HomeComponent],
    providers: [
        {
            provide: ASSET_URL,
            useValue: 'assets/translations',
        },
        ActivityPromiseResolver,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(translationService: TranslationService) {
        translationService.registerTranslations();
    }
}
