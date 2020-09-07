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
     * @param shouldSanitize If a cell starting with a control character should be edited to prevent
     * possible code injection
     */
    public createCsv(rows: any[][], shouldSanitize = false): string {
        return rows.map(row => processRow(row, shouldSanitize)).join('\n');
    }

    /**
     * Whether the CSV that would result from the export is at risk of code injection
     * @param rows 2D array of data. First row is the names for the fields
     */
    public hasPotentialInjection(rows: any[][]): boolean {
        return rows.some(hasPotentialInjection);
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

const LEADING_CONTROL_CHAR = /^[-+=@]/;

/**
 * Whether the given row data is at risk of code injection when exported to CSV.
 */
function hasPotentialInjection(row: unknown[]): boolean {
    return row.some(cell => LEADING_CONTROL_CHAR.test(encodeValue(cell, false)));
}

/**
 * Returns a string
 * @param row A list of cells to be turned into a CSV string, separated by commas
 * @param shouldSanitize If a cell starting with a control character should be edited to prevent
 * possible code injection
 */
function processRow(row: unknown[], shouldSanitize: boolean): string {
    return row.map(cell => encodeValue(cell, shouldSanitize)).join(',');
}

/**
 * Returns a cell's cellValue encoded against spaces, quotes, and CSV injection character
 * @param cellValue Cell cellValue to be encoded
 * @param shouldSanitize If this cellValue starts with a control should it be
 * prefixed with the tab character
 */
function encodeValue(cellValue: unknown, shouldSanitize: boolean): string {
    let innerValue = cellValue == null ? '' : cellValue.toString();
    if (cellValue instanceof Date) {
        innerValue = cellValue.toLocaleString();
    } else if (cellValue && typeof cellValue === 'object') {
        innerValue = JSON.stringify(cellValue);
    }
    // Double quotes are doubled
    let result = innerValue.replace(/"/g, '""');

    // Add quotes around the whole thing if it contains new lines
    if (result.search(/[",\n]/g) >= 0) {
        result = `"${result}"`;
    }
    // Escape against
    if (shouldSanitize) {
        return sanitizeString(result);
    }
    return result;
}

/**
 * Prevents CSV injection by prefixing with a tab character if the string contains a
 * special character.
 */
function sanitizeString(value: string): string {
    if (LEADING_CONTROL_CHAR.test(value)) {
        return '\t' + value;
    }
    return value;
}
