/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { TestBed } from '@angular/core/testing';

import { Component } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockTranslationService, TranslationService } from '@vcd/i18n';
import { HasFinder, WidgetFinder } from '../utils/test/widget-object';
import { CsvExporterService } from './csv-exporter.service';
import { DataExportRequestEvent, ExportColumn } from './data-exporter.component';
import { VcdDataExporterModule } from './data-exporter.module';
import { DataExporterWidgetObject } from './data-exporter.wo';

type TestHostFinder = HasFinder<TestHostComponent>;

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

    beforeEach(function(this: HasFinder): void {
        this.finder = new WidgetFinder(TestHostComponent);
        this.finder.detectChanges();
    });

    describe('opening/closing with two way binding and ngIf', () => {
        it('does not display in the DOM when closed', function(this: TestHostFinder): void {
            this.finder.hostComponent.dataExporterOpen = false;
            this.finder.detectChanges();
            expect(this.finder.findWidgets(DataExporterWidgetObject).length).toBe(0);
        });

        it('is added to the DOM when displayed', function(this: TestHostFinder): void {
            expect(this.finder.findWidgets(DataExporterWidgetObject).length).toBe(1);
        });

        it('is removed from the DOM after being closed by the user', function(this: TestHostFinder): void {
            this.finder.find(DataExporterWidgetObject).clickCancel();
            expect(this.finder.findWidgets(DataExporterWidgetObject).length).toBe(0);
        });
    });

    describe('@Input: columns', () => {
        it('displays them as checkboxes', function(this: TestHostFinder): void {
            expect(this.finder.find(DataExporterWidgetObject).columnCheckBoxes).toEqual(['Name', 'Description']);
        });
    });

    describe('@Input: fileName', () => {
        it('customizes the file to be downloaded', function(this: TestHostFinder): void {
            const exporter = this.finder.find(DataExporterWidgetObject);
            exporter.component.fileName = 'my-export.csv';
            const downloadService = TestBed.get(CsvExporterService) as CsvExporterService;
            const spy = spyOn(downloadService, 'downloadCsvFile');
            spyOn(this.finder.hostComponent, 'onExportRequest').and.callFake((e: DataExportRequestEvent) => {
                e.exportData(TestData.exportData);
                expect(spy.calls.mostRecent().args[1]).toBe('my-export.csv');
            });
            exporter.clickExport();
        });
    });

    describe('@Input: showSelectAll', () => {
        it('hides the select all columns option when set to false', function(this: TestHostFinder): void {
            const exporter = this.finder.find(DataExporterWidgetObject);
            exporter.component.showSelectAll = false;
            this.finder.detectChanges();
            expect(this.finder.find(DataExporterWidgetObject).isSelectAllVisible).toBe(false);
        });
        it('is disabled when all checkboxes are clicked', function(this: TestHostFinder): void {
            const exporter = this.finder.find(DataExporterWidgetObject);
            expect(exporter.isSelectAllEnabled).toBe(false);
        });

        it('selects all checkboxes when clicked', function(this: TestHostFinder): void {
            const exporter = this.finder.find(DataExporterWidgetObject);
            exporter.clickColumn(0);
            exporter.clickColumn(1);
            expect(exporter.isSelectAllEnabled).toBe(true);
            exporter.clickSelectAll();
            expect(exporter.columnCheckBoxes.length).toBe(2);
        });
    });

    describe('@Output - dataExporter', () => {
        describe('updateProgress', () => {
            it('displays a looping progress bar when set to -1', function(this: TestHostFinder): void {
                const exporter = this.finder.find(DataExporterWidgetObject);
                const downloadService = TestBed.get(CsvExporterService) as CsvExporterService;
                spyOn(downloadService, 'downloadCsvFile');

                spyOn(this.finder.hostComponent, 'onExportRequest').and.callFake((e: DataExportRequestEvent) => {
                    e.updateProgress(-1);
                    this.finder.detectChanges();
                    expect(exporter.isLoopingProgressBar).toBe(true, 'Looping bar should have been visible');
                });
                exporter.clickExport();
            });

            it('updates the progress bar when passed values', function(this: TestHostFinder): void {
                const exporter = this.finder.find(DataExporterWidgetObject);
                const downloadService = TestBed.get(CsvExporterService) as CsvExporterService;
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
            it('dismisses the dialog and calls the service to create a client side download', function(this: TestHostFinder): void {
                const exporter = this.finder.find(DataExporterWidgetObject);
                const downloadService = TestBed.get(CsvExporterService) as CsvExporterService;
                spyOn(downloadService, 'downloadCsvFile');
                spyOn(this.finder.hostComponent, 'onExportRequest').and.callFake((e: DataExportRequestEvent) => {
                    e.exportData(TestData.exportData);
                    this.finder.detectChanges();
                    const exportData: unknown[][] = [
                        TestData.exportColumns.map(col => col.displayName),
                        ...TestData.exportData.map(row => Object.values(row)),
                    ];
                    const csvString = downloadService.createCsv(exportData);
                    expect(downloadService.downloadCsvFile).toHaveBeenCalledWith(
                        csvString,
                        exporter.component.fileName
                    );
                    this.finder.detectChanges();
                    expect(this.finder.hostComponent.dataExporterOpen).toBe(false);
                });

                exporter.clickExport();
            });

            describe('verifies with the user if the data potentially contains injection', () => {
                it('allows the user to sanitize injection', function(this: TestHostFinder): void {
                    const exporter = this.finder.find(DataExporterWidgetObject);
                    const downloadService = TestBed.get(CsvExporterService) as CsvExporterService;
                    spyOn(downloadService, 'downloadCsvFile');
                    spyOn(this.finder.hostComponent, 'onExportRequest').and.callFake((e: DataExportRequestEvent) => {
                        e.exportData(InjectionData.exportData);
                        this.finder.detectChanges();
                        expect(this.finder.hostComponent.dataExporterOpen).toBe(true);
                        exporter.clickYes();
                        const exportData: unknown[][] = [
                            TestData.exportColumns.map(col => col.displayName),
                            ...FixedInjection.exportData.map(row => Object.values(row)),
                        ];
                        const csvString = downloadService.createCsv(exportData);
                        expect(downloadService.downloadCsvFile).toHaveBeenCalledWith(
                            csvString,
                            exporter.component.fileName
                        );
                    });
                    exporter.clickExport();
                });

                it('allows the user to not sanitize injection', function(this: TestHostFinder): void {
                    const exporter = this.finder.find(DataExporterWidgetObject);
                    const downloadService = TestBed.get(CsvExporterService) as CsvExporterService;
                    spyOn(downloadService, 'downloadCsvFile');
                    spyOn(this.finder.hostComponent, 'onExportRequest').and.callFake((e: DataExportRequestEvent) => {
                        e.exportData(InjectionData.exportData);
                        this.finder.detectChanges();
                        expect(this.finder.hostComponent.dataExporterOpen).toBe(true);
                        exporter.clickNo();
                        const exportData: unknown[][] = [
                            TestData.exportColumns.map(col => col.displayName),
                            ...InjectionData.exportData.map(row => Object.values(row)),
                        ];
                        const csvString = downloadService.createCsv(exportData);
                        expect(downloadService.downloadCsvFile).toHaveBeenCalledWith(
                            csvString,
                            exporter.component.fileName
                        );
                    });
                    exporter.clickExport();
                });
            });

            it('does not download a file if the dialog has been closed', function(this: TestHostFinder): void {
                const exporter = this.finder.find(DataExporterWidgetObject);
                const downloadService = TestBed.get(CsvExporterService) as CsvExporterService;
                spyOn(downloadService, 'downloadCsvFile');
                spyOn(this.finder.hostComponent, 'onExportRequest').and.callFake((e: DataExportRequestEvent) => {
                    exporter.clickCancel();
                    e.exportData(TestData.exportData);
                    this.finder.detectChanges();
                    expect(downloadService.downloadCsvFile).not.toHaveBeenCalled();
                    this.finder.detectChanges();
                });

                exporter.clickExport();
            });

            it('uses field name if there is no matching displayName for a field', function(this: TestHostFinder): void {
                const exporter = this.finder.find(DataExporterWidgetObject);
                const downloadService = TestBed.get(CsvExporterService) as CsvExporterService;
                spyOn(downloadService, 'downloadCsvFile');
                spyOn(this.finder.hostComponent, 'onExportRequest').and.callFake((e: DataExportRequestEvent) => {
                    e.exportData(TestData.exportDataWrongField);
                    this.finder.detectChanges();
                    expect(downloadService.downloadCsvFile).toHaveBeenCalledWith(
                        'noexist\nJack\nJill',
                        exporter.component.fileName
                    );
                });

                exporter.clickExport();
            });
        });

        describe('selectedColumns', () => {
            it('contains the columns selected by the users', function(this: TestHostFinder): void {
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
    exportColumns: [{ fieldName: 'name', displayName: 'Name' }, { fieldName: 'desc', displayName: 'Description' }],
    exportData: [{ name: 'Jaak', desc: 'Tis what tis' }, { name: 'Jill', desc: 'Still tis what tis' }],
    exportDataWrongField: [{ noexist: 'Jack' }, { noexist: 'Jill' }],
};

const InjectionData = {
    exportData: [{ name: '+a', desc: 'Tis what tis' }, { name: 'Jill', desc: 'Still tis what tis' }],
};

const FixedInjection = {
    exportData: [{ name: '\t+a', desc: 'Tis what tis' }, { name: 'Jill', desc: 'Still tis what tis' }],
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
