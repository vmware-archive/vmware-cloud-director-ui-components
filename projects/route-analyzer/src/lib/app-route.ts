/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
export interface AppRoute {
    path?: string;
    redirectTo?: string;
    children?: AppRoute[];
    loadChildren?: string;
    component?: string;
    canActivate?: string;
    data?: { [name: string]: any };
}
