/*!
 * Copyright 2019-2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ClrDropdown } from '@clr/angular';
import { LazyString, TranslationService } from '@vcd/i18n';
import { SubscriptionTracker } from '../common/subscription/subscription-tracker';
import { CsvExporterService } from './csv-exporter.service';

/**
 * Identifiers for each column that user is allowed to select
 */
export interface ExportColumn {
    /**
     * Displayed in the list of columns. If there is no displayName, the default value is fieldName
     */
    displayName?: string;
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
     * @return a promise of the resulting CSV to indicate when this potentially lengthy process is over
     */
    exportData: (records: object[]) => Promise<string>;

    /**
     * Columns selected by the user.
     */
    selectedColumns: ExportColumn[];
}

export const DataUi = {
    /** The label for each check box in the column selection menu */
    columnSelectionMenuOptions: 'col-selection-menu-option',

    /** Where the selected columns are displayed, if select all is disabled  */
    columnSelectionBubbles: 'col-selection-bubble',

    cancelButton: 'cancel-btn',

    exportButton: 'export-btn',

    /** The label on the checkbox to select all columns */
    selectAllToggleLabel: 'select-all-toggle-label',

    /** The label on the checkbox to enable friendly names */
    friendlyNamesToggleLabel: 'friendly-names',

    /** The progress HTML element containing the value which can be queried for amount of progress     */
    progressInput: 'progress-input',

    /** The arrow next to Select All columns that lets you collapse the dropdown without checking the box */
    columnCheckboxArrow: 'column-checkbox-arrow',

    /** The x buttons to close the column bubbles */
    columnBubblesX: 'column-bubbles-x',
};

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
    providers: [SubscriptionTracker],
})
export class DataExporterComponent implements OnInit {
    DataUi = DataUi;

    constructor(
        private csvExporterService: CsvExporterService,
        private translationService: TranslationService,
        private subscriptionTracker: SubscriptionTracker
    ) {}

    @ViewChild(ClrDropdown) set columnDropdown(columnDropdown: ClrDropdown) {
        if (!columnDropdown) {
            return;
        }
        this._columnDropdown = columnDropdown;
        this.subscriptionTracker.subscribe(columnDropdown.toggleService.openChange, (opened) => {
            this.isDropdownOpen = opened;
        });
    }

    private _columnDropdown: ClrDropdown;

    _columns: ExportColumn[] = [];

    /**
     * List of columns that can be exported, user may deselect some before sending the download request.
     * Display name defaults to field name if there is no displayName
     */
    @Input()
    set columns(cols: ExportColumn[]) {
        this._columns = cols;
        this.updateFieldNameMap(cols);
    }

    get columns(): ExportColumn[] {
        return this._columns;
    }

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
    @Input()
    downloadingMessage: LazyString = this.translationService.translateAsync('vcd.cc.exporter.downloading');

    /**
     * The message that is displayed while the data is writing to file.
     */
    @Input()
    writingMessage: LazyString = this.translationService.translateAsync('vcd.cc.exporter.writing');

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

    private fieldNameMap = new Map<string, ExportColumn>();

    formGroup: FormGroup<{ [key: string]: AbstractControl<boolean> }>;

    exportStage: LazyString;

    optionsFormGroup = new FormGroup({
        selectAll: new FormControl(true),
        friendlyNames: new FormControl(true),
        sanitize: new FormControl(true),
    });

    /**
     * Says if the column selection dropdown is open.
     */
    isDropdownOpen = false;

    onClickExport(): void {
        this.exportStage = this.downloadingMessage;
        this._isRequestPending = true;
        this.dataExportRequest.emit({
            exportData: this.exportData.bind(this),
            updateProgress: this.updateProgress.bind(this),
            selectedColumns: this.selectedColumns,
        });
    }

    get selectAllControl(): FormControl {
        return this.optionsFormGroup.controls.selectAll;
    }

    get sanitizeControl(): FormControl {
        return this.optionsFormGroup.controls.sanitize;
    }

    get friendlyFieldsControl(): FormControl {
        return this.optionsFormGroup.controls.friendlyNames;
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

    get shouldShowBubbles(): boolean {
        return !this.selectAllControl.value && !this.isDropdownOpen;
    }

    /**
     * Gives a list of all the columns that are selected.
     */
    get selectedColumns(): ExportColumn[] {
        return this.columns.filter((col) => this.formGroup.controls[col.fieldName].value);
    }

    /**
     * Sets the selected value of the given column.
     */
    selectColumn(column: ExportColumn, selected: boolean = !this.getColumnSelection(column)): void {
        this.formGroup.controls[column.fieldName].setValue(selected);
    }

    /**
     * Gives the selection status of the given column.
     */
    getColumnSelection(column: ExportColumn): boolean {
        return this.formGroup.controls[column.fieldName].value;
    }

    ngOnInit(): void {
        const controls = this.columns.reduce((previousValue, currentValue) => {
            previousValue[currentValue.fieldName] = new FormControl(true);
            return previousValue;
        }, {});
        this.formGroup = new FormGroup(controls);
        this.subscriptionTracker.subscribe(this.selectAllControl.valueChanges, (change) => {
            if (change) {
                for (const column of this.columns) {
                    this.formGroup.controls[column.fieldName].setValue(true);
                }
            } else {
                this._columnDropdown.toggleService.toggleWithEvent(new Event('click'));
            }
        });
    }

    private exportData(records: object[]): Promise<string> {
        if (!this.open) {
            return;
        }

        const rows = [
            // First row is the display names
            Object.keys(records[0]).map((fieldName) =>
                this.friendlyFieldsControl.value ? this.getDisplayNameForField(fieldName) : fieldName
            ),
            // Then the data
            ...records.map((rec) => Object.keys(rec).map((key) => rec[key])),
        ];
        return this.downloadData(rows, this.sanitizeControl.value);
    }

    downloadData(data: any[][], shouldSanitize: boolean = false): Promise<string> {
        this.exportStage = this.writingMessage;
        return new Promise((resolve) => {
            // We need to setTimeout because we changed how the message should be displayed
            // but we need to interrupt the current task to get the message to display
            // We tried to use window.requestAnimationFrame, but this didn't work so we had to use
            // setTimeout().
            setTimeout(() => {
                this._isRequestPending = false;
                const csvFile = this.csvExporterService.createCsv(data, shouldSanitize);
                this.csvExporterService.downloadCsvFile(csvFile, this.fileName);
                this.open = false;
                resolve(csvFile);
            });
        });
    }

    private updateProgress(progress: number): void {
        this._progress = progress;
    }

    private getDisplayNameForField(fieldName: string): string {
        if (this.fieldNameMap.has(fieldName)) {
            const exportColumn = this.fieldNameMap.get(fieldName);
            return this.getDisplayNameForColumn(exportColumn);
        }
        return fieldName;
    }

    getDisplayNameForColumn(col: ExportColumn): string {
        return col.displayName || col.fieldName;
    }

    private updateFieldNameMap(cols: ExportColumn[]): void {
        this.fieldNameMap = new Map(cols.map((col) => [col.fieldName, col]));
    }
}
