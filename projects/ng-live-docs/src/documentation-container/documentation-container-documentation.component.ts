/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
    selector: 'vmw-documentation-container-documentation',
    template: `<vmw-overview-viewer [component]="component"></vmw-overview-viewer>`,
})
export class DocumentationContainerDocumentationComponent implements OnInit {
    component: Component;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.data.subscribe((data: Data) => {
            if (data.component) {
                this.component = data.component;
            }
        });
    }
}
