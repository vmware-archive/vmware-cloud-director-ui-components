/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { DatagridComponent } from '@vcd/ui-components';
import { Documentation } from '@vcd/ui-doc-lib';
import { DatagridActivityReporterExampleComponent } from './datagrid-activity-reporter.example.component';
import { DatagridActivityReporterExampleModule } from './datagrid-activity-reporter.example.module';
import { DatagridCliptextExampleComponent } from './datagrid-cliptext.example.component';
import { DatagridCliptextExampleModule } from './datagrid-cliptext.example.module';
import { DatagridCssClassesExampleComponent } from './datagrid-css-classes.example.component';
import { DatagridCssClassesExampleModule } from './datagrid-css-classes.example.module';
import { DatagridDetailRowExampleComponent } from './datagrid-detail-row.example.component';
import { DatagridDetailRowExampleModule } from './datagrid-detail-row.example.module';
import { DatagridFilterExampleComponent } from './datagrid-filter.example.component';
import { DatagridFilterExampleModule } from './datagrid-filter.example.module';
import { DatagridHeaderExampleComponent } from './datagrid-header.example.component';
import { DatagridHeaderExampleModule } from './datagrid-header.example.module';
import { DatagridHeightExampleComponent } from './datagrid-height.example.component';
import { DatagridHeightExampleModule } from './datagrid-height.example.module';
import { DatagridLinkExampleComponent } from './datagrid-link.example.component';
import { DatagridLinkExampleModule } from './datagrid-link.example.module';
import { DatagridPaginationExampleComponent } from './datagrid-pagination-example.component';
import { DatagridPagionationExampleModule } from './datagrid-pagination-example.module';
import { DatagridRowIconExampleComponent } from './datagrid-row-icon.example.component';
import { DatagridRowIconExampleModule } from './datagrid-row-icon.example.module';
import { DatagridRowSelectExampleComponent } from './datagrid-row-select.example.component';
import { DatagridRowSelectExampleModule } from './datagrid-row-select.example.module';
import { DatagridShowHideExampleComponent } from './datagrid-show-hide.example.component';
import { DatagridShowHideExampleModule } from './datagrid-show-hide.example.module';
import { DatagridSortExampleComponent } from './datagrid-sort.example.component';
import { DatagridSortExampleModule } from './datagrid-sort.example.module';
import { DatagridThreeRenderersExampleComponent } from './datagrid-three-renderers.example.component';
import { DatagridThreeRenderersExampleModule } from './datagrid-three-renderers.example.module';

Documentation.registerDocumentationEntry({
    component: DatagridComponent,
    displayName: 'Datagrid',
    urlSegment: 'datagrid',
    examples: [
        {
            component: DatagridThreeRenderersExampleComponent,
            forComponent: null,
            title: 'Example with 3 types of grid renderers',
        },
        {
            component: DatagridCssClassesExampleComponent,
            forComponent: null,
            title: 'Component that holds an example of the css classes per row capability',
        },
        {
            component: DatagridShowHideExampleComponent,
            forComponent: null,
            title: 'Show/Hide datagrid columns example',
        },
        {
            component: DatagridDetailRowExampleComponent,
            forComponent: null,
            title: 'Detail row datagrid example',
        },
        {
            component: DatagridSortExampleComponent,
            forComponent: null,
            title: 'Shows the sorting capability of the datagrid',
        },
        {
            component: DatagridRowSelectExampleComponent,
            forComponent: null,
            title: 'Select datagrid row example',
        },
        {
            component: DatagridPaginationExampleComponent,
            forComponent: null,
            title: 'Pagination functionality and text customization example',
        },
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
        {
            component: DatagridLinkExampleComponent,
            forComponent: null,
            title: 'Links from Datagrid Example',
        },
        {
            component: DatagridFilterExampleComponent,
            forComponent: null,
            title: 'Data grid filters',
        },
        {
            component: DatagridCliptextExampleComponent,
            forComponent: null,
            title: 'Cliptext in the datagrid cells',
        },
        {
            component: DatagridActivityReporterExampleComponent,
            forComponent: null,
            title: 'Activity reporter + buttons example',
        },
        {
            component: DatagridRowIconExampleComponent,
            forComponent: null,
            title: 'Data row icon that reloads the row',
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
        DatagridFilterExampleModule,
        DatagridCliptextExampleModule,
        DatagridActivityReporterExampleModule,
        DatagridRowIconExampleModule,
    ],
})
export class DatagridExamplesModule {}
