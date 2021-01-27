/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

/**
 * Helper to create a promise from a setTimeout so we can await for it
 * @param ms How long to wait before resolving
 */
export function timeout(ms = 0): Promise<number> {
    // See https://github.com/microsoft/tslint-microsoft-contrib/issues/355
    // tslint:disable-next-line no-string-based-set-timeout
    return new Promise((resolve) => window.setTimeout(resolve, ms));
}
