/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Type } from '@angular/core';
import { ClrDatagridWidgetObject } from '../../utils/test/datagrid/datagrid.wo';

/**
 * Mixin that allows {@link ClrDatagridWidgetObject} to read information from {@link BoldTextRendererComponent}
 */
// tslint:disable-next-line:typedef
export function WithGridBoldRenderer<TBase extends Type<ClrDatagridWidgetObject>>(Base: TBase) {
    return class extends Base {
        getBoldText(row: number, column: number): string {
            const cellElement = this.getCell(row, column);
            return this.getNodeText(this.findElement('strong', cellElement));
        }
    };
}
