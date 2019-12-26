/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Type } from '@angular/core';

/**
 * Implemented by all the component renderers
 */
export interface ComponentRenderer<T> {
    /**
     * Object used by the component renderers inside their HTML template
     */
    config: T;
}

/**
 * Used for the type safety of {@link ComponentRendererSpec#type}
 */
export type ComponentRendererConstructor<V> = Type<ComponentRenderer<V>>;

/**
 * An object that contains the constructor of a component{@link ComponentRenderer} to be displayed and value getter
 * function definition that would get the value to be used by the component in its template. This is useful for dynamically
 * rendering/configuring filters and columns/cells
 *
 * The directive{@link ComponentRendererOutletDirective} using this renderer spec to display the component will be
 * responsible for setting the actual renderer's value{@link ComponentRenderer#config} after dynamically
 * initializing it. But the caller is responsible for providing a config
 */
export interface ComponentRendererSpec<R, V> {
    /**
     * Constructor of a specific type of component renderer desired to be used
     */
    type: ComponentRendererConstructor<V>;

    /**
     * This can either be a function that creates the config object (in case of a cell renderer) or config object itself (in
     * case of a filter renderer) to be set on the ComponentRenderer.
     * @param value An object to be transformed into {@link ComponentRenderer#config}. It's passed in by the calling
     * component
     */
    config: (value?: R) => V | V;
}

/**
 * Utility function to enforce type safety on output of the config function. The output is used as value context
 * inside ComponentRenderer's template
 *
 * Example usage:
 * const gridColumn = {
 *   renderer: RendererSpec<SomeRecord, IconRendererConfiguration>(IconComponentRendererCtor, (r: SomeRecord) => v)
 * }
 *
 * In the above example, this method helps in making sure that the value "v" returned by the config function is of
 * IconRendererConfiguration type
 */
export function RendererSpec<R, C>(componentRendererSpec: {
    type: ComponentRendererConstructor<C>;
    /**
     *  This makes the return type be not used as the inference site for C and instead use the constructor type from the first argument.
     *  {@link https://stackoverflow.com/questions/59055154/typescript-generics-infer-type-from-the-type-of-function-arguments}
     */
    config: (record?: R) => C & {};
}): ComponentRendererSpec<R, C> {
    return componentRendererSpec;
}
