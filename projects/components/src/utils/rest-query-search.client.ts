/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Injectable, Injector } from '@angular/core';
import { Query, VcdApiClient } from '@vcd/angular-client';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { FilterBuilder } from './filter-builder';

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
    pagination?: {
        page: number;
        pageSize: number;
    };
    fields?: string[];
}

/**
 * Additional options that can be used to configure a query.
 */
export interface RestQueryOptions {
    links?: boolean;
    multisite?: boolean;
}

/**
 * Makes a query to the backend via the {@link VcdApiClient}.
 */
@Injectable()
export class RestQueryService {
    constructor(injectors: Injector) {
        try {
            this.apiClient = injectors.get(VcdApiClient);
        } catch (error) {}
    }

    private apiClient: VcdApiClient;

    /**
     * Queries the given type of entity with the given options.
     */
    queryEntity<T>(type: string, query: RestQuery, options?: RestQueryOptions): Observable<QueryResult<T>> {
        if (!this.apiClient) {
            throw new Error('API Client was not provided');
        }
        const toSend = Query.Builder.ofType(type);
        if (query.filter) {
            toSend.filter(query.filter.getString());
        }
        if (query.pagination) {
            toSend.pageSize(query.pagination.pageSize);
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

        const queryResult = this.apiClient.query<QueryResult<T>>(toSend, multisite);
        if (query.pagination) {
            return this.getPageN(queryResult, query.pagination.page, multisite);
        }
        return queryResult;
    }

    /**
     * Gives an observable that contains the results for the given page.
     */
    private getPageN<T>(
        result: Observable<QueryResult<T>>,
        page: number,
        multisite?: boolean
    ): Observable<QueryResult<T>> {
        if (page === 1) {
            return result;
        } else {
            page -= 1;
            return this.getPageN(
                result.pipe(
                    mergeMap((currentPage: QueryResult<T>) => {
                        if (!this.apiClient.hasNextPage(currentPage)) {
                            return of(currentPage);
                        }
                        return this.apiClient.nextPage(currentPage, multisite);
                    })
                ),
                page,
                multisite
            );
        }
    }
}
