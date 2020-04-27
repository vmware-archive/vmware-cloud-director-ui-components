/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Host, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ClrDatagridFilter } from '@clr/angular';
import { FilterBuilder } from '../../utils/filter-builder';
import { DatagridFilter, FilterComponentRendererSpec, FilterConfig, FilterRendererSpec } from './datagrid-filter';

export enum WildCardPosition {
    NONE = 0,
    START = 1,
    END = 2,
    WRAP = WildCardPosition.START | WildCardPosition.END,
}

/**
 * Configures the '*' position in the FIQL string output
 */
export interface DatagridStringFilterConfig extends FilterConfig<string> {
    wildCardPosition?: WildCardPosition;
}

@Component({
    selector: 'vcd-dg-string-filter',
    templateUrl: 'datagrid-string-filter.component.html',
})
export class DatagridStringFilterComponent extends DatagridFilter<string, DatagridStringFilterConfig>
    implements OnDestroy {
    createFormGroup(): FormGroup {
        return new FormGroup({
            filterText: new FormControl(''),
        });
    }

    constructor(@Host() private filterContainer: ClrDatagridFilter) {
        super(filterContainer);
    }

    setValue(value: string): void {
        this.formGroup.setValue({
            filterText: value,
        });
    }

    getValue(): string {
        const filterBuilder = new FilterBuilder().is(this.queryField);
        let value = this.formGroup.get('filterText').value;
        if (this.config && this.config.wildCardPosition) {
            value = this.addWildCard(value, this.config.wildCardPosition);
        }
        return filterBuilder.equalTo(value).getString();
    }

    isActive(): boolean {
        return !!this.formGroup && this.formGroup.get('filterText').value;
    }

    /**
     * Wraps a string with a `wrapCharacter` in given position;
     */
    private addWildCard(input: string, position: WildCardPosition, wildcardCharacter = '*'): string {
        const start = getWrapCharacter(position, WildCardPosition.START);
        const end = getWrapCharacter(position, WildCardPosition.END);
        return `${start}${input}${end}`;
        /**
         * @return `wrapCharacter` if the passed in position should show it, an empty string otherwise
         */
        function getWrapCharacter(inputPosition: WildCardPosition, checkPosition: WildCardPosition): string {
            return inputPosition & checkPosition ? wildcardCharacter : '';
        }
    }

    ngOnDestroy(): void {}
}

/**
 * Creates a {@link FilterRendererSpec} with the given config.
 * @param wildCardPosition where the * should go in the FIQL string output.
 * @param value the default value of the filter
 */
export function DatagridStringFilter(
    wildCardPosition?: WildCardPosition,
    value?: string
): FilterRendererSpec<DatagridStringFilterConfig> {
    return FilterComponentRendererSpec({
        type: DatagridStringFilterComponent,
        config: {
            wildCardPosition,
            value,
        },
    });
}
