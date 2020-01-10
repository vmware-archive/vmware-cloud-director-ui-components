/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { Documentation, DocumentationEntry } from '@vcd/ui-doc-lib';

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
}
