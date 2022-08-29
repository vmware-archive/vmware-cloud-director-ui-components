/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClrDatagridFilter, ClrDatagridFilterInterface } from '@clr/angular';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { SubscriptionTracker } from '../../common/subscription/subscription-tracker';
import {
    ComponentRenderer,
    ComponentRendererConstructor,
    ComponentRendererSpec,
} from '../interfaces/component-renderer.interface';

/**
 * Number of milliseconds delayed before emitting the filter has changed observable
 */
export const DEBOUNCE_TIME_FOR_GRID_FILTER_CHANGES = 300;

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
 * {@link GridColumn.filter}
 * V is the type of filter input value that is passed into setValue method
 * C extends FilterConfig<V> is configuration of a filter that contains queryField and a value of type V
 */
@Directive({
    providers: [SubscriptionTracker],
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class DatagridFilter<V, C extends FilterConfig<V>>
    implements OnInit, ClrDatagridFilterInterface<V>, ComponentRenderer<C> {
    formGroup = this.createFormGroup();

    protected constructor(filterContainer: ClrDatagridFilter, private subscriptionTracker: SubscriptionTracker) {
        filterContainer.setFilter(this);
    }

    /**
     * Sets the configuration needed for a filter UI widget and also it's value.
     * Assigned from {@link ComponentRendererOutletDirective#assignValue} after the filter component is created.
     * Used by the getValue method in sub classes to format the FIQL string output.
     */
    protected _config: C;
    @Input() set config(val: C) {
        this.onBeforeSetConfig(val);
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

    ngOnInit(): void {
        const obs = this.getDebounceTimeMs()
            ? this.formGroup.valueChanges.pipe(debounceTime(this.getDebounceTimeMs()))
            : this.formGroup.valueChanges;
        this.subscriptionTracker.subscribe(obs, () => this.changes.next());
    }

    /**
     * To override the default delay time for emission of changes
     */
    protected getDebounceTimeMs(): number {
        return DEBOUNCE_TIME_FOR_GRID_FILTER_CHANGES;
    }

    /**
     * Called inside setter of {@link DatagridFilter#config} and Defined in the derived classes to perform some logic before
     * assigning the UI widget configuration and setting a value
     */
    protected onBeforeSetConfig(config: C): void {}

    /**
     * To initialize the {@link formGroup} from sub classes
     */
    abstract createFormGroup(): FormGroup;

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
     * @see unit tests of sub class {@link DatagridStringFilterComponent} for unit tests of following methods
     */
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

/**
 * Utility function to enforce type safety on config object of components of {@link ComponentRenderer} type. Used for creating
 * component renderer specifications of {@link FilterRendererSpec} type
 *
 * Example usage:
 * const gridColumn = {
 *   filterRendererSpec: FilterComponentRendererSpec({type: DatagridNumericFilterComponent, config: {value: [1, 2]}}),
 * }
 *
 * In the above examples these methods help in making sure that:
 * - Value "v" of the config property is of [number, number] type for gridColumn.filterRendererSpec
 *
 * #Note: 'C & {}' below makes the inference site for C be the constructor type from the first argument.
 * {@link https://stackoverflow.com/questions/59055154/typescript-generics-infer-type-from-the-type-of-function-arguments}
 */
export function FilterComponentRendererSpec<R, C>(componentRendererSpec: {
    type: ComponentRendererConstructor<C>;
    config: C & {};
}): FilterRendererSpec<C> {
    return componentRendererSpec;
}
