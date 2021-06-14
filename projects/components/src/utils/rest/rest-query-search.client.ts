/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Injectable, Injector } from '@angular/core';
import { Query, VcdApiClient, VcdHttpClient } from '@vcd/angular-client';
import { GroupType, OrgType, UserType } from '@vcd/bindings/vcloud/api/rest/schema_v1_5';
import { Observable } from 'rxjs';
import { FilterBuilder } from '../filter-builder';

/**
 * Given the query name of this entity, gives the data type that it represents.
 */
type InferEntityType<T> = T extends 'user'
    ? UserType
    : T extends 'organization'
    ? OrgType
    : T extends 'group'
    ? GroupType
    : unknown;

/**
 * What is returned from an API query,
 */
export interface QueryResult<T> {
    record: T[];
    total: number;
}

/**
 * The main options used to create a query.
 */
export interface RestQuery {
    filter?: FilterBuilder;
    pageSize?: number;
    fields?: string[];
}

/**
 * Additional options that can be used to configure a query.
 */
export interface RestQueryOptions {
    links?: boolean;
    multisite?: boolean;
    format?: Query.Format;
}

/**
 * Makes a query to the backend via the {@link VcdApiClient}.
 */
@Injectable()
export class RestQueryService extends VcdApiClient {
    // eslint-disable-next-line constructor-super
    constructor(injectors: Injector) {
        let http: VcdHttpClient;
        try {
            http = injectors.get(VcdHttpClient);
            super(http, injectors);
        } catch (error) {}
    }

    /**
     * Queries the given type of entity with the given options.
     */
    queryEntity<T extends string>(
        type: T,
        query: RestQuery,
        options?: RestQueryOptions
    ): Observable<QueryResult<InferEntityType<T>>> {
        if (!(this as any).http) {
            throw new Error('API Client was not provided');
        }
        const toSend = Query.Builder.ofType(type);
        if (query.filter) {
            toSend.filter(query.filter.getString());
        }
        if (query.pageSize !== undefined) {
            toSend.pageSize(query.pageSize);
        }
        if (query.fields) {
            toSend.fields(...query.fields);
        }
        if (options?.links) {
            toSend.links(options.links);
        }

        let multisite: boolean;
        if (options?.multisite) {
            multisite = options.multisite;
        }

        if (options?.format) {
            toSend.format(options.format);
        }

        return this.query(toSend, multisite);
    }
}
