/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { DatagridShowHideExampleComponent } from './datagrid-show-hide.example.component';
import { DatagridComponent } from '@vcd/ui-components';
import { Documentation } from '@vcd/ui-doc-lib';
import { DatagridCssClassesExampleComponent } from './datagrid-css-classes.example.component';
import { DatagridThreeRenderersExampleComponent } from './datagrid-three-renderers.example.component';
import { DatagridThreeRenderersExampleModule } from './datagrid-three-renderers.example.module';
import { DatagridCssClassesExampleModule } from './datagrid-css-classes.example.module';
import { DatagridShowHideExampleModule } from './datagrid-show-hide.example.module';
import { DatagridDetailRowExampleComponent } from './datagrid-detail-row.example.component';
import { DatagridDetailRowExampleModule } from './datagrid-detail-row.example.module';
import { DatagridSortExampleModule } from './datagrid-sort.example.module';
import { DatagridSortExampleComponent } from './datagrid-sort.example.component';
import { DatagridRowSelectExampleComponent } from './datagrid-row-select.example.component';
import { DatagridRowSelectExampleModule } from './datagrid-row-select.example.module';
import { DatagridPaginationExampleComponent } from './datagrid-pagination-example.component';
import { DatagridPagionationExampleModule } from './datagrid-pagination-example.module';
import { DatagridLinkExampleModule } from './datagrid-link.example.module';
import { DatagridLinkExampleComponent } from './datagrid-link.example.component';
import { DatagridHeightExampleModule } from './datagrid-height.example.module';
import { DatagridHeightExampleComponent } from './datagrid-height.example.component';
import { DatagridHeaderExampleComponent } from './datagrid-header.example.component';
import { DatagridHeaderExampleModule } from './datagrid-header.example.module';

Documentation.registerDocumentationEntry({
    component: DatagridComponent,
    displayName: 'Datagrid',
    urlSegment: 'datagrid',
    examples: [
        {
            component: DatagridHeightExampleComponent,
            forComponent: null,
            title: 'Setting height on the datagrid.',
        },
        {
            component: DatagridHeaderExampleComponent,
            forComponent: null,
            title: 'Setting the header on the datagrid.',
        },
    ],
});
/**
 * A module that imports all data grid example modules
 */
@NgModule({
    imports: [
        DatagridThreeRenderersExampleModule,
        DatagridCssClassesExampleModule,
        DatagridShowHideExampleModule,
        DatagridDetailRowExampleModule,
        DatagridSortExampleModule,
        DatagridRowSelectExampleModule,
        DatagridPagionationExampleModule,
        DatagridLinkExampleModule,
        DatagridHeightExampleModule,
        DatagridHeaderExampleModule,
    ],
})
export class DatagridExamplesModule {}
