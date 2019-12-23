/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Input } from '@angular/core';
import { ComponentRenderer } from '../interfaces/component-renderer.interface';

/**
 * {@link ComponentRenderer.config} type that the {@link TooltipRendererComponent} can understand
 */
export interface TooltipRendererConfiguration {
    /**
     * Text displayed inside the tool tip trigger element
     */
    text: string;
    /**
     * Text displayed inside the tooltip
     */
    tooltipText: string;
    /**
     * Sets the direction in which the tooltip will open. This given as input to the {@link ClrTooltipContent.position}
     */
    position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'right' | 'left';
}

/**
 * A {@link ComponentRenderer} component that is used for rendering a tooltip inside a column cell template
 * It takes in a value of type ToolTip which it uses as a con text for the content in side it's HTML. This is used with
 * {@link RendererSpec} to pass the value dynamically to it.
 *
 * Example usage with RendererSpec:
 * columns: GridColumn<MockRecord>[] = [
 * {
 *     displayName: 'Component Renderer',
 *     renderer: RendererSpec(
 *       TooltipRendererComponent,
 *       (record: MockRecord) => ({text: record.name, tooltipText: record.details.gender})
 *       )
 *   }
 * ];
 */
@Component({
    template: `
        <clr-tooltip>
            <span clrTooltipTrigger>{{ config.text }}</span>
            <clr-tooltip-content [clrPosition]="config.position" clrSize="sm" *clrIfOpen>
                <span>{{ config.tooltipText }}</span>
            </clr-tooltip-content>
        </clr-tooltip>
    `,
})
export class TooltipRendererComponent implements ComponentRenderer<TooltipRendererConfiguration> {
    @Input()
    config: TooltipRendererConfiguration;
}
