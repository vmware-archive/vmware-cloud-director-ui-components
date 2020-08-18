/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { CypressWidgetDriver } from './cypress-widget-driver';
import { FindableWidget, FindParams, isFindParamsObject } from './widget-object';

declare const cy;

/**
 * Finds instances that implement {@link FindableWidget}
 * H is the host component's type
 */
export class CypressWidgetFinder {
    /**
     * Finds a single widget object
     * @throws An error if the widget is not found or if there are multiple instances
     */
    public find<C, T extends FindableWidget<C>>(params: FindParams<T> | T, parent?: any): InstanceType<T> {
        const defaults = { className: '' };
        const { woConstructor, className } = isFindParamsObject(params)
            ? { ...defaults, ...params }
            : { ...defaults, woConstructor: params };
        let query = woConstructor.tagName;
        if (className) {
            query += `.${className}`;
        }

        const ancestor = parent || cy;
        const widget = new woConstructor(new CypressWidgetDriver(ancestor.get(query)));
        if (!widget) {
            throw Error(`Did not find a <${query}>`);
        }
        return widget as InstanceType<T>;
    }
}
