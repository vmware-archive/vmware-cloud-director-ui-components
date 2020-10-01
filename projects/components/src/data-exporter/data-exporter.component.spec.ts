/*!
 * Copyright 2019-2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Component } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockTranslationService, TranslationService } from '@vcd/i18n';
import { HasFinder, WidgetFinder } from '../utils/test/widget-object';
import { CsvExporterService } from './csv-exporter.service';
import { DataExportRequestEvent, ExportColumn } from './data-exporter.component';
import { VcdDataExporterModule } from './data-exporter.module';
import { DataExporterWidgetObject } from './data-exporter.wo';

type TestHostFinder = HasFinder<TestHostComponent>;
type TestExporterColumnsWithoutDisplayNameFinder = HasFinder<TestExporterColumnsWithoutDisplayNameComponent>;

describe('DataExporterColumnsWithoutDisplayName', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [VcdDataExporterModule, NoopAnimationsModule],
            providers: [
                {
                    provide: TranslationService,
                    useValue: new MockTranslationService(),
                },
            ],
            declarations: [TestExporterColumnsWithoutDisplayNameComponent],
        }).compileComponents();
    });

    beforeEach(function (this: HasFinder): void {
        this.finder = new WidgetFinder(TestExporterColumnsWithoutDisplayNameComponent);
        this.finder.detectChanges();
    });

    it('uses field name if there is no displayName', function (this: TestExporterColumnsWithoutDisplayNameFinder, done): void {
        const exporter = this.finder.find(DataExporterWidgetObject);
        const downloadService = TestBed.inject(CsvExporterService) as CsvExporterService;
        spyOn(downloadService, 'downloadCsvFile');
        spyOn(this.finder.hostComponent, 'onExportRequest').and.callFake(async (e: DataExportRequestEvent) => {
            await e.exportData(TestData.exportDataWithoutDisplayName);
            this.finder.detectChanges();
            const exportData: unknown[][] = [
                TestData.exportColumnsWithoutDisplayName.map((col) => col.fieldName),
                ...TestData.exportDataWithoutDisplayName.map((row) => Object.values(row)),
            ];
            const csvString = downloadService.createCsv(exportData);
            expect(downloadService.downloadCsvFile).toHaveBeenCalledWith(csvString, exporter.component.fileName);
            this.finder.detectChanges();
            expect(this.finder.hostComponent.dataExporterOpen).toBe(false);
            done();
        });

        exporter.clickExport();
    });

    it('displays field name when there is no display name', function (this: TestExporterColumnsWithoutDisplayNameFinder, done): void {
        const exporter = this.finder.find(DataExporterWidgetObject);
        exporter.component.selectAllControl.setValue(false);
        this.finder.detectChanges();
        const dropdownMenuItemTexts = exporter.columnCheckboxes;
        expect(dropdownMenuItemTexts.length).toEqual(2);
        expect(dropdownMenuItemTexts[0]).toEqual('col1');
        expect(dropdownMenuItemTexts[1]).toEqual('col2');

        const columnBubbles = exporter.columnBubbles;

        expect(columnBubbles.length).toEqual(2);
        expect(columnBubbles[0]).toEqual('col1');
        expect(columnBubbles[1]).toEqual('col2');
        done();
    });
});

describe('VcdExportTableComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [VcdDataExporterModule, NoopAnimationsModule],
            providers: [
                {
                    provide: TranslationService,
                    useValue: new MockTranslationService(),
                },
            ],
            declarations: [TestHostComponent],
        }).compileComponents();
    });

    beforeEach(function (this: HasFinder): void {
        this.finder = new WidgetFinder(TestHostComponent);
        this.finder.detectChanges();
    });

    describe('opening/closing with two way binding and ngIf', () => {
        it('does not display in the DOM when closed', function (this: TestHostFinder): void {
            this.finder.hostComponent.dataExporterOpen = false;
            this.finder.detectChanges();
            expect(this.finder.findWidgets(DataExporterWidgetObject).length).toBe(0);
        });

        it('is added to the DOM when displayed', function (this: TestHostFinder): void {
            expect(this.finder.findWidgets(DataExporterWidgetObject).length).toBe(1);
        });

        it('is removed from the DOM after being closed by the user', function (this: TestHostFinder): void {
            this.finder.find(DataExporterWidgetObject).clickCancel();
            expect(this.finder.findWidgets(DataExporterWidgetObject).length).toBe(0);
        });
    });

    describe('@Input: columns', () => {
        it('displays them as checkboxes', function (this: TestHostFinder): void {
            const exporter = this.finder.find(DataExporterWidgetObject);
            exporter.component.selectAllControl.setValue(false);
            expect(exporter.columnBubbles).toEqual(['Name', 'Description']);
        });

        it('hides column checkboxes when clicked', function (this: TestHostFinder): void {
            const exporter = this.finder.find(DataExporterWidgetObject);
            exporter.component.selectAllControl.setValue(false);
            expect(exporter.columnBubbles.length).toBe(2);
        });

        it('allows the user to remove selected columns', function (this: TestHostFinder): void {
            const exporter = this.finder.find(DataExporterWidgetObject);
            exporter.component.selectAllControl.setValue(false);
            exporter.removeColumn(0);
            expect(exporter.component.selectedColumns.length).toBe(1);
        });

        it('allows the user to deselect and reselect columns', fakeAsync(function (this: TestHostFinder): void {
            this.finder.detectChanges();
            const exporter = this.finder.find(DataExporterWidgetObject);
            exporter.component.selectAllControl.setValue(false);
            this.finder.detectChanges();
            exporter.clickColumnCheckbox(0);
            expect(exporter.component.selectedColumns.length).toBe(1);
            exporter.clickColumnCheckbox(0);
            expect(exporter.component.selectedColumns.length).toBe(2);
            exporter.clickColumnDropdown();
            this.finder.detectChanges();
            exporter.removeColumn(1);
            expect(exporter.component.selectedColumns.length).toBe(1);
        }));
    });

    describe('@Input: fileName', () => {
        it('customizes the file to be downloaded', function (this: TestHostFinder, done): void {
            const exporter = this.finder.find(DataExporterWidgetObject);
            exporter.component.fileName = 'my-export.csv';
            const downloadService = TestBed.inject(CsvExporterService) as CsvExporterService;
            const spy = spyOn(downloadService, 'downloadCsvFile');
            spyOn(this.finder.hostComponent, 'onExportRequest').and.callFake(async (e: DataExportRequestEvent) => {
                await e.exportData(TestData.exportData);
                expect(spy.calls.mostRecent().args[1]).toBe('my-export.csv');
                done();
            });
            exporter.clickExport();
        });
    });

    describe('@Output - dataExporter', () => {
        describe('updateProgress', () => {
            it('displays a looping progress bar when set to -1', function (this: TestHostFinder): void {
                const exporter = this.finder.find(DataExporterWidgetObject);
                const downloadService = TestBed.inject(CsvExporterService) as CsvExporterService;
                spyOn(downloadService, 'downloadCsvFile');

                spyOn(this.finder.hostComponent, 'onExportRequest').and.callFake((e: DataExportRequestEvent) => {
                    e.updateProgress(-1);
                    this.finder.detectChanges();
                    expect(exporter.isLoopingProgressBar).toBe(true, 'Looping bar should have been visible');
                });
                exporter.clickExport();
            });

            it('updates the progress bar when passed values', function (this: TestHostFinder): void {
                const exporter = this.finder.find(DataExporterWidgetObject);
                const downloadService = TestBed.inject(CsvExporterService) as CsvExporterService;
                spyOn(downloadService, 'downloadCsvFile');
                spyOn(this.finder.hostComponent, 'onExportRequest').and.callFake((e: DataExportRequestEvent) => {
                    e.updateProgress(0);
                    expect(exporter.component.progress).toBe(0);
                    e.updateProgress(0.5);
                    expect(exporter.component.progress).toBe(0.5);
                });
                exporter.clickExport();
            });
        });

        describe('exportData', () => {
            it('dismisses the dialog and calls the service to create a client side download', function (this: TestHostFinder, done): void {
                const exporter = this.finder.find(DataExporterWidgetObject);
                const downloadService = TestBed.inject(CsvExporterService) as CsvExporterService;
                spyOn(downloadService, 'downloadCsvFile');
                spyOn(this.finder.hostComponent, 'onExportRequest').and.callFake(async (e: DataExportRequestEvent) => {
                    await e.exportData(TestData.exportData);
                    this.finder.detectChanges();
                    const exportData: unknown[][] = [
                        TestData.exportColumns.map((col) => col.displayName),
                        ...TestData.exportData.map((row) => Object.values(row)),
                    ];
                    const csvString = downloadService.createCsv(exportData);
                    expect(downloadService.downloadCsvFile).toHaveBeenCalledWith(
                        csvString,
                        exporter.component.fileName
                    );
                    this.finder.detectChanges();
                    expect(this.finder.hostComponent.dataExporterOpen).toBe(false);
                    done();
                });

                exporter.clickExport();
            });

            it('does not download a file if the dialog has been closed', function (this: TestHostFinder, done): void {
                const exporter = this.finder.find(DataExporterWidgetObject);
                const downloadService = TestBed.inject(CsvExporterService) as CsvExporterService;
                spyOn(downloadService, 'downloadCsvFile');
                spyOn(this.finder.hostComponent, 'onExportRequest').and.callFake(async (e: DataExportRequestEvent) => {
                    exporter.clickCancel();
                    await e.exportData(TestData.exportData);
                    this.finder.detectChanges();
                    expect(downloadService.downloadCsvFile).not.toHaveBeenCalled();
                    this.finder.detectChanges();
                    done();
                });

                exporter.clickExport();
            });

            it('uses field name if there is no matching displayName for a field', function (this: TestHostFinder, done): void {
                const exporter = this.finder.find(DataExporterWidgetObject);
                const downloadService = TestBed.inject(CsvExporterService) as CsvExporterService;
                spyOn(downloadService, 'downloadCsvFile');
                spyOn(this.finder.hostComponent, 'onExportRequest').and.callFake(async (e: DataExportRequestEvent) => {
                    await e.exportData(TestData.exportDataWrongField);
                    this.finder.detectChanges();
                    // Byte order mark for UTF-8
                    const BOM = '\ufeff';
                    expect(downloadService.downloadCsvFile).toHaveBeenCalledWith(
                        BOM + 'noexist\nJack\nJill',
                        exporter.component.fileName
                    );
                    done();
                });

                exporter.clickExport();
            });

            it('allows the user to not sanitize injection', function (this: TestHostFinder, done): void {
                const exporter = this.finder.find(DataExporterWidgetObject);
                const downloadService = TestBed.inject(CsvExporterService) as CsvExporterService;
                spyOn(downloadService, 'downloadCsvFile');
                spyOn(this.finder.hostComponent, 'onExportRequest').and.callFake(async (e: DataExportRequestEvent) => {
                    await e.exportData(InjectionData.exportData);
                    this.finder.detectChanges();
                    const exportData: unknown[][] = [
                        TestData.exportColumns.map((col) => col.displayName),
                        ...FixedInjection.exportData.map((row) => Object.values(row)),
                    ];
                    const csvString = downloadService.createCsv(exportData);
                    expect(downloadService.downloadCsvFile).toHaveBeenCalledWith(
                        csvString,
                        exporter.component.fileName
                    );
                    done();
                });
                exporter.component.sanitizeControl.setValue(true);
                exporter.clickExport();
            });

            it('allows the user to export raw column names', function (this: TestHostFinder, done): void {
                const exporter = this.finder.find(DataExporterWidgetObject);
                const downloadService = TestBed.inject(CsvExporterService) as CsvExporterService;
                spyOn(downloadService, 'downloadCsvFile');
                spyOn(this.finder.hostComponent, 'onExportRequest').and.callFake(async (e: DataExportRequestEvent) => {
                    await e.exportData(TestData.exportData);
                    this.finder.detectChanges();
                    const exportData: unknown[][] = [
                        TestData.exportColumns.map((col) => col.fieldName),
                        ...TestData.exportData.map((row) => Object.values(row)),
                    ];
                    const csvString = downloadService.createCsv(exportData);
                    expect(downloadService.downloadCsvFile).toHaveBeenCalledWith(
                        csvString,
                        exporter.component.fileName
                    );
                    done();
                });
                exporter.component.friendlyFieldsControl.setValue(false);
                exporter.clickExport();
            });
        });

        describe('selectedColumns', () => {
            it('contains the columns selected by the users', function (this: TestHostFinder): void {
                const exporter = this.finder.find(DataExporterWidgetObject);
                spyOn(this.finder.hostComponent, 'onExportRequest').and.callFake((e: DataExportRequestEvent) => {
                    expect(e.selectedColumns).toEqual(TestData.exportColumns);
                });
                exporter.clickExport();
            });
        });
    });
});

const TestData = {
    /** The progress calls that to updateProgress will be called with the following values */
    progressStates: [-1, 0.5, 1],
    exportColumns: [
        { fieldName: 'name', displayName: 'Name' },
        { fieldName: 'desc', displayName: 'Description' },
    ],
    exportColumnsWithoutDisplayName: [{ fieldName: 'col1' }, { fieldName: 'col2' }],
    exportData: [
        { name: 'Jaak', desc: 'Tis what tis' },
        { name: 'Jill', desc: 'Still tis what tis' },
    ],
    exportDataWithoutDisplayName: [
        { col1: 'hi', col2: 'alice' },
        { col1: 'Hi', col2: 'Bob' },
    ],
    exportDataWrongField: [{ noexist: 'Jack' }, { noexist: 'Jill' }],
};

