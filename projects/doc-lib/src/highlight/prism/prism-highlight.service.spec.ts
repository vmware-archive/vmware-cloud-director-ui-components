/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import {TestBed} from '@angular/core/testing';
import {HighlightService} from '../highlight.service';

describe('PrismHighlightService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: HighlightService = TestBed.get(HighlightService);
        expect(service).toBeTruthy();
    });
});
