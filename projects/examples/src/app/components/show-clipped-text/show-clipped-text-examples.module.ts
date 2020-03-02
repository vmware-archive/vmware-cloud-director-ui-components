/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Documentation } from '@vcd/ui-doc-lib';
import { ShowClippedTextDirective } from '@vcd/ui-components';
import { ShowClippedTextPositioningExampleComponent } from './positioning/show-clipped-text-positioning-example.component';
import { ShowClippedTextPositioningExampleModule } from './positioning/show-clipped-text-positioning-example.module';
import { ShowClippedTextSizingExampleModule } from './sizing/show-clipped-text-sizing-example.module';
import { ShowClippedTextSizingExampleComponent } from './sizing/show-clipped-text-sizing-example.component';

Documentation.registerDocumentationEntry({
    component: ShowClippedTextDirective,
    displayName: 'Show Clipped Text Directive',
    urlSegment: 'clippedTextDirective',
    examples: [
        {
            component: ShowClippedTextSizingExampleComponent,
            forComponent: null,
            title: 'Sizing of host component and tooltip',
        },
        {
            component: ShowClippedTextPositioningExampleComponent,
            forComponent: null,
            title: 'Dynamic Positioning of tooltip',
        },
    ],
});
@NgModule({
    imports: [CommonModule, ShowClippedTextPositioningExampleModule, ShowClippedTextSizingExampleModule],
})
export class ShowClippedTextExamplesModule {}
