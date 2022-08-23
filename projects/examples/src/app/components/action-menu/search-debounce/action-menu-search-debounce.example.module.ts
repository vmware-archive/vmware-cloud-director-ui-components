/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VcdComponentsModule } from '@vcd/ui-components';
import { ActionMenuSearchDebounceExampleComponent } from './action-menu-search-debounce.example.component';

@NgModule({
    declarations: [ActionMenuSearchDebounceExampleComponent],
    imports: [CommonModule, VcdComponentsModule],
    exports: [ActionMenuSearchDebounceExampleComponent],
})
export class ActionMenuSearchDebounceExampleModule {}
