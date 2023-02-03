/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Injectable, OnDestroy } from '@angular/core';
import { QuickSearchNestedProvider, QuickSearchProvider } from './quick-search.provider';
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
    private sections: QuickSearchNestedProvider[] = [];

    register(provider: QuickSearchProvider | QuickSearchNestedProvider): void {
        if (this.isNestedProvider(provider)) {
            this.sections.push(provider);
            this.quickSearchService.registerNestedProvider(provider);
        } else {
            this.providers.push(provider);
            this.quickSearchService.registerProvider(provider);
        }
    }

    ngOnDestroy(): void {
        for (const provider of this.providers) {
            this.quickSearchService.unregisterProvider(provider);
        }
        for (const section of this.sections) {
            this.quickSearchService.unregisterNestedProvider(section);
        }
    }

    private isNestedProvider(a: QuickSearchProvider | QuickSearchNestedProvider): a is QuickSearchNestedProvider {
        return (a as QuickSearchNestedProvider).children !== undefined;
    }
}
