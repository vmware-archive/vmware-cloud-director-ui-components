/*!
 * Copyright 2022 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { fromBER } from 'asn1js';
import AttributeTypeAndValue from 'pkijs/src/AttributeTypeAndValue';
import Certificate from 'pkijs/src/Certificate';
import { bufferToHexCodes } from 'pvutils';
import { HumanCertificate, HumanCertificateDetails } from './human-certificate';
import { CertificateUtil } from './certificate-util';

// Constants

const BEGIN_RSA_PRIVATE_KEY = '-BEGIN RSA PRIVATE KEY-';
const BEGIN_RSA_PUBLIC_KEY = '-BEGIN RSA PUBLIC KEY-';
const BEGIN_PUBLIC_KEY = '-BEGIN PUBLIC KEY-';
const BEGIN_CERTIFICATE = '-BEGIN CERTIFICATE-';
const BEGIN_PRIVATE_KEY = '-BEGIN PRIVATE KEY-';
const BEGIN_ENCRYPTED_PRIVATE_KEY = '-BEGIN ENCRYPTED PRIVATE KEY-';
const END_PRIVATE_KEY = '-END PRIVATE KEY-';
const END_CERTIFICATE = '-END CERTIFICATE-';
const END_PUBLIC_KEY = '-END PUBLIC KEY-';
const END_RSA_PRIVATE_KEY = '-END RSA PRIVATE KEY-';
const END_RSA_PUBLIC_KEY = '-END RSA PUBLIC KEY-';
const END_ENCRYPTED_PRIVATE_KEY = '-END ENCRYPTED PRIVATE KEY-';

const ENCRYPTION_ALGORITHMS_MAP = {
    '1.2.840.113549.2.1': 'MD2',
    '1.2.840.113549.1.1.2': 'MD2 with RSA',
    '1.2.840.113549.2.5': 'MD5',
    '1.2.840.113549.1.1.4': 'MD5 with RSA',
    '1.3.14.3.2.26': 'SHA1',
    '1.2.840.10040.4.3': 'SHA1 with DSA',
    '1.2.840.10045.4.1': 'SHA1 with ECDSA',
    '1.2.840.113549.1.1.5': 'SHA1 with RSA',
    '2.16.840.1.101.3.4.2.4': 'SHA224',
    '1.2.840.113549.1.1.14': 'SHA224 with RSA',
    '2.16.840.1.101.3.4.2.1': 'SHA256',
    '1.2.840.113549.1.1.11': 'SHA256 with RSA',
    '2.16.840.1.101.3.4.2.2': 'SHA384',
    '1.2.840.113549.1.1.12': 'SHA384 with RSA',
    '2.16.840.1.101.3.4.2.3': 'SHA512',
    '1.2.840.113549.1.1.13': 'SHA512 with RSA',
};

// Abstract Syntax Notation One (ASN.1) attribute types
const ATTRIBUTE_TYPE_COUNTRY_CODE = '2.5.4.6';
const ATTRIBUTE_TYPE_ORG_NAME = '2.5.4.10';
const ATTRIBUTE_TYPE_ORG_UNIT_NAME = '2.5.4.11';
const ATTRIBUTE_TYPE_COMMON_NAME = '2.5.4.3';
const ATTRIBUTE_TYPE_LOCALITY_NAME = '2.5.4.7';
const ATTRIBUTE_TYPE_STATE_NAME = '2.5.4.8';
const ATTRIBUTE_TYPE_TITLE = '2.5.4.12';
const ATTRIBUTE_TYPE_GIVEN_NAME = '2.5.4.42';
const ATTRIBUTE_TYPE_INITIALS = '2.5.4.43';
const ATTRIBUTE_TYPE_SURNAME = '2.5.4.4';
const ATTRIBUTE_TYPE_EMAIL_ADDRESS = '1.2.840.113549.1.9.1';
// Abstract Syntax Notation One (ASN.1) extension types
const EXTENSION_ID_BASIC_CONSTRAINTS_REGION = '2.5.29.19';
const EXTENSION_ID_SUBJECT_ALT_NAME = '2.5.29.17';

// Certificate details fields
const CERT_COMMON_NAME = 'CN';
const CERT_ORG_UNIT_NAME = 'OU';
const CERT_ORG_NAME = 'O';
const CERT_LOCALITY_NAME = 'L';
const CERT_STATE_NAME = 'S';
const CERT_COUNTRY_CODE = 'C';
const CERT_TITLE = 'T';
const CERT_GIVEN_NAME = 'GN';
const CERT_INITIALS = 'I';
const CERT_SURNAME = 'SN';
const CERT_EMAIL_ADDRESS = 'E-mail'; // this one is not by the standard, should be "E"

const ATTRIBUTE_TYPE_TO_CERTIFICATE_DETAILS_FIELD = {
    [ATTRIBUTE_TYPE_COUNTRY_CODE]: CERT_COUNTRY_CODE,
    [ATTRIBUTE_TYPE_ORG_NAME]: CERT_ORG_NAME,
    [ATTRIBUTE_TYPE_ORG_UNIT_NAME]: CERT_ORG_UNIT_NAME,
    [ATTRIBUTE_TYPE_COMMON_NAME]: CERT_COMMON_NAME,
    [ATTRIBUTE_TYPE_LOCALITY_NAME]: CERT_LOCALITY_NAME,
    [ATTRIBUTE_TYPE_STATE_NAME]: CERT_STATE_NAME,
    [ATTRIBUTE_TYPE_TITLE]: CERT_TITLE,
    [ATTRIBUTE_TYPE_GIVEN_NAME]: CERT_GIVEN_NAME,
    [ATTRIBUTE_TYPE_INITIALS]: CERT_INITIALS,
    [ATTRIBUTE_TYPE_SURNAME]: CERT_SURNAME,
    [ATTRIBUTE_TYPE_EMAIL_ADDRESS]: CERT_EMAIL_ADDRESS,
};

/**
 * Helper type for certificate chain nodes.
 */
