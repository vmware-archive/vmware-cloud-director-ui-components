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
    getHeader = this.locatorForChild('h3');

    /**
     * Gives the widget object for this `clr-datagrid`.
     */
    findClrDatagrid(): ClrDatagridWidgetObject<T> {
        // @ts-ignore
        return this.locatorDriver.findWidget(ClrDatagridWidgetObject);
    }

    /**
     * Unwraps the `vcd-datagrid`
     */
    unwrap(): T {
        return this.locatorDriver.unwrap();
    }
}
