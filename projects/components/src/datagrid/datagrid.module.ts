/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { DatagridComponent } from './datagrid.component';
import { ComponentRendererOutletDirective } from './directives/component-renderer-outlet.directive';
import { PipesModule } from '../common/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FunctionRendererPipe } from './pipes/function-renderer.pipe';
import { BoldTextRendererComponent } from './renderers/bold-text-renderer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const directives = [DatagridComponent, ComponentRendererOutletDirective];
const pipes = [FunctionRendererPipe];
const renderers = [BoldTextRendererComponent];

@NgModule({
    imports: [CommonModule, ClarityModule, PipesModule, ReactiveFormsModule, BrowserAnimationsModule],
    declarations: [...directives, ...renderers, ...pipes],
    providers: [],
    exports: [DatagridComponent, ...renderers],
    entryComponents: [...renderers],
})
export class DatagridModule {}