type CertificateChainNode = {
    certificate: HumanCertificate;
    parent: number;
};

/**
 * Utility class for processing of certificates.
 */
export class CertificateProcessor {
    /**
     * Checks if the provided file contents are potentially a pem file.
     * @param fileContents string contents of the file.
     *
     * @returns true in case the file can be in PEM format.
     */
    public static isPotentialPemFile(fileContents: string): boolean {
        return this.containsPemPreamble(fileContents);
    }

    /**
     * Splits the provided certificate chain pem to multiple pem strings - one for each certificate.
     * @param certChain the certificate chain string in PEM format.
     *
     * @returns null in case the certificate chain could not be parsed.
     */
    public static getRawCertificates(certChain: string): string[] | null {
        if (!this.isPotentialPemFile(certChain)) {
            return null;
        }

        const lines = certChain.split('\n');

        const splitBy = lines.find((line) => {
            return this.containsPemPreamble(line);
        });

        if (!splitBy) {
            return null;
        }

        return certChain
            .split(splitBy)
            .filter(Boolean)
            .map((cert) => {
                return splitBy.concat(cert);
            });
    }

    /**
     * Converts the provided certificate in pem format to a binary.
     * @param pem contents of the certificate chain in PEM format.
     *
     * @returns binary ArrayBuffer, containing the certificate data.
     */
    public static convertPemToBinary(pem: string): ArrayBuffer {
        const lines = pem.split('\n');

        let encoded = '';
        for (const item of lines) {
            if (item.trim().length > 0 && !this.containsPemPreamble(item) && !this.containsPemEnding(item)) {
                encoded += item.trim();
            }
        }

        return this.base64StringToArrayBuffer(encoded);
    }

    /**
     * Create x.509 Certificate from the binary data provided.
     * @param certBuf ASN.1 BER encoded array of bytes, containing the binary certificate data.
     *
     * @returns the x.509 certificate, or undefined.
     */
    public static createCertificate(certBuf: ArrayBuffer | undefined | ''): Certificate | undefined {
        if (!certBuf) {
            return undefined;
        }

        return new Certificate({ schema: fromBER(certBuf).result });
    }

    /**
     * Converts the provided x.509 certificate to a certificate data in a human-readable format.
     *
     * @param certificate the x.509 certificate data.
     * @param rawCert the certificate data in PEM format.
     * @param fingerprint of the certificate.
     *
     * @returns HumanCertificate human-readable certificate data.
     */
    public static convertToHumanCertificate(
        certificate: Certificate,
        rawCert: string,
        fingerprint: string
    ): HumanCertificate {
        if (fingerprint) {
            fingerprint = this.transformToStandardCertificateFingerprint(fingerprint);
        }

        return new HumanCertificate(
            this.getHumanCertificateDetails(certificate.issuer.typesAndValues),
            this.getHumanCertificateDetails(certificate.subject.typesAndValues),
            certificate,
            rawCert,
            fingerprint,
            this.transformToStandardCertificateFingerprint(
                bufferToHexCodes(certificate.serialNumber.valueBlock.valueHex)
            ),
            this.getSignatureAlgorithm(certificate.signatureAlgorithm.algorithmId),
            CertificateUtil.validateToAndFrom(certificate.notBefore.value, certificate.notAfter.value),
            this.isCertificateAuthority(certificate),
            this.getSubjectAlternativeNameValues(certificate)
        );
    }

