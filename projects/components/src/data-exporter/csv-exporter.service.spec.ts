/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { TestBed } from '@angular/core/testing';

describe('CsvExporterService', () => {
    beforeEach(() => {
        return TestBed.configureTestingModule({});
    });

    describe('createCsv', () => {
        it('creates a csv out of 2D array of cell values', () => {});

        it('encodes new lines by wrapping with double quotes', () => {});

        it('encodes commas by wrapping with double quotes', () => {});

        it('does not wrap with double quotes if there are no new lines', () => {});

        it('encodes double quotes with ""', () => {});
    });

    describe('downloadCsvFile', () => {
        it('creates and clicks a link', () => {});

        it('calls and clicks a link', () => {});
    });
});
