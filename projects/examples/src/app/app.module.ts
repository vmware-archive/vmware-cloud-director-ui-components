/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from '@vmw/vcd-ui-components';
import { DocLibModule } from '@vmw/vcd-ui-doc-lib';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import { PipesModule } from '../../../components/src/common/pipes/pipes.module';
import { FormsModule } from '@angular/forms';

import localeFr from '@angular/common/locales/fr';
import localeEs from '@angular/common/locales/es';
import localeEs_BR from '@angular/common/locales/es-BR';

registerLocaleData(localeFr, 'fr');
registerLocaleData(localeEs_BR, 'es-BR');
registerLocaleData(localeEs, 'es');

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ComponentsModule,
        DocLibModule,
        ClarityModule,
        BrowserAnimationsModule,
        PipesModule,
        FormsModule,
    ],
    providers: [{ provide: LOCALE_ID, useValue: navigator.language }],
    bootstrap: [AppComponent],
})
export class AppModule {}
