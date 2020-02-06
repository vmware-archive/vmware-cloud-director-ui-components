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
    ],
});

/**
 * A module that imports all data grid example modules
 */
@NgModule({
    imports: [DatagridThreeRenderersExampleModule, DatagridCssClassesExampleModule, DatagridShowHideExampleModule],
})
export class DatagridExamplesModule {}
