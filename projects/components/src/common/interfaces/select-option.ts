/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

/**
 * Options displayed in a select input option list
 */
export interface SelectOption {
    /**
     * Value of a option
     */
    value: string | number;
    /**
     * Text to be shown for the option
     */
    display: string;
    /**
     * Used for translation of the {@link SelectOption.display} text
     */
    isTranslatable?: boolean;
    /**
     * Wheather the option is disabled
     */
    disabled?: boolean;
}
