/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { WidgetObject } from '../widget-object';
import { DebugElement } from '@angular/core';
import { DatagridComponent } from '../../../datagrid/datagrid.component';

const ROW_TAG = 'clr-dg-row';
const CELL_TAG = 'clr-dg-cell';
const COLUMN_CSS_SELECTOR = '.datagrid-column';
const ROW_CSS_SELECTOR = '.datagrid-row';

export class DatagridWidgetObject<T> extends WidgetObject<DatagridComponent<T>> {
    static tagName = `vcd-datagrid`;

    private getCell(row: number, column: number): Element {
        return this.root.nativeElement.querySelectorAll(ROW_TAG)[row].querySelectorAll(CELL_TAG)[column];
    }

    getCellText(row: number, column: number): string {
        return this.getText(this.getCell(row, column));
    }

    private get columns(): DebugElement[] {
        return this.findElements(COLUMN_CSS_SELECTOR, this.root);
    }

    get columnCount(): number {
        return this.root.componentInstance.columns ? this.root.componentInstance.columns.length : this.columns.length;
    }

    getColumnHeader(columnIndex: number): string {
        return this.getText(this.columns[columnIndex]);
    }

    get columnHeaders(): string[] {
        return this.columns.map(col => this.getText(col));
    }

    private get rows(): DebugElement[] {
        return this.root.nativeElement.querySelectorAll(ROW_TAG);
    }

    get rowCount(): number {
        return this.rows.length;
    }
}