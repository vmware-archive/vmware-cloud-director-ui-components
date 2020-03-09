/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { RouterModule } from '@angular/router';
import { DatagridComponent } from './datagrid.component';
import { ComponentRendererOutletDirective } from './directives/component-renderer-outlet.directive';
import { PipesModule } from '../common/pipes/pipes.module';
import { FunctionRendererPipe } from './pipes/function-renderer.pipe';
import { LinkedTextRendererComponent } from './renderers/linked-text-renderer.component';
import { BoldTextRendererComponent } from './renderers/bold-text-renderer.component';
import { ShowClippedTextDirectiveModule } from '../lib/directives/show-clipped-text.directive.module';
import { DatagridStringFilterComponent } from './filters/datagrid-string-filter.component';
import { DatagridNumericFilterComponent } from './filters/datagrid-numeric-filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const directives = [ComponentRendererOutletDirective];
const pipes = [FunctionRendererPipe];
const renderers = [BoldTextRendererComponent, LinkedTextRendererComponent];
const filters = [DatagridNumericFilterComponent, DatagridStringFilterComponent];

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
    ],
    declarations: [DatagridComponent, ...directives, ...renderers, ...pipes, ...filters],
    providers: [],
    exports: [DatagridComponent, ...renderers],
    entryComponents: [...renderers, ...filters],
})
export class DatagridModule {}
