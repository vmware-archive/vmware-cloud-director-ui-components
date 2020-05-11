/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LazyString, TranslationService } from '@vcd/i18n';
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
    exportData: (records: object[]) => void;

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
export class DataExporterComponent implements OnInit {
    constructor(private csvExporterService: CsvExporterService, private translationService: TranslationService) {}

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
    @Input()
    dialogHeader: LazyString = this.translationService.translateAsync('vcd.cc.data-exporter.title');

    /**
     * Text for the cancel button.
     */
    @Input()
    cancelText: LazyString = this.translationService.translateAsync('vcd.cc.cancel');

    /**
     * Text for the export all button.
     */
    @Input()
    exportAllText: LazyString = this.translationService.translateAsync('vcd.cc.export.all');

    /**
     * Text for the select columns dropdown button.
     */
    @Input()
    selectColumnsText: LazyString = this.translationService.translateAsync('vcd.cc.select.columns');

    /**
     * Text for the export button.
     */
    @Input()
    exportText: LazyString = this.translationService.translateAsync('vcd.cc.export');

    /**
     * Text for the yes button.
     */
    @Input()
    yesText: LazyString = this.translationService.translateAsync('vcd.cc.yes');

    /**
     * Text for the yes button.
     */
    @Input()
    noText: LazyString = this.translationService.translateAsync('vcd.cc.no');

    /**
     * Text label that is next to the friendly field names checkbox.
     */
    @Input()
    friendlyNamesCheckboxLabel: LazyString = this.translationService.translateAsync('vcd.cc.friendly.names.question');

    /**
     * Text the info message next to the friendly field names checkbox.
     */
    @Input()
    friendlyNamesInfoMessage: LazyString = this.translationService.translateAsync('vcd.cc.friendly.names.info');

    /**
     * Text the hint message below the friendly field names checkbox.
     */
    @Input()
    friendlyNamesHint: LazyString = this.translationService.translateAsync('vcd.cc.friendly.names.hint');

    /**
     * Text label that is next to the sanitize checkbox.
     */
    @Input()
    sanitizeCheckboxLabel: LazyString = this.translationService.translateAsync('vcd.cc.sanitize.question');

    /**
     * Hint message that is below the sanitize checkbox.
     */
    @Input()
    sanitizeCheckboxHint: LazyString = this.translationService.translateAsync('vcd.cc.sanitize.hint');

    /**
     * Text the info message next to the sanitize checkbox.
     */
    @Input()
    sanitizeInfoMessage: LazyString = this.translationService.translateAsync('vcd.cc.sanitize.info');

    /**
     * The message that is displayed while the data is downloading.
     */
    downloadingMessage: LazyString = this.translationService.translateAsync('vcd.cc.exporter.downloading');

    /**
     * The message that is displayed while the data is sanitizing.
     */
    sanitizingMessage: LazyString = this.translationService.translateAsync('vcd.cc.exporter.sanitizing');

    /**
     * Whether a box to select/deselect all rows is available
     */
    @Input() showSelectAll = true;

    /**
     * Whether the dialog is open
     */
    @Input()
    set open(value: boolean) {
        this._open = value;
        this.openChange.emit(value);
    }
    get open(): boolean {
        return this._open;
    }

    private _open = false;

    /**
     * Fires when {@link _open} changes. Its parameter indicates the new state.
     */
    @Output() openChange = new EventEmitter<boolean>();

    /**
     * Called when the export is ready to be created
     */
    @Output() dataExportRequest = new EventEmitter<DataExportRequestEvent>();

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

    exportStage: LazyString = this.downloadingMessage;

    optionsFormGroup = new FormGroup({
        selectAll: new FormControl(true),
        friendlyNames: new FormControl(true),
        sanitize: new FormControl(false),
    });

    onClickExport(): void {
        this._isRequestPending = true;
        this.dataExportRequest.emit({
            exportData: this.exportData.bind(this),
            updateProgress: this.updateProgress.bind(this),
            selectedColumns: this.columns.filter(col => this.formGroup.controls[col.fieldName].value),
        });
    }

    onClickCheckAll(): void {
        for (const column of this.columns) {
            this.formGroup.controls[column.fieldName].setValue(true);
        }
    }

    get isSelectAllEnabled(): boolean {
        return this.optionsFormGroup.controls.selectAll.value;
    }

    get isSanitizeEnabled(): boolean {
        return this.optionsFormGroup.controls.sanitize.value;
    }

    get isFriendlyFieldsEnabled(): boolean {
        return this.optionsFormGroup.controls.friendlyNames.value;
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

    private exportData(records: object[]): void {
        if (!this.open) {
            return;
        }

        const rows = [
            // First row is the display names
            Object.keys(records[0]).map(fieldName =>
                this.isFriendlyFieldsEnabled ? this.getDisplayNameForField(fieldName) : fieldName
            ),
            // Then the data
            ...records.map(rec => Object.keys(rec).map(key => rec[key])),
        ];
        this.downloadData(rows, this.isSanitizeEnabled);
    }

    downloadData(data: any[][], shouldSanitize: boolean = false): void {
        this._isRequestPending = false;
        this.exportStage = this.sanitizingMessage;
        const csvFile = this.csvExporterService.createCsv(data, shouldSanitize);
        this.csvExporterService.downloadCsvFile(csvFile, this.fileName);
        this.open = false;
    }

    private updateProgress(progress: number): void {
        this._progress = progress;
    }

    private getDisplayNameForField(fieldName: string): string {
        for (const column of this.columns) {
            if (column.fieldName === fieldName) {
                return column.displayName;
            }
        }
        return fieldName;
    }
}
