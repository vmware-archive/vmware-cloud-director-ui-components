/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { ComponentRenderer } from '../interfaces/datagrid-column.interface';
import { Component, Input } from '@angular/core';

export interface TooltipRendererConfiguration {
    text: string;
    tooltipText?: string | number;
    position?: 'top-left' | 'top-right';
}

/**
 * A {@link ComponentRenderer} component that is used for rendering a tooltip inside a column cell template
 * It takes in a value of type ToolTip which it uses as a con text for the content in side it's HTML. This is used with
 * {@link RendererSpec} to pass the value dynamically to it.
 *
 * Example usage with createColumnRendererSpec:
 * columns: GridColumn<MockRecord>[] = [
 * {
 *     displayName: 'Component Renderer',
 *     renderer: createColumnRendererSpec<MockRecord, Tooltip>(
 *       TooltipRendererComponent,
 *       (record: MockRecord) => ({text: record.name, tooltipText: record.details.gender})
 *       )
 *   }
 * ];
 */
@Component({
    template: `
        <clr-tooltip>
            <span clrTooltipTrigger>{{ configuration.text }}</span>
            <clr-tooltip-content [clrPosition]="configuration.position" clrSize="sm" *clrIfOpen>
                <span>{{ configuration.tooltipText }}</span>
            </clr-tooltip-content>
        </clr-tooltip>
    `,
})
export class TooltipRendererComponent implements ComponentRenderer<TooltipRendererConfiguration> {
    @Input()
    configuration: TooltipRendererConfiguration;
}
