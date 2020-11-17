/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { ResponsiveInputDirective } from './responsive-input.directive';

@NgModule({
    declarations: [ResponsiveInputDirective],
    exports: [ResponsiveInputDirective],
})
export class ResponsiveInputDirectiveModule {}
