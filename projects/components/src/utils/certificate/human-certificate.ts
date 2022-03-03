/*!
 * Copyright 2022 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import Certificate from 'pkijs/src/Certificate';
import Time from 'pkijs/src/Time';

/**
 * Represents a human-readable certificate information.
 */
export class HumanCertificate {
    /**
     * Details of the Issuer.
     */
    issuer: HumanCertificateDetails;

    /**
     * Details of the Subject.
     */
    subject: HumanCertificateDetails;

    /**
     * The date/time the certificate is valid from.
     */
    validFrom: Time;

    /**
     * The date/time the certificate is valid to.
     */
    validTo: Time;

    /**
     * Indication if the certificate was valid at the time of acceptance/import.
     * The import/acceptance date was in the time range #validFrom - #validTo
     */
    isValid: Boolean;

    version: number;

    serialNumber: string;

    /**
     * The signature encryption algorithm: Can be:
     * "MD2", "MD2 with RSA", "MD5", "MD5 with RSA",
     * "SHA1", "SHA1 with DSA", "SHA1 with ECDSA", "SHA1 with RSA",
     * "SHA224", "SHA224 with RSA",
     * "SHA256", "SHA256 with RSA",
     * "SHA384", "SHA384 with RSA",
     * "SHA512", "SHA512 with RSA"
     */
    signatureAlgorithm: string;

    fingerprint: string;

    /**
     * The unparsed information of the certificate
     */
    raw: string;

    /**
     * Indication whether this certificate is a Certificate Authority one.
     */
    isCA: boolean;

    /**
     * Alternative names for the subject, if any.
     */
    subjectAlternativeNames: string[] | undefined;

    constructor(
        issuer: HumanCertificateDetails,
        subject: HumanCertificateDetails,
        certificate: Certificate,
        rawCertificate: string,
        fingerprint: string,
        serialNumber,
        signatureAlgorithm,
        isValid,
        isCertificateAuthority,
        subjectAlternativeNameValues
    ) {
        this.issuer = issuer;
        this.subject = subject;

        this.serialNumber = serialNumber;
        this.signatureAlgorithm = signatureAlgorithm;
        this.fingerprint = fingerprint || '';
        this.validFrom = certificate.notBefore;
        this.validTo = certificate.notAfter;
        this.isValid = isValid;
        /**
         * Add +1 to show the proper version,
         * according to this article https://tools.ietf.org/html/rfc2459#section-4.1
         */
        this.version = Number(certificate.version) + 1;
        this.raw = rawCertificate;
        this.isCA = isCertificateAuthority;
        this.subjectAlternativeNames = subjectAlternativeNameValues;
    }

    hasSubjectAlternativeNames(): boolean {
        return this.subjectAlternativeNames && this.subjectAlternativeNames.length > 0;
    }

    get subjectAlternativeNamesDisplayString(): string | undefined {
        return this.hasSubjectAlternativeNames() && this.subjectAlternativeNames.join(', ');
    }
}

/**
 * Represents a human-readable certificate details.
 */
export class HumanCertificateDetails {
    distinguishedName: string;
    email: string = '';
    commonName: string = '';
    organizationalUnit: string = '';
    organizationName: string = '';
    localityName: string = '';
    stateName: string = '';
    country: string = '';
    title?: string;
    givenName?: string;
    initials?: string;
    surname?: string;
}
