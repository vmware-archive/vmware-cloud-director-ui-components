/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from '@vmw/vcd-ui-components';
import { DocLibModule } from '@vmw/vcd-ui-doc-lib';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, ComponentsModule, DocLibModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
