/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'vcd-cliptext-dynamic-inline-example',
    styles: [
        `
            vcd-cliptext {
                font-weight: bold;
            }
        `,
    ],

    template: `
        <label>Dynamic text:</label>
        <input placeholder="Write some text" [formControl]="dynamicText" />
        <p>
            Modify the input above and observe the text:
            <vcd-cliptext [inlineWidth]="'200px'">{{ dynamicText.value }}</vcd-cliptext>
            You can try with long and short text. There is no tooltip when the text fits the provided width.
        </p>
        <p>The toolptip is updated upon display.</p>
    `,
})
export class CliptextDynamicInlineExampleComponent {
    dynamicText = new FormControl('Dynamic text goes here');
}
