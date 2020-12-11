/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { AlternativeTextDirective } from './alternative-text.directive';

@NgModule({
    declarations: [AlternativeTextDirective],
    exports: [AlternativeTextDirective],
})
export class AlternativeTextModule {}
