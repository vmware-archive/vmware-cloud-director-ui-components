/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

/**
 * Components that can be made readonly should implement this interface
 */
export interface CanBeReadOnly {
    /**
     * This being true implies that any controls that may edit data will not allow editing or be removed
     */
    isReadOnly: boolean;
}
