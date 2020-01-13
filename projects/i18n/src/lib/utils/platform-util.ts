/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

/*
 * Copyright 2017 VMware, Inc. All rights reserved. VMware Confidential
 */
export class PlatformUtil {
    public static readonly browser = {
        // tslint:disable-next-line: no-string-literal
        isOpera: !!window['opera'] || navigator.userAgent.indexOf(' OPR/') >= 0,
        // tslint:disable-next-line: no-string-literal
        isFirefox: typeof window['InstallTrigger'] !== 'undefined',
        // tslint:disable-next-line: no-string-literal
        isSafari: Object.prototype.toString.call(window['HTMLElement']).indexOf('Constructor') > 0,
        // tslint:disable-next-line: no-string-literal
        isChrome: !!window['chrome'] && !(!!window['opera'] || navigator.userAgent.indexOf(' OPR/') >= 0),
        // tslint:disable-next-line: no-string-literal
        isIE: /*@cc_on!@*/ false || !!document['documentMode'], // At least IE6
    };

    public static readonly os = {
        isMobile: false,
    };
}
