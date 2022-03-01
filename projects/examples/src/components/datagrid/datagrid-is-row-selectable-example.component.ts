/*!
 * Copyright 2022 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { GridColumn, GridDataFetchResult, GridSelectionType, GridState } from '@vcd/ui-components';

interface VM {
    href: string;
    name: string;
    isSelectable: boolean;
}

/**
 * Making data rows be unselectable.
 */
@Component({
    selector: 'vcd-datagrid-is-row-selectable-example',
    templateUrl: './datagrid-is-row-selectable-example.component.html',
})
export class DatagridIsRowSelectableExampleComponent {
    selectionType = GridSelectionType.Multi;
    GridSelectionType = GridSelectionType;

    gridData: GridDataFetchResult<VM> = {
        items: [],
    };

    columns: GridColumn<VM>[] = [
        {
            displayName: 'Name',
            renderer: 'name',
        },
        {
            displayName: 'Is Selectable',
            renderer: 'isSelectable',
        },
    ];

    isRowSelectableCallback = (vm: VM) => {
        return vm.isSelectable;
    };

    refresh(eventData: GridState<VM>): void {
        this.gridData = {
            items: [
                { href: 'https://abc.de/vm-1', name: 'vm-1', isSelectable: false },
                { href: 'https://abc.de/vm-2', name: 'vm-2', isSelectable: true },
                { href: 'https://abc.de/vm-3', name: 'vm-3', isSelectable: false },
                { href: 'https://abc.de/vm-4', name: 'vm-4', isSelectable: true },
            ],
            totalItems: 4,
        };
    }
}
