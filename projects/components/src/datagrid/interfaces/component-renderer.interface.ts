/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Type } from '@angular/core';

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
