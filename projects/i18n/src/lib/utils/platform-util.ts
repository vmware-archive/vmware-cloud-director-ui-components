/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

/*
 * Copyright 2017 VMware, Inc. All rights reserved. VMware Confidential
 */
export class PlatformUtil {
    public static readonly browser = {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        isOpera: !!window['opera'] || navigator.userAgent.indexOf(' OPR/') >= 0,
        // eslint-disable-next-line @typescript-eslint/dot-notation
        isFirefox: typeof window['InstallTrigger'] !== 'undefined',
        // eslint-disable-next-line @typescript-eslint/dot-notation
        isSafari: Object.prototype.toString.call(window['HTMLElement']).indexOf('Constructor') > 0,
        // eslint-disable-next-line @typescript-eslint/dot-notation
        isChrome: !!window['chrome'] && !(!!window['opera'] || navigator.userAgent.indexOf(' OPR/') >= 0),
        // eslint-disable-next-line @typescript-eslint/dot-notation
        isIE: /*@cc_on!@*/ false || !!document['documentMode'], // At least IE6
    };

    public static readonly os = {
        isMobile: false,
    };
}
