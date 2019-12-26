/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { DataExporterComponent } from './data-exporter.component';
import { WidgetObject } from '../utils/test/widget-object';

/**
 * Testing Object for {@link DataExporterComponent}
 */
export class DataExporterWidgetObject extends WidgetObject<DataExporterComponent> {
    static tagName = 'vcd-data-exporter';

    get isOpen(): boolean {
        return this.component.open;
    }

    get columnCheckBoxes(): string[] {
        return this.findElements('.column-selection ').map(el => this.getText(el));
    }

    clickCancel(): void {
        this.click('.cancel');
    }
}
