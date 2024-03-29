/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { BaseWidgetObject } from '../';
import { ClrDatagridWidgetObject } from './datagrid.wo';

/**
 * Widget Object for our VCD DataGrid
 */
export class VcdDatagridWidgetObject<T> extends BaseWidgetObject<T> {
    static tagName = `vcd-datagrid`;

    /**
     * Gives the header above the grid.
     */
    getHeader = this.factory.css('h3');

    /**
     * Gives the widget object for this `clr-datagrid`.
     */
    get clrDatagrid(): ClrDatagridWidgetObject<T> {
        return this.el.findWidget<ClrDatagridWidgetObject<T>>(ClrDatagridWidgetObject);
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
