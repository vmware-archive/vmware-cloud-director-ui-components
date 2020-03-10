/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Input } from '@angular/core';
import { ComponentRenderer } from '../interfaces/component-renderer.interface';
import { ColumnRendererSpec, ColumnComponentRendererSpec } from '../interfaces/datagrid-column.interface';

/**
 * {@link ComponentRenderer.config} type that the {@link LinkedTextRendererComponent} can understand
 */
export interface LinkedTextRendererConfig {
    /**
     * Text to be displayed as the anchor text
     */
    text: string;
    /**
     * Where the text should link to
     */
    textLink: string;
    /**
     * The cross-site link that the text should point to
     */
    // TODO: implement this functionality. See vcdCrossSiteLink.
    popoutLink?: string;
    /**
     * The tooltip text of the offiste link.
     */
    popoutLinkTooltip?: string;
}

/**
 * A {@link ComponentRenderer} component that is used for rendering a linked piece of text that also has an offsite link.
 *
 * @example Example usage with RendererSpec:
 *     columns: GridColumn<MockRecord>[] = [
 *       {
 *         displayName: 'Component Renderer',
 *         renderer: RendererSpec(
 *           LinkedTextRendererComponent,
 *           (record: MockRecord) => ({text: record.name, onsiteLink: './url'})
 *         )
 *       }
 *     ];
 */
@Component({
    template: `
        <div class="flex-container">
            <div class="with-margin-right text-truncate">
                <a [routerLink]="config.textLink" vcdShowClippedText>{{ config.text }}</a>
            </div>
            <clr-tooltip class="without-flex" *ngIf="config.popoutLink">
                <span clrTooltipTrigger>
                    <a [target]="'_blank'">
                        <clr-icon shape="pop-out"></clr-icon>
                    </a>
                </span>
                <ng-container *ngIf="config.popoutLinkTooltip">
                    <clr-tooltip-content *clrIfOpen [clrPosition]="'top-right'" [clrSize]="'md'">
                        <span>{{ config.popoutLinkTooltip }}</span>
                    </clr-tooltip-content>
                </ng-container>
            </clr-tooltip>
        </div>
    `,
    styles: [
        `
            .without-flex {
                flex: none;
            }

            .flex-container {
                display: flex;
            }

            .with-margin-right {
                margin-right: auto;
            }
        `,
    ],
})
export class LinkedTextRendererComponent implements ComponentRenderer<LinkedTextRendererConfig> {
    @Input()
    config: LinkedTextRendererConfig;

    /**
     * Creates a {@link ColumnRendererSpec} for rendering bold text in a column.
     */
    static factory<R>(
        configExtractor: (record: R) => LinkedTextRendererConfig
    ): ColumnRendererSpec<R, LinkedTextRendererConfig> {
        return ColumnComponentRendererSpec({
            type: LinkedTextRendererComponent,
            config: configExtractor,
        });
    }
}
