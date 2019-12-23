/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

/**
 * Whether something shows up in the column toggler
 */
import { ComponentRendererSpec } from './component-renderer.interface';

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
