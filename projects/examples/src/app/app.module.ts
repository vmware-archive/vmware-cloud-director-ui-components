/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocLibModule } from '@vcd/ui-doc-lib';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import { CliptexExamplesModule } from '../components/cliptext/cliptext.examples.module';
import componentsDocumentationJson from '../../gen/components-compodoc-documentation/documentation.json';
import examplesDocumentationJson from '../../gen/examples-compodoc-documentation/documentation.json';
import { DatagridExamplesModule } from '../components/datagrid/datagrid.example.module';
import { DataExporterExamplesModule } from '../components/data-exporter/data-exporter.examples.module';
import { CompodocSchema } from '../../../doc-lib/src/compodoc/compodoc-schema';

import localeFr from '@angular/common/locales/fr';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeFr, 'fr');
registerLocaleData(localeEs, 'es');

const supportedLocales = ['fr', 'es'];
const defaultLocale = 'en-US';
const LOCALE_SEPARATOR = '-';

function getSupportedLocale(): string {
    let partiallyMatchedLocale: string;
    const completelyMatchedLocale = supportedLocales.find(
        (supportedLocale: string) => navigator.language === supportedLocale
    );
    if (!completelyMatchedLocale) {
        partiallyMatchedLocale = supportedLocales.find(
            (supportedLocale: string) => navigator.language.split(LOCALE_SEPARATOR)[0] === supportedLocale
        );
    }
    return completelyMatchedLocale || partiallyMatchedLocale || defaultLocale;
}

/**
 * The following 2 constants are declared for AOT compilation purpose. Otherwise, the compilation would silently fail and
 * the doc jsons are given as null to the DocLibModule.
 * NOTE: The following two has to be exported otherwise the AoT compiler won't see it.
 */
export const docJson1: CompodocSchema = componentsDocumentationJson;
export const docJson2: CompodocSchema = examplesDocumentationJson;

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ClarityModule,
        BrowserAnimationsModule,
        DocLibModule.forRoot([docJson1, docJson2]),
        CliptexExamplesModule,
        DatagridExamplesModule,
        DataExporterExamplesModule,
    ],
    providers: [{ provide: LOCALE_ID, useValue: getSupportedLocale() }],
    bootstrap: [AppComponent],
})
export class AppModule {}
