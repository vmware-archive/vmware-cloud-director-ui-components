/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { DatagridComponent } from './../../../datagrid/datagrid.component';
import { WidgetObject } from '../widget-object';
import { ClrDatagridWidgetObject } from './datagrid.wo';

/**
 * Widget Object for our VCD DataGrid
 */
export class VcdDatagridWidgetObject<R> extends WidgetObject<DatagridComponent<R>> {
    static tagName = `vcd-datagrid`;

    /**
     * Gives the header above the grid.
     */
    get gridHeader(): string {
        return this.getText('h3');
    }

    /**
     * Gives the widget object for this clr datagrid.
     */
    get clrDatagrid(): ClrDatagridWidgetObject {
        const constElement = this.findElement(ClrDatagridWidgetObject.tagName);
        return new ClrDatagridWidgetObject(this.fixture, constElement, constElement.componentInstance);
    }
}
