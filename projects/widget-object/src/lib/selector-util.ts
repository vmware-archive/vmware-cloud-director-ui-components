/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
import { FindElementOptions } from './widget-object';

export class SelectorUtil {
    /**
     * Extracts the selector from the parameter passed. It is possible that selector is a `FindElementOptions` but
     * does not contain dataUiSelector or cssSelector. That would
     *
     * @return a CSS selector string to be used or undefined if no CSS selector can be found
     */
    static extractSelector(selector: string | FindElementOptions): string | undefined {
        if (typeof selector === 'string') {
            return selector;
        } else {
            if (selector.dataUiSelector) {
                return `[data-ui="${selector.dataUiSelector}"]`;
            }

            return selector.cssSelector;
        }
    }
}
