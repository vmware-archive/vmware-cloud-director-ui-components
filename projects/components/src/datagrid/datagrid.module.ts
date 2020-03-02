/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { RouterModule } from '@angular/router';
import { DatagridComponent } from './datagrid.component';
import { ComponentRendererOutletDirective } from './directives/component-renderer-outlet.directive';
import { PipesModule } from '../common/pipes/pipes.module';
import { FunctionRendererPipe } from './pipes/function-renderer.pipe';
import { LinkedTextRendererComponent } from './renderers/linked-text-renderer.component';
import { BoldTextRendererComponent } from './renderers/bold-text-renderer.component';

const directives = [ComponentRendererOutletDirective];
const pipes = [FunctionRendererPipe];
const renderers = [BoldTextRendererComponent, LinkedTextRendererComponent];

@NgModule({
    imports: [CommonModule, ClarityModule, RouterModule, PipesModule, ReactiveFormsModule],
    declarations: [DatagridComponent, ...directives, ...renderers, ...pipes],
    providers: [],
    exports: [DatagridComponent, ...renderers],
    entryComponents: [...renderers],
})
export class DatagridModule {}
