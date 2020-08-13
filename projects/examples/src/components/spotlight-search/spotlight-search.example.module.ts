/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { SpotlightSearchModule, VcdFormModule } from '@vcd/ui-components';
import { ActionsSearchProvider, SpotlightSearchExampleComponent } from './spotlight-search-example.component';
import { SpotlightSearchNoTitleExampleComponent } from './spotlight-search-no-title-example.component';

/**
 * A module that imports all activity reporter examples.
 */
@NgModule({
    imports: [ClarityModule, SpotlightSearchModule, VcdFormModule, ReactiveFormsModule],
    declarations: [SpotlightSearchNoTitleExampleComponent, SpotlightSearchExampleComponent],
    exports: [SpotlightSearchExampleComponent],
    entryComponents: [SpotlightSearchExampleComponent],
    providers: [ActionsSearchProvider],
})
export class SpotlightSearchExampleModule {}
