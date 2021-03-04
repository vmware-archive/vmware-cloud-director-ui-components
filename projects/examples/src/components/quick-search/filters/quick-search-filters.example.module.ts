/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { QuickSearchModule, VcdFormModule } from '@vcd/ui-components';
import { ActionsSearchProvider, QuickSearchFiltersExampleComponent } from './quick-search-filters.example.component';

@NgModule({
    imports: [CommonModule, ClarityModule, QuickSearchModule, VcdFormModule, ReactiveFormsModule],
    declarations: [QuickSearchFiltersExampleComponent],
    exports: [QuickSearchFiltersExampleComponent],
    entryComponents: [QuickSearchFiltersExampleComponent],
})
export class QuickSearchFiltersExampleModule {}
