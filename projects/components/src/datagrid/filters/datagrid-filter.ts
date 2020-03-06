/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { ClrDatagridFilterInterface } from '@clr/angular/data/datagrid/interfaces/filter.interface';
import { ClrDatagridFilter } from '@clr/angular';
import { Subject } from 'rxjs';
import { ComponentRenderer, ComponentRendererSpec } from '../interfaces/component-renderer.interface';
import { Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * Properties required by all the grid filters
 */
export interface FilterConfig<V> {
    /**
     * Used as a query field for server side filtering of the grid column
     */
    queryField?: string;

    /**
     * Value with which grid data can be filtered before initially being rendered
     */
    value?: V;
}

/**
 * Renderer specification of a column that contains component type to be rendered in a filter widget and configuration for that
 * component. used by the {@link ComponentRendererOutletDirective}
 */
export interface FilterRendererSpec<C> extends ComponentRendererSpec<C> {
    /**
     *  Config object required for the configuration of component that will be rendered in the column filter widget
     */
    config: C;
}

/**
 * Extended by filter components used in {@link DatagridComponent}. Those components can only be used inside a
 * clr-dg-filter component and are dynamically rendered by {@link ComponentRendererOutletDirective} using
 * {@link GridColumn.filterRendererSpec}
 * V is the type of filter input value that is passed into setValue method
 * C extends FilterConfig<V> is configuration of a filter that contains queryField and a value of type V
 */
export abstract class DatagridFilter<V, C extends FilterConfig<V>>
    implements ClrDatagridFilterInterface<unknown>, ComponentRenderer<C> {
    formGroup: FormGroup;

    protected constructor(filterContainer: ClrDatagridFilter) {
        filterContainer.setFilter(this);
    }

    /**
     * Contains configuration needed for a filter UI widget and also it's value.
     * Assigned from {@link ComponentRendererOutletDirective#assignValue} after the filter component is created.
     * Used by the getValue method in sub classes to format the FIQL string output.
     */
    private _config: C;
    @Input() set config(val: C) {
        this._config = val;
        if (this._config.value) {
            this.setValue(this._config.value);
        }
    }

    get config(): C {
        return this._config;
    }

    /**
     * Emits whenever a filter form inputs changes
     */
    changes = new Subject<null>();

    /**
     * Used for assigning a value to a filter from outside
     */
    abstract setValue(value: V): void;

    /**
     * For getting the filter UI widget values in FIQL formatted string
     */
    abstract getValue(): string;

    /**
     * Return true if the filter is currently activated (e.g. a value is provided)
     */
    abstract isActive(): boolean;

    /**
     * Required by Clarity but ignored since we don't support client side filtering
     */
    accepts(): boolean {
        return true;
    }

    /**
     * Used in the {@link #getValue} method to make it part of the FIQL formatted string
     */
    get queryField(): string {
        if (this._config) {
            if (this._config.queryField) {
                return this._config.queryField;
            }
            throw Error('Query field is not specified');
        }
    }
}
