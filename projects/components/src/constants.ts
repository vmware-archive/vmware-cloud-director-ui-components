/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

export type NonEmptyArray<T> = T[] & { 0: T };

/**
 * Key of an action item object that is intended to be used only by the {@link ActionMenuComponent} and the {@link DropdownComponent}.
 * This property is used to store the last emitted value from availability observable of an action item.
 */
export const lastAvailabilityValue = Symbol();
