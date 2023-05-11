/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
import { FindElementOptions } from './widget-object';

export class SelectorUtil {
    /**
     * Extracts the selector from the parameter passed
     */
    static extractSelector(selector: string | FindElementOptions): string {
        if (typeof selector === 'string') {
            return selector;
        }
        if (selector.dataUiSelector) {
            return `[data-ui="${selector.dataUiSelector}"]`;
        }

        if (!selector.cssSelector) {
            throw new Error('Expected selector to contain either a `dataUiSelector` or `cssSelector` property');
        }
        return selector.cssSelector;
    }
}
