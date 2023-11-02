/*!
 * Copyright 2019-2023 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { DatagridComponent } from '@vcd/ui-components';
import { Documentation } from '@vmw/ng-live-docs';
import { DatagridActionDisplayConfigExampleComponent } from './datagrid-action-display-config.example.component';
import { DatagridActionDisplayConfigExampleModule } from './datagrid-action-display-config.example.module';
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
import { DatagridIsRowSelectableExampleComponent } from './datagrid-is-row-selectable-example.component';
import { DatagridIsRowSelectableExampleModule } from './datagrid-is-row-selectable-example.module';
import { DatagridPreserveSelectionExampleComponent } from './datagrid-preserve-selection.example.component';
import { DatagridPreserveSelectionExampleModule } from './datagrid-preserve-selection.example.module';
import { DatagridStringFilterPlaceholderExampleComponent } from './datagrid-string-filter-placeholder.example.component';

Documentation.registerDocumentationEntry({
    component: DatagridComponent,
    displayName: 'Datagrid',
    urlSegment: 'datagrid',
    examples: [
        {
            component: DatagridThreeRenderersExampleComponent,
            title: 'Example with 3 types of grid renderers',
            urlSegment: 'datagrid-three-renderers',
        },
        {
            component: DatagridCssClassesExampleComponent,
            title: 'Custom CSS classes per row capability',
            urlSegment: 'datagrid-css-classes',
        },
        {
            component: DatagridShowHideExampleComponent,
            title: 'Show/Hide datagrid columns example',
            urlSegment: 'datagrid-show-hide',
        },
        {
            component: DatagridDetailRowExampleComponent,
            title: 'Detail row datagrid example',
            urlSegment: 'datagrid-detail-row',
        },
        {
            component: DatagridSortExampleComponent,
            title: 'Datagrid sorting',
            urlSegment: 'datagrid-sort',
        },
        {
            component: DatagridRowSelectExampleComponent,
            title: 'Selectable datagrid rows',
            urlSegment: 'datagrid-row-select',
        },
        {
            component: DatagridIsRowSelectableExampleComponent,
            title: 'Disabling selection of datagrid rows',
            urlSegment: 'datagrid-is-row-selectable',
        },
        {
            component: DatagridPaginationExampleComponent,
            title: 'Pagination functionality and text customization',
            urlSegment: 'datagrid-pagination',
        },
        {
            component: DatagridHeightExampleComponent,
            title: 'Setting height on the datagrid.',
            urlSegment: 'datagrid-height',
        },
        {
            component: DatagridHeaderExampleComponent,
            title: 'A header above the datagrid.',
            urlSegment: 'datagrid-header',
        },
        {
            component: DatagridLinkExampleComponent,
            title: 'Datagrid with actions',
            urlSegment: 'datagrid-link',
        },
        {
            component: DatagridActionMenuTrackingExampleComponent,
            title: 'Hiding of actions',
            urlSegment: 'action-menu-availability-tracking',
        },
        {
            component: DatagridActionDisplayConfigExampleComponent,
            title: 'Display config of contextual actions',
            urlSegment: 'datagrid-action-display-config',
        },
        {
            component: DatagridFilterExampleComponent,
            title: 'Data grid filters',
            urlSegment: 'datagrid-filter',
        },
        {
            component: DatagridPreserveSelectionExampleComponent,
            title: 'Preserve selection',
            urlSegment: 'preserve-selection',
        },
        {
            component: DatagridCliptextExampleComponent,
            title: 'Cliptext in the datagrid cells',
            urlSegment: 'datagrid-cliptext',
        },
        {
            component: DatagridActivityReporterExampleComponent,
            title: 'Activity reporter',
            urlSegment: 'datagrid-activity-reporter',
        },
        {
            component: DatagridRowIconExampleComponent,
            title: 'Data row icon that reloads the row',
            urlSegment: 'datagrid-row-icon',
        },
        {
            component: DatagridLoadingPlaceholderExampleComponent,
            title: 'Shows the loading icon + placeholder capabilities',
            urlSegment: 'datagrid-loading-placeholder',
        },
        {
            component: DatagridDetailPaneExampleComponent,
            title: 'A Clarity 3 Detail Pane Example',
            urlSegment: 'datagrid-detail-pane',
        },
        {
            component: DatagridColumnWidthExampleComponent,
            title: 'Set the width of columns through CSS class names',
            urlSegment: 'datagrid-column-width',
        },
        {
            component: DatagridStringFilterPlaceholderExampleComponent,
            title: 'String Filter Placeholder',
            urlSegment: 'datagrid-filter-placeholder',
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
        DatagridActionDisplayConfigExampleModule,
        DatagridIsRowSelectableExampleModule,
        DatagridPreserveSelectionExampleModule,
    ],
})
export class DatagridExamplesModule {}
