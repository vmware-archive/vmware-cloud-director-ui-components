/*!
 * Copyright 2022 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CertificateProcessor } from './certificate-processor';

describe('CertificateProcessor', () => {
    // TODO add more test cases

    it('transforms to standard certificate fingerprint', () => {
        const fingerprint = CertificateProcessor.transformToStandardCertificateFingerprint('ABCDEF');

        expect(fingerprint).toEqual('AB:CD:EF');
    });
});
