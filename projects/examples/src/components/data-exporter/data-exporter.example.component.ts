/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component } from '@angular/core';
import { DataExportRequestEvent, ExportColumn } from '@vcd/ui-components';

@Component({
    selector: 'vcd-data-exporter-example',
    template: `
        <h2>Data Exporter</h2>
        <p>
            The data exporter component is a component that knows how to export rows of data to a CSV. It works by
            allowing the client to input columns to export, and then giving notifications to the client to query to the
            backend. It then takes the resulting data and downloads a CSV.
        </p>
        <br />
        <p>
            As for the user experience, we give the users a few options. One, they can choose to select all columns or
            manually go through and select columns. Two, they can choose whether the header should be the direct object
            field name or a translated, friendly name. Three, they can choose if cells should be checked for code
            injection and prefixed with the tab character.
        </p>
        <button (click)="dataExporterOpen = true">
            Show Modal
        </button>
        <vcd-data-exporter
            *ngIf="dataExporterOpen"
            [(open)]="dataExporterOpen"
            (dataExportRequest)="onExportRequest($event)"
            [columns]="exportColumns"
        >
        </vcd-data-exporter>
    `,
})
export class DataExporterExampleComponent {
    exportColumns: ExportColumn[] = [
        { fieldName: 'name', displayName: 'Name' },
        { fieldName: 'desc', displayName: 'Description' },
        { fieldName: 'injection', displayName: 'Injection' },
    ];

    dataExporterOpen = false;

    onExportRequest(request: DataExportRequestEvent): void {
        let currentProgress = 0;

        const updateProgress = () => {
            currentProgress += 0.01;
            if (currentProgress < 1) {
                request.updateProgress(currentProgress);
                setTimeout(updateProgress, 50);
            } else {
                request.exportData([
                    { name: 'Jack', desc: 'Tis what tis', injection: '=1+1' },
                    { name: 'Jill', desc: 'Still tis what tis', injection: '+1+1' },
                ]);
            }
        };
        updateProgress();
    }
}
