/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { WidgetObject } from '../widget-object';
import { DebugElement } from '@angular/core';
import { ClrDatagrid } from '@clr/angular';

const ROW_TAG = 'clr-dg-row';
const CELL_TAG = 'clr-dg-cell';
const COLUMN_CSS_SELECTOR = '.datagrid-column';

/**
 * Can be used by anyone who needs to assert information about a Clarity DataGrid
 */
export class DatagridWidgetObject extends WidgetObject<ClrDatagrid> {
    static tagName = `clr-datagrid`;

    getCellText(row: number, column: number): string {
        return this.getText(`${ROW_TAG}:nth-of-type(${row + 1}) ${CELL_TAG}:nth-of-type(${column + 1})`);
    }

    private get columns(): DebugElement[] {
        return this.findElements(COLUMN_CSS_SELECTOR);
    }

    get columnCount(): number {
        return this.component.columns ? this.component.columns.length : this.columns.length;
    }

    getColumnHeader(columnIndex: number): string {
        return this.getText(`${COLUMN_CSS_SELECTOR}:nth-of-type(${columnIndex + 1})`);
    }

    get columnHeaders(): string[] {
        return this.getTexts(COLUMN_CSS_SELECTOR);
    }

    private get rows(): DebugElement[] {
        return this.findElements(ROW_TAG);
    }

    get rowCount(): number {
        return this.rows.length;
    }
}
