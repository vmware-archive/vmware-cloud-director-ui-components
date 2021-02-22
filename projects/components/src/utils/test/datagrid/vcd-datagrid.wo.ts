/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { BaseWidgetObject } from '../widget-object/widget-object';
import { ClrDatagridWidgetObject } from './datagrid.wo';

/**
 * Widget Object for our VCD DataGrid
 */
export class VcdDatagridWidgetObject<T> extends BaseWidgetObject<T> {
    static tagName = `vcd-datagrid`;

    /**
     * Gives the header above the grid.
     */
    getHeader = this.locatorForCssSelectors('h3');

    /**
     * Gives the widget object for this `clr-datagrid`.
     */
    get clrDatagrid(): ClrDatagridWidgetObject<T> {
        return this.locatorDriver.findWidget<ClrDatagridWidgetObject<T>>(ClrDatagridWidgetObject);
    }

    /**
     * Unwraps the `vcd-datagrid`
     *
     * @deprecated Please use {@link VcdDatagridWidgetObject.self()}.
     */
    get vcdDatagrid(): T {
        return this.self();
    }
}
