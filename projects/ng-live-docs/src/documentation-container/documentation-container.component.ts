/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentationEntry } from '../interfaces';

@Component({
    selector: 'vmw-documentation-container',
    templateUrl: './documentation-container.component.html',
})
export class DocumentationContainerComponent {
    /**
     * The documentation entry registered for a component is obtained here using the route data
     * {@link Documentation.getRoutes} registered for that component using {@link Documentation.registerDocumentationEntry}
     */
    documentationEntry: DocumentationEntry;

    constructor(private route: ActivatedRoute) {}
}
