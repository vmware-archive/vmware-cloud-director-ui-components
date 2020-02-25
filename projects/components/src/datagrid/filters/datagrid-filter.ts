/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { ClrDatagridFilterInterface } from '@clr/angular/data/datagrid/interfaces/filter.interface';
import { ClrDatagridFilter } from '@clr/angular';
import { Subject } from 'rxjs';
import { FilterBuilder } from '../../utils/filter-builder';
import { ComponentRenderer } from '..';
import { Input } from '@angular/core';

/**
 * Basic properties required by all the grid filters
 */
export interface FilterConfig<V> {
    /**
     * Used as a query field for server side filtering of the grid column
     */
    filterBy?: string;

    /**
     * Value with which grid data can be filtered before initially being rendered
     */
    value?: V;
}

export abstract class DatagridFilter<R, V, C extends FilterConfig<V>>
    implements ClrDatagridFilterInterface<R>, ComponentRenderer<C> {
    constructor(filterContainer: ClrDatagridFilter) {
        filterContainer.setFilter(this);
    }

    /**
     * Assigned from {@link ComponentRendererOutletDirective#assignValue} after the filter component is created
     */
    private _config: C;
    @Input() set config(val: C) {
        this._config = val;
        if (!!this.config.value) {
            this.setValue(this.config.value);
        }
    }
    get config(): C {
        return this._config;
    }

    /**
     * Emits whenever the filter form inputs changes
     */
    changes = new Subject<null>();

    /**
     * Setter for the input value of a grid filter used for assigning a value to
     * the filter from outside
     */
    abstract setValue(value: V): void;

    /**
     * For getting the filter UI widget values in {@link FilterBuilder} format
     */
    abstract getValue(): string;

    /**
     * Return true if the filter is currently activated (e.g. a value is provided)
     */
    abstract isActive(): boolean;

    /**
     * Required by Clarity.
     */
    accepts(resource: R): boolean {
        return true;
    }

    /**
     * Used in the {@link #getValue} method to make it part of the FIQL formatted string
     */
    get queryField(): string {
        if (this.config) {
            if (this.config.filterBy) {
                return this.config.filterBy;
            }
            throw Error('Query field is not specified');
        }
    }
}
