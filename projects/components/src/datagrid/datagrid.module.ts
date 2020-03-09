/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { I18nModule } from '@vcd/i18n';
import { DatagridComponent } from './datagrid.component';
import { ComponentRendererOutletDirective } from './directives/component-renderer-outlet.directive';
import { PipesModule } from '../common/pipes/pipes.module';
import { FunctionRendererPipe } from './pipes/function-renderer.pipe';
import { BoldTextRendererComponent } from './renderers/bold-text-renderer.component';
import { ShowClippedTextDirectiveModule } from '../lib/directives/show-clipped-text.directive.module';
import { DatagridStringFilterComponent } from './filters/datagrid-string-filter.component';
import { DatagridNumericFilterComponent } from './filters/datagrid-numeric-filter.component';
import { DatagridSelectFilterComponent } from './filters/datagrid-select-filter.component';
import { DatagridMultiSelectFilterComponent } from './filters/datagrid-multiselect-filter.component';
import { ActivityReporterModule } from '../common/activity-reporter/activity-reporter.module';

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
        BrowserAnimationsModule,
        I18nModule,
        ActivityReporterModule,
    ],
    declarations: [DatagridComponent, ...directives, ...renderers, ...pipes, ...filters],
    providers: [],
    exports: [DatagridComponent, ...renderers],
    entryComponents: [...renderers, ...filters],
})
export class DatagridModule {}
