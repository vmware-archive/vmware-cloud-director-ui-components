/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Input } from '@angular/core';
import {
    GridColumn,
    GridDataFetchResult,
    GridState,
    ComponentRenderer,
    ColumnComponentRendererSpec,
    ColumnRendererSpec,
} from '@vcd/ui-components';

interface Data {
    href: string;
}

@Component({
    selector: 'vcd-datagrid-row-icon-example',
    template: `
        <vcd-datagrid [gridData]="gridData" (gridRefresh)="refresh($event)" [columns]="columns"></vcd-datagrid>
    `,
})
export class DatagridRowIconExampleComponent {
    gridData: GridDataFetchResult<Data> = {
        items: [],
    };

    columns: GridColumn<Data>[] = [
        {
            displayName: 'Some Column',
            renderer: RowIconRenderer(() => this.updateData()),
        },
    ];

    updateData(): void {
        this.gridData = {
            items: [{ href: 'a' }, { href: 'b' }, { href: 'c' }, { href: 'd' }, { href: 'e' }],
            totalItems: 2,
        };
    }

    refresh(eventData: GridState<Data>): void {
        this.gridData = {
            items: [{ href: 'a' }, { href: 'b' }, { href: 'c' }, { href: 'd' }, { href: 'e' }],
            totalItems: 2,
        };
    }
}

export interface RowIconRenderConfig {
    iconShownChanged: () => void;
}

@Component({
    selector: 'vcd-row-icon-renderer',
    template: `
        <button (click)="opened = !opened; config.iconShownChanged()"></button>
        <clr-modal [(clrModalOpen)]="opened" [clrModalSize]="'sm'">
            Modal!
        </clr-modal>
    `,
})
export class RowIconRendererComponent implements ComponentRenderer<RowIconRenderConfig> {
    @Input()
    config: RowIconRenderConfig;

    opened = false;
}

export function RowIconRenderer<R>(callback: () => void): ColumnRendererSpec<R, RowIconRenderConfig> {
    return ColumnComponentRendererSpec({
        type: RowIconRendererComponent,
        config(): RowIconRenderConfig {
            return {
                iconShownChanged: callback,
            };
        },
    });
}
