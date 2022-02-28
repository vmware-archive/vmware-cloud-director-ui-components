/*!
 * Copyright 2022 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Input } from '@angular/core';
import { HumanCertificate, HumanCertificateDetails } from '../../utils/certificate/human-certificate';

/**
 * Details view for a parsed certificate.
 */
@Component({
    selector: 'vcd-certificate-details-compact',
    templateUrl: 'certificate-details-compact.component.html',
    styleUrls: ['certificate-details-compact.component.scss'],
})
export class CertificateDetailsCompactComponent {
    /**
     * The parsed certificate information to display details of.
     */
    @Input() humanCertificate: HumanCertificate;

    /**
     * Loading indicator.
     */
    @Input() loading: boolean = true;

    /**
     * In case some error has occurred which prevents the system of showing the certificate's details.
     */
    @Input() errorMessage: string;

    constructor() {}

    get subjectDetails(): HumanCertificateDetails {
        return this.humanCertificate && this.humanCertificate.subject;
    }

    get issuerDetails(): HumanCertificateDetails {
        return this.humanCertificate && this.humanCertificate.issuer;
    }

    get expirationDate(): Date | undefined {
        return this.humanCertificate && this.humanCertificate.validTo.value;
    }
}
