/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'vcd-components',
    template: `
        <p>
            components works!
        </p>
    `,
    styles: [],
})
export class ComponentsComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
