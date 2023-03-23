/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { TooltipSize } from '@vcd/ui-components';

@Component({
    selector: 'vcd-show-clipped-text-sizing-example',
    templateUrl: './show-clipped-text-sizing-example.component.html',
    styleUrls: ['./show-clipped-text-sizing-example.component.scss'],
})
export class ShowClippedTextSizingExampleComponent {
    TooltipSize = TooltipSize;

    text =
        'Something really long that will require clipping in most cases so we add random text' +
        ' to make sure that clipping happens on initially';
    text2 =
        'Something else for 2... really long that will require clipping in most cases so we add random text' +
        ' to make sure that clipping happens on initially';

    text3 =
        'Something else for 3... long that will require clipping in most cases so we add random text' +
        ' to make sure that clipping happens on initially';
}
