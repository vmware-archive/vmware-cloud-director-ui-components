/*!
 * Copyright 2022 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Injectable } from '@angular/core';
import { PlatformUtil, TranslationService } from '@vcd/i18n';
import Certificate from 'pkijs/src/Certificate';
import { bufferToHexCodes } from 'pvutils';
import { CertificateProcessor } from './certificate-processor';
import { HumanCertificate } from './human-certificate';

@Injectable()
export class CertificateProcessingService {
    constructor(private translationService: TranslationService) {}

    public parseCertificate(certChain: string): Promise<any> {
        const rawCertificatesData: string[] = CertificateProcessor.getRawCertificates(certChain);

        if (!rawCertificatesData) {
            return Promise.reject(
                new Error(this.translationService.translate('certificates.management.error.parse.certificate'))
            );
        }

        const promises = [];
        rawCertificatesData.forEach((pem: string) => {
            try {
                const processedCert: ArrayBuffer = CertificateProcessor.convertPemToBinary(pem);

                try {
                    const certificate: Certificate = CertificateProcessor.createCertificate(processedCert);

                    promises.push(this.formatCertificateIntoHumanObjects(certificate, pem));
                } catch (error) {
                    promises.push(Promise.reject(error));
                }
            } catch (error) {
                promises.push(Promise.reject(error));
            }
        });

        return Promise.all(promises);
    }

    private async formatCertificateIntoHumanObjects(
        certificate: Certificate,
        rawCert: string
    ): Promise<HumanCertificate> {
        return this.getFingerprint(certificate).then((fingerprint: string) => {
            return Promise.resolve(CertificateProcessor.convertToHumanCertificate(certificate, rawCert, fingerprint));
        });
    }

    private getFingerprint(certificate: Certificate): Promise<string> {
        if (PlatformUtil.browser.isIE) {
            return this.getFingerprintIE(certificate);
        }

        return this.getFingerprintNonIE(certificate);
    }

    private getFingerprintIE(certificate: Certificate): Promise<string> {
        return new Promise<string>((resolve) => {
            const crypto = window.msCrypto;
            const operation = crypto.subtle.digest({ name: 'SHA-256' });
            operation.process(certificate.subjectPublicKeyInfo.toSchema().toBER(false));
            operation.finish(); // result will be returned asynchronously
            operation.oncomplete = function () {
                resolve(operation.result); // message digest as ArrayBuffer
            };
        });
    }

    private async getFingerprintNonIE(certificate: Certificate): Promise<string> {
        return bufferToHexCodes(
            await crypto.subtle.digest('SHA-256', certificate.subjectPublicKeyInfo.toSchema().toBER(false))
        );
    }
}
