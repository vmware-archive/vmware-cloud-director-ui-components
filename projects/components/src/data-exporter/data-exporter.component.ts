/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CsvExporterService } from './csv-exporter.service';

/**
 * Identifiers for each column that user is allowed to select
 */
export interface ExportColumn {
    /**
     * Displayed in the list of columns
     */
    displayName: string;
    /**
     * The name of the field in the JSON that is returned and converted to a viewable format
     */
    fieldName: string;
}

/**
 * Information passed to the caller so they can fetch the data
 */
export interface DataExportRequestEvent {
    /**
     * Call this to indicate a new value to be displayed in the progress indicator.
     * @param progress A number from 0 to 1 indicating download progress. Passing -1 will make it an indeterminate
     */
    updateProgress: (progress: number) => void;

    /**
     * Call this when all records have been fetched to initiate the CSV creation.
     * This should only be called once after all data fetching is finished
     * @param records Records to be converted into a csv file
     */
    exportData: (records: any[]) => void;

    /**
     * Columns selected by the user.
     */
    selectedColumns: ExportColumn[];
}

/**
 * A dialog to export data
 *
 *  - Allows the UI to select columns to be exported
 *  - Provides a progress indicator
 *  - Converts the data that is fetched by the caller into a CSV
 */
@Component({
    selector: 'vcd-data-exporter',
    templateUrl: 'data-exporter.component.html',
    styleUrls: ['./data-exporter.component.scss'],
})
export class DataExporterComponent implements OnInit, OnDestroy {
    constructor(private csvExporterService: CsvExporterService) {}

    /**
     * List of columns that can be exported, user may deselect some before sending the download request
     */
    @Input() columns: ExportColumn[] = [];

    /**
     * The name of the file to be downloaded
     */
    @Input() fileName = 'data-export.csv';

    /**
     * Text for the Dialog Header
     */
    @Input() dialogHeader = 'Select Columns';

    /**
     * Whether a box to select/deselect all rows is available
     */
    @Input() showSelectAll = true;

    /**
     * Whether the dialog is open
     */
    @Input() open = false;

    /**
     * Fires when {@link open} changes. Its parameter indicates the new state.
     */
    @Output() openChange = new EventEmitter<boolean>();

    /**
     * Called when the export is ready to be created
     */
    @Output() dataExportRequest = new EventEmitter<DataExportRequestEvent>();

    /**
     * To prevent downloads after a user closed dialog
     */
    private isDestroyed = false;

    /**
     * True between the time {@link dataExportRequest} fires and {@link DataExportRequestEvent.exportData} is called
     * or an error is thrown
     */
    get isRequestPending(): boolean {
        return this._isRequestPending;
    }
    private _isRequestPending = false;

    /**
     * Number between 0-1, used for displaying the progress bar.
     */
    get progress(): number {
        return this._progress;
    }
    private _progress = 0;

    formGroup: FormGroup;

    onClickExport(): void {
        this._isRequestPending = true;
        this.dataExportRequest.emit({
            exportData: this.exportData,
            updateProgress: this.updateProgress,
            selectedColumns: this.columns.filter(col => this.formGroup.controls[col.fieldName].value),
        });
    }

    onClickCheckAll(): void {
        for (const column of this.columns) {
            this.formGroup.controls[column.fieldName].setValue(true);
        }
    }

    get isSelectAllEnabled(): boolean {
        for (const column of this.columns) {
            if (!this.formGroup.controls[column.fieldName].value) {
                return true;
            }
        }
        return false;
    }

    get isExportEnabled(): boolean {
        if (this.isRequestPending) {
            return false;
        }
        for (const column of this.columns) {
            if (this.formGroup.controls[column.fieldName].value) {
                return true;
            }
        }
        return false;
    }

    ngOnInit(): void {
        const controls = this.columns.reduce((previousValue, currentValue) => {
            previousValue[currentValue.fieldName] = new FormControl(true);
            return previousValue;
        }, {});
        this.formGroup = new FormGroup(controls);
    }

    ngOnDestroy(): void {
        this.isDestroyed = true;
    }

    private exportData = (records: any[]) => {
        if (this.isDestroyed) {
            return;
        }
        this.open = false;
        this._isRequestPending = false;

        const rows = [
            // First row is the display names
            Object.keys(records[0]).map(fieldName => this.getDisplayNameForField(fieldName)),
            // Then the data
            ...records.map(rec => Object.keys(rec).map(key => rec[key])),
        ];

        const csvFile = this.csvExporterService.createCsv(rows);
        this.csvExporterService.downloadCsvFile(csvFile, this.fileName);
    };

    private updateProgress = (progress: number) => {
        this._progress = progress;
    };

    private getDisplayNameForField(fieldName: string): string {
        for (const column of this.columns) {
            if (column.fieldName === fieldName) {
                return column.displayName;
            }
        }
        return fieldName;
    }
}
