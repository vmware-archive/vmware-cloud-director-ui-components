/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Injectable } from '@angular/core';

// From https://owasp.org/www-community/attacks/CSV_Injection
// * Equals to (=)
// * Plus (+)
// * Minus (-)
// * At (@)
// * Tab (0x09), \t
// * Carriage return (0x0D), \r
//
// If a cell starts with one of these, it should be sanitized with a single quote
// be prepending it to the special character.
//
// This would break a script but it's better than causing a Formula to be executed
// on a user's computer.

// See https://stackoverflow.com/a/3561711/227299
function escapeRegex(string) {
    return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
}
const LEADING_CHARS = escapeRegex(['=', '+', '-', '@', '\t', '\r'].join(''));

const LEADING_CONTROL_CHAR = new RegExp(`^[${LEADING_CHARS}]`);

const SANITIZE_CHAR = `'`;

const CELL_SEPARATOR = ',';

const LINE_SEPARATOR = '\n';
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
        // BOM Mark to help Excel open the CSV when it contains UTF-8 characters
        return '\ufeff' + rows.map((row) => processRow(row, shouldSanitize)).join(LINE_SEPARATOR);
    }

    /**
     * Does a client side download
     * @param csvFile The string contents of a CSV file to be downloaded
     * @param filename The name of the file to be downloaded
     */
    public downloadCsvFile(csvFile: string, filename: string): void {
        const mimeType = 'text/csv;charset=utf-8;';
        const blob = new Blob([csvFile], { type: mimeType });
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

/**
 * Returns a string
 * @param row A list of cells to be turned into a CSV string, separated by commas
 * @param shouldSanitize If a cell starting with a control character should be edited to prevent
 * possible code injection
 */
function processRow(row: unknown[], shouldSanitize: boolean): string {
    return row.map((cell) => encodeValue(cell, shouldSanitize)).join(CELL_SEPARATOR);
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

    if (shouldSanitize) {
        result = sanitizeString(result);
    }
    // Add quotes around the whole thing if it contains special characters
    if (result.search(/[",\n\r]/g) >= 0) {
        result = `"${result}"`;
    }
    return result;
}

/**
 * Prevents CSV injection by prefixing with a tab character if the string contains a
 * special character.
 */
function sanitizeString(value: string): string {
    // Trim the string since space before a control character is ignored by
    // many CSV parsers, e.g., Numbers on a Mac
    const trimmed = value.trim();
    if (LEADING_CONTROL_CHAR.test(trimmed)) {
        return SANITIZE_CHAR + trimmed;
    }
    return trimmed;
}