    /**
     * Returns the certificates ordered according to their chain, starting with root and finishing with the leaf
     * certificate.
     * @param certificates array of <code>HumanCertificate</code>-s.
     *
     * @returns ordered array of <code>HumanCertificate</code>-s.
     */
    public static getCertificateChainTree(certificates: HumanCertificate[]): HumanCertificate[] {
        const treeData: CertificateChainNode[] = this.convertToTreeData(certificates);
        const certificateChainTree: HumanCertificate[] = [];

        let currentIndex = -1; // root node parent index
        for (const item of certificates) {
            currentIndex = treeData.findIndex((node: CertificateChainNode) => node.parent === currentIndex);
            certificateChainTree.push(treeData[currentIndex].certificate);
        }

        return certificateChainTree;
    }

    private static convertToTreeData(certificates: HumanCertificate[]): CertificateChainNode[] {
        return certificates.map((cert: HumanCertificate) => {
            return {
                certificate: cert,
                parent: this.findParentCertificateIndex(certificates, cert),
            };
        });
    }

    private static findParentCertificateIndex(certificates: HumanCertificate[], certificate: HumanCertificate): number {
        const issuerDistinguishedName = certificate.issuer.distinguishedName;
        const subjectDistinguishedName = certificate.subject.distinguishedName;

        return certificates.findIndex((cert) => {
            const currentDistinguishedName = cert.subject.distinguishedName;

            return (
                currentDistinguishedName === issuerDistinguishedName &&
                currentDistinguishedName !== subjectDistinguishedName
            );
        });
    }

    private static base64StringToArrayBuffer(b64str: string): ArrayBuffer {
        const byteStr = atob(b64str);

        const bytes = new Uint8Array(byteStr.length);
        for (let i = 0; i < byteStr.length; i++) {
            bytes[i] = byteStr.charCodeAt(i);
        }

        return bytes.buffer;
    }

    private static getHumanCertificateDetails(typeValues: AttributeTypeAndValue[]): HumanCertificateDetails {
        const certificateDetails: HumanCertificateDetails = new HumanCertificateDetails();

        for (const typeAndValue of typeValues) {
            const value = typeAndValue.value.valueBlock.value;

            switch (ATTRIBUTE_TYPE_TO_CERTIFICATE_DETAILS_FIELD[typeAndValue.type]) {
                case CERT_EMAIL_ADDRESS:
                    certificateDetails.email = value;
                    break;
                case CERT_COMMON_NAME:
                    certificateDetails.commonName = value;
                    break;
                case CERT_ORG_UNIT_NAME:
                    certificateDetails.organizationalUnit = value;
                    break;
                case CERT_ORG_NAME:
                    certificateDetails.organizationName = value;
                    break;
                case CERT_LOCALITY_NAME:
                    certificateDetails.localityName = value;
                    break;
                case CERT_STATE_NAME:
                    certificateDetails.stateName = value;
                    break;
                case CERT_COUNTRY_CODE:
                    certificateDetails.country = value;
                    break;
                case CERT_TITLE:
                    certificateDetails.title = value;
                    break;
                case CERT_GIVEN_NAME:
                    certificateDetails.givenName = value;
                    break;
                case CERT_INITIALS:
                    certificateDetails.initials = value;
                    break;
                case CERT_SURNAME:
                    certificateDetails.surname = value;
                    break;
                default:
                    break;
            }
        }

        certificateDetails.distinguishedName = this.formatDistinguishedName(certificateDetails);

        return certificateDetails;
    }

    private static formatDistinguishedName(certificateDetails: HumanCertificateDetails): string {
        const nameMap = {
            country: CERT_COUNTRY_CODE,
            organizationName: CERT_ORG_NAME,
            organizationalUnit: CERT_ORG_UNIT_NAME,
            commonName: CERT_COMMON_NAME,
            localityName: CERT_LOCALITY_NAME,
            stateName: CERT_STATE_NAME,
            title: CERT_TITLE,
            givenName: CERT_GIVEN_NAME,
            initials: CERT_INITIALS,
            surname: CERT_SURNAME,
            email: CERT_EMAIL_ADDRESS,
        };

        return Object.keys(certificateDetails)
            .filter((el) => certificateDetails[el])
            .map((key) => `${nameMap[key]}=${certificateDetails[key]}`)
            .join(',');
    }

