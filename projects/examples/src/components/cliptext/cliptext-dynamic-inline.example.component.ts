/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

/*
 * Copyright 2019 VMware, Inc. All rights reserved.
 */
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'vcd-cliptext-dynamic-inline-example',
    styleUrls: ['cliptext-dynamic-inline.example.component.scss'],
    templateUrl: 'cliptext-dynamic-inline.example.component.html',
})
export class CliptextDynamicInlineExampleComponent {
    dynamicText = new FormControl('Dynamic text goes here');
}
