/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
export interface RouteInfo {
    /**
     * Calls this to create a route
     * @param args replacement IDs for each replaceable part of the URL
     */
    route(...args: string[]): string;

    /**
     * Regex that can be used to see if this route matches an existing URL
     */
    regex: RegExp;

    /**
     * The tag name that will be rendered by Angular's router for this route.
     */
    tagName?: string;
}
