/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { TestBed } from '@angular/core/testing';

import { DataExportRequestEvent, ExportColumn } from './data-exporter.component';
import { DataExporterModule } from './data-exporter.module';
import { Component } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DataExporterWidgetObject } from './data-exporter.wo';
import { HasFinder, WidgetFinder } from '../utils/test/widget-object';

describe('VcdExportTableComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DataExporterModule, NoopAnimationsModule],
            declarations: [TestHostComponent],
        }).compileComponents();
    });

    beforeEach(function(this: HasFinder): void {
        this.finder = new WidgetFinder(TestHostComponent);
    });

    afterEach(function(this: HasFinder): void {
        if (this.finder) {
            this.finder.destroy();
        }
    });

    describe('opening/closing with two way binding and ngIf', () => {
        it('does not display in the DOM when closed', function(this: HasFinder): void {
            expect(this.finder.find({ woConstructor: DataExporterWidgetObject })).toBeNull();
        });

        it('is added to the DOM when displayed', function(this: HasFinder): void {
            (this.finder.fixture.componentInstance as TestHostComponent).dataExporterOpen = true;
            this.finder.fixture.detectChanges();
            expect(this.finder.find({ woConstructor: DataExporterWidgetObject })).not.toBeNull();
        });

        it('is removed from the DOM after being closed by the user', function(this: HasFinder): void {
            (this.finder.fixture.componentInstance as TestHostComponent).dataExporterOpen = true;
            this.finder.fixture.detectChanges();
            this.finder.find({ woConstructor: DataExporterWidgetObject }).clickCancel();
            expect(this.finder.find({ woConstructor: DataExporterWidgetObject })).toBeNull();
        });
    });

    describe('columns', () => {
        it('displays them as checkboxes', () => {});
    });

    describe('fileName', () => {
        it('customizes the file to be downloaded', () => {});
    });

    describe('showSelectAll', () => {
        it('hides the select all columns option when set to false', () => {});
    });

    describe('@Output', () => {
        describe('dataExportRequest', () => {
            describe('updateProgress', () => {
                it('updates the progress bar', () => {});
                it('displays a looping progress bar when set to -1', () => {});
            });

            describe('exportData', () => {
                it('dismisses the dialog and calls the service to create a client side download', () => {});
            });

            describe('selectedColumns', () => {
                it('contains the columns selected by the users', () => {});
            });
        });
    });

    describe('Select All', () => {
        it('selects all checkboxes when clicked', () => {});
        it('is disabled when all checkboxes are clicked', () => {});
    });
});

@Component({
    template: `
        <vcd-data-exporter
            *ngIf="dataExporterOpen"
            [(open)]="dataExporterOpen"
            [columns]="exportColumns"
        ></vcd-data-exporter>
    `,
})
class TestHostComponent {
    dataExporterOpen = false;

    exportColumns: ExportColumn[] = [
        { fieldName: 'name', displayName: 'Name' },
        { fieldName: 'desc', displayName: 'Description' },
    ];

    onExportRequest(request: DataExportRequestEvent): void {
        let currentProgress = 0;

        const updateProgress = () => {
            currentProgress += 0.2;
            if (currentProgress < 1) {
                request.updateProgress(currentProgress);
                setTimeout(updateProgress, 50);
            } else {
                request.exportData([
                    { name: 'Jaak', desc: 'Tis what tis' },
                    { name: 'Jill', desc: 'Still tis what tis' },
                ]);
            }
        };
        updateProgress();
    }
}
