/*!
 * Copyright 2019-2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { DatagridComponent } from '@vcd/ui-components';
import { Documentation } from '@vmw/ng-live-docs';
import { DatagridActionDisplayExampleComponent } from './datagrid-action-display.example.component';
import { DatagridActionDisplayExampleModule } from './datagrid-action-display.example.module';
import { DatagridActionMenuTrackingExampleComponent } from './datagrid-action-menu-tracking-example.component';
import { DatagridActionMenuTrackerExampleModule } from './datagrid-action-menu-tracking.example.module';
import { DatagridActivityReporterExampleComponent } from './datagrid-activity-reporter.example.component';
import { DatagridActivityReporterExampleModule } from './datagrid-activity-reporter.example.module';
import { DatagridCliptextExampleComponent } from './datagrid-cliptext.example.component';
import { DatagridCliptextExampleModule } from './datagrid-cliptext.example.module';
import { DatagridColumnWidthExampleComponent } from './datagrid-column-width.example.component';
import { DatagridColumnWidthExampleModule } from './datagrid-column-width.example.module';
import { DatagridCssClassesExampleComponent } from './datagrid-css-classes.example.component';
import { DatagridCssClassesExampleModule } from './datagrid-css-classes.example.module';
import { DatagridDetailPaneExampleComponent } from './datagrid-detail-pane.example.component';
import { DatagridDetailPaneExampleModule } from './datagrid-detail-pane.example.module';
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
import { DatagridLoadingPlaceholderExampleComponent } from './datagrid-loading-placeholder.example.component';
import { DatagridLoadingPlaceholderExampleModule } from './datagrid-loading-placeholder.example.module';
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
            urlSegment: 'datagrid-three-renderers',
        },
        {
            component: DatagridCssClassesExampleComponent,
            forComponent: null,
            title: 'Custom CSS classes per row capability',
            urlSegment: 'datagrid-css-classes',
        },
        {
            component: DatagridShowHideExampleComponent,
            forComponent: null,
            title: 'Show/Hide datagrid columns example',
            urlSegment: 'datagrid-show-hide',
        },
        {
            component: DatagridDetailRowExampleComponent,
            forComponent: null,
            title: 'Detail row datagrid example',
            urlSegment: 'datagrid-detail-row',
        },
        {
            component: DatagridSortExampleComponent,
            forComponent: null,
            title: 'Datagrid sorting',
            urlSegment: 'datagrid-sort',
        },
        {
            component: DatagridRowSelectExampleComponent,
            forComponent: null,
            title: 'Selectable datagrid rows',
            urlSegment: 'datagrid-row-select',
        },
        {
            component: DatagridPaginationExampleComponent,
            forComponent: null,
            title: 'Pagination functionality and text customization',
            urlSegment: 'datagrid-pagination',
        },
        {
            component: DatagridHeightExampleComponent,
            forComponent: null,
            title: 'Setting height on the datagrid.',
            urlSegment: 'datagrid-height',
        },
        {
            component: DatagridHeaderExampleComponent,
            forComponent: null,
            title: 'A header above the datagrid.',
            urlSegment: 'datagrid-header',
        },
        {
            component: DatagridLinkExampleComponent,
            forComponent: null,
            title: 'Links from Datagrid Example',
            urlSegment: 'datagrid-link',
        },
        {
            component: DatagridActionMenuTrackingExampleComponent,
            forComponent: null,
            title: 'Action menu availability tracking',
            urlSegment: 'action-menu-availability-tracking',
        },
        {
            component: DatagridFilterExampleComponent,
            forComponent: null,
            title: 'Data grid filters',
            urlSegment: 'datagrid-filter',
        },
        {
            component: DatagridCliptextExampleComponent,
            forComponent: null,
            title: 'Cliptext in the datagrid cells',
            urlSegment: 'datagrid-cliptext',
        },
        {
            component: DatagridActivityReporterExampleComponent,
            forComponent: null,
            title: 'Activity reporter',
            urlSegment: 'datagrid-activity-reporter',
        },
        {
            component: DatagridRowIconExampleComponent,
            forComponent: null,
            title: 'Data row icon that reloads the row',
            urlSegment: 'datagrid-row-icon',
        },
        {
            component: DatagridLoadingPlaceholderExampleComponent,
            forComponent: null,
            title: 'Shows the loading icon + placeholder capabilities',
            urlSegment: 'datagrid-loading-placeholder',
        },
        {
            component: DatagridDetailPaneExampleComponent,
            forComponent: null,
            title: 'A Clarity 3 Detail Pane Example',
            urlSegment: 'datagrid-detail-pane',
        },
        {
            component: DatagridColumnWidthExampleComponent,
            forComponent: null,
            title: 'Set the width of columns through CSS class names',
            urlSegment: 'datagrid-column-width',
        },
        {
            component: DatagridActionDisplayExampleComponent,
            forComponent: null,
            title: 'Action menu display configurations',
            urlSegment: 'datagrid-action-display',
        },
    ],
});
/**
 * A module that imports all data grid example modules
 */
@NgModule({
    imports: [
        DatagridActionMenuTrackerExampleModule,
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
        DatagridLoadingPlaceholderExampleModule,
        DatagridDetailPaneExampleModule,
        DatagridColumnWidthExampleModule,
        DatagridActionDisplayExampleModule,
    ],
})
export class DatagridExamplesModule {}
