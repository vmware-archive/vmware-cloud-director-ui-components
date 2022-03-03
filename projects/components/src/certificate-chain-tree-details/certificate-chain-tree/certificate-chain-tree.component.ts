/*!
 * Copyright 2022 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CertificateProcessingService } from '../../utils/certificate/certificate-processing.service';
import { CertificateProcessor } from '../../utils/certificate/certificate-processor';
import { PRESELECTION_MODE_LEAF, PRESELECTION_MODE_ROOT } from '../../utils/certificate/certificate-util';
import { HumanCertificate } from '../../utils/certificate/human-certificate';

const MAX_SUPPORTED_DEPTH = 4;

/**
 * Renders certificate chain with maximum depth of 4.
 */
@Component({
    selector: 'vcd-certificate-chain-tree',
    templateUrl: 'certificate-chain-tree.component.html',
    styleUrls: ['certificate-chain-tree.component.scss'],
})
export class CertificateChainTreeComponent {
    /**
     * Certificate chain data in pem format.
     */
    private _certificate: string;
    @Input()
    get certificate(): string {
        return this._certificate;
    }

    set certificate(value: string) {
        this._certificate = value;

        if (this._certificate) {
            this.getCertificateDetails();
        }
    }

    /**
     * Optional. Set to true in case the tree nodes should be clickable and marked.
     */
    @Input() selectionEnabled: boolean = false;

    /**
     * Optional. In selection mode, which node should be preselected: root or leaf.
     */
    private _preselectionMode = PRESELECTION_MODE_LEAF;
    @Input()
    get preselectionMode(): number {
        return this._preselectionMode;
    }

    set preselectionMode(value: number) {
        this._preselectionMode = value;
    }

    /**
     * This event will be emitted only if selection is enabled.
     */
    @Output()
    public certificateSelected: EventEmitter<HumanCertificate> = new EventEmitter<HumanCertificate>();

    MAX_SUPPORTED_DEPTH = MAX_SUPPORTED_DEPTH;

    humanCertificates: HumanCertificate[];
    certificateChain: HumanCertificate[];

    selectedNodeIndex: number = -1;

    loading: boolean;
    errorMessage: string;

    constructor(private certificateProcessingService: CertificateProcessingService) {}

    get certChainLength(): number {
        return (this.certificateChain && this.certificateChain.length) || -1;
    }

    checkActive(currentIndex: number): boolean {
        if (!this.selectionEnabled) {
            return false;
        }

        return currentIndex === this.selectedNodeIndex;
    }

    certNodeClicked($event, index): void {
        $event.preventDefault();
        $event.stopPropagation();

        this.selectCertificateNode(index);
    }

    private getCertificateDetails(): void {
        this.errorMessage = undefined;

        if (!this.certificate) {
            // nothing to parse
            return;
        }

        this.loading = true;
        this.certificateProcessingService
            .parseCertificate(this.certificate)
            .then((values) => {
                this.humanCertificates = values;
                this.certificateChain = CertificateProcessor.getCertificateChainTree(this.humanCertificates);

                this.selectCertificateNode(this.preselectedIndex);
            })
            .catch((error) => {
                this.errorMessage = error.message || error;
            })
            .finally(() => (this.loading = false));
    }

    private get preselectedIndex(): number {
        const leafIndex = this.certChainLength - 1;

        switch (this.preselectionMode) {
            case PRESELECTION_MODE_ROOT:
                return 0;
            case PRESELECTION_MODE_LEAF:
                return leafIndex;
            default:
                return leafIndex;
        }
    }

    private selectCertificateNode(index): void {
        if (!this.selectionEnabled) {
            return;
        }

        this.selectedNodeIndex = index;

        this.certificateSelected.emit(this.certificateChain[this.selectedNodeIndex]);
    }
}
