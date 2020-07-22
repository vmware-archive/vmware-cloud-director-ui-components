/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { TestBed } from '@angular/core/testing';
import { CsvExporterService } from './csv-exporter.service';

describe('CsvExporterService', () => {
    describe('hasPotentialInjection', () => {
        it('doesnt detect injection on a row without formulas', () => {
            const service: CsvExporterService = TestBed.inject(CsvExporterService);
            expect(service.hasPotentialInjection([['a+', 'b'], [1, 2]])).toBeFalsy();
        });

        it('does detect injection on a row with formulas', () => {
            const service: CsvExporterService = TestBed.inject(CsvExporterService);
            expect(service.hasPotentialInjection([['+', 'b'], [1, 2]])).toBeTruthy();
            expect(service.hasPotentialInjection([['-', 'b'], [1, 2]])).toBeTruthy();
            expect(service.hasPotentialInjection([['=', 'b'], [1, 2]])).toBeTruthy();
            expect(service.hasPotentialInjection([['@', 'b'], [1, 2]])).toBeTruthy();
        });
    });

    describe('createCsv', () => {
        it('creates a csv out of 2D array of cell values', () => {
            const service: CsvExporterService = TestBed.inject(CsvExporterService);
            expect(service.createCsv([['a', 'b'], [1, 2]])).toEqual('a,b\n1,2');
        });

        it('encodes new lines by wrapping with double quotes', () => {
            const service: CsvExporterService = TestBed.inject(CsvExporterService);
            expect(service.createCsv([['a', 'b'], ['1\n1', 2]])).toEqual('a,b\n"1\n1",2');
        });

        it('encodes commas by wrapping with double quotes', () => {
            const service: CsvExporterService = TestBed.inject(CsvExporterService);
            expect(service.createCsv([['a', 'b'], ['1,1', 2]])).toEqual('a,b\n"1,1",2');
        });

        it('encodes double quotes with ""', () => {
            const service: CsvExporterService = TestBed.inject(CsvExporterService);
            expect(service.createCsv([['a', 'b'], ['1"2', 2]])).toEqual('a,b\n"1""2",2');
        });

        it('encodes dates with locale strings', () => {
            const service: CsvExporterService = TestBed.inject(CsvExporterService);
            const date = new Date(0);
            const localeString = date.toLocaleString();
            expect(service.createCsv([['a', 'b'], [date, 2]])).toEqual(`a,b
"${localeString}",2`);
        });

        it('prints null and undefined as an empty string', () => {
            const service: CsvExporterService = TestBed.inject(CsvExporterService);
            expect(service.createCsv([['a', 'b'], [null, undefined]])).toEqual('a,b\n,');
        });

        it('adds a tab character if the value begins with any special characters', () => {
            const service: CsvExporterService = TestBed.inject(CsvExporterService);
            expect(service.createCsv([['+', '-', '@', '='], [null, undefined]], true)).toEqual('\t+,\t-,\t@,\t=\n,');
        });

        it('does not add a tab character if the value contains but does not begin with with any special characters', () => {
            const service: CsvExporterService = TestBed.inject(CsvExporterService);
            expect(service.createCsv([['a+', 'a-', 'a@', 'a='], [null, undefined]], true)).toEqual('a+,a-,a@,a=\n,');
        });
    });

    describe('downloadCsvFile - msSaveBlob', () => {
        // Currently, msSaveBlob is available in both IE and Chrome
        const msSaveBlob = navigator.msSaveBlob;
        beforeEach(() => {
            if (!msSaveBlob) {
                // Empty stub, will be spied on
                navigator.msSaveBlob = (): any => {};
            }
        });

        afterEach(() => {
            // Restore empty msSaveBlob only if we didn't stub it.
            // Ensures we get coverage of the non msSaveBlob path
            if (!msSaveBlob) {
                delete navigator.msSaveBlob;
            }
        });

        it('uses navigator.msSaveBlob if available', () => {
            const service: CsvExporterService = TestBed.inject(CsvExporterService);
            const rows = [['a', 'b'], ['1"2', 2], [3, 4]];
            const csvString = service.createCsv(rows);

            // Don't use spyOn, otherwise it would restore the empty function in its own afterEach()
            navigator.msSaveBlob = jasmine.createSpy('msSaveBlob');
            service.downloadCsvFile(csvString, 'test');
            expect(navigator.msSaveBlob).toHaveBeenCalled();
        });
    });

    describe('downloadCsvFile - creating a link', () => {
        // Make sure msSaveBlob is not defined
        const msSaveBlob = navigator.msSaveBlob;
        beforeEach(() => {
            if (msSaveBlob) {
                delete navigator.msSaveBlob;
            }
        });

        afterEach(() => {
            if (msSaveBlob) {
                navigator.msSaveBlob = msSaveBlob;
            }
        });
        it('creates and clicks an invisible link', () => {
            const service: CsvExporterService = TestBed.inject(CsvExporterService);
            const rows = [['a', 'b'], ['1"2', 2], [3, 4]];
            const csvString = service.createCsv(rows);
            spyOn(document.body, 'appendChild');
            spyOn(document.body, 'removeChild');
            const linkSpy = jasmine.createSpyObj('linkSpy', ['click', 'setAttribute', 'style']);
            spyOn(document, 'createElement').and.returnValue(linkSpy);
            service.downloadCsvFile(csvString, 'test');
            expect(document.body.appendChild).toHaveBeenCalled();
            expect(document.body.removeChild).toHaveBeenCalled();
            expect(linkSpy.click).toHaveBeenCalled();
            expect(linkSpy.setAttribute).toHaveBeenCalled();
            expect(linkSpy.style.visibility).toBe('hidden');
        });
    });
});
