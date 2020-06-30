/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { I18nModule } from '@vcd/i18n';
import { VcdActionMenuModule } from '../action-menu';
import { VcdActivityReporterModule } from '../common/activity-reporter/activity-reporter.module';
import { PipesModule } from '../common/pipes/pipes.module';
import { VcdFormModule } from '../form/form.module';
import { ShowClippedTextDirectiveModule } from '../lib/directives/show-clipped-text.directive.module';
import { DatagridComponent } from './datagrid.component';
import { ComponentRendererOutletDirective } from './directives/component-renderer-outlet.directive';
import { DatagridMultiSelectFilterComponent } from './filters/datagrid-multiselect-filter.component';
import { DatagridNumericFilterComponent } from './filters/datagrid-numeric-filter.component';
import { DatagridSelectFilterComponent } from './filters/datagrid-select-filter.component';
import { DatagridStringFilterComponent } from './filters/datagrid-string-filter.component';
import { FunctionRendererPipe } from './pipes/function-renderer.pipe';
import { BoldTextRendererComponent } from './renderers/bold-text-renderer.component';

const directives = [ComponentRendererOutletDirective];
const pipes = [FunctionRendererPipe];
const renderers = [BoldTextRendererComponent];
const filters = [
    DatagridNumericFilterComponent,
    DatagridStringFilterComponent,
    DatagridSelectFilterComponent,
    DatagridMultiSelectFilterComponent,
];

@NgModule({
    imports: [
        CommonModule,
        ClarityModule,
        RouterModule,
        PipesModule,
        ReactiveFormsModule,
        ShowClippedTextDirectiveModule,
        FormsModule,
        I18nModule,
        VcdActivityReporterModule,
        VcdFormModule,
        VcdActionMenuModule,
    ],
    declarations: [DatagridComponent, ...directives, ...renderers, ...pipes, ...filters],
    providers: [],
    exports: [DatagridComponent, ...renderers],
    entryComponents: [...renderers, ...filters],
})
export class VcdDatagridModule {}
