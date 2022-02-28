/*!
 * Copyright 2022 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { I18nModule } from '@vcd/i18n';
import { VcdErrorBannerModule } from '../common/error';
import { VcdLoadingIndicatorModule } from '../common/loading';
import { PipesModule } from '../common/pipes/pipes.module';
import { CertificateProcessingService } from '../utils/certificate/certificate-processing.service';
import { CertificateChainTreeDetailsCompactComponent } from './certificate-chain-tree-details-compact.component';
import { CertificateDetailsCompactComponent } from './certificate-details/certificate-details-compact.component';
import { CertificateChainTreeComponent } from './certificate-chain-tree/certificate-chain-tree.component';

@NgModule({
    declarations: [
        CertificateChainTreeComponent,
        CertificateChainTreeDetailsCompactComponent,
        CertificateDetailsCompactComponent,
    ],

    imports: [CommonModule, ClarityModule, I18nModule, PipesModule, VcdLoadingIndicatorModule, VcdErrorBannerModule],
    entryComponents: [
        CertificateChainTreeDetailsCompactComponent,
        CertificateChainTreeComponent,
        CertificateDetailsCompactComponent,
    ],
    exports: [
        CertificateChainTreeDetailsCompactComponent,
        CertificateChainTreeComponent,
        CertificateDetailsCompactComponent,
    ],
    providers: [CertificateProcessingService],
})
export class CertificateChainTreeDetailsModule {}
