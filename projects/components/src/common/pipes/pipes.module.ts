/*!
 * Copyright 2019-2022 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { NestedPropertyPipe } from './nested-property.pipe';
import { NoInfoPipe } from './no-info.pipe';

const declarations = [NestedPropertyPipe, NoInfoPipe];

@NgModule({
    declarations,
    exports: [...declarations],
})
export class PipesModule {}
