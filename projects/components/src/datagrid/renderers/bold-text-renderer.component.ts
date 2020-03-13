/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Input } from '@angular/core';
import { ComponentRenderer } from '../interfaces/component-renderer.interface';
import { ColumnRendererSpec, ColumnComponentRendererSpec } from '../interfaces/datagrid-column.interface';
/**
 * {@link ComponentRenderer.config} type that the {@link BoldTextRendererComponent} can understand
 */
export interface BoldTextRendererConfig {
    /**
     * Text to be displayed in bold font
     */
    text: string;
}

/**
 * A {@link ComponentRenderer} component that is used for rendering a bold text inside a column cell template
 *
 * @example Example usage with RendererSpec:
 *     columns: GridColumn<MockRecord>[] = [
 *       {
 *         displayName: 'Component Renderer',
 *         renderer: RendererSpec(
 *           BoldTextRendererComponent,
 *           (record: MockRecord) => ({text: record.name})
 *         )
 *       }
 *     ];
 */
@Component({
    selector: 'vcd-bold-text-renderer',
    template: `
        <strong>{{ config.text }}</strong>
    `,
})
export class BoldTextRendererComponent implements ComponentRenderer<BoldTextRendererConfig> {
    @Input()
    config: BoldTextRendererConfig;
}

/**
 * Creates a {@link ColumnRendererSpec} for rendering bold text in a column.
 */
export function BoldTextRenderer<R>(
    textExtractor: (record: R) => string
): ColumnRendererSpec<R, BoldTextRendererConfig> {
    return ColumnComponentRendererSpec({
        type: BoldTextRendererComponent,
        config(record): BoldTextRendererConfig {
            return {
                text: textExtractor(record),
            };
        },
    });
}