const InjectionData = {
    exportData: [
        { name: '+a', desc: 'Tis what tis' },
        { name: 'Jill', desc: 'Still tis what tis' },
    ],
};

const FixedInjection = {
    exportData: [
        { name: '\t+a', desc: 'Tis what tis' },
        { name: 'Jill', desc: 'Still tis what tis' },
    ],
};

@Component({
    template: `
        <vcd-data-exporter
            *ngIf="dataExporterOpen"
            [(open)]="dataExporterOpen"
            [columns]="exportColumns"
            (dataExportRequest)="onExportRequest($event)"
        ></vcd-data-exporter>
    `,
})
class TestHostComponent {
    dataExporterOpen = true;

    exportColumns: ExportColumn[] = TestData.exportColumns;

    // Will be mocked in tests
    onExportRequest(request: DataExportRequestEvent): void {}
}

@Component({
    template: `
        <vcd-data-exporter
            *ngIf="dataExporterOpen"
            [(open)]="dataExporterOpen"
            [columns]="exportColumns"
            (dataExportRequest)="onExportRequest($event)"
        ></vcd-data-exporter>
    `,
})
class TestExporterColumnsWithoutDisplayNameComponent {
    dataExporterOpen = true;

    exportColumns: ExportColumn[] = TestData.exportColumnsWithoutDisplayName;

    // Will be mocked in tests
    onExportRequest(request: DataExportRequestEvent): void {}
}
