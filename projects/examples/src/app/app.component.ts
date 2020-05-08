/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Documentation, DocumentationEntry } from '@vmw/ng-live-docs';

interface SideNavEntries {
    title: string;
    path: string;
}

@Component({
    selector: 'vcd-examples-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    /**
     * Gets the registered documentation entries {@link Documentation.getAllEntries} and sets them on a array to display
     * on the side navigation
     */
    sideNavEntries: SideNavEntries[] = Documentation.getAllEntries().map((entry: DocumentationEntry) => ({
        title: entry.displayName,
        path: entry.urlSegment,
    }));

    constructor(router: Router) {
        /**
         * Gets the Angular routes to be navigated in the app components's router outlet
         * Loading the routes in {@link AppRoutingModule} is causing the following error: ERROR in Cannot read property
         * 'loadChildren' of undefined https://stackoverflow.com/questions/44233195/dynamically-adding-routes-in-angular
         * TODO: https://jira.eng.vmware.com/browse/VDUCC-72
         */
        router.resetConfig(Documentation.getRoutes());
    }
}
