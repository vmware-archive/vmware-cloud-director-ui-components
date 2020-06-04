/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

/**
 * Description of the routes configuration that a given app is using.
 * This interface mimics angular `Route` interface but is geared towards the static code analyses for building
 * information about the routes in an application.
 * This means that not every property from the `Route` interface is processed.
 * Also the ones that are included are in the form of plain old JS object, i.e. no refernces to classes, variables etc.
 * that normally may be present in the angular Route configuration.
 */
export interface AppRoute {
    /**
     * The same as angular `Route.path` but in the form of a literal string, i.e. if there are any variables
     * they are substituted with their actual values.
     */
    path?: string;

    /**
     * The same as angular `Route.redirectTo` but in the form of a literal string, i.e. if there are any variables
     * they are substituted with their actual values.
     */
    redirectTo?: string;

    /**
     * An array of child `AppRoute` objects that specifies a nested routes description.
     * If there are lazy loaded modules their routes description appear here.
     */
    children?: AppRoute[];

    /**
     * A string representing the component of the angular `Route.component` configuration
     */
    component?: string;

    /**
     * The same as angular `Route.data` but it is an object literal, i.e. if there are any variables
     * they are substituted with their actual values.
     */
    data?: { [name: string]: unknown };
}
