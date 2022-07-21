/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

/*
 * Copyright 2017 VMware, Inc. All rights reserved. VMware Confidential
 */
export class PlatformUtil {
    public static readonly os = {
        isMobile: false,
    };

    public static browser = {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        get isOpera() { return  !!window['opera'] || navigator.userAgent.indexOf(' OPR/') >= 0;},
        // eslint-disable-next-line @typescript-eslint/dot-notation
        get isFirefox() { return typeof window['InstallTrigger'] !== 'undefined';},
        // eslint-disable-next-line @typescript-eslint/dot-notation
        get isSafari() { return Object.prototype.toString.call(window['HTMLElement']).indexOf('Constructor') > 0;},
        // eslint-disable-next-line @typescript-eslint/dot-notation
        get isChrome() { return !!window['chrome'] && !(!!window['opera'] || navigator.userAgent.indexOf(' OPR/') >= 0);},
        // eslint-disable-next-line @typescript-eslint/dot-notation
        get isIE() { return /*@cc_on!@*/ false || !!document['documentMode'];} // At least IE6
    };
}
