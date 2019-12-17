/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

/**
 * Whether something shows up in the column toggler
 */

import { Type } from '@angular/core';

export enum GridColumnHideable {
    /**
     * Does not show up in column toggle box
     */
    Never = 'NEVER',
    /**
     * Shows up in column toggle box, column is visible
     */
    Shown = 'SHOWN',
    /**
     * Shows up in column toggle box, column is hidden
     */
    Hidden = 'HIDDEN',
}

/**
 * The sorting direction of the column values
 */
export enum GridColumnSortDirection {
    Asc = 'ASCENDING',
    Desc = 'DESCENDING',
    None = 'NONE',
}

/**
 * Column renderer as a function. Defined in calling component when the cell value is calculated from different
 * properties.
 * @param record The record for the row being rendered
 * @return The string to be displayed for that cell
 */
export type FunctionRenderer<T> = (record: T) => string;

/**
 * Configuration object defined in the caller. This contains properties for the column header (text, filtering,
 * sorting, toggling etc.,) and content for row cells.
 *
 * Example:
 * const gridColumn: GridColumn<SomeRecord> = {
 *   displayName: "Column Heading",
 *   renderer: "someRecord.property",
 *   hideable: "NEVER"
 * }
 *
 * The above column is rendered with "Column Heading" text in it's heading and it is not shown in the column toggler.
 * The value of the property "someRecord.property" is rendered in cells corresponding to the column.
 */
export interface GridColumn<R> {
    /**
     * Header text for the column
     */
    displayName: string;

    /**
     * Used for sorting/filtering. Not needed for columns not filterable/sortable
     * TODO: do we need to support array type for querying across multiple columns?
     */
    queryFieldName?: string;

    /**
     * If the renderer passed in is a
     * - string: Used as default renderer. Can be a dot separated string to identify a nested property of the item
     * - {@link FunctionRenderer}: When you want to create a calculated column, but don't need custom HTML
     * - TemplateRef: When custom HTML is needed and when it has to be passed in as a inline HTML
     * - {@link ComponentRendererSpec}: When HTML is needed and when the HTML is provided as a component
     */
    renderer: string | FunctionRenderer<R> | ComponentRendererSpec<R, unknown>;

    /**
     * Whether the column shows up in the column toggler and if teh column shows up, it reflects the toggle state
     */
    hideable?: GridColumnHideable;

    /**
     * When there is no data, show this message.
     *
     * Try to avoid showing this before initial load.
     */
    emptyColumnPlaceholder?: string;

    sortDirection?: GridColumnSortDirection;

    /**
     * TODO: Should this be made to work with top level search on grids across all columns?
     *  The above to-do is going to be worked on as part of https://jira.eng.vmware.com/browse/VDUCC-27 and
     */
    filter?: ComponentRendererSpec<R, unknown>;
}

/**
 * Implemented by all the component renderers
 */
export interface ComponentRenderer<T> {
    /**
     * Object used by the component renderers inside their HTML template
     */
    configuration: T;
}

/**
 * Used for the type safety of {@link ComponentRendererSpec#type}
 */
export type ComponentRendererConstructor<V> = Type<ComponentRenderer<V>>;

/**
 * An object that has the constructor of a component(ComponentRenderer) to be displayed and value getter
 * function definition that would get the value to be used by the component in its template
 *
 * The component using this renderer spec to display the component will be responsible for setting the actual
 * renderer's value{@link ComponentRenderer#configuration} after dynamically initializing it but the caller is responsible for
 * providing a {#link valueGetter}
 */
export interface ComponentRendererSpec<R, V> {
    /**
     * Constructor of a specific type of component renderer desired to be used
     */
    type: ComponentRendererConstructor<V>;

    /**
     * Function that retrieves that `value` property to be set on the ComponentRenderer that is used as a context for
     * the HTML template
     * @param record An object to be transformed into {@link ComponentRenderer#configuration}. It's passed in by the calling
     * component
     */
    configGetter: (record?: R) => V;
}

/**
 * Often with generics, there will be some locations where a type parameter should be inferrable from usage, and other
 * places where the type parameter should only be used to enforce typechecking. The following type helps with this.
 *
 * if you change a type parameter in an inference site from T to T & {}, it lowers the site's priority. So the compiler
 * will tend to infer T from other inference sites first and only come back to the T & {} one if it fails to infer from
 * other places. please see {@link RendererSpec} for example usage.
 */
type InferLast<T> = T & {};

/**
 * Utility function to enforce type safety on output of the valueGetter function. The output is used as value context
 * inside ComponentRenderer's template
 *
 * Example usage:
 * const gridColumn = {
 *   renderer: createComponentRendererSpec<SomeRecord, Icon>(IconComponentRendererCtor, (r: SomeRecord) => v)
 * }
 *
 * In the above example, this method helps in making sure that the value "v" returned by the valueGetter function is of
 * Icon type
 */
export function RendererSpec<R, C>(componentRendererSpec: {
    type: ComponentRendererConstructor<C>;
    configGetter: (record?: R) => InferLast<C>;
}): ComponentRendererSpec<R, C> {
    return componentRendererSpec;
}
