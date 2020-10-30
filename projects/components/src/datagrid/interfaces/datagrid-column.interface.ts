/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

/**
 * Whether something shows up in the column toggler
 */
import { TextIcon } from '../../common/interfaces/action-item.interface';
import { CliptextConfig } from '../../lib/directives/show-clipped-text.directive';
import { FilterConfig, FilterRendererSpec } from '../filters/datagrid-filter';
import { ComponentRendererConstructor, ComponentRendererSpec } from './component-renderer.interface';

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
 * Column renderer as a function. Defined in calling component when the cell value is calculated from different
 * properties.
 * @param record The record for the row being rendered
 * @return The string to be displayed for that cell
 */
export interface FunctionRenderer<T> {
    (record: T): string;
}

/**
 * Renderer specification of a column that contains component type to be rendered in the cell and configuration for that
 * component. used by the {@link ComponentRendererOutletDirective}
 */
export interface ColumnRendererSpec<R, C> extends ComponentRendererSpec<C> {
    /**
     * A function that creates a config object required for the configuration of component that will be rendered in the column
     * @param record An object to be transformed into {@link ComponentRenderer#config}. It's passed in by the calling
     * component
     */
    config: (record?: R) => C;
}

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
     * - {@link ColumnRendererSpec}: When HTML is needed and when the HTML is provided as a component
     */
    renderer: string | FunctionRenderer<R> | ColumnRendererSpec<R, unknown>;

    /**
     * Whether the column shows up in the column toggler and if the column shows up, it reflects the toggle state
     */
    hideable?: GridColumnHideable;

    /**
     * When there is no data, show this message.
     *
     * Try to avoid showing this before initial load.
     */
    emptyColumnPlaceholder?: string;

    /**
     * TODO: Should this be made to work with top level search on grids across all columns?
     *  The above to-do is going to be worked on as part of https://jira.eng.vmware.com/browse/VDUCC-27 and
     */
    filter?: FilterRendererSpec<FilterConfig<unknown>>;

    /**
     * The configuration for the cliptext in the datagrid.
     * Defaults to size: 'lg', mouseoutDelay: undefined.
     * If null, will disable cliptext
     */
    cliptextConfig?: CliptextConfig;

    /**
     * Whether to show the column as sortable. Defaults to true
     */
    sortable?: boolean;

    /**
     * The class of the column header.
     */
    clrDgColumnClassName?: string;
}

/**
 * Utility function to enforce type safety on config object of components of {@link ComponentRenderer} type. Used for creating
 * component renderer specification of {@link ColumnRendererSpec} type
 *
 * Example usage:
 * const gridColumn = {
 *   renderer: ColumnComponentRendererSpec({type: BoldTextRendererComponent, config: record => ({text: ''})
 * }
 *
 * In the above example this method helps in making sure that:
 * - Value "v" returned by the config function is of BoldTextRendererConfig type for gridColumn.renderer
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
