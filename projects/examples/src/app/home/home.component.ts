/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'vcd-home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    ghReadMeUrl =
        'https://github.com/vmware/vmware-cloud-director-ui-components/blob/master/projects/components/README.md#Components';
    vcdUrl = 'https://www.vmware.com/products/cloud-director.html';
    constructor() {}

    ngOnInit(): void {}
}