    private static getSignatureAlgorithm(key: string): any {
        return ENCRYPTION_ALGORITHMS_MAP[key] || '';
    }

    private static isCertificateAuthority(certificate: Certificate): boolean {
        const basicConstraintsRegion =
            certificate.extensions &&
            certificate.extensions.find((ext) => ext.extnID === EXTENSION_ID_BASIC_CONSTRAINTS_REGION);

        return (
            (basicConstraintsRegion && basicConstraintsRegion.parsedValue && basicConstraintsRegion.parsedValue.cA) ||
            false
        );
    }

    private static getSubjectAlternativeNameValues(certificate: Certificate): string[] | undefined {
        const subjectAlternativeNameExtension =
            certificate.extensions &&
            certificate.extensions.find((ext) => ext.extnID === EXTENSION_ID_SUBJECT_ALT_NAME);
        const alternativeNames =
            subjectAlternativeNameExtension &&
            subjectAlternativeNameExtension.parsedValue &&
            subjectAlternativeNameExtension.parsedValue.altNames;
        /*
         GeneralName ::= CHOICE {
             otherName                       [0]     OtherName,
             rfc822Name                      [1]     IA5String,
             dNSName                         [2]     IA5String,
             x400Address                     [3]     ORAddress,
             directoryName                   [4]     Name,
             ediPartyName                    [5]     EDIPartyName,
             uniformResourceIdentifier       [6]     IA5String,
             iPAddress                       [7]     OCTET STRING,
             registeredID                    [8]     OBJECT IDENTIFIER
         }
         */

        return (
            alternativeNames &&
            alternativeNames
                .filter((entry) => entry.type === 2 || entry.type === 7)
                .map((entry) => {
                    const value = entry.value;

                    switch (entry.type) {
                        case 2:
                            // DNS Name
                            return value;
                        case 7:
                            // IP Address
                            let ipAddress: string;
                            const hexBuffer: ArrayBuffer = value && value.valueBlock && value.valueBlock.valueHex;

                            if (!!hexBuffer && hexBuffer.byteLength > 0) {
                                const ipAddressHex = bufferToHexCodes(hexBuffer);

                                ipAddress = this.formatToIPv4(ipAddressHex);
                            }

                            return ipAddress;
                    }
                })
        );
    }

    private static containsPemPreamble(line: string): boolean {
        if (!line || line.trim().length === 0) {
            return false;
        }

        return (
            line.indexOf(BEGIN_RSA_PRIVATE_KEY) > -1 ||
            line.indexOf(BEGIN_RSA_PUBLIC_KEY) > -1 ||
            line.indexOf(BEGIN_PUBLIC_KEY) > -1 ||
            line.indexOf(BEGIN_CERTIFICATE) > -1 ||
            line.indexOf(BEGIN_PRIVATE_KEY) > -1 ||
            line.indexOf(BEGIN_ENCRYPTED_PRIVATE_KEY) > -1
        );
    }

    private static containsPemEnding(line: string): boolean {
        if (!line || line.trim().length === 0) {
            return false;
        }

        return (
            line.indexOf(END_PRIVATE_KEY) > -1 ||
            line.indexOf(END_CERTIFICATE) > -1 ||
            line.indexOf(END_PUBLIC_KEY) > -1 ||
            line.indexOf(END_RSA_PRIVATE_KEY) > -1 ||
            line.indexOf(END_RSA_PUBLIC_KEY) > -1 ||
            line.indexOf(END_ENCRYPTED_PRIVATE_KEY) > -1
        );
    }

    private static formatToIPv4(hexValue): string {
        const ip = parseInt(hexValue, 16);

        const formattedAddress = [];
        for (let i = 0; i < 4; i++) {
            formattedAddress[i] = (ip >> (8 * (3 - i))) & 0xff;
        }

        return formattedAddress.join('.');
    }

    /**
     * Transforms the provided fingerprint string to standard certificate fingerprint.
     * Example:
     * Accepts: "ABCDEF"
     * Return: "AB:CD:EF"
     */
    public static transformToStandardCertificateFingerprint(originalFingerprint: string): string {
        const fingerprintChars: string[] = originalFingerprint.split('');

        return (
            fingerprintChars
                .map((ch: string, index: number) => {
                    // make tuple string
                    return `${ch}${fingerprintChars.splice(index + 1, 1)}`;
                })
                // filter empty strings
                .filter(Boolean)
                // Join the char tuples with : separator
                .join(':')
        );
    }
}
