/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { QuickSearchModule, VcdFormModule } from '@vcd/ui-components';
import {
    ActionsSearchProvider,
    QuickSearchHideEmptySectionExampleComponent,
} from './quick-search-hide-empty-section-example.component';

@NgModule({
    imports: [CommonModule, ClarityModule, QuickSearchModule, VcdFormModule, ReactiveFormsModule],
    declarations: [QuickSearchHideEmptySectionExampleComponent],
    exports: [QuickSearchHideEmptySectionExampleComponent],
    entryComponents: [QuickSearchHideEmptySectionExampleComponent],
    providers: [
        {
            provide: ActionsSearchProvider,
            useValue: new ActionsSearchProvider(false),
        },
    ],
})
export class QuickSearchHideEmptySectionExampleModule {}
