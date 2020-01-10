/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowHideDatagridExampleComponent } from './show-hide-datagrid.example.component';
import { DatagridComponent, DatagridModule } from '@vcd/ui-components';
import { Documentation } from '@vcd/ui-doc-lib';
import { CssClassesDatagridExampleComponent } from './css-classes-datagrid.example.component';
import { ThreeRenderersDatagridExampleComponent } from './3-renderers-datagrid.example.component';

Documentation.registerDocumentationEntry({
    component: DatagridComponent,
    displayName: 'Datagrid',
    urlSegment: 'datagrid',
    examples: [
        {
            component: ThreeRenderersDatagridExampleComponent,
            forComponent: null,
            title: 'Example with 3 types of grid renderers',
        },
        {
            component: CssClassesDatagridExampleComponent,
            forComponent: null,
            title: 'Component that holds an example of the css classes per row capability',
        },
        {
            component: ShowHideDatagridExampleComponent,
            forComponent: null,
            title: 'Show/Hide datagrid columns example',
        },
    ],
});

const declarations = [
    ShowHideDatagridExampleComponent,
    CssClassesDatagridExampleComponent,
    ThreeRenderersDatagridExampleComponent,
];

/**
 * A module that contains components that are various examples of features of the datagrid.
 */
@NgModule({
    declarations: [...declarations],
    imports: [CommonModule, ClarityModule, ReactiveFormsModule, DatagridModule],
    exports: [...declarations],
    entryComponents: [...declarations],
})
export class DatagridExamplesModule {}
