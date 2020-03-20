/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Type } from '@angular/core';
import { BoldTextRendererComponent } from './bold-text-renderer.component';
import { WidgetObject } from '../../utils/test/widget-object';
import { VcdDatagridWidgetObject } from '../../utils/test/datagrid/vcd-datagrid.wo';

/**
 * Mixin that allows {@link ClrDatagridWidgetObject} to read information from {@link BoldTextRendererComponent}
 */
// tslint:disable-next-line:typedef
export function WithGridBoldRenderer<TBase extends Type<VcdDatagridWidgetObject<unknown>>>(Base: TBase) {
    return class extends Base {
        getBoldText(row: number, column: number): string {
            const cellElement = this.clrDatagrid.getCell(row, column);
            return this.getNodeText(this.findElement('strong', cellElement));
        }
    };
}

/**
 * Widget Object for the bold text renderer.
 */
export class BoldTextRendererWidgetObject extends WidgetObject<BoldTextRendererComponent> {
    static tagName = 'vcd-bold-text-renderer';

    get text(): string {
        return this.findElement('strong').nativeElement.textContent;
    }
}
