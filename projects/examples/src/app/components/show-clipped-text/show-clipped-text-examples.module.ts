/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShowClippedTextDirective } from '@vcd/ui-components';
import { Documentation } from '@vmw/ng-live-docs';
import { HideClippedTextPositioningExampleComponent } from './hide/hide-clipped-text-example.component';
import { HideClippedTextPositioningExampleModule } from './hide/hide-clipped-text-example.module';
import { ShowClippedTextPositioningExampleComponent } from './positioning/show-clipped-text-positioning-example.component';
import { ShowClippedTextPositioningExampleModule } from './positioning/show-clipped-text-positioning-example.module';
import { ShowClippedTextSizingExampleComponent } from './sizing/show-clipped-text-sizing-example.component';
import { ShowClippedTextSizingExampleModule } from './sizing/show-clipped-text-sizing-example.module';

Documentation.registerDocumentationEntry({
    component: ShowClippedTextDirective,
    displayName: 'Show Clipped Text Directive',
    urlSegment: 'clippedTextDirective',
    examples: [
        {
            component: ShowClippedTextSizingExampleComponent,
            title: 'Sizing of host component and tooltip',
            urlSegment: 'show-clipped-text-sizing',
        },
        {
            component: ShowClippedTextPositioningExampleComponent,
            title: 'Dynamic Positioning of tooltip',
            urlSegment: 'show-clipped-text-positioning',
        },
        {
            component: HideClippedTextPositioningExampleComponent,
            title: 'Hide the tooltip when the component is destroyed',
            urlSegment: 'hide-clipped-text',
        },
    ],
});
@NgModule({
    imports: [
        CommonModule,
        ShowClippedTextPositioningExampleModule,
        ShowClippedTextSizingExampleModule,
        HideClippedTextPositioningExampleModule,
    ],
})
export class ShowClippedTextExamplesModule {}
