/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { ShowClippedTextDirective } from './show-clipped-text.directive';

@NgModule({
    declarations: [ShowClippedTextDirective],
    exports: [ShowClippedTextDirective],
})
export class ShowClippedTextDirectiveModule {}
