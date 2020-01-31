/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { LinkedTextRendererComponent } from './renderers/linked-text-renderer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { DatagridComponent } from './datagrid.component';
import { ComponentRendererOutletDirective } from './directives/component-renderer-outlet.directive';
import { PipesModule } from '../common/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FunctionRendererPipe } from './pipes/function-renderer.pipe';
import { BoldTextRendererComponent } from './renderers/bold-text-renderer.component';
import { RouterModule } from '@angular/router';
import { CliptextModule } from '../cliptext/cliptext.module';

const directives = [DatagridComponent, ComponentRendererOutletDirective];
const pipes = [FunctionRendererPipe];
const renderers = [BoldTextRendererComponent, LinkedTextRendererComponent];

@NgModule({
    imports: [CommonModule, ClarityModule, RouterModule, PipesModule, ReactiveFormsModule, CliptextModule],
    declarations: [...directives, ...renderers, ...pipes],
    providers: [],
    exports: [DatagridComponent, ...renderers],
    entryComponents: [...renderers],
})
export class DatagridModule {}
