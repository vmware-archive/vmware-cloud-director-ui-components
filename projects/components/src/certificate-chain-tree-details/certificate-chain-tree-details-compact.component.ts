/*!
 * Copyright 2022 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PRESELECTION_MODE_LEAF } from '../utils/certificate/certificate-util';
import { HumanCertificate } from '../utils/certificate/human-certificate';

@Component({
    selector: 'vcd-certificate-chain-tree-details-compact',
    templateUrl: 'certificate-chain-tree-details-compact.component.html',
    styleUrls: ['certificate-chain-tree-details-compact.component.scss'],
})
export class CertificateChainTreeDetailsCompactComponent {
    /**
     * Certificate chain data in pem format.
     */
    @Input() public certificate: string;

    /**
     * Optional. Which node to preselect initially - root or leaf.
     */
    @Input() public preselectionMode: number = PRESELECTION_MODE_LEAF;

    /**
     * Emits the currently selected by the user certificate in the tree.
     */
    @Output()
    public certificateSelected: EventEmitter<HumanCertificate> = new EventEmitter<HumanCertificate>();

    selectedCertificate: HumanCertificate;

    onCertificateSelected($event: HumanCertificate): void {
        this.selectedCertificate = $event;
        this.certificateSelected.emit(this.selectedCertificate);
    }
}
