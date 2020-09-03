/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { QuickSearchModule, VcdFormModule } from '@vcd/ui-components';
import { QuickSearchNoTitleExampleComponent } from './quick-search-no-title.example.component';
import {
    ActionsSearchProvider,
    QuickSearchSyncAsyncExampleComponent,
} from './quick-search-sync-async.example.component';

/**
 * A module that imports all activity reporter examples.
 */
@NgModule({
    imports: [CommonModule, ClarityModule, QuickSearchModule, VcdFormModule, ReactiveFormsModule],
    declarations: [QuickSearchNoTitleExampleComponent, QuickSearchSyncAsyncExampleComponent],
    exports: [QuickSearchSyncAsyncExampleComponent],
    entryComponents: [QuickSearchSyncAsyncExampleComponent],
    providers: [ActionsSearchProvider],
})
export class QuickSearchSyncAsyncExampleModule {}
