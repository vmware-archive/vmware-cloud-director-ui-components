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
        } else {
            if (selector.dataUiSelector) {
                return `[data-ui="${selector.dataUiSelector}"]`;
            }

            return selector.cssSelector;
        }
    }
}
