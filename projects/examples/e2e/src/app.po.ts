/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { browser, by, element } from 'protractor';

export class AppPage {
    navigateTo(): Promise<any> {
        return browser.get(browser.baseUrl) as Promise<any>;
    }

    getTitleText(): Promise<string> {
        return element(by.css('vcd-root .content span')).getText() as Promise<string>;
    }
}
