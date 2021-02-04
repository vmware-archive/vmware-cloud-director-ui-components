/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VcdComponentsModule } from '@vcd/ui-components';
import { SharingModalExampleComponent, SharingModalRendererComponent } from './sharing-modal-example.component';

@NgModule({
    declarations: [SharingModalExampleComponent, SharingModalRendererComponent],
    imports: [CommonModule, VcdComponentsModule],
    exports: [SharingModalExampleComponent],
    entryComponents: [SharingModalExampleComponent],
})
export class SharingModalExampleModule {}
