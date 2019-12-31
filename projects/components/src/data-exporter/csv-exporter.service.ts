/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
/**
 * Encodes a data set to be downloaded as a CSV
 */
export class CsvExporterService {
    /**
     * Creates a string that can be used to create a Blob for a CSV
     * @param rows 2D array of data. First row is the names for the fields
     */
    public createCsv(rows: any[][]): string {
        return rows.map(row => processRow(row)).join('\n');
    }

    /**
     * Does a client side download
     * @param csvFile The string contents of a CSV file to be downloaded
     * @param filename The name of the file to be downloaded
     */
    public downloadCsvFile(csvFile: string, filename: string): void {
        const mimeType = 'text/csv;charset=utf-8;';
        const blob = new Blob([csvFile], { type: mimeType });
        // Jan 1, 2020 - Chrome and IE support this
        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, filename);
        } else {
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

/**
 * Returns a string
 * @param row A list of cells to be turned into a CSV string, separated by commas
 */
function processRow(row: unknown[]): string {
    return row.map(cell => encodeValue(cell)).join(',');
}

/**
 * Returns a cell's cellValue encoded against spaces, quotes, and CSV injection character
 * @param cellValue Cell cellValue to be encoded
 */
function encodeValue(cellValue: unknown): string {
    let innerValue = cellValue == null ? '' : cellValue.toString();
    if (cellValue instanceof Date) {
        innerValue = cellValue.toLocaleString();
    }
    // Double quotes are doubled
    let result = innerValue.replace(/"/g, '""');

    // TODO: See https://jira.eng.vmware.com/browse/VDUCC-59
    // result = escapeAgainstCsvInjection(result);

    // Add quotes around the whole thing if it contains new lines
    if (result.search(/[",\n]/g) >= 0) {
        result = `"${result}"`;
    }
    // Escape against
    return result;
}

/**
 * TODO: See https://jira.eng.vmware.com/browse/VDUCC-59
 * Prepends a single quote to a value if it starts with =,+,=,@ to prevent formulas from being executed
 * @param value Value to be escaped
 */
// function escapeAgainstCsvInjection(value: string): string {
//     if (/^[=+\-@|%]/.test(value)) {
//         return `'${value}'`;
//     }
//     return value;
// }
