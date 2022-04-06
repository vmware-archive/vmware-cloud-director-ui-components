/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
    selector: 'vmw-documentation-container-api',
    template: `<vmw-api-viewer [component]="component"></vmw-api-viewer>`,
})
export class DocumentationContainerApiComponent implements OnInit {
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
