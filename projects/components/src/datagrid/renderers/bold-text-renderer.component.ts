/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Input } from '@angular/core';
import { ComponentRenderer } from '../interfaces/component-renderer.interface';

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
 * It takes {@link ComponentRenderer.config} of type BoldTextRendererConfig as input. This is used as a context for the
 * content inside it's HTML. {@link RendererSpec} function is used to pass the config with type safety.
 *
 * Example usage with RendererSpec:
 * columns: GridColumn<MockRecord>[] = [
 *   {
 *     displayName: 'Component Renderer',
 *     renderer: RendererSpec(
 *       BoldTextRendererComponent,
 *       (record: MockRecord) => ({text: record.name})
 *     )
 *   }
 * ];
 */
@Component({
    template: `
        <strong>{{ config.text }}</strong>
    `,
})
export class BoldTextRendererComponent implements ComponentRenderer<BoldTextRendererConfig> {
    @Input()
    config: BoldTextRendererConfig;
}
