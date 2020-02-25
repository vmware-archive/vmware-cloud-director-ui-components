/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

/**
 * Whether something shows up in the column toggler
 */
import { ComponentRendererSpec } from './component-renderer.interface';
import { ClrDatagridComparatorInterface } from '@clr/angular';

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
 * The ways buttons should be displayed when they are inactive.
 */
export enum InactiveButtonDisplayMode {
    Hide = 'HIDE',
    Disable = 'Disable',
}

/**
 * Column renderer as a function. Defined in calling component when the cell value is calculated from different
 * properties.
 * @param record The record for the row being rendered
 * @return The string to be displayed for that cell
 */
export type FunctionRenderer<T> = (record: T) => string;

/**
 * A generic interface for a button that can be displayed on the grid.
 */
export interface Button<R> {
    /**
     * The translated text of the button.
     */
    label: string;
    /**
     * The css class the button should have.
     */
    class?: string;
    /**
     * The way this button should be shown when inactive.
     * Overrides {@link ButtonConfig.inactiveDisplayMode}.
     */
    inactiveDisplayMode?: InactiveButtonDisplayMode;
    /**
     * The function that is called when the button is pressed.
     *
     * @param entity the currently selected entities.
     */
    handler: (rec?: R[]) => void;
    /**
     * The function that is called to determine if the button should be displayed.
     *
     * @param entity the currently selected entities.
     */
    isActive: (rec?: R[]) => boolean;
}

/**
 * A type of button whose displayability does not depend on the selected entity.
 */
export interface GlobalButton<R> extends Button<R> {
    /**
     * The function that is called when the button is pressed.
     */
    handler: () => void;
    /**
     * The function that is called to determine if the button should be displayed.
     */
    isActive: () => boolean;
}

/**
 * A type of button whose displayability dependends on the selected entity.
 */
export interface ContextualButton<R> extends Button<R> {
    /**
     * The function that is called when the button is pressed.
     *
     * @param entity the currently selected entities.
     */
    handler: (entity: R[]) => void;
    /**
     * The function that is called to determine if the button should be displayed.
     *
     * @param entity the currently selected entities.
     */
    isActive: (rec: R[]) => boolean;
    /**
     * The ID of this button that is unique among buttons passed to the grid.
     */
    id: string;
    /**
     * The Clarity icon of the contextual button that is displayed if the button is featured.
     */
    icon: string;
}

/**
 * An enum that describes where the contextual buttons should display.
 */
export enum ContextualButtonPosition {
    TOP = 'TOP',
    ROW = 'ROW',
}

/**
 * A configuration that descibes all the information about the contextual buttons.
 */
export interface ContextualButtonConfig<R> {
    /**
     * A list of all the contextual buttons.
     */
    buttons: ContextualButton<R>[];
    /**
     * An ordered list of {@link ContextualButton.id}s of buttons that should be in a featured position.
     *
     * Only non-hidden buttons will be shown.
     */
    featured: string[];
    /**
     * How many buttons should display on the featured section.
     *
     * Used when you want to set a limit on the number of featured buttons shown.
     */
    featuredCount: number;
    /**
     * Where the buttons should display on the grid.
     */
    position: ContextualButtonPosition;
}

/**
 * The configuration object that describes the type of buttons to put on the top of the grid.
 */
export interface ButtonConfig<R> {
    /**
     * The buttons whose displayability does not depend on the selected entity.
     */
    globalButtons: GlobalButton<R>[];
    /**
     * The buttons whose displayability depends on the selected entity.
     */
    contextualButtonConfig: ContextualButtonConfig<R>;
    /**
     * The way buttons should be shown when inactive.
     */
    inactiveDisplayMode?: InactiveButtonDisplayMode;
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
     * - {@link ComponentRendererSpec}: When HTML is needed and when the HTML is provided as a component
     */
    renderer: string | FunctionRenderer<R> | ComponentRendererSpec<R, unknown>;

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
    filterRendererSpec?: ComponentRendererSpec<R, unknown>;

    /**
     * Wired to ClrDgSortBy input to enable custom sorting feature offered by the Clarity data grid. This is also used
     * to enable sorting independently from filtering when clrDgField is given as input
     */
    sortBy?: ClrDatagridComparatorInterface<R> | string;

    /**
     * Switch used for turning off sorting on a column. This is because, it was not possible to switch sorting by using
     * clrDgColumn's sortBy property. So, we pass in clrDgField as input, which enables both sorting and filtering by default.
     * We then use this prop as part of column config and turn off sorting for columns that doesn't require it.
     */
    notSortable?: boolean;
}
