/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { NestedPropertyPipe } from './nested-property.pipe';
import { FunctionRendererPipe } from './function-renderer.pipe';

const declarations = [NestedPropertyPipe, FunctionRendererPipe];

@NgModule({
    declarations,
    exports: [...declarations],
})
export class PipesModule {}
