/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { Documentation } from '@vcd/ui-doc-lib';
import { CliptextComponent } from '@vcd/ui-components';
import { CliptextDatagridExampleComponent } from './cliptext-datagrid.example.component';
import { CliptextDynamicInlineExampleComponent } from './cliptext-dynamic-inline.example.component';
import { CliptextDatagridExampleModule } from './cliptext-datagrid.example.module';
import { CliptextDynamicInlineExampleModule } from './cliptext-dynamic-inline.example.module';

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
    imports: [CliptextDatagridExampleModule, CliptextDynamicInlineExampleModule],
})
export class CliptextExamplesModule {}
