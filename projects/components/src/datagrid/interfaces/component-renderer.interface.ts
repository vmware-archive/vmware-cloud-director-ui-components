/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Type } from '@angular/core';
import { FilterRendererSpec } from '../filters/datagrid-filter';
import { ColumnRendererSpec } from '../interfaces/datagrid-column.interface';

/**
 * Implemented by all the component renderers. The components that have to be rendered dynamically.
 */
export interface ComponentRenderer<T> {
    /**
     * Object used by the component renderers inside their HTML template
     */
    config: T;
}

/**
 * Used for the type safety of {@link ColumnRendererSpec#type}
 */
export type ComponentRendererConstructor<V> = Type<ComponentRenderer<V>>;

/**
 * An object that contains the constructor of a component of {@link ComponentRenderer} type that has to be rendered dynamically.
 *
 * {@link ComponentRendererOutletDirective} uses this object to render the component. It is responsible for setting the
 * component's configuration{@link ComponentRenderer#config} after dynamically initializing it. But the caller is responsible
 * for providing a config
 */
export interface ComponentRendererSpec<C> {
    /**
     * Constructor of a specific type of component to be rendered
     */
    type: ComponentRendererConstructor<C>;
    /**
     * {@link ComponentRenderer.config}. In the case of a {@link ColumnRendererSpec} it is a function that takes a rest
     * item as input and returns an object of {@link ComponentRenderer.config}
     */
    config: C | ((restItem: unknown) => C);
}

/**
 * Utility functions to enforce type safety on config object of components of {@link ComponentRenderer} type. Used for creating
 * component renderer specifications of {@link ColumnRendererSpec}, {@link FilterRendererSpec} type
 *
 * Example usage:
 * const gridColumn = {
 *   renderer: ColumnComponentRendererSpec({type: BoldTextRendererComponent, config: record => ({text: ''}),
 *   filterRendererSpec: FilterComponentRendererSpec({type: DatagridNumericFilterComponent, config: {value: [1, 2]}}),
 * }
 *
 * In the above examples these methods help in making sure that:
 * - Value "v" returned by the config function is of BoldTextRendererConfig type for gridColumn.renderer
 * - Value "v" of the config property is of [number, number] type for gridColumn.filterRendererSpec
 *
 * #Note: 'C & {}' below makes the inference site for C be the constructor type from the first argument.
 * {@link https://stackoverflow.com/questions/59055154/typescript-generics-infer-type-from-the-type-of-function-arguments}
 */
export function ColumnComponentRendererSpec<R, C>(componentRendererSpec: {
    type: ComponentRendererConstructor<C>;
    config: (record?: R) => C & {};
}): ColumnRendererSpec<R, C> {
    return componentRendererSpec;
}
export function FilterComponentRendererSpec<R, C>(componentRendererSpec: {
    type: ComponentRendererConstructor<C>;
    config: C & {};
}): FilterRendererSpec<C> {
    return componentRendererSpec;
}
