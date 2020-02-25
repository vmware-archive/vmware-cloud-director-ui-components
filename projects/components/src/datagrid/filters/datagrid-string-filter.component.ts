/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Host, Input } from '@angular/core';
import { DatagridFilter, FilterConfig } from './datagrid-filter';
import { ClrDatagridFilter } from '@clr/angular';
import { FilterBuilder } from '../../utils/filter-builder';
import { ComponentRenderer } from '..';

export enum WildCardPosition {
    START = 'START',
    END = 'END',
}

export interface DatagridStringFilterConfig<V> extends FilterConfig<V> {
    wildCardPosition: WildCardPosition;
}

@Component({
    selector: 'vcd-dg-string-filter',
    template: `
        <input #input type="text" name="search" [(ngModel)]="value" class="clr-input" />
    `,
})
export class DatagridStringFilterComponent<
    R,
    V extends string,
    C extends DatagridStringFilterConfig<V>
> extends DatagridFilter<R, V, C> {
    constructor(@Host() private filterContainer: ClrDatagridFilter) {
        super(filterContainer);
    }

    private _value: string;
    set value(val: string) {
        this._value = val;
        this.changes.next();
    }
    get value(): string {
        return this._value;
    }

    setValue(value: V): void {
        this.value = value;
    }

    getValue(): string {
        const filterBuilder = new FilterBuilder().is(this.queryField);
        let value = this.value;
        if (this.config && this.config.wildCardPosition) {
            value = this.config.wildCardPosition === WildCardPosition.START ? '*' + value : value + '*';
        }
        return filterBuilder.equalTo(value).getString();
    }

    isActive(): boolean {
        return !!this.value;
    }
}
