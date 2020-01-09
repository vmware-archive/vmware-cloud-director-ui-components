/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { DocumentationEntry } from '../documentation';

@Component({
    selector: 'vcd-documentation-container',
    templateUrl: './documentation-container.component.html',
    styleUrls: ['./documentation-container.component.scss'],
})
export class DocumentationContainerComponent implements OnInit {
    /**
     * The documentation entry registered for a component is obtained here using the route data
     * {@link Documentation.getRoutes} registered for that component using {@link Documentation.registerDocumentationEntry}
     */
    documentationEntry: DocumentationEntry;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.data.subscribe((data: Data) => {
            this.documentationEntry = data.documentationEntry;
        });
    }
}
