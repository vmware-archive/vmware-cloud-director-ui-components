/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
    selector: 'vmw-documentation-container-example',
    templateUrl: './documentation-container-example.component.html',
    styleUrls: ['./documentation-container-example.component.scss'],
})
export class DocumentationContainerExampleComponent implements OnInit {
    examples = [];

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.data.subscribe((data: Data) => {
            if (data.examples) {
                this.examples = data.examples;
            }
        });
    }
}
