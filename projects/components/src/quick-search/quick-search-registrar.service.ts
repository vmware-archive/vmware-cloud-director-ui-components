/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Injectable, OnDestroy } from '@angular/core';
import { QuickSearchProvider } from './quick-search.provider';
import { QuickSearchService } from './quick-search.service';

/**
 * Allows components to register with {@link QuickSearchService} and automatically unregister when the component is destroyed.
 *
 * Must be provided by the component itself in its `providers: [QuickSearchRegistrarService]`
 */
@Injectable()
export class QuickSearchRegistrarService implements OnDestroy {
    constructor(private quickSearchService: QuickSearchService) {}

    private providers: QuickSearchProvider[] = [];

    register(provider: QuickSearchProvider): void {
        this.providers.push(provider);
        this.quickSearchService.registerProvider(provider);
    }

    ngOnDestroy(): void {
        for (const provider of this.providers) {
            this.quickSearchService.unregisterProvider(provider);
        }
    }
}
