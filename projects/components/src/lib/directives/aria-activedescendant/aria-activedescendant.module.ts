/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
import { NgModule } from '@angular/core';
import { AriaActiveDescendantDirective } from './aria-active-descendant.directive';

@NgModule({
    declarations: [AriaActiveDescendantDirective],
    exports: [AriaActiveDescendantDirective],
})
export class AriaActivedescendantModule {}
