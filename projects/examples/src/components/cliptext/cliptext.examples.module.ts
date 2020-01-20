/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CliptextDatagridExampleComponent } from './cliptext-datagrid.example.component';
import { CliptextDynamicInlineExampleComponent } from './cliptext-dynamic-inline.example.component';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { Documentation } from '@vcd/ui-doc-lib';
import { CliptextComponent, ComponentsModule } from '@vcd/ui-components';

Documentation.registerDocumentationEntry({
    component: CliptextComponent,
    displayName: 'Cliptext',
    urlSegment: 'cliptext',
    examples: [
        {
            component: CliptextDatagridExampleComponent,
            forComponent: null,
            title: 'Cliptext in a datagrid',
        },
        {
            component: CliptextDynamicInlineExampleComponent,
            forComponent: null,
            title: 'Dynamic Inline Text',
        },
    ],
});

@NgModule({
    declarations: [CliptextDatagridExampleComponent, CliptextDynamicInlineExampleComponent],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, ComponentsModule],
    exports: [CliptextDatagridExampleComponent, CliptextDynamicInlineExampleComponent],
    entryComponents: [CliptextDatagridExampleComponent, CliptextDynamicInlineExampleComponent],
})
export class CliptexExamplesModule {}
