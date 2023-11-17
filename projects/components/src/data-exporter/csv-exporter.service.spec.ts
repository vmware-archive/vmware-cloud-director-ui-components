/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { TestBed } from '@angular/core/testing';
import { CsvExporterService } from './csv-exporter.service';

describe('CsvExporterService', () => {
    // Byte order mark for UTF-8
    const BOM = '\ufeff';
    describe('createCsv', () => {
        it('adds an UTF-8 BOM mark so it can be opened when non ASCII characters are present', () => {
            const service: CsvExporterService = TestBed.inject(CsvExporterService);
            expect(service.createCsv([['a'], [1]])).toEqual(BOM + 'a\n1');
        });
        it('creates a csv out of 2D array of cell values', () => {
            const service: CsvExporterService = TestBed.inject(CsvExporterService);
            expect(
                service.createCsv([
                    ['a', 'b'],
                    [1, 2],
                ])
            ).toEqual(BOM + 'a,b\n1,2');
        });

        it('encodes new lines by wrapping with double quotes', () => {
            const service: CsvExporterService = TestBed.inject(CsvExporterService);
            expect(
                service.createCsv([
                    ['a', 'b'],
                    ['1\n1', 2],
                ])
            ).toEqual(BOM + 'a,b\n"1\n1",2');
        });

        it('encodes commas by wrapping with double quotes', () => {
            const service: CsvExporterService = TestBed.inject(CsvExporterService);
            expect(
                service.createCsv([
                    ['a', 'b'],
                    ['1,1', 2],
                ])
            ).toEqual(BOM + 'a,b\n"1,1",2');
        });

        it('encodes double quotes with ""', () => {
            const service: CsvExporterService = TestBed.inject(CsvExporterService);
            expect(
                service.createCsv([
                    ['a', 'b'],
                    ['1"2', 2],
                ])
            ).toEqual(BOM + 'a,b\n"1""2",2');
        });

        it('encodes dates with locale strings', () => {
            const service: CsvExporterService = TestBed.inject(CsvExporterService);
            const date = new Date(0);
            const localeString = date.toLocaleString();
            expect(
                service.createCsv([
                    ['a', 'b'],
                    [date, 2],
                ])
            ).toEqual(`${BOM}a,b
"${localeString}",2`);
        });

        it('prints null and undefined as an empty string', () => {
            const service: CsvExporterService = TestBed.inject(CsvExporterService);
            expect(
                service.createCsv([
                    ['a', 'b'],
                    [null, undefined],
                ])
            ).toEqual(BOM + 'a,b\n,');
        });

        describe('csv sanitizing', () => {
            it('prepends a single quote if the value begins with any special characters', () => {
                const service: CsvExporterService = TestBed.inject(CsvExporterService);
                expect(service.createCsv([['+a', '-a', '@a', '=a', '\ta', '\ra']], true)).toEqual(
                    `${BOM}'+a,'-a,'@a,'=a,a,a`
                );
            });

            it('prepends a single quote if the value begins with any special characters and has been escaped for quotes', () => {
                const service: CsvExporterService = TestBed.inject(CsvExporterService);
                expect(service.createCsv([['=1+"1"']], true)).toEqual(`${BOM}"'=1+""1"""`);
            });

            it('does not prepend a single quote if the value contains but does not begin with with any special characters', () => {
                const service: CsvExporterService = TestBed.inject(CsvExporterService);
                expect(service.createCsv([['a+', 'a-', 'a@', 'a=']], true)).toEqual(BOM + 'a+,a-,a@,a=');
            });

            it('ignores whitespace around the cell value and escapes leading control character', () => {
                const service: CsvExporterService = TestBed.inject(CsvExporterService);
                expect(service.createCsv([[' \t\r\n=1+"1"']], true)).toEqual(`${BOM}"'=1+""1"""`);
            });
        });

        it('encodes JavaScript object to JSON string', () => {
            const service: CsvExporterService = TestBed.inject(CsvExporterService);
            expect(
                service.createCsv([
                    ['a', 'b', 'c'],
                    [{ a: 1, b: 2 }, [1, 2], 10],
                ])
            ).toEqual(BOM + 'a,b,c\n"{""a"":1,""b"":2}","[1,2]",10');
        });
    });

    describe('downloadCsvFile - creating a link', () => {
        it('creates and clicks an invisible link', () => {
            const service: CsvExporterService = TestBed.inject(CsvExporterService);
            const rows = [
                ['a', 'b'],
                ['1"2', 2],
                [3, 4],
            ];
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
