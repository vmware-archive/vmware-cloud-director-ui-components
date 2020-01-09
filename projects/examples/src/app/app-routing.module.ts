/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Documentation } from '@vmw/vcd-ui-doc-lib';
import { RouterModule, ROUTES, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

/**
 * Gets the Angular routes to be navigated in the app components's router outlet{@link AppComponent}
 */
function getRouting(): Routes {
    return Documentation.getRoutes();
}

@NgModule({
    imports: [RouterModule.forRoot([])],
    exports: [RouterModule],
    providers: [{ provide: ROUTES, multi: true, useFactory: getRouting }],
})
export class AppRoutingModule {}
