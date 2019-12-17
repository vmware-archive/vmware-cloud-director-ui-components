/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { DatagridComponent } from './datagrid.component';
import { TooltipRendererComponent } from './column-renderers/tooltip-renderer.component';
import { ComponentRendererOutletDirective } from './directives/component-renderer-outlet.directive';
import { PipesModule } from '../common/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';

const directives = [DatagridComponent, ComponentRendererOutletDirective];

@NgModule({
    imports: [CommonModule, ClarityModule, PipesModule, ReactiveFormsModule],
    declarations: [...directives, TooltipRendererComponent],
    providers: [],
    exports: [DatagridComponent],
    entryComponents: [TooltipRendererComponent],
})
export class DatagridModule {}
